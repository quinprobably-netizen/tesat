# Regolith Rally

A point-to-point rally game in a single self-contained HTML file. You drive a Group B-inspired rally car against the clock across thirteen stages: eight in space (the Moon, a planetary ring, a derelict station field, a Martian canyon, the ice of Europa, an orbital smelter over Io, a moon of the black hole Cygnus X-1 and a Dyson swarm around Tabby's Star) and five real roads on Earth: the Pikes Peak hill climb, the Col de Turini (Monte-Carlo), Vargåsen (Rally Sweden), Ouninpohja (Rally Finland) and the Col de Sorba (Tour de Corse). Everything is generated procedurally: terrain, textures, sky, particles and sound.

**Play:** open `index.html` in a modern browser. It loads three.js r128 from cdnjs and needs no build step or server.

## Stages

Every stage is laid out from a course: a list of named sections, each a string of straights, corners (radius and heading), crests, kickers, chasms, chicane straights and surface changes, with its own grade. The space stages' courses are designed to roam across their worlds, past landmarks such as a crater rim the road wraps around or a canyon whose walls rise either side of the road. The five Earth stages follow their real roads' named sections in order. The co-driver calls each section by name as you reach it. Every stage runs at Earth gravity (9.81 m/s²), wherever it is set.

The stages are sized for real-size cars: the space roads are 12 to 16 m wide (wide by Earth standards, so there is room to slide) and the Earth roads 8.4 to 9.2 m. Each surface has a realistic grip and rolling resistance: tarmac 1.05, regolith dust 0.74, metal deck plating 0.72, gravel 0.66, packed snow 0.42 and ice 0.30, with loose surfaces dragging more. Studded tyres add 40% grip on snow. Chicane rows leave a wider gap, and the jumps and crests are checked against the real cars' 22 to 32 cm of wheel travel.

| Stage | Character |
|---|---|
| Lunar Dust Run | Wide and forgiving regolith roads from Tranquility Base, along Hadley Rille, round a crater rim and over the Apennine crests |
| Ice Ring Traverse | Slippery ice causeway on a planetary ring under a gas giant: a shepherd moon, the Encke Gap and a chicane maze in the spokes |
| Wreckage Belt | Tight metal-plated corners through a derelict station: docking bay, hull breach, spine corridor, reactor loop and the cargo maze |
| Red Canyon Sprint | Fast gravel along rust-red Martian mesas, then down onto a canyon floor between sheer walls and back up to the rim |
| Europa Fracture Line | Low-grip ice shelf with cliffs on both sides, under a huge Jupiter: chaos terrain, fracture jumps and long sweepers |
| Foundry Gauntlet | Hairpins on the metal decks of an orbital smelter over Io, a slag bridge jump and crane alley; the hardest space stage |
| Pikes Peak | The Race to the Clouds, cut to 5.6 km timed: see below |
| Col de Turini | The Monte-Carlo's night stage up to the 1,604 m col: tarmac, snow and ice, hairpins and stone walls |
| Vargåsen | Rally Sweden's snow stage through the Värmland forest, snowbanks, a frozen lake and Colin's Crest |
| Ouninpohja | Rally Finland's fastest gravel: blind crests and jumps through pine and birch, past the Yellow House |
| Col de Sorba | Tour de Corse tarmac from Ghisoni up the gorge and through the Corsican pines to the 1,311 m col |
| Event Horizon | A dark moon of Cygnus X-1: ice streams, a crater looped at the photon sphere, hairpins, then flat out to escape velocity |
| Dyson Swarm | Grippy metal decks of a Dyson swarm around Tabby's Star: collector arrays, a mirror field, a jump between statites, corona hairpins |

**Pikes Peak** follows the real hill climb's named sections in order, from the start line through Engineers Corner, Glen Cove and the W's switchbacks to the summit, each with its own grade. The HUD altimeter climbs from the real start's 9,390 ft to the 14,115 ft summit (the game compresses the 1,440 m climb to about 385 m). It is tarmac through the forest and gravel above the treeline after Glen Cove, as when Group B cars raced there (the real road has been paved to the summit since 2011). The look follows the real mountain, which is Pikes Peak granite, coarse and pink-orange, weathering to a reddish gravel called grus: warm grey asphalt with a double yellow centre line, grus shoulders, and a grus and needle-litter floor with grassy clearings under the Engelmann spruce, with aspens low down and gnarled bristlecone pines near the treeline. Above it the tundra is short olive grass with grus showing through, and granite boulder fields spread until they cover nearly everything around Devils Playground, Boulder Park and the summit, with a few snow patches lingering in the hollows. There are no guard rails: the mountain falls away on one side and is cut into on the other. The co-driver calls each section by name. A real road has only one layout, so there is no random seed for this stage.

**Col de Turini** climbs from La Bollène-Vésubie through the chestnut woods and the Forêt de Turini, up the ladder of hairpins (the lacets) to the 1,604 m col, then drops a little way down the north side towards Peïra-Cava, the classic Monte-Carlo stage. The real climb from La Bollène is 15.3 km at 7.2% with 18 hairpins; the game keeps its shape over 4.1 km, with the HUD altimeter running from 690 m to the col. The lower road is dry tarmac with white dashed centre lines; higher up it turns to snow thrown on by spectators and ice in the shade, with ploughed snowbanks. Low stone walls sit on the outside of the tighter hairpins where the ground falls away, and hotels stand at the col.

**Vargåsen** is the Rally Sweden stage near Torsby: packed snow over gravel through snow-laden spruce and pine, between ploughed snowbanks (solid enough to lean the car on, as the real drivers do), past a frozen lake and red wooden houses, with an icy stretch near the end. It finishes over Colin's Crest, named after Colin McRae, where the record is a 45 m jump (Brynildsen, 2016).

**Ouninpohja** is the Rally Finland classic: narrow, fast gravel over blind crests through pine, spruce and birch, past the lakes and the Yellow House jump, down the steps to the Kakaristo junction (where Finnish co-drivers say "it gets faster now") to the Hämepohja finish. The real 33 km stage had 77 take-offs and was won at over 130 km/h average; the game takes its character over 5.2 km.

**Col de Sorba** is the Tour de Corse road from Ghisoni up the Fium'Orbu gorge and through the Corsican pines to the 1,311 m col (the real climb from Ghisoni is 10.1 km at 6.3%), on the island of "10,000 corners": narrow, bumpy tarmac that never stops turning, granite walls on one side and maquis falling away on the other.

The four new real stages were laid out from their roads' named landmarks, lengths, heights and grades as published by the rally organisers and climbing guides (rally histories and stage guides for the Monte-Carlo, Sweden, Finland and Corsica rallies, and cycling climb profiles of the Turini and Sorba). Map and elevation services weren't reachable when they were built, so individual corners are representative of each road rather than traced from it.

**Event Horizon** circles Cygnus X-1, a real black hole of about 21 solar masses that feeds on its blue supergiant companion. The sky draws the hole's shadow ringed by its photon ring, the accretion disk nearly edge-on and brighter on the side spinning towards you, the far side of the disk bent up over the top by gravity, and the stars behind it lensed into an Einstein ring. The blue companion is the sun that lights the stage.

**Dyson Swarm** runs across the decks of a swarm of collectors wrapped around Tabby's Star (KIC 8462852), the real star whose irregular dimming once had astronomers wondering about alien megastructures. Rings of collectors cross the star, seen from behind as dark panels with lit rims and running lights, and through the gaps the far side's inner faces glow in the starlight. Mirror collectors on masts line the road, tilted to the star, and bigger ones hang off in space. The road is deck plating all the way, with a few patches of grit and no ice: on a narrow deck with drops either side, ice made it barely drivable.

**Ground textures** are generated once when the game starts: two tileable detail maps (stones, crack networks, fine grain, mottling, wind ripples, grass, aggregate chips and crust) that the terrain shader reads at several scales and rotations, so no tile repeats visibly. Each surface turns them into its own look and a height for bump lighting: pebbles and dust on regolith, pressure cracks and frost on ice, plates, rivets and scratches on metal decks, loose stones swept out of the wheel tracks on gravel, aggregate, sealed cracks and repair patches on tarmac, and wind-rippled powder glazed in the tyre tracks on snow. Beside an Earth road the ground reads as grass, soil and scree or snow; on Pikes Peak there are also boulder fields, whose rounded, blocky boulders are drawn in the shader at two sizes. Fine detail and bump fade out as they shrink below a few pixels so the ground doesn't shimmer.

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
- When the physics changes enough to make old times unfair (Earth gravity, then the real engines, then the real drivetrains and chassis), or the stages are relaid (the new space layouts), saved times are moved to an archive and the boards start fresh. Pikes Peak's times and ghosts were kept when the space stages were relaid, since its road didn't change, and only Dyson Swarm's times were archived when its ice was taken out. Setups and the garage are kept.

Handling:
- Each car is built from its real chassis: wheelbase, front and rear tracks, weight split, wheel travel, tyre size and brake discs. The same numbers place the wheels, set the springs (1.6 Hz on the medium setting, a gravel rally set-up), the brakes, the body's inertia and the collision hull, and size the 3D model.
- The tyres use Pacejka's magic formula on combined slip, with its shape per surface: loose surfaces peak late and keep most of their grip as the tyre ploughs; tarmac, metal and ice peak early and fall away. A spinning or locked tyre has little left for cornering.
- Grip is load-sensitive: weight transfer and bumps shift grip less abruptly.
- Countersteer assist gives up to 70% more steering lock when you steer into a slide, so drifts are easy to catch.
- At speed, yaw stability bleeds off rotation beyond what your steering asks for. It never adds rotation, and it switches off while you're deliberately drifting or on the handbrake.
- Keyboard steering ramps in more gently at high speed.

Suspension:
- Each corner is a coil-over: a linear coil spring and a two-stage damper. Bump and rebound are valved separately, with rebound the firmer side as on a real damper. Each side has a low-speed slope and a softer high-speed blow-off above its knee, so sharp ripples don't launch the body.
- A progressive urethane bump stop takes over in the last 6 cm of travel before the hard stop.
- Anti-roll bars link the left and right wheels on each axle, so the body rolls less in corners. Soft bars roll about twice as much as stiff ones but let each wheel follow rough ground on its own; stiff bars keep the car flat and quick to change direction, at the cost of skipping over bumps. The front and rear bars are matched; the differentials set the balance on the limit. The bars are modelled under the car and twist as it rolls.
- The HUD shows each corner's travel: amber on the bump stop, red when bottomed out. The shocks are modelled on the car and move with the wheels.

Racing line:
- Every stage has a racing line: the smoothest path through the road's usable width, clear of craters and corner boulders, weaving through the chicane rows, with its own speed at every point.
- Chevrons along the line show what the car needs to do from its current speed: green to keep going, amber to lift, red to brake now. A red board across the line marks each braking point, shown when you're fast enough to need it.
- Set it to FULL, BRAKING (only the lift and brake zones) or OFF in SETTINGS, or press L. The AI drives the same line.

Brakes:
- Brake pressure is progressive. The gamepad trigger is analogue, and on keyboard or touch the pedal builds from 15% to full over about 0.4 s of holding, so a tap only scrubs speed.
- Brake force is split by each car's weight on the front axle under braking (from its real weight split, centre of mass height and wheelbase): about 60/40 for the mid-engined cars, more to the front for the FIVE-POT and the PRERUNNER.
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

The Rally1 cars' power, torque (the Hyundai's ~450 N·m, the Puma's 400 N·m), weights and dimensions are published figures; their gear ratios and torque curves are not, so those are estimates. The 2025-26 Rally1 rules removed the hybrid unit and cut the minimum weight to 1,180 kg. The Focus RS WRC 06 figures (300 bhp, 550 N·m, 1,230 kg, 4.362 × 1.8 m, 2.64 m wheelbase) are M-Sport's. The Mini is a 1964 Monte Carlo Cooper S with its tiny ten-inch wheels.

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
| Car | Group B inspired: TWINCHARGER (Lancia Delta S4), FIVE-POT (Audi Sport quattro S1 E2), T16 (Peugeot 205 T16), STRADALE (Lancia 037), RS WEDGE (Ford RS200), SIX-R (MG Metro 6R4), plus the PRERUNNER rally pickup (first-gen Toyota Tacoma), three 2025-26 Rally1 cars (GR YARIS, I20 N, PUMA), the Ford Focus RS WRC 06 and the 1964 Mini Cooper S. Each comes with its real engine and drivetrain, shown under the CAR tab along with its aero package. |
| Wheels | GRAVEL, MUD-TERRAIN, TARMAC, MAGNESIUM (lightweight rims), SNOW (studded) |
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
| MINI | None: an upright 1959 box (Cd about 0.48) | 0.78 m² | none |

Parts change the car's real physics; the pilot is looks only and has no effect on performance. Wheels change grip on each surface, weight and rolling drag. Each car's aero package is fixed: downforce presses each axle's tyres harder as speed rises, and it shifts with pitch, so the nose gains grip when the car dives under braking.

Every build gets a **PI** (performance index, 100 to 999) and a class: D, C (501+), B (601+), A (701+), S1 (801+), S2 (901+) and X (999). Six ratings out of 10 make up the PI: speed, handling, acceleration, launch, braking and offroad. They are worked out from the build's physics: a full-throttle run on tarmac (where the real cars' figures were measured) with the drivetrain's traction limit for top speed, 0-100 and 0-160 km/h, tyre grip with downforce for cornering and braking, and loose-surface grip for offroad. Every tile shows the PI the build would have with that part, and hovering one previews the rating changes. The service park shows the PI with the chosen setup. The Group B cars and the PRERUNNER rate in A class: TWINCHARGER A 773, FIVE-POT A 713, T16 A 734, STRADALE A 707, RS WEDGE A 718, SIX-R A 718 and PRERUNNER A 735. The restricted Rally1 cars and the Focus rate B (I20 N 670, GR YARIS 671, PUMA 657, FOCUS 601) and the Mini D 418, as their real power says.

## Modes and sharing

- **Stage codes.** Every stage has a code such as `RR-I-4471` (template letter L/I/W/M/E/F/B/D + seed; a code generates a random stage from that template rather than its designed course). Type a code or a bare seed under CODES & GHOSTS on the stage select, or press RANDOM SEED, to generate a new stage from that template. Copy the code to send a friend the exact same stage. The Earth stages (`RR-P-1916` Pikes Peak, `RR-C-1911` Turini, `RR-S-1950` Vargåsen, `RR-J-1951` Ouninpohja, `RR-T-1956` Sorba) always build the real road, whatever the seed.
- **Service park.** Before each stage, pick springs (soft/medium/stiff), dampers (soft/medium/firm), anti-roll bars (soft/medium/stiff), final drive (short/standard/long) and tyres (all-terrain/studded/slick). Each stage marks a recommended setup with ★, and your choice is remembered per stage type.
- **Rally mode.** Runs every stage back to back. Damage carries over. Between stages the crew repairs 40% for free, and a full repair costs time. Your best rally total is saved.
- **Ghost codes and leaderboards.** Each stage keeps a local leaderboard of your runs plus imported ghosts. Use COPY THIS RUN'S GHOST CODE on the finish screen (or COPY MY BEST GHOST under CODES & GHOSTS) to get a few-KB text code. A friend pastes it into IMPORT A GHOST CODE: the right stage is generated and they race your run as a magenta rival ghost. RACE/RACING on the leaderboard picks which imported ghost to race.

## Controls

| | Keyboard | Gamepad | Touch |
|---|---|---|---|
| Throttle / brake & reverse | W / S or ↑ / ↓ | RT / LT | GAS / BRAKE |
| Steer (in the air: yaw; W/S pitch) | A / D or ← / → | Left stick / d-pad ← → | Steering pad |
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
