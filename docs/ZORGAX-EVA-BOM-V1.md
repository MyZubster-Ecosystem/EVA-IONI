# EVA IONI — Zorgax Candidate BOM v1

**Status:** `CANDIDATE BOM / NO PURCHASE AUTHORIZED`  
**Snapshot date:** 31 August 2026  
**Planner:** `ZORGAX-001 / build-and-source-v1 / eva_ioni_robot`  
**Human steward:** Daniel Ioni (`DanielIoni-creator`)

> This is a sourcing and compatibility baseline, not a purchase order and not evidence that hardware has been acquired or assembled. Prices, taxes, stock and shipping can change. Physical actuation remains blocked until bench validation and human safety review.

## Decision states

- `GO-CANDIDATE` — suitable for the v1 architecture on currently verified specifications, but still requires incoming inspection and bench test.
- `VALIDATE` — plausible candidate, but a mechanical/electrical design parameter must be frozen before approval.
- `TBD / NO-GO` — do not purchase yet; requirements are not sufficiently defined.

## Candidate BOM

| Function | Candidate / SKU | Qty | Price snapshot | Compatibility evidence | State |
|---|---|---:|---:|---|---|
| Main controller | Espressif **ESP32-S3-DevKitC-1-N8R8**; Mouser `356-EP32S3DVKTC1N8R8` | 1 | **€12.90** | 8 MB Quad flash, 8 MB Octal PSRAM; Wi‑Fi/BLE; exposed GPIO; suitable 3.3 V logic platform for I2C/UART/PWM integration | `GO-CANDIDATE` |
| Dual motor driver | Cytron **MDD10A**; RobotShop `RB-Cyt-153` | 1 | **€23.86** VAT incl. | 5–30 V motor supply; two brushed DC channels; 10 A continuous / 30 A peak per channel; 3–5.5 V logic compatible. No reverse-polarity protection at Vmotor | `GO-CANDIDATE` |
| Drive motors + encoders | Pololu **#4756 — 131:1 37D 12 V, 64 CPR encoder** | 2 | **US$60.95 ea.**; US$121.90 pair (~€104.83 FX-only at 1 USD≈0.86 EUR) | 12 V, 76 RPM no-load, 5.5 A theoretical stall each, 64 CPR motor-shaft encoder (~8400 CPR output). Driver current envelope is sufficient, but stall must not be treated as normal operating condition | `VALIDATE` |
| Motor brackets | Pololu **#1084 37D bracket pair**; RobotShop `RB-Pol-03` | 1 pair | **€13.14** VAT incl. | Intended for Pololu 37D gearmotors | `GO-CANDIDATE` |
| Environmental sensor | Adafruit **BME280 #2652 / ADA2652** | 1 | **€19.90** snapshot | Temperature + humidity + pressure; I2C/SPI. Vendor availability differs across locale pages, so re-check stock at procurement | `GO-CANDIDATE` |
| Soil moisture | DFRobot **SEN0308**; RobotShop `RB-Dfr-890` | 1 | **€16.40** VAT incl. | 3.3–5.5 V; analog output 0–3 V; waterproof/corrosion-resistant construction. Must be calibrated for the actual soil | `GO-CANDIDATE` |
| Irrigation power interface | DFRobot **DFR0457 Gravity MOSFET Power Controller**; RobotShop `RB-Dfr-731` | 1 | **€4.30** VAT incl. | 5–36 V load side; 3.3–10 V logic; high-current switching. Inductive loads require a flyback/freewheel diode; output must default OFF and remain human-authorized | `GO-CANDIDATE` |
| Logic DC-DC | Pololu **D24V50F5 #2851**; TME `POLOLU-2851` | 1 | **~€39.00–39.71 gross** | 6–38 V input, 5 V output, up to 5 A class; suitable for 12.8 V battery rail to 5 V electronics | `GO-CANDIDATE` |
| Physical E-stop | Schneider Harmony **XB4BS8445** | 1 | **€42.25** | Ø40 red mushroom, twist release, 1NO+1NC. Use the NC path in the safety-control loop; do not assume the button itself should interrupt full traction current | `GO-CANDIDATE` |
| Safety power relay | Finder Series 65 **653190124300**; RS `282-6700` | 1 | **€14.82 ex VAT** (~€18.08 at 22% VAT) | 12 V DC coil, SPST/1NO, 30 A class. Candidate to remove actuator power under E-stop control; coil suppression/flyback still required | `GO-CANDIDATE` |
| Main battery | LiFePO4 **12.8 V / 20 Ah**, Luciamo `TI0238` | 1 | **€134.90** | Integrated BMS; listed 20 A max continuous discharge and 40 A/5 s peak. Electrically gives headroom above two 5.5 A theoretical motor stalls plus electronics; mechanical mass/fit remains unresolved | `VALIDATE` |
| Main fuse reference | Littelfuse **0ATO015.V**, 15 A ATO, 32 VDC | 1 | price to re-check | 15 A is only a candidate starting point. Final rating must follow conductor size, fault-current path, expected motor inrush and nuisance-trip testing | `VALIDATE` |
| Fuse holder | Keystone **3557-15**; Mouser `534-3557-15` | 1 | **€1.22** | 15 A automotive blade holder; compatible with candidate ATO-class protection concept | `GO-CANDIDATE` |
| Chassis / base plate | **Not frozen** | 1 | — | Must accommodate two 37D motors, brackets, wheels/hubs, battery mass, E-stop access, weather protection and acceptable centre of gravity | `TBD / NO-GO` |
| Wheels / hubs | **Not frozen** | 2+ | — | Diameter and hub interface depend on target speed, terrain, ground clearance and chassis geometry | `TBD / NO-GO` |
| Irrigation valve / pump | **Not frozen** | 0–1 | — | Pressure, flow, medium, tubing and duty cycle are not yet defined. Do not select a real actuator from voltage alone | `TBD / NO-GO` |
| LiFePO4 charger | **Not frozen** | 1 | — | The selected battery source recommends a substantially lower charging current than some generic 10–20 A chargers found online. Freeze an exact battery/charger pair first | `TBD / NO-GO` |
| Harness / wire gauge / connectors | **Not frozen** | set | — | Final conductor gauge, connector current rating, grounding and fuse placement depend on chassis routing and measured current | `TBD / NO-GO` |

## Cost snapshot

Euro-priced core candidates excluding motors, fuse, chassis, wheels/hubs, hydraulic actuator, charger, harness and shipping total approximately **€325.95** using the stated snapshots and an estimated 22% VAT on the RS relay line.

The two Pololu #4756 motors add **US$121.90** at the manufacturer list price (about **€104.83 FX-only** at the 31 Aug snapshot rate). This conversion is **not** an EU landed price: VAT/import/shipping or distributor pricing can change it.

Therefore the currently identifiable hardware reference is roughly **€430.78 equivalent before unresolved items, shipping and any import/tax differences**. It must not be represented as a final procurement budget.

## Compatibility notes and open gates

1. **Motor-current chain:** two #4756 motors have a theoretical combined stall current of about 11 A at 12 V. MDD10A has sufficient channel headroom on paper, but actual inrush, wiring temperature, battery behavior and fuse nuisance-trip behavior must be measured.
2. **Battery:** the 20 Ah LiFePO4 candidate is electrically conservative but may be mechanically excessive. Freeze total mass, autonomy target and chassis envelope before approval.
3. **E-stop:** the safety button should command a hardware power-removal path independent of software. The relay/contact arrangement, contact ratings, coil suppression and fail-safe wiring require bench validation.
4. **Irrigation:** DFR0457 is only the power interface. A valve/pump remains blocked until flow/pressure/medium requirements exist. Add a flyback/freewheel path for inductive loads.
5. **Soil sensing:** SEN0308 needs calibration on the real substrate; raw ADC values are not universal moisture percentages.
6. **Environmental sensing:** the BME280 breakout is a useful baseline environmental sensor, not a certification-grade environmental instrument.
7. **Chassis and wheels:** no exact SKU is approved. Mechanical design must come before purchase because battery mass, wheel diameter and motor mounting determine load and stability.

## Required pre-purchase gate

No purchase should be authorized until these four items are frozen:

- target mass / payload / terrain / speed / autonomy;
- chassis, wheel and motor-mount geometry;
- battery physical envelope and charger pairing;
- irrigation pressure / flow / valve-or-pump requirements.

After those are frozen, run a final `Zorgax → human review → BOM lock` pass and record the approved revision.

## Sources — snapshot references

- Espressif ESP32-S3-DevKitC-1-N8R8 / Mouser: https://www.mouser.it/it/ProductDetail/Espressif-Systems/ESP32-S3-DevKitC-1-N8R8
- Cytron MDD10A / RobotShop EU: https://eu.robotshop.com/products/cytron-10a-5-30v-dual-channel-dc-motor-driver
- Pololu motor #4756: https://www.pololu.com/product/4756
- Pololu bracket #1084 / RobotShop EU: https://eu.robotshop.com/products/pololu-37d-mm-metal-gearmotor-bracket
- Adafruit BME280 / BerryBase: https://www.berrybase.de/it/adafruit-bme280-i2c-oder-spi-temperatur-feuchtigkeits.-druck-sensor
- DFRobot SEN0308 / RobotShop EU: https://eu.robotshop.com/products/dfrobot-gravity-analog-waterproof-capacitive-soil-moisture-sensor
- DFRobot DFR0457 / RobotShop EU: https://eu.robotshop.com/products/gravity-mosfet-power-controller
- DFRobot DFR0457 technical note: https://wiki.dfrobot.com/dfr0457
- Pololu D24V50F5 / TME: https://www.tme.eu/it/katalog/convertitori_113706/p%2Cpololu_959/
- Schneider XB4BS8445: https://www.se.com/it/it/product/XB4BS8445/
- Finder 653190124300 / RS Italy: https://it.rs-online.com/web/b/finder/
- LiFePO4 TI0238: https://www.luciamo.it/batteria-lifepo4-12-8-v-20-ah/
- Littelfuse 0ATO015.V / Mouser: https://www.mouser.it/it/ProductDetail/Littelfuse/0ATO015.V
- Keystone 3557-15 / Mouser: https://www.mouser.it/ProductDetail/Keystone-Electronics/3557-15

## Governance boundary

`ZORGAX PLAN / SOURCE ≠ PURCHASE ≠ ASSEMBLY ≠ SAFETY APPROVAL`

Zorgax may generate plans, sourcing candidates and evidence. Daniel Ioni remains the human project steward. No autonomous payment, procurement, credential use or physical actuation is authorized by this document.
