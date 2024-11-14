/*
 *  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: Apache-2.0
 */

import { InvalidSearchParameterError } from '@ascentms/fhir-works-on-aws-interface';
import { buildSortClause, parseSortParameter } from './sort';
import { FHIRSearchParametersRegistry } from '../FHIRSearchParametersRegistry';

const fhirSearchParametersRegistry = new FHIRSearchParametersRegistry('4.0.1');

describe('parseSortParameter', () => {
    test('status,-date,category', () => {
        expect(parseSortParameter('status,-date,category')).toMatchInlineSnapshot(`
            [
              {
                "order": "asc",
                "searchParam": "status",
              },
              {
                "order": "desc",
                "searchParam": "date",
              },
              {
                "order": "asc",
                "searchParam": "category",
              },
            ]
        `);
    });
});

describe('buildSortClause', () => {
    test('valid date params', () => {
        expect(buildSortClause(fhirSearchParametersRegistry, 'Patient', '-_lastUpdated,birthdate'))
            .toMatchInlineSnapshot(`
            [
              {
                "meta.lastUpdated": {
                  "order": "desc",
                  "unmapped_type": "long",
                },
              },
              {
                "meta.lastUpdated.end": {
                  "order": "desc",
                  "unmapped_type": "long",
                },
              },
              {
                "birthDate": {
                  "order": "asc",
                  "unmapped_type": "long",
                },
              },
              {
                "birthDate.start": {
                  "order": "asc",
                  "unmapped_type": "long",
                },
              },
            ]
        `);
    });

    test('invalid params', () => {
        [
            'notAPatientParam',
            '_lastUpdated,notAPatientParam',
            '+birthdate',
            '#$%/., symbols and stuff',
            'valid params must match a param name from fhirSearchParametersRegistry, so most strings are invalid...',
            'name', // This is actually a valid param but right now we only allow sorting by date params
        ].forEach((p) =>
            expect(() => buildSortClause(fhirSearchParametersRegistry, 'Patient', p)).toThrow(
                InvalidSearchParameterError,
            ),
        );
    });
});
