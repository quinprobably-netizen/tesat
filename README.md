# Regolith Rally

A point-to-point rally game in one self-contained HTML file. You drive real rally cars, from a 1964 Mini to a 2017 World Rally Car, against the clock on real roads: one stage from every round of the 2026 World Rally Championship, the full Pikes Peak hillclimb, and a test park. Terrain, textures, sky, scenery and sound are all generated in the browser.

**Play:** open `index.html` in a modern browser. It loads three.js 0.186.1 from jsdelivr and needs no build step or server. Keyboard, gamepad and touch (phones in portrait or landscape) all work.

## Stages

Every stage is a real road at 1:1 scale, traced from its rally-maps.com stage line and OpenStreetMap, with heights from SRTM / EU-DEM elevation data. Corners, grades, climbs and road widths are the real ones, and the ground around the road follows the real hills. The co-driver calls each named section as you reach it.

| Round | Rally | Stage | Length | Surface |
|---|---|---|---|---|
| 1 | Rallye Monte-Carlo | Col de Turini, up the hairpins to the 1,604 m col | 15.3 km | Tarmac, snow, ice |
| 2 | Rally Sweden | Bygdsiljum, Västerbotten forest and a frozen mire | 28.5 km | Snow, ice |
| 3 | Safari Rally Kenya | Hell's Gate, 1,900 m up in the Rift Valley | 10.7 km | Gravel, fesh-fesh |
| 4 | Croatia Rally | Platak, bumpy tarmac up to the ski area | 17.1 km | Tarmac |
| 5 | Rally Islas Canarias | Artenara, the caldera ridge on Gran Canaria | 15.6 km | Tarmac |
| 6 | Rally de Portugal | Fafe, with the jump at Pedra Sentada | 11.4 km | Gravel |
| 7 | Rally Japan | Isegami's Tunnel, narrow tarmac through cedar forest | 20.3 km | Tarmac |
| 8 | Acropolis Rally | Loutraki, rocky mountain gravel | 13.2 km | Rocky gravel |
| 9 | Rally Estonia | Arula, fast sandy gravel and jumps | 12.9 km | Gravel |
| 10 | Rally Finland | Ouninpohja, blind crests and the Yellow House | 24.1 km | Gravel |
| 11 | Rally del Paraguay | Cantera, red earth in Itapúa | 14.3 km | Gravel |
| 12 | Rally Chile Bío Bío | Rere, pine and eucalyptus plantations | 13.4 km | Gravel |
| 13 | Rally Italia Sardegna | Monte Lerno, granite and cork oaks | 24.7 km | Sandy gravel |
| 14 | Rally Saudi Arabia | Khulays, wadis between black volcanic hills | 11.7 km | Gravel, sand |
| Hillclimb | Pikes Peak | The Race to the Clouds, 156 turns from 9,390 ft to the 14,115 ft summit; tarmac, then gravel above Glen Cove | 20.0 km | Tarmac, gravel |
| Test | Proving Ground | Launch strip, braking zone, slalom, skidpad, kickers and crests at three sizes, snow and ice loops, a chasm and a chicane | 3.8 km | All six |

The stage select groups them as WRC 2026, HILLCLIMB and TEST. Each surface (tarmac, gravel, snow, ice, regolith dust and steel deck) has its own grip and rolling resistance. The HUD altimeter and the engines' power follow the altitude, so the thin air at Hell's Gate and near the Pikes Peak summit costs power.

**Weather and time of day.** Each run can be clear, rain, fog, snow or changing mid-stage, at day, dusk or night (headlights). Rain takes about a third of the grip off tarmac and little off gravel; falling snow turns tarmac and gravel close to packed snow.

**Rules.** Checkpoint gates must be passed in order; missing one sends you back to the last gate with +5 s. On Pikes Peak, cutting from one switchback to the next puts you back where you left the road, with +5 s. Damage builds up from landings and impacts. Best times, splits and a ghost of your best run are kept per stage.

## Cars

Fifteen cars, each built from its real specifications: engine, power and torque curve, gearbox, differentials, weight and weight split, wheelbase and tracks, wheel travel, tyre size, brake discs and dimensions. Where a figure was never published (most Group S prototypes, many gear ratios), it is an estimate and the garage CAR tab says so.

| Car | Real car | Engine | Power | Torque | Weight | Gearbox | Drive |
|---|---|---|---|---|---|---|---|
| MINI | Mini Cooper S, 1964 Monte Carlo winner | 1.07 L I4 (A-series) | 90 hp | 95 N·m | 650 kg | 4-speed, no synchro on first | FWD, open diff |
| RS200 | Ford RS200 (1986), Group B | 1.8 L I4 turbo (Cosworth BDT) | 444 hp | 490 N·m | 1,050 kg | 5-speed synchro | 4WD, three viscous diffs |
| RS 002 | Audi Sport quattro RS 002 (1987), Group S | 2.1 L I5 turbo, mid-mounted | 690 hp | 660 N·m | 1,000 kg | 5-speed synchro | 4WD, Torsen centre |
| SAMARA S | Lada Samara S-proto (1989) | 1.6 L I4 turbo, mid-mounted | 350 hp | 400 N·m | 980 kg | 5-speed dog box | 4WD, viscous centre |
| ECV | Lancia ECV (1986), Group S | 1.8 L I4 twin-turbo (Triflux) | 592 hp | 538 N·m | 930 kg | 5-speed Hewland dog box | 4WD, viscous centre |
| ECV II | Lancia ECV2 (1988) | 1.8 L I4 twin-turbo (Triflux) | 592 hp | 538 N·m | 910 kg | 6-speed dog box | 4WD, viscous centre |
| 222D | Toyota 222D (1985-86), Group S | 2.1 L I4 turbo (503E) | 592 hp | 560 N·m | 950 kg | 5-speed dog box | 4WD, viscous centre |
| KADETT 4X4 | Opel Kadett Rallye 4x4 (1986) | 1.9 L I4 turbo (Zakspeed) | 493 hp | 500 N·m | 1,050 kg | 5-speed Xtrac dog box | 4WD, viscous centre |
| ASTRA 4S | Vauxhall Astra 4S (1986) | 2.4 L I4 | 340 hp | 340 N·m | 960 kg | 5-speed Xtrac dog box | 4WD, viscous centre |
| IBIZA BIMOTOR | SEAT Ibiza Bimotor (1986-87) | Two 1.5 L I4s (System Porsche), one per axle | 280 hp | 310 N·m | 1,080 kg | Two linked 5-speed synchro boxes | 4WD, one engine per axle |
| C3 WRC | Citroën C3 WRC (2017-19) | 1.6 L I4 turbo, 36 mm restrictor | 380 hp | 450 N·m | 1,190 kg | 6-speed Sadev sequential | 4WD, active centre |
| FIESTA WRC | Ford Fiesta WRC (2017-21) | 1.6 L I4 turbo (EcoBoost), 36 mm restrictor | 380 hp | 450 N·m | 1,190 kg | 6-speed Ricardo sequential | 4WD, active centre |
| IMPREZA WRC | Subaru Impreza WRC2008 | 2.0 L flat-4 turbo (EJ20) | 300 hp | 650 N·m | 1,230 kg | 6-speed Prodrive sequential | 4WD, active centre |
| YARIS WRC | Toyota Yaris WRC (2017-21) | 1.6 L I4 turbo, 36 mm restrictor | 380 hp | 450 N·m | 1,190 kg | 6-speed Xtrac sequential | 4WD, active centre |
| POLO R WRC | Volkswagen Polo R WRC (2013-16) | 1.6 L I4 turbo (TSI), 33 mm restrictor | 318 hp | 425 N·m | 1,200 kg | 6-speed Ricardo sequential | 4WD, no centre diff |

Each body is lofted from traces of the real car's side, top and plan views, at its real length, width, height and overhangs, with its own glasshouse, lamps, intakes, splitter, rear wing and wheels. Drag uses the published drag coefficient where one exists; downforce is estimated.

**Gearboxes.** Each box shifts like the real one. The WRC sequentials flat-shift (ignition cut up, auto-blip down, one gear per pull). The dog boxes and synchromesh boxes are H-pattern: the clutch goes down and boost falls away during the change, you can skip gates, and a synchromesh box is slower the more the revs must change. Anti-lag follows the era: none on most Group B and Group S cars, Audi's recirculating system on the RS 002, bang-bang ALS on the WRC cars. Reverse is its own gear.

## Driving model

- **Physics at 120 Hz** with the picture interpolated to the screen's refresh rate.
- **Driveline.** Engine, clutch, gearbox, differentials and all four wheels are solved together every step, so wheelspin, engine braking, clutch slip on launches and a locked axle scrubbing through a hairpin come out of one model. Open, limited-slip, viscous, Torsen, locking and active diffs each pass torque their own way.
- **Tyres.** Pacejka's magic formula on combined slip, shaped per surface; contact patches deflect and wind up over their relaxation length, and grip is load-sensitive.
- **Suspension.** Each wheel is its own mass between a coil-over and a tyre spring. Two-stage dampers, hydraulic bump stops, anti-roll bars and roll and pitch centres shape how the body moves. The HUD can show each corner's travel.
- **Aero.** Drag, side drag and front and rear downforce act on the air each part of the car meets, including each stage's wind; a car nose-up off a jump makes lift.
- **Soft-body crashes** (on by default). The body is a frame of nodes and beams, BeamNG-style: hits crumple the corner that hit, beams bend for good or break, panels tear off, and a bent mount moves its wheel so the car pulls. Off, the car is a rigid body with dents.
- **Driver aids** in SETTINGS: ABS, traction control and STABILITY (FULL, SPORT or OFF). FULL and SPORT also give air control; on OFF the only way to pitch the car in the air is braking or throttle. Brake and throttle are fully separate pedals.
- **Racing line** (FULL, BRAKING or OFF): chevrons that go green, amber or red for your speed, with a board at each braking point. The AI drives the same line.

## Tyres and service

Before each stage the service park sets springs, dampers, anti-roll bars, final drive and tyres. The tyres are seven real WRC compounds: gravel soft and hard, tarmac soft and hard, wet, snow and studded ice. Each has its own grip per surface, relaxation length, loss in the rain and wear. Each stage marks a recommended set-up with ★ (the wet tyre on tarmac in the rain).

## Garage

- **CAR.** The fifteen cars above on a live 3D preview you can spin, with every real figure and its aero package.
- **DRIVER.** Eight real drivers, each sitting in the car with their real co-driver: Henri Toivonen, Michèle Mouton, Ari Vatanen, Walter Röhrl, Stig Blomqvist, Tony Pond, Kalle Rovanperä, and Ivan "Ironman" Stewart, who drives solo. The driver is looks only.
- **LIVERY.** The car's WORKS livery (repainted from period photos) or a paint colour, a pattern, and up to 16 layers of your own stripes, numbers, text and roof colour.

Every build gets a **PI** (performance index, 100 to 999) and a class: D, C, B, A, S1, S2 and X. Six ratings (speed, handling, acceleration, launch, braking and offroad) are measured on the same physics you drive.

**Cockpit view.** The camera can sit in the driver's seat: the crew wear helmets, HANS and harnesses, the driver's arms hold the wheel, and the dash gauges are the car's own.

## Modes

- **PLAY.** Pick a stage, its weather and time of day, and race the clock. Each stage has a leaderboard and ghosts.
- **RALLY.** The fourteen WRC stages back to back. Damage carries over, and between stages you have 30 minutes of service to choose repairs; every minute over costs 10 s.
- **EVENTS:**
  - **Career.** Start in the 1964 Mini with 8,000 in prize money and climb the eras (1960s classics, Group B, Group S, Group A, World Rally Cars, Rally1, Unlimited), buying cars and hiring better co-drivers, who make fewer wrong calls.
  - **Weekly.** A new six-stage championship every Monday for one car class, with set conditions; your first finished run on each round counts.
  - **Hillclimb.** Pikes Peak and the Col de Turini as a time-attack series.
  - **Raid.** Three desert legs north of Jeddah by roadbook only: no racing line, no voice, 40 L of fuel, two spare sets of tyres that wear, and overnight service between legs.
  - **Live.** Race a friend at the same moment over WebRTC; you swap invite and reply codes in any chat, no server.
- **Recce.** Drive a stage at 60 km/h first and mark your own hazard notes; the co-driver makes far fewer mistakes on a stage you have recced.
- **Rivals and ghost codes.** Copy a run's ghost code (a few KB of text) and send it to a friend, who imports it and races your run. A chosen rival's gap shows at every split.
- **Photo mode.** Free camera, field of view, depth of field and a replay scrubber, saved as PNG.

## Settings

Manual gears, ABS, traction control, stability, tilt steering and its sensitivity (phones), soft-body, camera (chase, cockpit, bumper), ghost, racing line, HUD (MINIMAL by default, or FULL), post effects (bloom and SMAA), sound, volume, co-driver voice, driver name, and a controls reference.

## Controls

| | Keyboard | Gamepad | Touch |
|---|---|---|---|
| Throttle / brake | W / S or ↑ / ↓ | RT / LT | GAS / BRAKE |
| Steer (in the air: yaw) | A / D or ← / → | Left stick | Steering pad, or tilt |
| Handbrake | Space | A | HAND BRAKE |
| Gear up / down | E / Q | RB / LB | ▲ / ▼ |
| Reverse (when stopped) | Gear down, or hold S 1 s | LB, or hold LT 1 s | ▼, or hold BRAKE 1 s |
| Reset to checkpoint | R | Back | R |
| Camera | C | Y | CAM |
| Racing line (full / braking / off) | L | | |
| HUD (minimal / full) | H | | |
| Pause | Esc | Start | II |
| Mute / voice / ghost | M / V / G | | ♫ |

Every menu works with the keyboard (arrows, Enter, Esc), the gamepad (d-pad, A, B), mouse or touch, with button prompts for the device in use.

## Saves

Everything is kept in `localStorage`: best times, splits, ghosts, the garage, set-ups, career and settings. When a physics change makes old times unfair, the old leaderboards are archived and start fresh; the garage and set-ups are kept.

## Code layout

`index.html` holds the CSS, the menus and HUD markup, and one module script in numbered, commented sections:

1. Utilities
2. Persistent storage
3. Stage definitions (the traced roads)
4. Renderer and scene setup
5. Sky and environment lighting
6. Track generation
7. Terrain queries
8. Terrain meshes
9. Scenery
10. Vehicle model and physics (including the car bodies)
11. Particles
13. Input
14. Camera
15. Audio
16. HUD and pace notes
17. Game state, race logic and main loop
18. Conditions, crew and cameras (weather, raid fuel and tyres, co-driver, recce, service, photo mode, cockpit dash, livery editor)
19. Events (career, hillclimbs, raids, weekly championship, rivals and live races)

For automation and debugging, `window.RegolithRally` exposes the game's objects, plus:

- `simulate(seconds)` runs the game headlessly.
- `setAutopilot(true)` hands control to the AI driver.
- `loadStage(i, then)` builds a stage and `startRace()` starts it (skipping the service park).
- `startRally()`, `openService()` and `startEvent(...)` drive the other modes.
- `physicsTests()` runs the physics self-test on a flat proving ground (statics, ride, landings, skidpad grip, ABS stops, launch, slopes, collisions, timestep error, airborne momentum) and returns each check with its value, its allowed range and whether it passed.
