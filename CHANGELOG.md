<!--
Copyright 2023 - 2024 Digital Bazaar, Inc.

SPDX-License-Identifier: BSD-3-Clause
-->

# vc-test-suite-implementations Changelog

## 4.0.0 - 2024-01-TBD

### Changed
- **BREAKING**: Rename the tag to run Bitstring Status List test suite from
  `StatusList2021` to `BitstringStatusList`.

## 3.0.0 - 2024-01-02

### Changed
- **BREAKING**: Rename `.vcApiTestImplementationsConfig.cjs` config for testing
  localhost implementations to `.localImplementationsConfig.cjs`.

## 2.1.0 - 2023-12-18

### Removed
- Remove unsupported `Ed25519Signature2018` tag from implementations.
- Remove `Mattr` from implementations list.

## 2.0.0 - 2023-12-14

### Changed
- **BREAKING**: Renamed package name to `vc-test-suite-implementations`.
- Update `README.md` to add additional information about requirements for
  opting into a test suite.

### Removed
- Remove tags for `ecdsa`, `eddsa`, `ed25519signature2020`, and `vc2.0` test
  suites that are not associated with this implementations repo.

## 1.0.1 - 2023-12-07

### Removed
- Removed unused "method" property from implementations' config.

## 1.0.0

### Added
- Class `Endpoint` for wrapping generic endpoints.
- API `filterByTag({property: 'verifiers', tags: ['VC_API']})`
- See individual commits for history.
