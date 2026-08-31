# Zorgax Build — EVA IONI v1

**Status:** BUILD PLAN / NO PURCHASE / NO AUTONOMOUS PHYSICAL ACTUATION  
**Generated from:** MyZubster `ZORGAX-001 / build-and-source-v1`  
**Human project steward:** Daniel Ioni (`DanielIoni-creator`)

## Goal

Build EVA IONI as a modular environmental robotics platform for telemetry, soil/environment sensing, bounded irrigation control and reproducible evidence collection.

## Zorgax v1 architecture

```text
environment + soil sensors
          ↓
      controller
          ↓
telemetry / provenance

controller → motor driver → mobile base + encoders
controller → fail-safe irrigation interface → low-voltage valve/pump

protected battery → fuse → E-stop → actuators
protected battery → DC-DC → controller + sensors
```

## Candidate component classes

1. ESP32-S3-class controller with I2C/UART/GPIO and watchdog support.
2. Dual motor driver sized above continuous/stall current.
3. 12 V geared motors with encoders.
4. Environmental sensor set (temperature/humidity/pressure class).
5. Capacitive/protected soil moisture sensor.
6. Opto-isolated relay/MOSFET irrigation interface with flyback protection.
7. Protected 12 V battery pack with BMS.
8. Protected 12 V → 5 V DC-DC regulator.
9. Physical emergency-stop path independent from software.
10. Outdoor-capable mobile chassis.
11. Fused wiring and appropriately rated connectors.

These are **component classes, not an approved final BOM**. Exact products, voltages, currents, dimensions, ingress protection and certifications must be verified before procurement.

## Build sequence

1. Freeze v1 requirements: mass, runtime, terrain, sensor set, telemetry frequency and irrigation limits.
2. Validate data schema, telemetry, provenance, watchdog, communication timeout and fail-safe state in simulation.
3. Bench-test controller + sensors + logging with no actuators attached.
4. Validate power distribution, fuse, DC-DC and E-stop using controlled loads/current limiting.
5. Integrate mobile base one subsystem/motor at a time in a closed test area.
6. Validate irrigation interface against a test load before a real pump/valve.
7. Test manual override, E-stop, communications loss, sensor failure and safe restart.
8. Only after human review, authorize a bounded physical test with full logging and predefined stop criteria.

## Safety gates

- E-stop must interrupt actuator power independently from software.
- Irrigation output defaults to OFF/fail-safe.
- No autonomous physical actuation before human review.
- No purchase/payment is performed by Zorgax.
- Protected battery pack/BMS and fused power distribution are required.
- Sensor values must be calibrated before they can support environmental claims or automatic decisions.
- Telemetry and results must preserve provenance and reproducibility.

## Evidence links

- MyZubster Zorgax Build endpoint: `https://www.myzubster.com/api/zorgax/build/status`
- Build task: https://github.com/MyZubster-Ecosystem/EVA-IONI/issues/5
- Canonical Daniel Ioni ↔ EVA IONI relationship: https://github.com/MyZubster-Ecosystem/myzubster/blob/main/docs/identity/DANIEL-IONI-EVA-IONI-RELATIONSHIP.md

## Boundary

Zorgax is the planner/sourcing/evidence layer. It does not gain autonomous legal, financial, credential or physical-control authority. Consequential actions remain human-governed.
