/*
 *  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: Apache-2.0
 */

import { parseSearchModifiers } from './util';

describe('getSearchModifiers', () => {
    test('name:exact', () => {
        expect(parseSearchModifiers('name:exact')).toMatchInlineSnapshot(`
        {
          "modifier": "exact",
          "parameterName": "name",
        }
        `);
    });

    test('name', () => {
        expect(parseSearchModifiers('name')).toMatchInlineSnapshot(`
            {
              "modifier": undefined,
              "parameterName": "name",
            }
        `);
    });

    test('name:contains', () => {
        expect(parseSearchModifiers('name:contains')).toMatchInlineSnapshot(`
        {
          "modifier": "contains",
          "parameterName": "name",
        }
        `);
    });

    test('name:', () => {
        expect(parseSearchModifiers('name:')).toMatchInlineSnapshot(`
        {
          "modifier": "",
          "parameterName": "name",
        }
        `);
    });
});
