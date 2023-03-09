// Copyright 2017-2023 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev/node/test/node" />

import { perf } from '@polkadot/util/test';

import { base64Decode } from './base64.js';

const HELLO_DUAL = 'aGVsbG8gd29ybGQg0J/RgNC40LLQtdGC0YHRgtCy0YPRjiDQvNC4IOS9oOWlvQ==';

const TESTS = [
  {
    // hello world Приветствую ми 你好
    base64: HELLO_DUAL,
    expect: new Uint8Array([104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100, 32, 208, 159, 209, 128, 208, 184, 208, 178, 208, 181, 209, 130, 209, 129, 209, 130, 208, 178, 209, 131, 209, 142, 32, 208, 188, 208, 184, 32, 228, 189, 160, 229, 165, 189])
  },
  {
    // ✓ à la mode
    base64: '4pyTIMOgIGxhIG1vZGU=',
    expect: new Uint8Array([226, 156, 147, 32, 195, 160, 32, 108, 97, 32, 109, 111, 100, 101])
  },
  {
    // Hello World!
    base64: 'SGVsbG8gV29ybGQh',
    expect: new Uint8Array([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33])
  },
  {
    base64: 'AA==',
    expect: new Uint8Array([0])
  },
  {
    base64: 'AAA=',
    expect: new Uint8Array([0, 0])
  },
  {
    base64: 'AAAA',
    expect: new Uint8Array([0, 0, 0])
  }
];

describe('base64Decode', (): void => {
  for (const test of TESTS) {
    it(test.base64, (): void => {
      expect(
        base64Decode(test.base64)
      ).toEqual(test.expect);
    });
  }
});

perf('base64Decode (hello, dual)', 100_000, [[HELLO_DUAL]], base64Decode);
