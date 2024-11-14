/*
 *  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: Apache-2.0
 */

import { tokenQuery } from './tokenQuery';
import { FHIRSearchParametersRegistry } from '../../FHIRSearchParametersRegistry';
import { parseTokenSearchValue } from '../../FhirQueryParser/typeParsers/tokenParser';

const fhirSearchParametersRegistry = new FHIRSearchParametersRegistry('4.0.1');
const identifierParam = fhirSearchParametersRegistry.getSearchParameter('Patient', 'identifier')!.compiled[0];

describe('tokenQuery', () => {
    test('system|code', () => {
        expect(tokenQuery(identifierParam, parseTokenSearchValue('http://acme.org/patient|2345'), true))
            .toMatchInlineSnapshot(`
            {
              "bool": {
                "must": [
                  {
                    "multi_match": {
                      "fields": [
                        "identifier.system.keyword",
                        "identifier.coding.system.keyword",
                      ],
                      "lenient": true,
                      "query": "http://acme.org/patient",
                    },
                  },
                  {
                    "multi_match": {
                      "fields": [
                        "identifier.code.keyword",
                        "identifier.coding.code.keyword",
                        "identifier.value.keyword",
                        "identifier.keyword",
                        "identifier",
                      ],
                      "lenient": true,
                      "query": "2345",
                    },
                  },
                ],
              },
            }
        `);
    });
    test('system|', () => {
        expect(tokenQuery(identifierParam, parseTokenSearchValue('http://acme.org/patient'), true))
            .toMatchInlineSnapshot(`
            {
              "multi_match": {
                "fields": [
                  "identifier.code.keyword",
                  "identifier.coding.code.keyword",
                  "identifier.value.keyword",
                  "identifier.keyword",
                  "identifier",
                ],
                "lenient": true,
                "query": "http://acme.org/patient",
              },
            }
        `);
    });
    test('|code', () => {
        expect(tokenQuery(identifierParam, parseTokenSearchValue('|2345'), true)).toMatchInlineSnapshot(`
            {
              "bool": {
                "must": [
                  {
                    "multi_match": {
                      "fields": [
                        "identifier.code.keyword",
                        "identifier.coding.code.keyword",
                        "identifier.value.keyword",
                        "identifier.keyword",
                        "identifier",
                      ],
                      "lenient": true,
                      "query": "2345",
                    },
                  },
                  {
                    "bool": {
                      "must_not": {
                        "exists": {
                          "field": "identifier.system",
                        },
                      },
                    },
                  },
                ],
              },
            }
        `);
    });
    test('code', () => {
        expect(tokenQuery(identifierParam, parseTokenSearchValue('http://acme.org/patient|2345'), true))
            .toMatchInlineSnapshot(`
            {
              "bool": {
                "must": [
                  {
                    "multi_match": {
                      "fields": [
                        "identifier.system.keyword",
                        "identifier.coding.system.keyword",
                      ],
                      "lenient": true,
                      "query": "http://acme.org/patient",
                    },
                  },
                  {
                    "multi_match": {
                      "fields": [
                        "identifier.code.keyword",
                        "identifier.coding.code.keyword",
                        "identifier.value.keyword",
                        "identifier.keyword",
                        "identifier",
                      ],
                      "lenient": true,
                      "query": "2345",
                    },
                  },
                ],
              },
            }
        `);
    });
    test('code; without keyword', () => {
        expect(tokenQuery(identifierParam, parseTokenSearchValue('http://acme.org/patient|2345'), false))
            .toMatchInlineSnapshot(`
            {
              "bool": {
                "must": [
                  {
                    "multi_match": {
                      "fields": [
                        "identifier.system",
                        "identifier.coding.system",
                      ],
                      "lenient": true,
                      "query": "http://acme.org/patient",
                    },
                  },
                  {
                    "multi_match": {
                      "fields": [
                        "identifier.code",
                        "identifier.coding.code",
                        "identifier.value",
                        "identifier",
                      ],
                      "lenient": true,
                      "query": "2345",
                    },
                  },
                ],
              },
            }
        `);
    });
    test('boolean', () => {
        expect(tokenQuery(identifierParam, parseTokenSearchValue('true'), true)).toMatchInlineSnapshot(`
            {
              "multi_match": {
                "fields": [
                  "identifier.code.keyword",
                  "identifier.coding.code.keyword",
                  "identifier.value.keyword",
                  "identifier.keyword",
                  "identifier",
                ],
                "lenient": true,
                "query": "true",
              },
            }
        `);
    });
});
