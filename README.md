# Regolith Rally

A point-to-point space rally game in a single self-contained HTML file. You drive a rugged buggy against the clock across six stages: the Moon, a planetary ring, a derelict station field, a Martian canyon, the ice of Europa and an orbital smelter over Io. Everything is generated procedurally: terrain, textures, sky, particles and sound.

**Play:** open `index.html` in a modern browser. It loads three.js r128 from cdnjs and needs no build step or server.

## Stages

Each stage is generated from a fixed seed, so the layout is the same every time.

| Stage | Gravity | Character |
|---|---|---|
| Lunar Dust Run | 0.33 g | Wide and forgiving regolith roads, long floaty jumps, one chasm |
| Ice Ring Traverse | 0.51 g | Slippery ice causeway on a planetary ring under a gas giant, with drop-offs at the edges |
| Wreckage Belt | 1.22 g | Tight metal-plated corners through station wreckage, broken up by chicanes |
| Red Canyon Sprint | 0.38 g | Fast gravel roads between rust-red Martian mesas, big crests |
| Europa Fracture Line | 0.24 g | Low-grip ice shelf with cliffs on both sides, under a huge Jupiter |
| Foundry Gauntlet | 1.53 g | Hairpins on the metal decks of an orbital smelter over Io; the hardest stage |

Hazards:
- **Craters.**
- **Kicker ramps and crests.**
- **Chasm jumps.**
- **Chicanes.** Rows of red and white water-filled barriers reach in from alternating sides of the road, so you have to weave left and right between them. The co-driver calls each one ("chicane left-right") and a chevron board on the end of each row points to the gap. The blocks are loose: hit them and they scatter, costing you speed and some damage.
- **Grip changes.** Surfaces are regolith, ice, metal or gravel.

Rules and scoring:
- Checkpoint gates must be passed in order. Missing one sends you back to the last gate with +5 s.
- Passing a chicane row on its barrier side, through the blocks or round the end, costs +5 s.
- Damage builds up from hard landings and impacts and lowers your top speed until the stage ends.
- Boost refills when you drift or land a jump cleanly.
- Best times, splits and a ghost replay of your best run are stored in `localStorage`.

Handling:
- The tyres use a progressive grip curve. Grip builds smoothly up to the limit, then drops slightly while sliding, so you can feel the limit before you cross it.
- Grip is load-sensitive: weight transfer and bumps shift grip less abruptly.
- Countersteer assist gives up to 70% more steering lock when you steer into a slide, so drifts are easy to catch.
- At speed, yaw stability bleeds off rotation beyond what your steering asks for. It never adds rotation, and it switches off while you're deliberately drifting or on the handbrake.
- Keyboard steering ramps in more gently at high speed.

Suspension:
- Each corner is a coil-over: a linear coil spring and a two-stage damper. Bump and rebound are valved separately, with rebound the firmer side as on a real damper. Each side has a low-speed slope and a softer high-speed blow-off above its knee, so sharp ripples don't launch the body.
- A progressive urethane bump stop takes over in the last 6 cm of travel before the hard stop.
- Anti-roll bars link the left and right wheels on each axle, so the body rolls less in corners. Soft bars roll about twice as much as stiff ones but let each wheel follow rough ground on its own; stiff bars keep the car flat and quick to change direction, at the cost of skipping over bumps. The front bar is stiffer than the rear, for a stable, slightly understeering balance on the limit. The bars are modelled under the car and twist as it rolls.
- The HUD shows each corner's travel: amber on the bump stop, red when bottomed out. The shocks are modelled on the car and move with the wheels.

Brakes:
- Brake pressure is progressive. The gamepad trigger is analogue, and on keyboard or touch the pedal builds from 15% to full over about 0.4 s of holding, so a tap only scrubs speed.
- Brake force is split 61% front, 39% rear.
- With ABS on (the default), the wheels stop just short of locking and you can still steer. With ABS off, anything past about 80% pressure locks the wheels: the tyres slide, the car takes longer to stop and it won't turn. Switch ABS off in SETTINGS. The AI always brakes with ABS.
- The brake bar under the rev bar shows pressure. It turns amber while ABS is working and white when a wheel locks.

Transmission:
- Six-speed sequential gearbox with a torque curve that peaks around 5,700 rpm, a rev limiter at 8,200 rpm and a short torque cut on each shift.
- Lifting off gives engine braking, which is stronger in low gears.
- Manual gears are the default on keyboard and gamepad. Shift with E/Q or d-pad up/down; the rev bar flashes when it's time to shift up, and a downshift that would over-rev the engine is refused. Touch devices default to automatic, and the MANUAL GEARS switch in SETTINGS changes between the two. The AI always uses the automatic.

## Menus

- **Home.** PLAY (stage select), RALLY, GARAGE and SETTINGS, with your current pilot, car and stats beside them.
- **Stage select.** The six stages are listed on the left, each with its best time and medal. The chosen stage is shown on the right with a picture, its gravity, length, surface, checkpoints and target time, and two tabs: LEADERBOARD, and CODES & GHOSTS for stage codes, seeds and ghost codes.
- **Settings.** Every switch in one place, reachable from the home screen, the stage select (⚙) and the pause menu: manual gears and ABS, bumper cam and ghost, sound and co-driver voice, your driver name, and a controls reference for keyboard, gamepad and touch.
- **Pause.** Resume, restart, settings or quit to the stage select.

All menus work with the keyboard (arrow keys, Enter, Esc) and the gamepad (d-pad, A, B) as well as by mouse or touch.

## Garage

In the **garage** you build your ride Mario Kart style, with a live 3D preview that you can drag to spin:

| Part | Options |
|---|---|
| Pilot | NOVA (astronaut, medium), ZIX (alien, light), BOLT-9 (robot, heavy), MISO (cat, light), GRAVL (rock golem, heavy), PIP (drone, feather), KOI (goldfish, light), VEGA (rally ace, medium) |
| Car | Group B inspired: TWINCHARGER (Lancia Delta S4), FIVE-POT (Audi Sport quattro S1 E2), T16 (Peugeot 205 T16), STRADALE (Lancia 037), RS WEDGE (Ford RS200), SIX-R (MG Metro 6R4) |
| Engine | TWIN ION, PULSE ROCKET, ARC COIL, NOVA BURNER, RAMJET |
| Wheels | STANDARD, CRAWLER, SLICK ROLLER, HOVER PADS, SPIKE RIMS |
| Wing | STOCK (the car's own rally aero), SLIPSTREAM (none), HIGH WING, SOLAR FINS |
| Paint | 12 colours, including metallic chrome and copper |
| Decal | CLEAN, STRIPES, FLAMES, CHECKER, BOLT, STARS |
| Glow | Underglow in 5 colours, or off |

Each pilot, car, engine, wheel and wing shifts six stats (speed, acceleration, handling, grip, weight, boost) up or down from a neutral 5. Hover an option to preview the change. The default build (NOVA in the TWINCHARGER) is all neutral. In the race, the stats scale top speed (±11%), acceleration, steering lock, tyre grip, boost thrust and refill, and damage taken (heavier builds shrug off more). The build is saved in `localStorage` and applies to every stage; the service park setup still stacks on top.

## Modes and sharing

- **Stage codes.** Every stage has a code such as `RR-I-4471` (template letter L/I/W/M/E/F + seed). Type a code or a bare seed under CODES & GHOSTS on the stage select, or press RANDOM SEED, to generate a new stage from that template. Copy the code to send a friend the exact same stage.
- **Service park.** Before each stage, pick springs (soft/medium/stiff), dampers (soft/medium/firm), anti-roll bars (soft/medium/stiff), final drive (short/standard/long) and tyres (all-terrain/studded/slick). Each stage marks a recommended setup with ★, and your choice is remembered per stage type.
- **Rally mode.** Runs every stage back to back. Damage carries over. Between stages the crew repairs 40% for free, and a full repair costs time. Your best rally total is saved.
- **Ghost codes and leaderboards.** Each stage keeps a local leaderboard of your runs plus imported ghosts. Use COPY THIS RUN'S GHOST CODE on the finish screen (or COPY MY BEST GHOST under CODES & GHOSTS) to get a few-KB text code. A friend pastes it into IMPORT A GHOST CODE: the right stage is generated and they race your run as a magenta rival ghost. RACE/RACING on the leaderboard picks which imported ghost to race.

## Controls

| | Keyboard | Gamepad | Touch |
|---|---|---|---|
| Throttle / brake & reverse | W / S or ↑ / ↓ | RT / LT | GAS / BRAKE |
| Steer (in the air: yaw; W/S pitch) | A / D or ← / → | Left stick / d-pad ← → | Steering pad |
| Handbrake | Space | A | HAND BRAKE |
| Boost | Shift | X or RB | BOOST |
| Gear up / down (manual gears) | E / Q | D-pad ↑ / ↓ | ▲ / ▼ |
| Reset to last checkpoint | R | Back | R |
| Camera (chase / bumper) | C | Y | CAM |
| Pause (Esc also closes dialogs) | Esc | Start | II |
| Confirm / next (menus, service park) | Enter | A | buttons |
| Menu / garage navigation | Arrow keys | D-pad | tap |
| Mute / co-driver voice / ghost | M / V / G | | ♫ |

## Code layout

`index.html` contains the CSS, the HUD markup and one script, divided into 17 commented sections:

1–3. Utilities, storage, stage definitions
4–5. Renderer and scene setup; sky, planets, environment lighting
6–8. Track generation, terrain queries, terrain meshes
9. Scenery
10. Vehicle model and physics
11. Particles
12. (removed: meteor showers)
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
