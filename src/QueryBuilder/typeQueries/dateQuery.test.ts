/*
 *  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: Apache-2.0
 */
import { dateQuery } from './dateQuery';
import { FHIRSearchParametersRegistry } from '../../FHIRSearchParametersRegistry';
import { parseDateSearchValue } from '../../FhirQueryParser/typeParsers/dateParser';

const fhirSearchParametersRegistry = new FHIRSearchParametersRegistry('4.0.1');
const birthdateParam = fhirSearchParametersRegistry.getSearchParameter('Patient', 'birthdate')!.compiled[0];

describe('dateQuery', () => {
    test('no prefix', () => {
        expect(dateQuery(birthdateParam, parseDateSearchValue('1999-09-09'))).toMatchInlineSnapshot(`
            {
              "bool": {
                "should": [
                  {
                    "range": {
                      "birthDate": {
                        "gte": 1999-09-09T00:00:00.000Z,
                        "lte": 1999-09-09T23:59:59.999Z,
                      },
                    },
                  },
                  {
                    "bool": {
                      "must": [
                        {
                          "exists": {
                            "field": "birthDate.start",
                          },
                        },
                        {
                          "exists": {
                            "field": "birthDate.end",
                          },
                        },
                        {
                          "bool": {
                            "must": [
                              {
                                "range": {
                                  "birthDate.start": {
                                    "gte": 1999-09-09T00:00:00.000Z,
                                  },
                                },
                              },
                              {
                                "range": {
                                  "birthDate.end": {
                                    "lte": 1999-09-09T23:59:59.999Z,
                                  },
                                },
                              },
                            ],
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            }
        `);
    });
    test('eq', () => {
        expect(dateQuery(birthdateParam, parseDateSearchValue('eq1999-09-09'))).toMatchInlineSnapshot(`
            {
              "bool": {
                "should": [
                  {
                    "range": {
                      "birthDate": {
                        "gte": 1999-09-09T00:00:00.000Z,
                        "lte": 1999-09-09T23:59:59.999Z,
                      },
                    },
                  },
                  {
                    "bool": {
                      "must": [
                        {
                          "exists": {
                            "field": "birthDate.start",
                          },
                        },
                        {
                          "exists": {
                            "field": "birthDate.end",
                          },
                        },
                        {
                          "bool": {
                            "must": [
                              {
                                "range": {
                                  "birthDate.start": {
                                    "gte": 1999-09-09T00:00:00.000Z,
                                  },
                                },
                              },
                              {
                                "range": {
                                  "birthDate.end": {
                                    "lte": 1999-09-09T23:59:59.999Z,
                                  },
                                },
                              },
                            ],
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            }
        `);
    });
    test('ne', () => {
        expect(dateQuery(birthdateParam, parseDateSearchValue('ne1999-09-09'))).toMatchInlineSnapshot(`
            {
              "bool": {
                "should": [
                  {
                    "bool": {
                      "should": [
                        {
                          "range": {
                            "birthDate": {
                              "gt": 1999-09-09T23:59:59.999Z,
                            },
                          },
                        },
                        {
                          "range": {
                            "birthDate": {
                              "lt": 1999-09-09T00:00:00.000Z,
                            },
                          },
                        },
                      ],
                    },
                  },
                  {
                    "bool": {
                      "must": [
                        {
                          "exists": {
                            "field": "birthDate.start",
                          },
                        },
                        {
                          "exists": {
                            "field": "birthDate.end",
                          },
                        },
                        {
                          "bool": {
                            "must_not": {
                              "bool": {
                                "must": [
                                  {
                                    "range": {
                                      "birthDate.start": {
                                        "gte": 1999-09-09T00:00:00.000Z,
                                      },
                                    },
                                  },
                                  {
                                    "range": {
                                      "birthDate.end": {
                                        "lte": 1999-09-09T23:59:59.999Z,
                                      },
                                    },
                                  },
                                ],
                              },
                            },
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            }
        `);
    });
    test('lt', () => {
        expect(dateQuery(birthdateParam, parseDateSearchValue('lt1999-09-09'))).toMatchInlineSnapshot(`
            {
              "bool": {
                "should": [
                  {
                    "range": {
                      "birthDate": {
                        "lt": 1999-09-09T23:59:59.999Z,
                      },
                    },
                  },
                  {
                    "bool": {
                      "must": [
                        {
                          "exists": {
                            "field": "birthDate.start",
                          },
                        },
                        {
                          "exists": {
                            "field": "birthDate.end",
                          },
                        },
                        {
                          "range": {
                            "birthDate.start": {
                              "lte": 1999-09-09T23:59:59.999Z,
                            },
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            }
        `);
    });
    test('le', () => {
        expect(dateQuery(birthdateParam, parseDateSearchValue('le1999-09-09'))).toMatchInlineSnapshot(`
            {
              "bool": {
                "should": [
                  {
                    "range": {
                      "birthDate": {
                        "lte": 1999-09-09T23:59:59.999Z,
                      },
                    },
                  },
                  {
                    "bool": {
                      "must": [
                        {
                          "exists": {
                            "field": "birthDate.start",
                          },
                        },
                        {
                          "exists": {
                            "field": "birthDate.end",
                          },
                        },
                        {
                          "range": {
                            "birthDate.start": {
                              "lte": 1999-09-09T23:59:59.999Z,
                            },
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            }
        `);
    });
    test('gt', () => {
        expect(dateQuery(birthdateParam, parseDateSearchValue('gt1999-09-09'))).toMatchInlineSnapshot(`
            {
              "bool": {
                "should": [
                  {
                    "range": {
                      "birthDate": {
                        "gt": 1999-09-09T00:00:00.000Z,
                      },
                    },
                  },
                  {
                    "bool": {
                      "must": [
                        {
                          "exists": {
                            "field": "birthDate.start",
                          },
                        },
                        {
                          "exists": {
                            "field": "birthDate.end",
                          },
                        },
                        {
                          "range": {
                            "birthDate.end": {
                              "gte": 1999-09-09T00:00:00.000Z,
                            },
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            }
        `);
    });
    test('ge', () => {
        expect(dateQuery(birthdateParam, parseDateSearchValue('ge1999-09-09'))).toMatchInlineSnapshot(`
            {
              "bool": {
                "should": [
                  {
                    "range": {
                      "birthDate": {
                        "gte": 1999-09-09T00:00:00.000Z,
                      },
                    },
                  },
                  {
                    "bool": {
                      "must": [
                        {
                          "exists": {
                            "field": "birthDate.start",
                          },
                        },
                        {
                          "exists": {
                            "field": "birthDate.end",
                          },
                        },
                        {
                          "range": {
                            "birthDate.end": {
                              "gte": 1999-09-09T00:00:00.000Z,
                            },
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            }
        `);
    });
    test('sa', () => {
        expect(dateQuery(birthdateParam, parseDateSearchValue('sa1999-09-09'))).toMatchInlineSnapshot(`
            {
              "bool": {
                "should": [
                  {
                    "range": {
                      "birthDate": {
                        "gt": 1999-09-09T23:59:59.999Z,
                      },
                    },
                  },
                  {
                    "bool": {
                      "must": [
                        {
                          "exists": {
                            "field": "birthDate.start",
                          },
                        },
                        {
                          "exists": {
                            "field": "birthDate.end",
                          },
                        },
                        {
                          "range": {
                            "birthDate.start": {
                              "gt": 1999-09-09T23:59:59.999Z,
                            },
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            }
        `);
    });
    test('eb', () => {
        expect(dateQuery(birthdateParam, parseDateSearchValue('eb1999-09-09'))).toMatchInlineSnapshot(`
            {
              "bool": {
                "should": [
                  {
                    "range": {
                      "birthDate": {
                        "lt": 1999-09-09T00:00:00.000Z,
                      },
                    },
                  },
                  {
                    "bool": {
                      "must": [
                        {
                          "exists": {
                            "field": "birthDate.start",
                          },
                        },
                        {
                          "exists": {
                            "field": "birthDate.end",
                          },
                        },
                        {
                          "range": {
                            "birthDate.end": {
                              "lt": 1999-09-09T00:00:00.000Z,
                            },
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            }
        `);
    });
});
