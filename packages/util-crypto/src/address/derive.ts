// Copyright 2017-2023 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@polkadot/util/types';
import type { DeriveJunction } from '../key/DeriveJunction';
import type { Prefix } from './types';

import { keyExtractPath } from '../key/index.js';
import { sr25519DerivePublic } from '../sr25519/index.js';
import { decodeAddress } from './decode.js';
import { encodeAddress } from './encode.js';

function filterHard ({ isHard }: DeriveJunction): boolean {
  return isHard;
}

/**
 * @name deriveAddress
 * @summary Creates a sr25519 derived address from the supplied and path.
 * @description
 * Creates a sr25519 derived address based on the input address/publicKey and the uri supplied.
 */
export function deriveAddress (who: HexString | Uint8Array | string, suri: string, ss58Format?: Prefix): string {
  const { path } = keyExtractPath(suri);

  if (!path.length || path.every(filterHard)) {
    throw new Error('Expected suri to contain a combination of non-hard paths');
  }

  let publicKey = decodeAddress(who);

  for (const { chainCode } of path) {
    publicKey = sr25519DerivePublic(publicKey, chainCode);
  }

  return encodeAddress(publicKey, ss58Format);
}
