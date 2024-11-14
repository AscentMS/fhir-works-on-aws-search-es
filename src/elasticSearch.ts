/*
 *  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: Apache-2.0
 */

import { defaultProvider } from '@aws-sdk/credential-provider-node';
import { Client } from '@opensearch-project/opensearch';
import { AwsSigv4Signer } from '@opensearch-project/opensearch/aws';

const { IS_OFFLINE } = process.env;

let esDomainEndpoint = process.env.ELASTICSEARCH_DOMAIN_ENDPOINT || 'https://fake-es-endpoint.com';
if (IS_OFFLINE && IS_OFFLINE === 'true') {
    esDomainEndpoint = process.env.OFFLINE_ELASTICSEARCH_DOMAIN_ENDPOINT || 'https://fake-es-endpoint.com';
}

// eslint-disable-next-line import/prefer-default-export
export const OpensearchClient = new Client({
    ...AwsSigv4Signer({
        region: process.env.AWS_REGION || 'eu-west-2',
        service: 'es',
        getCredentials: () => {
            const credentialsProvider = defaultProvider();
            return credentialsProvider();
        },
    }),
    node: esDomainEndpoint
});
