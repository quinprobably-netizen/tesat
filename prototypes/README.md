# Prototypes

## `rapier-vehicle.html`: can Rapier carry the rally car?

A standalone test bench for [Rapier](https://rapier.rs) (`@dimforge/rapier3d-compat` 0.21.0, WASM) as the game's
rigid-body and collision engine. The game itself (`../index.html`) is untouched. Open the file in a modern browser;
like the game it needs no build step. It loads three.js r128 from cdnjs and Rapier from jsdelivr (the compat build is
a single 4.3 MB module with the WASM inside).

It uses the real car (mass, inertia, wheel positions, spring rates, tyre curves, surface grip) on a procedural road
with a kicker, a flat skidpad and about ninety knock-down props (crates, barrels, tyre stacks), and has two drive modes:

| Mode | What drives the body |
|---|---|
| **A** | Rapier's own `DynamicRayCastVehicleController` (a port of Bullet's raycast vehicle) |
| **B** | The game's own coil-over springs, two-stage dampers, bump stops, anti-roll bars and combined-slip Pacejka tyres, applied as forces on a Rapier body; Rapier supplies the ground and prop contacts and the wheel raycasts |

Keys: `W` `S` throttle, brake and reverse; `A` `D` steer; `Space` handbrake; `R` restart; `G` skidpad;
`F` flip upright; `B` reset props; `M` switch mode; `T` cycle surface (gravel, tarmac, snow, ice).

### Findings

- **Contacts are the easy part.** The heightfield ground, the car's box colliders (with continuous collision detection)
  and ninety dynamic props cost about 0.1 to 0.4 ms per 120 Hz step (headless Chromium, CPU only). Driving straight into
  the 18-crate wall at 30, 50 and 80 km/h knocks 14 to 16 of the crates over 0.5 m in either mode and leaves the car upright.
- **Mode B reproduces the game's numbers.** Static suspension sag matches the game's (8.8 cm front, 8.9 cm rear), and
  steady-state cornering reaches 0.8 to 1.1 times the surface's grip on all four surfaces. The vehicle half costs
  about 0.04 to 0.07 ms per step (four ray casts plus the force maths).
- **Mode A is quick to set up but coarser.** Rapier's rates are per kg of chassis (divide the game's spring rate by the
  mass), the brake is an impulse per step and isn't grip-limited, friction has no slip curve (no peak and fall-off, no
  combined slip), and there is no driveline.
- **Mode B needs more than a tyre model.** With one wheel at a time and no engine inertia, full throttle spins the
  wheels to 300 km/h; the game's default traction control (cut the engine on slip) fixes it here. The real game
  solves the whole driveline at once; moving that onto a Rapier body would mean porting `stepVehicle` and `drivelineStep`.
- **Gotchas.** Heightfield data is column-major with columns along x and rows along z. Forces added with `addForce` and
  `addForceAtPoint` stay until `resetForces`, so reset every step. `updateVehicle` changes the chassis velocity directly,
  so call it before `world.step()`.
