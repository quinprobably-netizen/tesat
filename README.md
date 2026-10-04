# Regolith Rally

A point-to-point rally game in a single self-contained HTML file. You drive a rally car against the clock on fourteen real stages, one from each round of the 2026 World Rally Championship, in calendar order. A fifteenth, the Proving Ground, is a test park for trying cars and set-ups. Everything is generated procedurally: terrain, textures, sky, particles and sound.

**Play:** open `index.html` in a modern browser. It loads three.js r186 from jsdelivr and needs no build step or server.

## Stages

| Round | Rally | Stage | Length | Surface |
|---|---|---|---|---|
| 1 | Rallye Monte-Carlo | Col de Turini: La Bollène-Vésubie (690 m) up the hairpins to the 1,604 m col | 13.5 km | Tarmac, snow, ice |
| 2 | Rally Sweden | Bygdsiljum: Västerbotten forest, snowbanks, a frozen mire | 13.9 km | Snow, ice |
| 3 | Safari Rally Kenya | Hell's Gate: Fischer's Tower, Central Tower, the gorge, 1,900 m up | 10.4 km | Rocky gravel, fesh-fesh |
| 4 | Croatia Rally | Platak: bumpy tarmac up through beech and fir to the ski area | 12.5 km | Tarmac |
| 5 | Rally Islas Canarias | Artenara: the Cruz de Tejeda and the caldera ridge, Gran Canaria | 12.2 km | Tarmac |
| 6 | Rally de Portugal | Fafe: eucalyptus, granite and the Fafe jump at Pedra Sentada | 11.2 km | Gravel |
| 7 | Rally Japan | Isegami's Tunnel: very narrow tarmac through the cedar forest | 11.5 km | Tarmac |
| 8 | Acropolis Rally | Loutraki: rough, rocky mountain gravel above the Gulf of Corinth | 11.8 km | Rocky gravel |
| 9 | Rally Estonia | Arula: fast sandy gravel and big jumps near Otepää | 11.8 km | Gravel |
| 10 | Rally Finland | Ouninpohja: blind crests, the Yellow House, Kakaristo | 12.2 km | Gravel |
| 11 | Rally del Paraguay | Cantera: red earth in Itapúa | 13.7 km | Gravel |
| 12 | Rally Chile Bío Bío | Rere: pine and eucalyptus plantations south of Concepción | 11.4 km | Gravel |
| 13 | Rally Italia Sardegna | Monte Lerno: granite, maquis, cork oaks and Micky's Jump | 10.8 km | Sandy gravel |
| 14 | Rally Saudi Arabia | Khulays: open wadis between black volcanic hills north of Jeddah | 11.3 km | Gravel, sand |
| Test | Proving Ground | Every surface on one 3.85 km lap | 3.85 km | All six |

**Scale.** The stages are built 1:1 for real-size cars. Road widths are real (5.6 m on Isegami's Tunnel and Monte Lerno to 10 m in the Saudi desert), hairpins have their real 13 to 16 m radius, and the lengths are real timed distances: the whole stage where it is under 15 km (Cantera's 13.74 km, Khulays' 11.33 km and Fafe's 11.18 km match the real itineraries), otherwise a real-length section of it. Grades are real too, and the mountain climbs rise their real height (914 m up the Turini, 640 m to Platak, 620 m above Loutraki, 480 m on Artenara), with the HUD altimeter and the thin air (Hell's Gate at 1,900 m, the Turini) following them.

Each course is a list of the stage's named landmarks in their real order, each with its own grade and surface; between them a seeded `~` stretch fills in the road's everyday character (its corner radii and angles, straights and how often it crests), and the stretches are scaled so the stage comes out at its real length. Map and elevation services weren't used, so individual corners are representative of each road rather than traced from it. The co-driver calls each landmark as you reach it.

Each surface has a realistic grip and rolling resistance: tarmac 1.05, regolith dust (fesh-fesh and desert sand) 0.74, gravel 0.66, packed snow 0.42 and ice 0.30, with loose surfaces dragging more. Studded tyres add 40% grip on snow and 60% on ice. Every stage runs at Earth gravity (9.81 m/s²).

**Proving Ground** is the test park, a timed lap of a test track in open Finnish-style countryside, for trying a car, a set-up or a driving aid on every surface in the game. From the paddock it runs down a 240 m launch strip into a hard braking zone and a 90° right, through a tarmac slalom and round a 60 m-radius skidpad bend, then onto gravel for three kickers (small, medium and big: lips of 0.7, 1.2 and 1.7 m with longer landings to match) and three crests (1.3, 1.8 and 2.3 m high). After that come a loop on snow and one on ice, a chasm jump over regolith, and a chicane on steel deck plating, before the tarmac finish. Signs mark the skidpad, the kickers, the crest row, the ice rink and the chasm. It has its own leaderboard and ghosts like any stage, but it isn't part of rally mode. Course paths can now size a feature on its own (`J*1.4` is a kicker 40% higher with a longer landing), which is how the test park gets three of each.

**Ground textures** are generated once when the game starts: two tileable detail maps (stones, crack networks, fine grain, mottling, wind ripples, grass, aggregate chips and crust) that the terrain shader reads at several scales and rotations, so no tile repeats visibly. Each surface turns them into its own look and a height for bump lighting: pebbles and dust on regolith, pressure cracks and frost on ice, plates, rivets and scratches on metal decks, loose stones swept out of the wheel tracks on gravel, aggregate, sealed cracks and repair patches on tarmac, and wind-rippled powder glazed in the tyre tracks on snow. Beside an Earth road the ground reads as grass, soil and scree or snow; on Pikes Peak there are also boulder fields, whose rounded, blocky boulders are drawn in the shader at two sizes. Fine detail and bump fade out as they shrink below a few pixels so the ground doesn't shimmer.

**Soft-body crashes** (Settings > SOFT-BODY, on by default): the car's body is a frame of 36 nodes joined by about 360 beams, in the way BeamNG builds its cars, stepped at 1,200 Hz or more (each car gets enough substeps for its stiffest node to stay stable). The node rows are closer together at the nose and tail, which crumple easily, while the cabin and roof form a stiffer, stronger safety cell. The wheels, tyres and powertrain push on the nodes nearest where they act. The nodes, the beams and sample points on the side, nose and tail panels meet the scenery themselves, so a hit lands on the corner that hit and a post can't slip between nodes. The ground pushes along its own slope, so banks and canyon walls push the car sideways. A beam pushed past its yield strain stays bent, and one stretched too far or crushed to half its length fails. Where the frame fails, the bodywork hanging from it tears off and tumbles away. The body mesh follows the bent frame and is re-shaded where it folds. The damage comes from the frame itself: a bent mount moves its wheel and changes its toe (the car pulls) and camber (less grip), and how far the nose and tail were pushed in sets the radiator and exhaust damage. Hitting a post crushes the nose about 7 cm at 36 km/h, 23 cm at 72 km/h and 48 cm at 126 km/h. Turned off, the car is the rigid body with dents. The physics self-tests and garage ratings always use the rigid body.

Hazards:
- **Craters.**
- **Kicker ramps and crests.**
- **Chasm jumps.**
- **Chicanes.** Rows of red and white water-filled barriers reach in from alternating sides of the road, so you have to weave left and right between them. The co-driver calls each one ("chicane left-right") and a chevron board on the end of each row points to the gap. The blocks are loose: hit them and they scatter, costing you speed and some damage.
- **Grip changes.** Surfaces are regolith, ice, metal, gravel, tarmac or snow. The co-driver calls each change ("onto ice").

Rules and scoring:
- Checkpoint gates must be passed in order. Missing one sends you back to the last gate with +5 s.
- On Pikes Peak, cutting across the hillside from one switchback to the next puts you back on the road where you left it, with +5 s.
- Passing a chicane row on its barrier side, through the blocks or round the end, costs +5 s.
- Damage builds up from hard landings and impacts and lowers your top speed until the stage ends.
- Best times, splits and a ghost replay of your best run are stored in `localStorage`.
- When the physics changes enough to make old times unfair (Earth gravity, then the real engines, then the real drivetrains and chassis, then the wheels' own mass, transient tyres and stability control), or the stages are relaid (the new space layouts), saved times are moved to an archive and the boards start fresh. Pikes Peak's times and ghosts were kept when the space stages were relaid, since its road didn't change, and only Dyson Swarm's times were archived when its ice was taken out. Setups and the garage are kept.

Handling:
- Each car is built from its real chassis: wheelbase, front and rear tracks, weight split, wheel travel, tyre size and brake discs. The same numbers place the wheels, set the springs (1.6 Hz on the medium setting, a gravel rally set-up), the brakes, the body's inertia and the collision hull, and size the 3D model.
- The tyres use Pacejka's magic formula on combined slip, with its shape per surface: loose surfaces peak late and keep most of their grip as the tyre ploughs; tarmac, metal and ice peak early and fall away. A spinning or locked tyre has little left for cornering.
- Each tyre's contact patch deflects before it slides, sideways and lengthwise, and winds up over its relaxation length as it rolls: grip builds progressively on turn-in, and a flick loads the car up and lets go a beat later. Standing still, the deflection holds like a spring, so a parked car stays put on a slope (it used to creep downhill) and a braked wheel holds where it stopped.
- Grip is load-sensitive: weight transfer and bumps shift grip less abruptly. The tyres see the car's whole weight transfer: the suspension links carry part of it straight into the tyres (roll and pitch centres 10 cm up), the springs the rest, so the body rolls and dives less than the load moves.
- Countersteer assist gives up to 70% more steering lock when you steer into a slide, so drifts are easy to catch.
- Keyboard steering ramps in more gently at high speed.
- Impacts are rigid-body collisions: a knock on a corner turns the car as much as its mass and inertia say, and never adds energy.

Stability and the air (Settings > STABILITY):
- The stability control works like a real car's ESC: when the car slides further than a keyboard can catch, or yaws faster than the steering asks for, it brakes the front wheel on the side that pulls it straight (through the ABS) and trims the engine. It rests on the handbrake and while you drift on purpose. The ESC light next to TC on the speedo turns amber while it works.
- FULL steps in early, and on ice, where one braked wheel can't do enough, it tops up the rest the way the old arcade assist did. SPORT (the default on keyboard and gamepad) is the brakes alone, and only on a big slide. OFF is the physics alone.
- FULL and SPORT also keep the arcade air control: steer and pitch in the air (W/S), a gentle levelling to the ground, and easing the car back onto four wheels when it teeters on two. On OFF the car keeps its angular momentum in the air, and the only way to pitch it is the real one: braking stops the spinning wheels and drops the nose; the throttle lifts it.

Suspension:
- Each wheel is its own mass (wheel, tyre, hub, brake and half the arms; about 42 kg a corner on the rally cars) between its coil-over and its tyre, which is a spring of its own that stiffens as the sidewall closes on the rim. The wheels hop, hang in the air and can skip off ripples: firm dampers and stiff springs skip more, soft ones keep the tyres down.
- Each corner's coil-over is a linear coil spring and a two-stage damper. Bump and rebound are valved separately, with rebound the firmer side as on a real damper. Each side has a low-speed slope and a softer high-speed blow-off above its knee, so sharp ripples don't launch the body.
- A hydraulic bump stop takes over in the last 6 cm of travel: a rising-rate spring with damping that grows as it engages, so a big landing is soaked up rather than handed back, and a rebound valve that slows it on the way back out. Deep in the stroke the rebound firms up, as a long-travel shock's does past its bypass tubes, so the stroke a big landing packs into the springs comes back out slowly instead of throwing the car back up off its wheels. Past full travel the hard stop is critically damped, and a tyre crushed past its working range folds its sidewall, which soaks up energy rather than storing it. A 1 m flat drop uses 90% of the travel, a 2 m one rebounds about 1 cm, and a 3 m landing on one rear corner first stays on four wheels instead of bouncing up onto two. A tyre can push at most 60 g of the car's weight, and one that meets a step in the ground faster than any landing could squash it (coming up short at a chasm and catching the far edge) crushes instead of springing back, then climbs up the step as it rolls, so the car isn't thrown into the air.
- Each corner's coil-over is solved together with the wheel below it and the corner of the body above it (its effective mass there, counting how easily the push pitches and rolls the car). The stiff damping of the bump and hard stops therefore can't overshoot the body from step to step; it used to make the corner loads chatter after a big landing and kick the car about.
- Anti-roll bars link the left and right wheels on each axle, so the body rolls less in corners. Soft bars roll about half as much again as stiff ones but let each wheel follow rough ground on its own; with stiff bars a bump under one wheel lifts the other, so the car skips on rough ground, but it stays flat and quick to change direction. The front and rear bars are matched; the differentials set the balance on the limit. The bars are modelled under the car and twist as it rolls.
- The HUD shows each corner's travel: amber on the bump stop, red when bottomed out. The shocks are modelled on the car and move with the wheels, the hubs ride where the wheels' own mass has them, and the tyres squash against the ground by their real deflection. The real cars' tyres disappear up into wheel wells the models don't have, so a wheel is never drawn higher than its arch: on a big landing it stops just below the bodywork (measured from each car's own shell) and the tyre squashes the rest, instead of punching through the bonnet.

Racing line:
- Every stage has a racing line: the smoothest path through the road's usable width, clear of craters and corner boulders, weaving through the chicane rows, with its own speed at every point.
- Chevrons along the line show what the car needs to do from its current speed: green to keep going, amber to lift, red to brake now. A red board across the line marks each braking point, shown when you're fast enough to need it.
- Set it to FULL, BRAKING (only the lift and brake zones) or OFF in SETTINGS, or press L. The AI drives the same line.

Brakes:
- Brake pressure is progressive. The gamepad trigger is analogue, and on keyboard or touch the pedal builds from 15% to full over about 0.4 s of holding, so a tap only scrubs speed.
- Brake force is split by each car's weight on the front axle under braking (from its real weight split, centre of mass height and wheelbase): about 60/40 for the mid-engined cars, more to the front for the FIVE-POT and the PRERUNNER.
- Brakes that hold a wheel hold it where it stopped, so the handbrake keeps a car on a 15% grade, even on ice.
- With ABS on (the default), the wheels stop just short of locking and you can still steer. With ABS off, anything past about 80% pressure locks the wheels: the tyres slide, the car takes longer to stop and it won't turn. Switch ABS off in SETTINGS. The AI always brakes with ABS.
- The brake bar under the rev bar shows pressure. It turns amber while ABS is working and white when a wheel locks.

Engines and drivetrains:
- Each car has the engine, gearbox, differentials and weight of the Group B works car it is modelled on (plus 120 kg for crew and fuel), from period homologation data, factory figures and road tests. Turbo engines have lag: boost builds as the revs rise and bleeds away when you lift, and anti-lag pops flames from the tailpipes on flat-out upshifts. There is no boost button.

| Car | Engine | Power | Torque | Weight | Gearbox (overall top) | Drivetrain |
|---|---|---|---|---|---|---|
| TWINCHARGER (Delta S4) | 1.8 L I4, supercharger + turbo | 473 hp @ 8,400 | 490 N·m @ 5,000 | 950 kg | 5-speed Hewland, 2.54 to 0.84, final 5.55 | 4WD 30/70, viscous centre, limited-slip front and rear |
| FIVE-POT (Sport quattro S1 E2) | 2.1 L I5 turbo | 469 hp @ 7,500 | 480 N·m @ 5,500 | 1,090 kg | 5-speed, 3.11 to 0.96, final 4.57 | 4WD 50/50, Torsen centre, limited-slip front and rear |
| T16 (205 T16 E2) | 1.8 L I4 turbo | 460 hp @ 7,600 | 490 N·m @ 5,500 | 950 kg | 1986 6-speed, 2.53 to 0.81, final 5.94 | 4WD 34/66, viscous centre, limited-slip front and rear |
| STRADALE (037 Evo 2) | 2.1 L I4 supercharged (Evo tune) | 385 hp @ 8,000 | 400 N·m @ 5,500 | 960 kg | 5-speed ZF, 2.31 to 1.00, final 5.25 | 4WD 35/65 conversion, viscous centre, open front, limited-slip rear |
| RS WEDGE (RS200) | 1.8 L I4 turbo (Cosworth BDT) | 444 hp @ 8,000 | 489 N·m @ 5,500 | 1,050 kg | 5-speed FF, 3.09 to 1.14, final 4.57 | 4WD 37/63, three viscous diffs |
| SIX-R (Metro 6R4) | 3.0 L V6, twin-turbo (V64V) | 480 hp @ 8,000 | 450 N·m @ 6,000 | 1,040 kg | 5-speed, 2.94 to 1.09, final 4.67 | 4WD 35/65, viscous centre, limited-slip front and rear |
| PRERUNNER (first-gen Tacoma) | 3.4 L V6, twin-screw supercharged (built 5VZ-FE) | 515 hp @ 6,800 | 600 N·m @ 4,500 | 1,200 kg | R150F 5-speed, 3.83 to 0.84, TRD 4.10 axle | 4WD locked in 4H, open front, locking rear |
| GR YARIS (Rally1, 2025-26) | 1.6 L turbo, 35 mm restrictor, hybrid removed | 375 hp @ 6,000 | 450 N·m @ 4,500 | 1,180 kg | 5-speed sequential | 4WD, axles locked together, plated front and rear diffs |
| I20 N (Rally1, 2025-26) | 1.6 L turbo, 35 mm restrictor, hybrid removed | 375 hp @ 6,000 | 450 N·m @ 4,500 | 1,180 kg | 5-speed sequential | 4WD, axles locked together, plated front and rear diffs |
| PUMA (Rally1, 2025-26) | 1.6 L EcoBoost turbo, hybrid removed | 375 hp @ 6,500 | 400 N·m @ 4,500 | 1,180 kg | 5-speed sequential | 4WD, axles locked together, plated front and rear diffs |
| FOCUS WRC (RS WRC 06) | 2.0 L Duratec turbo | 300 hp @ 6,000 | 550 N·m @ 4,000 | 1,230 kg | 5-speed M-Sport/Ricardo sequential | 4WD 50/50, active centre differential (modelled as viscous), plated front and rear |
| MINI (Cooper S, 1964) | 1.07 L A-series | 90 hp @ 7,000 | 95 N·m @ 5,000 | 650 kg | 4-speed close-ratio, final 4.13 | Front-wheel drive, open differential |

The Rally1 cars' power, torque (the Hyundai's ~450 N·m, the Puma's 400 N·m), weights and dimensions are published figures; their gear ratios and torque curves are not, so those are estimates. The 2025-26 Rally1 rules removed the hybrid unit and cut the minimum weight to 1,180 kg. The Focus RS WRC 06 figures (300 bhp, 550 N·m, 1,230 kg, 4.362 × 1.8 m, 2.64 m wheelbase) are M-Sport's. The Mini is a 1964 Monte Carlo Cooper S with its tiny ten-inch wheels. The Group S prototypes never raced and little was published: the ECV's 600 CV and 538 N·m and the 222D's MR2 wheelbase are real figures, while their weights, gear ratios, torque curves and aero, and nearly everything about the one-off Audi RS002 (size, weight, its claimed ~700 PS), are estimates. Their paint, like the Impreza's, Xsara's, C4's and MINI JCW's, is a custom livery in the maker's own colours rather than a real one. The Impreza WRC2008, Xsara WRC, C4 WRC and Delta Integrale use their published power, torque, weight and dimensions; their gear ratios, tracks and aero are estimates.

**Liveries.** Each car's default paint is WORKS, the best-known livery from its rally era, painted over the whole body from one texture so the stripes run across panels: Martini Lancia (Delta S4), HB Audi (S1 E2), Peugeot Talbot Sport (205 T16), Martini Lancia (037), Ford Motorsport (RS200), Computervision Austin Rover (6R4), Toyota TRD red, orange and yellow (the Tacoma), Toyota Gazoo Racing (GR Yaris), Hyundai Shell Mobis (i20 N), M-Sport purple (Puma), BP Ford (Focus) and the red-with-white-roof Monte Carlo winner (Mini). They are stylised low-poly versions, not exact reproductions. The ordinary paint colours and decals are still there.

The chassis figures are real too: lengths, widths, heights, wheelbases and tracks (the S4 is 3.99 m long on a 2.44 m wheelbase, the S1 4.24 m on 2.22 m, the 205 T16 3.83 m on 2.54 m), weight splits where published (S4 43/57, S1 52/48, RS200 50/50), the S4's 250 mm of wheel travel, brake discs and tyre sizes. Drag areas use the published drag coefficients (S1 0.42, 205 T16 0.35, RS200 0.40, 6R4 0.50) times the frontal area from the real width and height. No centre of mass heights are published for any of these cars, so those are estimates; the garage CAR tab shows every figure. Sources: homologation data as transcribed by tech-racingcars, the Motor Sport archive, Peugeot's own T16 gearbox manual, Audi's official S1 E2 figures, Toyota's Tacoma brochures and period road tests (Autocar).

Three cars keep engines built past their real specs so every car stays in A class (A 707 to A 773). The STRADALE gets a bigger supercharger (the real Evo 2 made 325 CV) and a four-wheel-drive conversion the real 037 never had. The SIX-R gets the twin-turbo version of its V64V (the rally car made 410 bhp without turbos), the engine family that later went into the Jaguar XJ220.

The PRERUNNER is the odd one out: a rally-built first-gen Toyota Tacoma pickup rather than a Group B car. Its gearbox, axle, locker, tyres and wheelbase are the real truck's; its engine is the Tacoma's own 3.4 L V6 (190 hp stock), built and supercharged to a figure chosen so the heavier, draggier truck rates in the same class as the Group B cars, in a stripped truck with composite panels (1,472 kg stock) and long-travel arms that widen its tracks.

- The engine, clutch, gearbox, differentials and all four wheels are solved together, implicitly, every step: the engine has its own inertia and speed, the clutch slips on a standing start and while shifting, each differential holds or slips against the torque it can carry, and each wheel spins up or slows down against its tyre. So wheelspin, engine braking, a locked rear axle scrubbing in a hairpin and the revs flaring when a tyre lets go all come out of the same model.
- The differentials split that torque between the axles and wheels. An open diff gives both wheels only what the weaker one can take; limited-slip, viscous and locking diffs pass progressively more to the wheel with grip. Torque a tyre can't take spins it up and costs it cornering grip, so a car with less drive at the front steps its tail out under power, and the four-wheel-drive cars slide all four.
- TRACTION CONTROL (on by default, in SETTINGS) trims the engine to what the drivetrain can put down, so nothing spins. The TC light on the speedo turns amber while it works. The AI always drives with it.
- Target times are set by the TWINCHARGER, so other cars can be quicker or slower on a stage.

Transmission:
- Each car has its real gearbox: its own number of gears, ratios and final drive, so top speed and the gaps between gears differ from car to car (the T16 has six speeds, the rest five). A rev limiter cuts in at each engine's redline, upshifts cut the ignition for a moment and downshifts blip the throttle. The automatic shifts up where the next gear pulls harder. Hold the brake at a standstill to engage reverse.
- Lifting off gives engine braking, which is stronger in low gears.
- Manual gears are the default on keyboard and gamepad. Shift with E/Q or the controller bumpers (RB up, LB down); the rev bar flashes when it's time to shift up, and a downshift that would over-rev the engine is refused. Touch devices default to automatic, and the MANUAL GEARS switch in SETTINGS changes between the two. The AI always uses the automatic.

## Menus

- **Home.** PLAY (stage select), RALLY, GARAGE and SETTINGS, with your current pilot, car, PI and ratings beside them.
- **Stage select.** The thirteen stages are listed on the left, each with its best time and medal. The chosen stage is shown on the right with a picture, its corner count, length, surface, checkpoints and target time, and two tabs: LEADERBOARD, and CODES & GHOSTS for stage codes, seeds and ghost codes.
- **Settings.** Every switch in one place, reachable from the home screen, the stage select (⚙) and the pause menu: manual gears, ABS and traction control, bumper cam, ghost and racing line, sound and co-driver voice, your driver name, and a controls reference for keyboard, gamepad and touch.
- **Pause.** Resume, restart, settings or quit to the stage select.

All menus work with the keyboard (arrow keys, Enter, Esc) and the gamepad (d-pad, A, B) as well as by mouse or touch.

On phones the game fits both portrait and landscape. In a race the speedometer sits small in the top corner, the timer, best time and (on Pikes Peak) altitude stay clear of the pace notes, and pace notes wrap instead of running off the screen. In landscape the menus shrink their headings and the garage list scrolls as one with its tabs pinned, so long car specs never squeeze the choices. Keyboard hints are hidden on touch, and the controls reference shows only the gamepad and touch columns. Notches and rounded corners are respected.

## Garage

In the **garage** you build your ride Mario Kart style, with a live 3D preview that you can drag to spin:

| Part | Options |
|---|---|
| Pilot | NOVA (astronaut, medium), ZIX (alien, light), BOLT-9 (robot, heavy), MISO (cat, light), GRAVL (rock golem, heavy), PIP (drone, feather), KOI (goldfish, light), VEGA (rally ace, medium) |
| Car | Group B inspired: TWINCHARGER (Lancia Delta S4), FIVE-POT (Audi Sport quattro S1 E2), T16 (Peugeot 205 T16), STRADALE (Lancia 037), RS WEDGE (Ford RS200), SIX-R (MG Metro 6R4), plus the PRERUNNER rally pickup (first-gen Toyota Tacoma), three 2025-26 Rally1 cars (GR YARIS, I20 N, PUMA), the Ford Focus RS WRC 06, the 1964 Mini Cooper S, three Group S prototypes from the class meant to replace Group B before it was cancelled in 1986 (Toyota 222D, Audi RS002, Lancia ECV), the Subaru Impreza WRC2008 hatch, the Citroën Xsara WRC and C4 WRC, the 1992 Lancia Delta HF Integrale Evoluzione, and the MINI JCW, a fictional unrestricted tune of the 2011 MINI John Cooper Works WRC. Each comes with its real engine and drivetrain, shown under the CAR tab along with its aero package. |
| Paint | 12 colours, including metallic chrome and copper |
| Decal | CLEAN, STRIPES, FLAMES, CHECKER, BOLT, STARS |
| Glow | Underglow in 5 colours, or off |

Each body is modelled on the real car in metres: its real length, width, height, wheelbase and overhangs, a smooth body lofted from cross-sections with the wheel arches cut around the real tyres, and its own glasshouse, pillars, lamps, grille, intakes, vents, mirrors and aero parts. Each body is a few thousand triangles, light enough for phones.

Each car is drawn on its own rally wheels: multi-spoke or five-spoke rims, with a brake disc and caliper behind the spokes. The discs glow orange after hard braking and cool off again. The coil-overs, anti-roll bars and tailpipes are modelled too, and the tailpipes spit flame on anti-lag pops.

Every car carries its own full aero package, modelled on the car: splitters, dive planes, side skirts, wings and spoilers, gurney flaps, end fins and diffuser strakes. There is no wing to swap. Each package sets the car's drag, side drag (more drag when sliding sideways), and front and rear downforce:

| Car | Aero | Drag | Downforce (front share) |
|---|---|---|---|
| TWINCHARGER | Front splitter, hatch spoiler with a gurney flap, side skirts, roof intake, rear diffuser | 0.88 m² | 0.47 m² (32%) |
| FIVE-POT | Shovel-nose splitter with dive planes, huge tail wing on endplates, roof-edge spoiler, rear diffuser | 0.98 m² | 0.82 m² (44%) |
| T16 | Chin splitter, Evolution 2 rear wing on tall endplates, rear-brake cooling scoops | 0.76 m² | 0.51 m² (25%) |
| STRADALE | Deep chin splitter, rear wing on endplates, rear diffuser | 0.71 m² | 0.45 m² (33%) |
| RS WEDGE | Chin splitter with dive planes, roof-top intake, roof-height rear wing with a gurney lip, rear diffuser | 0.78 m² | 0.62 m² (32%) |
| SIX-R | Full-width front air dam, roof-height rear wing on stanchions, side skirts, rear diffuser | 1.20 m² | 0.60 m² (40%) |
| PRERUNNER | Steel bumper with a skid plate and splitter lip, roof light bar; no wing, like the real desert trucks | 1.30 m² | 0.08 m² (75%) |
| GR YARIS | Rally1 package: deep splitter with dive planes, louvred front arches, side skirts, swan-neck rear wing, diffuser | 1.00 m² | 0.66 m² (39%) |
| I20 N | Rally1 package with the rear wing carried off the roof | 0.99 m² | 0.66 m² (38%) |
| PUMA | Rally1 package over the crossover shell's sloping tailgate | 1.05 m² | 0.65 m² (38%) |
| FOCUS WRC | Front splitter with dive planes, side skirts, big tailgate wing, diffuser | 0.86 m² | 0.54 m² (33%) |
| MINI | None: an upright 1959 box (Cd about 0.48), which lifts at speed, mostly at the nose | 0.78 m² | lift 0.18 m² (67%) |

The car sets the physics, on its own real tyres; the pilot is looks only and has no effect on performance. Each car's aero package is fixed and works on the air at each part of the car (its speed and spin through the air, less the wind):

- Drag pushes back head-on and much harder side-on, so a slide scrubs speed and makes a side force. A rear wing's endplates move that side force behind the centre of mass, so a winged car weathervanes into the airflow at speed.
- Downforce presses each axle's tyres harder as speed rises (none in reverse). It shifts forward as the nose dives under braking, the underbody's share grows as the car sits lower and stalls near the bump stops, and it changes with the angle the air meets the car: a car falling or pitching loses downforce as it goes, which damps it, and a car nose-up off a jump makes lift.
- Each stage has its own steady wind, gusting along the road the same way every run. The ratings are measured in still sea-level air.

Every build gets a **PI** (performance index, 100 to 999) and a class: D, C (501+), B (601+), A (701+), S1 (801+), S2 (901+) and X (999). Six ratings out of 10 make up the PI: speed, handling, acceleration, launch, braking and offroad. They are measured on the physics you drive, on a flat proving ground: a full-throttle launch on tarmac (where the real cars' figures were measured) for 0-100 and 0-160 km/h, skidpads on gravel for cornering, an ABS stop from 100 km/h on gravel for braking, where the pull meets drag for top speed, and loose-surface grip for offroad. Every tile shows the PI the build would have with that part, and hovering one previews the rating changes. The service park shows the PI with the chosen setup. The Group B cars and the PRERUNNER rate in A class: TWINCHARGER A 759, FIVE-POT A 710, T16 A 746, STRADALE A 712, RS WEDGE A 728, SIX-R A 730 and PRERUNNER A 724. The restricted Rally1 cars and the Focus rate B (GR YARIS 672, I20 N 669, PUMA 654, FOCUS 607) and the Mini D 413, as their real power says. The Group S prototypes rate highest: 222D A 793, ECV A 780 and RS002 S1 801. The Integrale rates B 644, the Impreza B 639, the Xsara C 600 and the C4 C 599. The MINI JCW rates S1 827.

## Modes and sharing

- **Stage codes.** Every stage has a code such as `RR-I-4471` (template letter L/I/W/M/E/F/B/D + seed; a code generates a random stage from that template rather than its designed course). Type a code or a bare seed under CODES & GHOSTS on the stage select, or press RANDOM SEED, to generate a new stage from that template. Copy the code to send a friend the exact same stage. The Earth stages (`RR-P-1916` Pikes Peak, `RR-C-1911` Turini, `RR-S-1950` Vargåsen, `RR-J-1951` Ouninpohja, `RR-T-1956` Sorba) always build the real road, whatever the seed, and the test park (`RR-Z-2026`) always builds its one layout.
- **Service park.** Before each stage, pick springs (soft/medium/stiff), dampers (soft/medium/firm), anti-roll bars (soft/medium/stiff), final drive (short/standard/long) and tyres (all-terrain/studded/slick). Each stage marks a recommended setup with ★, and your choice is remembered per stage type.
- **Rally mode.** Runs all thirteen stages back to back (not the test park). Damage carries over. Between stages the crew repairs 40% for free, and a full repair costs time. Your best rally total is saved.
- **Ghost codes and leaderboards.** Each stage keeps a local leaderboard of your runs plus imported ghosts. Use COPY THIS RUN'S GHOST CODE on the finish screen (or COPY MY BEST GHOST under CODES & GHOSTS) to get a few-KB text code. A friend pastes it into IMPORT A GHOST CODE: the right stage is generated and they race your run as a magenta rival ghost. RACE/RACING on the leaderboard picks which imported ghost to race.

## Controls

| | Keyboard | Gamepad | Touch |
|---|---|---|---|
| Throttle / brake & reverse | W / S or ↑ / ↓ | RT / LT | GAS / BRAKE |
| Steer (in the air on SPORT/FULL stability: yaw; W/S pitch) | A / D or ← / → | Left stick / d-pad ← → | Steering pad |
| Handbrake | Space | A | HAND BRAKE |
| Gear up / down (manual gears) | E / Q | RB / LB | ▲ / ▼ |
| Reset to last checkpoint | R | Back | R |
| Camera (chase / bumper) | C | Y | CAM |
| Pause (Esc also closes dialogs) | Esc | Start | II |
| Confirm / next (menus, service park) | Enter | A | buttons |
| Menu / garage navigation | Arrow keys | D-pad | tap |
| Mute / co-driver voice / ghost | M / V / G | | ♫ |
| Racing line (full / braking / off) | L | | |

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
- `physicsTests()` runs the physics self-test on a flat proving ground and returns each check with its value, the range it should fall in and whether it passed: statics, ride, landings (including one on a single rear corner, checked for chatter and for bouncing up onto two wheels), weight transfer and grip on a skidpad, ABS stops, a launch, holding on slopes, collision energy, timestep error, angular momentum in the air and rough-road contact. `PhysicsRig` is the proving ground itself, which the garage ratings and the AI's grip calibration also use.
