# VC API Test Suite Implementations _(vc-api-test-suite-implementations)_

[![Build status](https://img.shields.io/github/workflow/status/w3c-ccg/vc-api-test-suite-implementations/Node.js%20CI)](https://github.com/w3c-ccg/vc-api-test-suite-implementations/actions?query=workflow%3A%22Node.js+CI%22)
[![Coverage status](https://img.shields.io/codecov/c/github/w3c-ccg/vc-api-test-suite-implementations)](https://codecov.io/gh/w3c-ccg/vc-api-test-suite-implementations)
[![NPM Version](https://img.shields.io/npm/v/@digitalcredentials/vc-api-test-suite-implementations.svg)](https://npm.im/@digitalcredentials/vc-api-test-suite-implementations)

> A template skeleton repo for (non-Bedrock) JS libraries that run in Node.js and in the browser.

## Table of Contents

- [Background](#background)
- [Security](#security)
- [Install](#install)
- [Usage](#usage)
- [Contribute](#contribute)
- [Commercial Support](#commercial-support)
- [License](#license)

## Background

Implementations added to this package are tested against various test suites in order to demonstrate interopability.

## Security

Please do not commit any sensitive materials such as oauth2 client secret or client secrets used for signing zcaps or HTTP Signature Headers.

## Install

- Node.js 14+ is required.

### NPM

To install via NPM:

```
npm install w3c-ccg/vc-api-test-suite-implementations
```

### Development

To install locally (for development):

```
git clone https://github.com/w3c-ccg/vc-api-test-suite-implementations.git
cd vc-api-test-suite-implementations
npm install
```

## Usage

Please add or correct implementations in the `./implementations` dir.
Implementations are json in the following form:

```js
{
  "name": "My Company",
  "implementation": "My Implementation Name",
  "oauth2": {
     "clientId": "bar",
     "clientSecret": "CLIENT_SECRET_MY_COMPANY",
     "tokenAudience": "https://my.product.net",
     "tokenEndpoint": "https://my.product.auth0.net/oauth/token"
  },
  "issuers": [{
    "id": "urn:uuid:my:implementation:issuer:id",
    "endpoint": "https://my.product.net/issuers/foo/credentials/issue",
    "method": "POST",
    "zcap": {
      "capability": "{\"@context\":[\"https://w3id.org/zcap/v1\",\"https://w3id.org/security/suites/ed25519-2020/v1\"],\"id\":\"urn:uuid:4d44084c-334e-46dc-ac23-5e26f75262b6\",\"controller\":\"did:key:zFoo\",\"parentCapability\":\"urn:zcap:root:https%3A%2F%2Fmy.implementation.net%2Fissuers%2Fz19wCeJafpsTzvA6hZksz7TYF\",\"invocationTarget\":\"https://my.implementation.net/issuers/z19wCeJafpsTzvA6hZksz7TYF/credentials/issue\",\"expires\":\"2022-05-29T17:26:30Z\",\"proof\":{\"type\":\"Ed25519Signature2020\",\"created\":\"2022-02-28T17:26:30Z\",\"verificationMethod\":\"did:key:z6Mkk2x1J4jCmaHDyYRRW1NB7CzeKYbjo3boGfRiefPzZjLQ#z6Mkk2x1J4jCmaHDyYRRW1NB7CzeKYbjo3boGfRiefPzZjLQ\",\"proofPurpose\":\"capabilityDelegation\",\"capabilityChain\":[\"urn:zcap:root:https%3A%2F%2Fmy.implementation.net%2Fissuers%2Fz19wCeJafpsTzvA6hZksz7TYF\"],\"proofValue\":\"zBar\"}}",
      "clientSecret": "CLIENT_SECRET_DB"
    },
    "tags": ["VC-HTTP-API", "ZCAP", "OAUTH2"]
  }],
  "verifiers": [{
    "id": "https://localhost:40443/verifiers/z19uokPn3b1Z4XDbQSHo7VhFR",
    "endpoint": "https://localhost:40443/verifiers/z19uokPn3b1Z4XDbQSHo7VhFR/credentials/verify",
    "method": "POST",
    "zcap": {
      "capability": "{\"@context\":[\"https://w3id.org/zcap/v1\",\"https://w3id.org/security/suites/ed25519-2020/v1\"],\"id\":\"urn:uuid:41473f9f-9e44-4ac9-9ac2-c86a6f695703\",\"controller\":\"did:key:zFoo\",\"parentCapability\":\"urn:zcap:root:https%3A%2F%2Fmy.implementation.net%3A40443%2Fverifiers%2Fz19uokPn3b1Z4XDbQSHo7VhFR\",\"invocationTarget\":\"https://my.implementation.net/verifiers/zBar/credentials/verify\",\"expires\":\"2023-03-17T17:39:49Z\",\"proof\":{\"type\":\"Ed25519Signature2020\",\"created\":\"2022-03-17T17:39:49Z\",\"verificationMethod\":\"did:key:zFoo#zBar\",\"proofPurpose\":\"capabilityDelegation\",\"capabilityChain\":[\"urn:zcap:root:https%3A%2F%2Fmy.application.net%2Fverifiers%2FzFoo\"],\"proofValue\":\"zBar\"}}",
      "clientSecret": "CLIENT_SECRET_DB"
    },
    "tags": ["VC-HTTP-API", "ZCAP", "OAUTH2"]
  }]
}
```

Please note: implementations may have security using oauth2 or zcaps, but not both.
Implementations may also contain no security (do not add a OAUTH2 or ZCAP section in that case).

### Tags
Tags tell the test suites which tests your issuer, verifiers, and status lists should be run on.

VC-API - This tag will run the [vc-api-issuer tests](https://github.com/w3c-ccg/vc-api-issuer-test-suite) on your issuer and the [vc-api-verifier tests](https://github.com/w3c-ccg/vc-api-verifier-test-suite) on your verifier.

Ed25519Signature2020 - This tag will run the [Ed25519 tests](https://github.com/w3c-ccg/di-ed25519-test-suite) on either your issuer and/or verifier.

StatusList2021 - This tag will run the [Status List 2021 tests](https://github.com/w3c-ccg/status-list-2021-test-suite) on your issuer and/or verifier.

## Contribute

See [the contribute file](https://github.com/digitalbazaar/bedrock/blob/master/CONTRIBUTING.md)!

PRs accepted.

If editing the Readme, please conform to the
[standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## Commercial Support

Commercial support for this library is available upon request from
Digital Bazaar: support@digitalbazaar.com

## License

[New BSD License (3-clause)](LICENSE) © Digital Bazaar
