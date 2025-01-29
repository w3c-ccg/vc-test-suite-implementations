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

### Tags

Please Note:

1. Tags serve as identifiers to determine which test suites to run on your
issuers and verifiers. The first issuer/verifier found with a specific
tag from your list will be run against the test suite, while subsequent issuers
and verifiers bearing the same tag won't. This applies to most of the test
suites associated with this implementations repository listed below.

For instance, if you have added the tag `vc-api` to all your issuers and
verifiers to run them with vc api issuer and verifier test suites, only the
first match will be used in the test suites. In the sample configuration below,
only the issuer and verifier with the IDs
https://product.example.com/issuers/z1AEwLo7tZ3TrsPgRcgLJqQvR and
https://product.example.com/verifiers/z1AEwLo7tZ3TrsPgRcgLJqQvR will be selected.
Therefore, please avoid adding duplicate tags.

Example
```js
// Only the first match https://product.example.com/issuers/z1AEwLo7tZ3TrsPgRcgLJqQvR
// and https://product.example.com/verifiers/z1AEwLo7tZ3TrsPgRcgLJqQvR will be
// run against the VC API issuer and verifier test suites.
{
  "issuers": [{
    "id": "https://product.example.com/issuers/z1AEwLo7tZ3TrsPgRcgLJqQvR",
    "endpoint": "https://product.example.com/issuers/z1AEwLo7tZ3TrsPgRcgLJqQvR/credentials/issue",
    "tags": ["vc-api"]
  }, {
    "id": "https://product.example.com/issuers/z4Rq7N1lT6zVwFgXk8JYdCcKpU",
    "endpoint": "https://product.example.com/issuers/z4Rq7N1lT6zVwFgXk8JYdCcKpU/credentials/issue",
    "tags": ["vc-api"]
  }],
  "verifiers": [{
    "id": "https://product.example.com/verifiers/z1AEwLo7tZ3TrsPgRcgLJqQvR",
    "endpoint": "https://product.example.com/verifiers/z1AEwLo7tZ3TrsPgRcgLJqQvR/credentials/verify",
    "tags": ["vc-api"]
  }, {
    "id": "https://product.example.com/verifiers/z4Rq7N1lT6zVwFgXk8JYdCcKpU",
    "endpoint": "https://product.example.com/verifiers/z4Rq7N1lT6zVwFgXk8JYdCcKpU/credentials/verify",
    "tags": ["vc-api"]
  }]
}
```

2. If you want your issuer or verifier to run against multiple test suites, you
can assign multiple tags to them, eliminating the need for redundant entries.
For instance, if an issuer with the ID
https://product.example.com/issuers/z1AEwLo7tZ3TrsPgRcgLJqQvR can be run with
both the VC Bitstring Status List and VC API test suites, a single entry with
multiple tags can be used. This consolidated entry, containing tags for
both VC API and VC Bitstring Status List test suites, ensures that the issuer and
the verifier will be run against both test suites. Here is an example of how to
structure the entry:

For Example:
```js
{
  "issuers": [{
    "id": "https://product.example.com/issuers/z4Rq7N1lT6zVwFgXk8JYdCcKpU",
    "endpoint": "https://product.example.com/issuers/z4Rq7N1lT6zVwFgXk8JYdCcKpU/credentials/issue",
    "tags": ["vc-api", "BitstringStatusList", "Suspension"]
  }],
  "verifiers": [{
    "id": "https://product.example.com/verifiers/z4Rq7N1lT6zVwFgXk8JYdCcKpU",
    "endpoint": "https://product.example.com/verifiers/z4Rq7N1lT6zVwFgXk8JYdCcKpU/credentials/verify",
    "tags": ["vc-api"]
  }]
}
```

#### VC API Issuer and Verifier Test Suites

* `vc-api` - This tag will run the [vc-api-issuer tests](https://github.com/w3c-ccg/vc-api-issuer-test-suite)
on your issuer and the [vc-api-verifier tests](https://github.com/w3c-ccg/vc-api-verifier-test-suite)
on your verifier.

NOTE: Currently the vc api verifier test suite uses `Ed25519Signature2020` as
the default signature for the mock VCs that are sent to the verifiers since it
is most widely implemented. So, the verifier you add for `vc-api` must support
verification of VCs with `Ed25519Signature2020` signature to pass verification
tests.

As of 2023, `Ed25519Signature2018` is no longer supported, so please update
your existing implementations to use `Ed25519Signature2020` if you were
previously using `Ed25519Signature2018`.

#### DID Key Test Suite

* `did-key` - This tag will run the [DID Key Test Suite](https://github.com/w3c-ccg/did-key-test-suite)
on your DID resolver endpoint.

## Contribute

See [the contribute file](https://github.com/digitalbazaar/bedrock/blob/master/CONTRIBUTING.md)!

PRs accepted.

If editing the Readme, please conform to the
[standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

[New BSD License (3-clause)](LICENSE) © Digital Bazaar
