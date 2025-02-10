<!--
Copyright 2024 Digital Bazaar, Inc.

SPDX-License-Identifier: BSD-3-Clause
-->

# W3C Credentials Community Group VC Test Suite Implementations

This implementations list is used by the various
[W3C Credentials Community Group](https://www.w3.org/groups/cg/credentials/)
Verifiable Credentials test suites (see [Tags](#tags) for the full list).

## Table of Contents

- [Background](#background)
- [Security](#security)
- [Install](#install)
  - [NPM](#npm)
  - [Development](#development)
- [Usage](#usage)
  - [Adding a new implementation](#adding-a-new-implementation)
  - [Testing locally](#testing-locally)
  - [Test Suite Settings](#test-suite-settings)
  - [Tags](#tags)
- [Contribute](#contribute)
- [License](#license)

## Background

Implementations added to this package are tested against various test suites
[listed below](#tags) in order to demonstrate interoperability.

## Security

Please do not commit any sensitive materials such as oauth2 client secrets or
private key information used for signing
[Authorization Capabilities](https://w3c-ccg.github.io/zcap-spec/) or
[HTTP Message Signatures](https://www.ietf.org/archive/id/draft-ietf-httpbis-message-signatures-08.html).

## Install

- Node.js 18+ is required.

### NPM

To install via NPM:

```sh
npm install w3c-ccg/vc-test-suite-implementations
```

### Development

To install locally (for development):

```sh
git clone https://github.com/w3c-ccg/vc-test-suite-implementations.git
cd vc-test-suite-implementations
npm install
```

## Usage

#### Adding a new implementation
Please add implementations to the `./implementations` directory.
Implementation configuration files are expressed in JSON and use roughly the
following form:

```json
{
  "name": "My Company",
  "implementation": "My Implementation Name",
  "oauth2": {
     "clientId": "bar",
     "clientSecret": "CLIENT_SECRET_MY_COMPANY",
     "tokenAudience": "https://product.example.com",
     "tokenEndpoint": "https://product.example.com/oauth/token"
  },
  "issuers": [{
    "id": "urn:uuid:my:implementation:issuer:id",
    "endpoint": "https://product.example.com/issuers/foo/credentials/issue",
    "zcap": {
      "capability": "{\"@context\":[\"https://w3id.org/zcap/v1\",\"https://w3id.org/security/suites/ed25519-2020/v1\"],\"id\":\"urn:uuid:4d44084c-334e-46dc-ac23-5e26f75262b6\",\"controller\":\"did:key:zFoo\",\"parentCapability\":\"urn:zcap:root:https%3A%2F%2Fmy.implementation.net%2Fissuers%2Fz19wCeJafpsTzvA6hZksz7TYF\",\"invocationTarget\":\"https://my.implementation.net/issuers/z19wCeJafpsTzvA6hZksz7TYF/credentials/issue\",\"expires\":\"2022-05-29T17:26:30Z\",\"proof\":{\"type\":\"Ed25519Signature2020\",\"created\":\"2022-02-28T17:26:30Z\",\"verificationMethod\":\"did:key:z6Mkk2x1J4jCmaHDyYRRW1NB7CzeKYbjo3boGfRiefPzZjLQ#z6Mkk2x1J4jCmaHDyYRRW1NB7CzeKYbjo3boGfRiefPzZjLQ\",\"proofPurpose\":\"capabilityDelegation\",\"capabilityChain\":[\"urn:zcap:root:https%3A%2F%2Fmy.implementation.net%2Fissuers%2Fz19wCeJafpsTzvA6hZksz7TYF\"],\"proofValue\":\"zBar\"}}",
      "keySeed": "KEY_SEED_DB"
    },
    "tags": ["vc-api"]
  }],
  "verifiers": [{
    "id": "https://product.example.com/verifiers/z19uokPn3b1Z4XDbQSHo7VhFR",
    "endpoint": "https://product.example.com/verifiers/z19uokPn3b1Z4XDbQSHo7VhFR/credentials/verify",
    "zcap": {
      "capability": "{\"@context\":[\"https://w3id.org/zcap/v1\",\"https://w3id.org/security/suites/ed25519-2020/v1\"],\"id\":\"urn:uuid:41473f9f-9e44-4ac9-9ac2-c86a6f695703\",\"controller\":\"did:key:zFoo\",\"parentCapability\":\"urn:zcap:root:https%3A%2F%2Fmy.implementation.net%3A40443%2Fverifiers%2Fz19uokPn3b1Z4XDbQSHo7VhFR\",\"invocationTarget\":\"https://my.implementation.net/verifiers/zBar/credentials/verify\",\"expires\":\"2023-03-17T17:39:49Z\",\"proof\":{\"type\":\"Ed25519Signature2020\",\"created\":\"2022-03-17T17:39:49Z\",\"verificationMethod\":\"did:key:zFoo#zBar\",\"proofPurpose\":\"capabilityDelegation\",\"capabilityChain\":[\"urn:zcap:root:https%3A%2F%2Fmy.application.net%2Fverifiers%2FzFoo\"],\"proofValue\":\"zBar\"}}",
      "keySeed": "KEY_SEED_DB"
    },
    "tags": ["vc-api"]
  }]
}
```

Please note: implementations may specify authorization parameters for oauth2 or
zcaps, but not both. Implementations may also not specify any authorization
parameters, in which case they do not specify `oauth2` or `zcap` properties.

Please check specific test suite READMEs for further details on implementation properties and endpoints.
Test suites MAY specify additional properties and features for endpoints such as
mandatory JSON-LD contexts, keyTypes settings, additional tags for specific tests such as Enveloped Proofs,
and supported VC Data Model versions. In most cases, endpoints are expected to: be capable
of using the test suite API; be capable of signing and/or verifying using `did:key`; and support the following contexts:

- https://www.w3.org/ns/credentials/examples/v2
- https://www.w3.org/2018/credentials/v1
- https://www.w3.org/ns/credentials/v2

#### Testing locally

To test implementations with endpoints running locally, create a configuration file named
`localConfig.cjs` in the root directory of the test suite. `localConfig.cjs` should export
a json object. Add the property `implementations` to the exported object. `implementations`
should be an array of objects such as the one below:

```js
// localConfig.cjs defining local implementations
module.exports = {
  "implementations": [{
    "name": "My Company",
    "implementation": "My Implementation Name",
    "issuers": [{
      "id": "urn:uuid:my:implementation:issuer:id",
      "endpoint": "https://localhost:40443/issuers/foo/credentials/issue",
      "tags": ["eddsa-rdfc-2022"]
    }],
    "verifiers": [{
      "id": "https://localhost:40443/verifiers/z19uokPn3b1Z4XDbQSHo7VhFR",
      "endpoint": "https://localhost:40443/verifiers/z19uokPn3b1Z4XDbQSHo7VhFR/credentials/verify",
      "tags": ["eddsa-rdfc-2022"]
    }]
  }];
};
```

After adding the config file, only implementations in `localConfig.cjs` will run.

### Test Suite Settings

Additional test suite runtime configuration can be done via the `settings` key
in a `localConfig.cjs`. The current global settings are:

  * `enableInteropTests` - enable/disable the cross-implementation "interop" tests
  * `testAllImplementations` - enable/disable testing _all_ implementations (not
    just what's in `localConfig.cjs`)

Both of these settings are `false` when `localConfig.cjs` is present, but may be
overridden as below:

```js
module.exports = {
  "settings": {
    // overriding the default, false, for local testing
    "enableInteropTests": true,
    "testAllImplementations": true
  },
  "implementations": [{
    "name": "My Company",
    "implementation": "My Implementation Name",
    "issuers": [{
      "id": "urn:uuid:my:implementation:issuer:id",
      "endpoint": "https://localhost:40443/issuers/foo/credentials/issue",
      "tags": ["eddsa-rdfc-2022"]
    }],
    "verifiers": [{
      "id": "https://localhost:40443/verifiers/z19uokPn3b1Z4XDbQSHo7VhFR",
      "endpoint": "https://localhost:40443/verifiers/z19uokPn3b1Z4XDbQSHo7VhFR/credentials/verify",
      "tags": ["eddsa-rdfc-2022"]
    }]
  }, {
    // Add additional implementations as needed
  }];
```

### Tags

Tags tell the test suites which implementations' endpoints to run the test suites against.

* `vc-api` - This tag will run the
[VC API Issuer test suite](https://github.com/w3c-ccg/vc-api-issuer-test-suite)
on an `issuer` endpoint and the
[VC API Verifier test suite](https://github.com/w3c-ccg/vc-api-verifier-test-suite)
on a `verifier` endpoint.

NOTE: Currently the VC API Verifier test suite uses `Ed25519Signature2020` as
the default signature for the mock VCs that are sent to the verifiers since it
is widely implemented. So, the verifier you add for `vc-api` must support
verification of VCs with `Ed25519Signature2020` signature to pass verification
tests.

As of 2023, `Ed25519Signature2018` is no longer supported, so please update
your existing implementations to use `Ed25519Signature2020` if you were
previously using `Ed25519Signature2018`.

* `did-key` - This tag will run the
[DID Key Test Suite](https://github.com/w3c-ccg/did-key-test-suite)
on a DID resolver endpoint.

## Contribute

See [the CONTRIBUTING.md file](CONTRIBUTING.md).

Pull Requests are welcome!

## License

[BSD-3-Clause](LICENSE) Copyright 2022-2025, World Wide Web Consortium and
Digital Bazaar, Inc.
