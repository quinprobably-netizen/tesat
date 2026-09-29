# Regolith Rally

A point-to-point space rally game in a single self-contained HTML file. You drive a rugged buggy against the clock over the Moon, a planetary ring and a derelict station field. Everything is generated procedurally: terrain, textures, sky, particles and sound.

**Play:** open `index.html` in a modern browser. It loads three.js r128 from cdnjs and needs no build step or server.

## Stages

Each stage is generated from a fixed seed, so the layout is the same every time.

| Stage | Gravity | Character |
|---|---|---|
| Lunar Dust Run | 0.33 g | Wide and forgiving regolith roads, long floaty jumps, one chasm |
| Ice Ring Traverse | 0.51 g | Slippery ice causeway on a planetary ring under a gas giant, with drop-offs at the edges |
| Wreckage Belt | 1.22 g | Tight metal-plated corners through station wreckage, with drifting debris |

Hazards:
- **Craters.** Some are built into the stage; meteor showers add new ones during a run.
- **Kicker ramps and crests.**
- **Chasm jumps.**
- **Meteor showers.** A red ring marks each impact point.
- **Drifting debris.**
- **Grip changes.** Surfaces are regolith, ice, metal or gravel.

Rules and scoring:
- Checkpoint gates must be passed in order. Missing one sends you back to the last gate with +5 s.
- Damage builds up from hard landings and impacts and lowers your top speed until the stage ends.
- Boost refills when you drift or land a jump cleanly.
- Best times, splits and a ghost replay of your best run are stored in `localStorage`.

## Modes and sharing

- **Stage codes.** Every stage has a code such as `RR-I-4471` (template letter L/I/W + seed). Type a code or a bare seed in the menu, or press RANDOM SEED, to generate a new stage from that template. Copy the code to send a friend the exact same stage.
- **Service park.** Before each stage, pick suspension (soft/medium/stiff), gearing (short/standard/long) and tyres (all-terrain/studded/slick). Each stage marks a recommended setup with ★, and your choice is remembered per stage type.
- **Rally mode.** Runs all three stages back to back. Damage carries over. Between stages the crew repairs 40% for free, and a full repair costs time. Your best rally total is saved.
- **Ghost codes and leaderboards.** Each stage keeps a local leaderboard of your runs plus imported ghosts. Use COPY THIS RUN'S GHOST CODE on the finish screen (or COPY MY BEST GHOST in the menu) to get a few-KB text code. A friend pastes it into IMPORT GHOST CODE: the right stage is generated and they race your run as a magenta rival ghost. RACE/RACING on the leaderboard picks which imported ghost to race.

## Controls

| | Keyboard | Gamepad | Touch |
|---|---|---|---|
| Throttle / brake & reverse | W / S or ↑ / ↓ | RT / LT | GAS / BRAKE |
| Steer (in the air: yaw; W/S pitch) | A / D or ← / → | Left stick / d-pad | Steering pad |
| Handbrake | Space | A | HAND BRAKE |
| Boost | Shift | X or RB | BOOST |
| Reset to last checkpoint | R | Back | R |
| Camera (chase / bumper) | C | Y | CAM |
| Pause (Esc also closes dialogs) | Esc | Start | II |
| Confirm / next (menus, service park) | Enter | A | buttons |
| Mute / co-driver voice / ghost | M / V / G | | ♫ |

## Code layout

`index.html` contains the CSS, the HUD markup and one script, divided into 17 commented sections:

1–3. Utilities, storage, stage definitions
4–5. Renderer and scene setup; sky, planets, environment lighting
6–8. Track generation, terrain queries, terrain meshes
9. Scenery
10. Vehicle model and physics
11. Particles
12. Meteors
13. Input
14. Camera
15. Audio
16. HUD and pace notes
17. Game state and main loop

For automation and debugging, `window.RegolithRally` exposes the following. For example, `RegolithRally.setAutopilot(true)` lets the AI drive a stage.

- `simulate(seconds)` runs the game headlessly.
- `setAutopilot(bool)` hands control to the AI driver.
- `loadStage(i, then)` builds a stage.
- `startRace()` starts the current stage (skipping the service park).
- `startRally()`, `openService()`, `importGhost(code)`, `encodeGhost(...)` / `decodeGhost(code)` drive the newer features.
