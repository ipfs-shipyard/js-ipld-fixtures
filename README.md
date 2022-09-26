# ipld-fixtures <!-- omit in toc -->

[![codecov](https://img.shields.io/codecov/c/github/ipfs-shipyard/js-ipld-fixtures.svg?style=flat-square)](https://codecov.io/gh/ipfs-shipyard/js-ipld-fixtures)
[![CI](https://img.shields.io/github/workflow/status/ipfs-shipyard/js-ipld-fixtures/test%20&%20maybe%20release/main?style=flat-square)](https://github.com/ipfs-shipyard/js-ipld-fixtures/actions/workflows/js-test-and-release.yml)

> utilities for ipld/codec-fixtures in javascript

## Table of contents <!-- omit in toc -->

- [Install](#install)
- [Examples](#examples)
  - [Programmatic](#programmatic)
  - [CLI](#cli)
- [License](#license)
- [Contribute](#contribute)

## Install

```console
$ npm i ipld-fixtures
```

This is an attempt to provide a simple and lightweight way to consume ipld/codec-fixtures. See <https://github.com/ipld/codec-fixtures> for more information

## Examples

### Programmatic

```typescript
import * as dagCBOR from '@ipld/dag-cbor'
import loadFixtures from 'ipld-fixtures'

(async () => {
  const data = await loadFixtures({codecs: ['dag-cbor', 'dag-json'], dataTypes: ['dagpb_Data_some']})
  console.log(data)
  /**
    {
      dagpb_Data_some: {
        'dag-cbor': {
          cid: 'bafyreieculsmrexh3ty5jentbvuku452o27mst4h2tq2rb2zntqhgcstji',
          bytes: <Buffer a2 64 44 61 74 61 45 00 01 02 03 04 65 4c 69 6e 6b 73 80>
        },
        'dag-json': {
          cid: 'baguqeerajwksxu3lxpomdwxvosl542zl3xknhjgxtq3277gafrhl6vdw5tcq',
          bytes: <Buffer 7b 22 44 61 74 61 22 3a 7b 22 2f 22 3a 7b 22 62 79 74 65 73 22 3a 22 41 41 45 43 41 77 51 22 7d 7d 2c 22 4c 69 6e 6b 73 22 3a 5b 5d 7d>
        }
      }
    }
   */
  const { cid, bytes } = data.dagpb_Data_some['dag-cbor']

  console.log('cid: ', cid)
  const value = dagCBOR.decode(bytes)
  console.log('value: ', value)

  /**
    cid:  bafyreieculsmrexh3ty5jentbvuku452o27mst4h2tq2rb2zntqhgcstji
    value:  { Data: Uint8Array(5) [ 0, 1, 2, 3, 4 ], Links: [] }
   */
})()

```

### CLI

```bash
npm start -- --dataTypes dagpb_Data_some

{
  dagpb_Data_some: {
    'dag-pb': {
      cid: 'bafybeibazl2z4vqp2tmwcfag6wirmtpnomxknqcgrauj7m2yisrz3qjbom',
      bytes: <Buffer 0a 05 00 01 02 03 04>
    },
    'dag-cbor': {
      cid: 'bafyreieculsmrexh3ty5jentbvuku452o27mst4h2tq2rb2zntqhgcstji',
      bytes: <Buffer a2 64 44 61 74 61 45 00 01 02 03 04 65 4c 69 6e 6b 73 80>
    },
    'dag-json': {
      cid: 'baguqeerajwksxu3lxpomdwxvosl542zl3xknhjgxtq3277gafrhl6vdw5tcq',
      bytes: <Buffer 7b 22 44 61 74 61 22 3a 7b 22 2f 22 3a 7b 22 62 79 74 65 73 22 3a 22 41 41 45 43 41 77 51 22 7d 7d 2c 22 4c 69 6e 6b 73 22 3a 5b 5d 7d>
    }
  }
}
```

```bash
npm start -- --dataTypes dagpb_Data_some --codecs dag-cbor

{
  dagpb_Data_some: {
    'dag-cbor': {
      cid: 'bafyreieculsmrexh3ty5jentbvuku452o27mst4h2tq2rb2zntqhgcstji',
      bytes: <Buffer a2 64 44 61 74 61 45 00 01 02 03 04 65 4c 69 6e 6b 73 80>
    }
  }
}
```

```bash
npm start -- --dataTypes dagpb_Data_some --codecs dag-cbor,dag-json

{
  dagpb_Data_some: {
    'dag-cbor': {
      cid: 'bafyreieculsmrexh3ty5jentbvuku452o27mst4h2tq2rb2zntqhgcstji',
      bytes: <Buffer a2 64 44 61 74 61 45 00 01 02 03 04 65 4c 69 6e 6b 73 80>
    },
    'dag-json': {
      cid: 'baguqeerajwksxu3lxpomdwxvosl542zl3xknhjgxtq3277gafrhl6vdw5tcq',
      bytes: <Buffer 7b 22 44 61 74 61 22 3a 7b 22 2f 22 3a 7b 22 62 79 74 65 73 22 3a 22 41 41 45 43 41 77 51 22 7d 7d 2c 22 4c 69 6e 6b 73 22 3a 5b 5d 7d>
    }
  }
}
```

```bash
npm start -- --dataTypes array-2 --codecs dag-cbor,dag-json

{
  'array-2': {
    'dag-cbor': {
      cid: 'bafyreihdb57fdysx5h35urvxz64ros7zvywshber7id6t6c6fek37jgyfe',
      bytes: <Buffer 81 02>
    },
    'dag-json': {
      cid: 'baguqeeraaoewnxu7nonjagzawtdmvczkiyaj73v6amn2xscc2q3jbqf4eivq',
      bytes: <Buffer 5b 32 5d>
    }
  }
}
```

```bash

npm start -- --dataTypes array-2 --codecs dag-pb

{}
```

## License

Licensed under either of

- Apache 2.0, ([LICENSE-APACHE](LICENSE-APACHE) / <http://www.apache.org/licenses/LICENSE-2.0>)
- MIT ([LICENSE-MIT](LICENSE-MIT) / <http://opensource.org/licenses/MIT>)

## Contribute

Unless you explicitly state otherwise, any contribution intentionally submitted for inclusion in the work by you, as defined in the Apache-2.0 license, shall be dual licensed as above, without any additional terms or conditions.
