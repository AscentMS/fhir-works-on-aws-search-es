/*
 *  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: Apache-2.0
 *
 */

import { Client, errors } from '@elastic/elasticsearch';
import SearchMock from '@elastic/elasticsearch-mock';
import { SearchMappingsManager } from './index';

const TEST_MAPPINGS = {
    Patient: {
        someField: {
            type: 'text',
        },
    },
    Practitioner: {
        someField: {
            type: 'keyword',
        },
    },
};
describe('SearchMappingsManager', () => {
    let searchMock: SearchMock;
    beforeEach(() => {
        searchMock = new SearchMock();
    });
    afterEach(() => {
        searchMock.clearAll();
    });

    test('should update all mappings', async () => {
        const searchMappingsManager = new SearchMappingsManager({
            numberOfShards: 3,
            searchMappings: TEST_MAPPINGS,
            searchClient: new Client({
                node: 'https://fake-es-endpoint.com',
                Connection: searchMock.getConnection(),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            }) as any,
        });

        const putMappingsMock = jest.fn(() => {
            return { statusCode: 200, body: '' };
        });

        searchMock.add({ method: "GET", path: "/" }, () => ({
            name: "mocked-es-instance",
            version: {
                number: "7.12.1",
                build_flavor: "default",
            },
            tagline: "You Know, for Search",
        }));

        searchMock.add(
            {
                method: 'HEAD',
                path: '/:index',
            },
            () => ({ statusCode: 200, body: true }),
        );

        searchMock.add(
            {
                method: 'PUT',
                path: '/:index/_mapping',
            },
            putMappingsMock,
        );

        await searchMappingsManager.createOrUpdateMappings();

        expect(putMappingsMock.mock.calls).toMatchInlineSnapshot(`
            [
              [
                {
                  "body": {
                    "someField": {
                      "type": "text",
                    },
                  },
                  "method": "PUT",
                  "path": "/patient/_mapping",
                  "querystring": {},
                },
              ],
              [
                {
                  "body": {
                    "someField": {
                      "type": "keyword",
                    },
                  },
                  "method": "PUT",
                  "path": "/practitioner/_mapping",
                  "querystring": {},
                },
              ],
            ]
        `);
    });

    test('should create indices if they do not exist', async () => {
        const searchMappingsManager = new SearchMappingsManager({
            numberOfShards: 3,
            searchMappings: TEST_MAPPINGS,
            searchClient: new Client({
                node: 'https://fake-es-endpoint.com',
                Connection: searchMock.getConnection(),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            }) as any,
        });

        searchMock.add({ method: "GET", path: "/" }, () => ({
            name: "mocked-es-instance",
            version: {
                number: "7.12.1",
                build_flavor: "default",
            },
            tagline: "You Know, for Search",
        }));

        searchMock.add(
            {
                method: 'HEAD',
                path: '/patient',
            },
            () =>
                new errors.ResponseError({
                    headers: undefined,
                    statusCode: 404,
                    warnings: null,
                    body: {
                        error: {
                            type: 'index_not_found_exception',
                        },
                    },
                } as never),
        );

        searchMock.add(
            {
                method: 'HEAD',
                path: '/practitioner',
            },
            () => ({ statusCode: 200, body: true }),
        );

        searchMock.add(
            {
                method: 'PUT',
                path: '/practitioner/_mapping',
            },
            () => {
                return { statusCode: 200, body: '' };
            },
        );

        const createIndexMock = jest.fn(() => {
            return { statusCode: 200 };
        });

        searchMock.add(
            {
                method: 'PUT',
                path: '/patient',
            },
            createIndexMock,
        );

        await searchMappingsManager.createOrUpdateMappings();

        expect(createIndexMock.mock.calls).toMatchInlineSnapshot(`
            [
              [
                {
                  "body": {
                    "mappings": {
                      "someField": {
                        "type": "text",
                      },
                    },
                    "settings": {
                      "number_of_shards": 3,
                    },
                  },
                  "method": "PUT",
                  "path": "/patient",
                  "querystring": {},
                },
              ],
            ]
        `);
    });
});
