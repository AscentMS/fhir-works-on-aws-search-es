/*
 *  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: Apache-2.0
 */

import { stringQuery } from './stringQuery';
import { FHIRSearchParametersRegistry } from '../../FHIRSearchParametersRegistry';

const fhirSearchParametersRegistry = new FHIRSearchParametersRegistry('4.0.1');
const nameParam = fhirSearchParametersRegistry.getSearchParameter('Patient', 'name')!.compiled[0];
const addressParam = fhirSearchParametersRegistry.getSearchParameter('Patient', 'address')!.compiled[0];
const givenParam = fhirSearchParametersRegistry.getSearchParameter('Patient', 'given')!.compiled[0];

describe('stringQuery', () => {
    test('simple value', () => {
        expect(stringQuery(nameParam, 'Robert Bell')).toMatchInlineSnapshot(`
            {
              "multi_match": {
                "fields": [
                  "name",
                  "name.*",
                ],
                "lenient": true,
                "query": "Robert Bell",
              },
            }
        `);
    });
    test('simple value; with forward slash', () => {
        expect(stringQuery(nameParam, 'Robert/Bobby Bell')).toMatchInlineSnapshot(`
            {
              "multi_match": {
                "fields": [
                  "name",
                  "name.*",
                ],
                "lenient": true,
                "query": "Robert\\/Bobby Bell",
              },
            }
        `);
    });
    test('simple value; with backwards slash', () => {
        expect(stringQuery(nameParam, 'Robert\\Bobby Bell')).toMatchInlineSnapshot(`
            {
              "multi_match": {
                "fields": [
                  "name",
                  "name.*",
                ],
                "lenient": true,
                "query": "Robert\\Bobby Bell",
              },
            }
        `);
    });
    test('simple value; with characters', () => {
        expect(stringQuery(nameParam, '平仮名')).toMatchInlineSnapshot(`
            {
              "multi_match": {
                "fields": [
                  "name",
                  "name.*",
                ],
                "lenient": true,
                "query": "平仮名",
              },
            }
        `);
    });

    describe('modifiers', () => {
        describe(':exact', () => {
            test('simple value', () => {
                expect(stringQuery(nameParam, 'Robert Bell', 'exact')).toMatchInlineSnapshot(`
                      {
                        "multi_match": {
                          "fields": [
                            "name.keyword",
                            "name.*.keyword",
                          ],
                          "lenient": true,
                          "query": "Robert Bell",
                        },
                      }
              `);
            });
            test('simple value withcase differences', () => {
                expect(stringQuery(nameParam, 'RoBeRt BeLL', 'exact')).toMatchInlineSnapshot(`
                      {
                        "multi_match": {
                          "fields": [
                            "name.keyword",
                            "name.*.keyword",
                          ],
                          "lenient": true,
                          "query": "RoBeRt BeLL",
                        },
                      }
              `);
            });
        });

        describe(':contains', () => {
            test('simple parameter', () => {
                expect(stringQuery(givenParam, 'anne', 'contains')).toMatchInlineSnapshot(`
                                {
                                  "wildcard": {
                                    "name.given": {
                                      "value": "*anne*",
                                    },
                                  },
                                }
                        `);
            });

            test('name parameter', () => {
                expect(stringQuery(nameParam, 'anne', 'contains')).toMatchInlineSnapshot(`
                    {
                      "bool": {
                        "should": [
                          {
                            "wildcard": {
                              "name": {
                                "value": "*anne*",
                              },
                            },
                          },
                          {
                            "wildcard": {
                              "name.family": {
                                "value": "*anne*",
                              },
                            },
                          },
                          {
                            "wildcard": {
                              "name.given": {
                                "value": "*anne*",
                              },
                            },
                          },
                          {
                            "wildcard": {
                              "name.text": {
                                "value": "*anne*",
                              },
                            },
                          },
                          {
                            "wildcard": {
                              "name.prefix": {
                                "value": "*anne*",
                              },
                            },
                          },
                          {
                            "wildcard": {
                              "name.suffix": {
                                "value": "*anne*",
                              },
                            },
                          },
                        ],
                      },
                    }
                `);
            });

            test('address parameter', () => {
                expect(stringQuery(addressParam, 'new', 'contains')).toMatchInlineSnapshot(`
                    {
                      "bool": {
                        "should": [
                          {
                            "wildcard": {
                              "address": {
                                "value": "*new*",
                              },
                            },
                          },
                          {
                            "wildcard": {
                              "address.city": {
                                "value": "*new*",
                              },
                            },
                          },
                          {
                            "wildcard": {
                              "address.country": {
                                "value": "*new*",
                              },
                            },
                          },
                          {
                            "wildcard": {
                              "address.district": {
                                "value": "*new*",
                              },
                            },
                          },
                          {
                            "wildcard": {
                              "address.line": {
                                "value": "*new*",
                              },
                            },
                          },
                          {
                            "wildcard": {
                              "address.postalCode": {
                                "value": "*new*",
                              },
                            },
                          },
                          {
                            "wildcard": {
                              "address.state": {
                                "value": "*new*",
                              },
                            },
                          },
                          {
                            "wildcard": {
                              "address.text": {
                                "value": "*new*",
                              },
                            },
                          },
                        ],
                      },
                    }
                `);
            });
        });
    });
});
