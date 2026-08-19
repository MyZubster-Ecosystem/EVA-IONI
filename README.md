# EVA IONI

> 🌍 **Understand MyZubster in your language:** [Global multilingual guide](https://github.com/MyZubster-Ecosystem/myzubster/blob/main/docs/i18n/README.md) — English, Italiano, Español, Français, Deutsch, Português, 中文, 日本語, 한국어, العربية, हिन्दी, Русский, Türkçe, Bahasa Indonesia, Polski, Українська, বাংলা, اردو, فارسی, Kiswahili.
>
> MyZubster connects real-world observations, verifiable evidence, collaborative bounties and platform rewards. **MYZ is currently an internal reward/accounting ledger; external XMR/token/blockchain settlement is separate and independently verified.**

Open-source robotics and urban-garden experimentation track in the MyZubster ecosystem.

## Status

**Experimental / prototype.** EVA IONI combines software interfaces, environmental/irrigation concepts, robotics and telemetry work. The repository should not be read as proof that every listed sensor, actuator, AI capability or payment rail has been physically deployed and validated.

## Vision

Explore modular, reproducible robotics for gardens and environmental monitoring while keeping physical safety, privacy and human oversight explicit.

## Areas of work

- environmental telemetry and sensor interfaces;
- irrigation/control experiments;
- robotics/actuator integration;
- API and dashboard integration;
- simulator/telemetry use with the MyZubster Space Station track;
- safe experimentation with MyZubster Gateway integrations.

## Architecture

A typical development flow is:

```text
UI / simulator
      |
      v
MyZubster / Gateway
      |
      v
EVA IONI software
      |
      v
sensors / actuators
```

The final physical step is only considered validated when the actual hardware and safety behavior have been tested.

## Development

The repository historically used Python/FastAPI-oriented components and may also interact with Node.js or Arduino/ESP32 tooling. Follow the dependency files and source tree in the current branch rather than relying on old feature tables.

Typical Python setup:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Run the tests and documented simulator before connecting physical actuators.

## Safety

- Prefer simulation before hardware execution.
- Physical commands must have bounded parameters and fail-safe behavior.
- Never bypass emergency stops or access controls.
- Do not use autonomous garden/robot actions where people, animals or property could be harmed without appropriate supervision.
- Do not store wallet seeds, private keys or production credentials in robot code.

## Bounties and payments

EVA IONI work may be associated with MyZubster bounty issues, but work verification and settlement are separate.

- MYZ in the current core platform is an internal reward/accounting ledger.
- Historical XMR/MYZ bounty amounts do not prove external payment.
- An issue/PR/merge is not payment evidence.
- External settlement requires the applicable independent verification.

Read:

- [Canonical Bounty System](https://github.com/MyZubster-Ecosystem/myzubster/blob/main/BOUNTIES.md)
- [Ecosystem Architecture](https://github.com/MyZubster-Ecosystem/myzubster/blob/main/docs/ECOSYSTEM.md)

See `BOUNTIES.md` for local scope.

## Related repositories

- [myzubster](https://github.com/MyZubster-Ecosystem/myzubster)
- [MyZubster-Robot](https://github.com/MyZubster-Ecosystem/MyZubster-Robot)
- [myzubster-space-station](https://github.com/MyZubster-Ecosystem/myzubster-space-station)
- [MyZubsterGateway](https://github.com/MyZubster-Ecosystem/MyZubsterGateway)

## License

See the repository license file for authoritative terms.
