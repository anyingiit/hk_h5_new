<!-- Source: Best-README-Template BLANK_README (Unlicense) — https://github.com/othneildrew/Best-README-Template -->
<a id="readme-top"></a>

# hk_h5_new

A Next.js and Ant Design Mobile web front end for a telehealth platform, with separate patient and doctor sections for phone login, registration and doctor-led consultations.

**English** · [简体中文](README.zh-CN.md)

[![CI](https://github.com/anyingiit/hk_h5_new/actions/workflows/ci.yml/badge.svg)](https://github.com/anyingiit/hk_h5_new/actions/workflows/ci.yml)
[![License](https://img.shields.io/github/license/anyingiit/hk_h5_new)](LICENSE)

[Report a bug](https://github.com/anyingiit/hk_h5_new/issues/new?template=bug_report.yml) · [Request a feature](https://github.com/anyingiit/hk_h5_new/issues/new?template=feature_request.yml)

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## About The Project

hk_h5_new is a mobile web (H5) front end built with Next.js and Ant Design Mobile,
rendered with React. It carries two separate sections under one app:

- A patient side, where a visitor signs in by phone number or, if they are not
  registered yet, is walked straight into registration on the same screen
  (`src/pages/patient/fast_login.tsx`). A registration can optionally bind the
  new patient to a specific doctor when the page is opened with a doctor ID.
- A doctor side, where a signed-in doctor keeps a searchable list of other
  doctors to collaborate with (`src/pages/doctor/main/home/cooperative_group/index.tsx`,
  searchable by name or its Pinyin spelling) and opens a per-patient
  consultation screen with placeholders for a message box, a video call, and
  pulling up the patient's record (`send_message.tsx`).

Every request goes through one Axios client with shared error handling for
expired sessions and failed responses (`src/utils/http/http.ts`), which
targets a separate backend API rather than serving one itself.

See the [open issues](https://github.com/anyingiit/hk_h5_new/issues) for planned features and known issues.

## Getting Started

### Prerequisites

- Node.js, to run the Next.js app; the Dockerfile builds and serves it on `node:alpine`
- Yarn, since dependencies are pinned in `yarn.lock` and the Dockerfile installs with `yarn install --frozen-lockfile`

### Installation

```sh
git clone https://github.com/anyingiit/hk_h5_new.git
cd hk_h5_new
yarn install --frozen-lockfile
```

## Usage

Start the development server:

```sh
yarn dev
```

This runs `next dev -H 0.0.0.0`, so the app is reachable on port 3000 from
other devices on the network, not just `localhost` -- useful for testing the
mobile pages on a phone. To build and run the production bundle instead, the
way the Dockerfile does:

```sh
yarn build
yarn start
```

## Contributing

Contributions are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) for how to open an issue or a pull request, and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for the standards expected of everyone taking part.

Please do not report security issues in public issues or pull requests. [SECURITY.md](SECURITY.md) explains how to report them privately.

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.

## Contact

Project link: [https://github.com/anyingiit/hk_h5_new](https://github.com/anyingiit/hk_h5_new)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
