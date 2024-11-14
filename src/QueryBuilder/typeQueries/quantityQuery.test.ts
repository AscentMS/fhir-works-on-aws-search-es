/*
 *  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: Apache-2.0
 */

import { FHIRSearchParametersRegistry } from '../../FHIRSearchParametersRegistry';
import { quantityQuery } from './quantityQuery';
import { parseQuantitySearchValue } from '../../FhirQueryParser/typeParsers/quantityParser';

const fhirSearchParametersRegistry = new FHIRSearchParametersRegistry('4.0.1');
const quantityParam = fhirSearchParametersRegistry.getSearchParameter('Observation', 'value-quantity')!.compiled[0];

describe('quantityQuery', () => {
    describe('valid inputs', () => {
        test('5.4|http://unitsofmeasure.org|mg', () => {
            expect(quantityQuery(quantityParam, parseQuantitySearchValue('5.4|http://unitsofmeasure.org|mg'), true))
                .toMatchInlineSnapshot(`
                {
                  "bool": {
                    "must": [
                      {
                        "range": {
                          "valueQuantity.value": {
                            "gte": 5.3500000000000005,
                            "lte": 5.45,
                          },
                        },
                      },
                      {
                        "multi_match": {
                          "fields": [
                            "valueQuantity.code.keyword",
                          ],
                          "lenient": true,
                          "query": "mg",
                        },
                      },
                      {
                        "multi_match": {
                          "fields": [
                            "valueQuantity.system.keyword",
                          ],
                          "lenient": true,
                          "query": "http://unitsofmeasure.org",
                        },
                      },
                    ],
                  },
                }
            `);
        });
        test('5.40e-3|http://unitsofmeasure.org|g', () => {
            expect(quantityQuery(quantityParam, parseQuantitySearchValue('5.40e-3|http://unitsofmeasure.org|g'), true))
                .toMatchInlineSnapshot(`
                {
                  "bool": {
                    "must": [
                      {
                        "range": {
                          "valueQuantity.value": {
                            "gte": 0.0053950000000000005,
                            "lte": 0.005405,
                          },
                        },
                      },
                      {
                        "multi_match": {
                          "fields": [
                            "valueQuantity.code.keyword",
                          ],
                          "lenient": true,
                          "query": "g",
                        },
                      },
                      {
                        "multi_match": {
                          "fields": [
                            "valueQuantity.system.keyword",
                          ],
                          "lenient": true,
                          "query": "http://unitsofmeasure.org",
                        },
                      },
                    ],
                  },
                }
            `);
        });
        test('5.4||mg', () => {
            expect(quantityQuery(quantityParam, parseQuantitySearchValue('5.4||mg'), true)).toMatchInlineSnapshot(`
                {
                  "bool": {
                    "must": [
                      {
                        "range": {
                          "valueQuantity.value": {
                            "gte": 5.3500000000000005,
                            "lte": 5.45,
                          },
                        },
                      },
                      {
                        "multi_match": {
                          "fields": [
                            "valueQuantity.code.keyword",
                            "valueQuantity.unit.keyword",
                          ],
                          "lenient": true,
                          "query": "mg",
                        },
                      },
                    ],
                  },
                }
            `);
        });
        test('5.4', () => {
            expect(quantityQuery(quantityParam, parseQuantitySearchValue('5.4'), true)).toMatchInlineSnapshot(`
                {
                  "range": {
                    "valueQuantity.value": {
                      "gte": 5.3500000000000005,
                      "lte": 5.45,
                    },
                  },
                }
            `);
        });
        test('le5.4|http://unitsofmeasure.org|mg', () => {
            expect(quantityQuery(quantityParam, parseQuantitySearchValue('le5.4|http://unitsofmeasure.org|mg'), true))
                .toMatchInlineSnapshot(`
                {
                  "bool": {
                    "must": [
                      {
                        "range": {
                          "valueQuantity.value": {
                            "lte": 5.4,
                          },
                        },
                      },
                      {
                        "multi_match": {
                          "fields": [
                            "valueQuantity.code.keyword",
                          ],
                          "lenient": true,
                          "query": "mg",
                        },
                      },
                      {
                        "multi_match": {
                          "fields": [
                            "valueQuantity.system.keyword",
                          ],
                          "lenient": true,
                          "query": "http://unitsofmeasure.org",
                        },
                      },
                    ],
                  },
                }
            `);
        });
        test('le5.4|http://unitsofmeasure.org|mg with no keyword', () => {
            expect(quantityQuery(quantityParam, parseQuantitySearchValue('le5.4|http://unitsofmeasure.org|mg'), false))
                .toMatchInlineSnapshot(`
                {
                  "bool": {
                    "must": [
                      {
                        "range": {
                          "valueQuantity.value": {
                            "lte": 5.4,
                          },
                        },
                      },
                      {
                        "multi_match": {
                          "fields": [
                            "valueQuantity.code",
                          ],
                          "lenient": true,
                          "query": "mg",
                        },
                      },
                      {
                        "multi_match": {
                          "fields": [
                            "valueQuantity.system",
                          ],
                          "lenient": true,
                          "query": "http://unitsofmeasure.org",
                        },
                      },
                    ],
                  },
                }
            `);
        });
    });
});
