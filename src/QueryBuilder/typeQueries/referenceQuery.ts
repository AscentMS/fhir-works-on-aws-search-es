/*
 *  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: Apache-2.0
 */

import { InvalidSearchParameterError } from '@ascentms/fhir-works-on-aws-interface';
import { CompiledSearchParam } from '../../FHIRSearchParametersRegistry';
import { ReferenceSearchValue } from '../../FhirQueryParser/typeParsers/referenceParser';

const SUPPORTED_MODIFIERS: string[] = [];


export function referenceQuery(
    compiled: CompiledSearchParam,
    value: ReferenceSearchValue,
    useKeywordSubFields: boolean,
    baseUrl: string,
    searchParamName: string,
    target: string[] = [],
    modifier?: string,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): any {
    if (modifier && !SUPPORTED_MODIFIERS.includes(modifier)) {
        throw new InvalidSearchParameterError(`Unsupported reference search modifier: ${modifier}`);
    }

    let references: string[] = [];
    switch (value.referenceType) {
        case 'idOnly':
            references = target.flatMap((targetType: string) => {
                return [`${baseUrl}/${targetType}/${value.id}`, `${targetType}/${value.id}`];
            });
            break;
        case 'relative':
            references.push(`${value.resourceType}/${value.id}`);
            references.push(`${baseUrl}/${value.resourceType}/${value.id}`);
            break;
        case 'url':
            if (value.fhirServiceBaseUrl === baseUrl) {
                references.push(`${value.resourceType}/${value.id}`);
            }
            references.push(`${value.fhirServiceBaseUrl}/${value.resourceType}/${value.id}`);
            break;
        case 'unparseable':
            references.push(value.rawValue);
            break;
        default:
             
            const exhaustiveCheck: never = value;
            return exhaustiveCheck;
    }

    const keywordSuffix = useKeywordSubFields ? '.keyword' : '';
    return { terms: { [`${compiled.path}.reference${keywordSuffix}`]: references } };
}
