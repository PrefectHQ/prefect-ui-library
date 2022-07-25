/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BlockSchema } from '../models/BlockSchema';
import type { BlockSchemaCreate } from '../models/BlockSchemaCreate';
import type { Body_read_block_schemas_block_schemas_filter_post } from '../models/Body_read_block_schemas_block_schemas_filter_post';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class BlockSchemasService {

    /**
     * Create Block Schema
     * @param requestBody
     * @param xPrefectApiVersion
     * @returns BlockSchema Successful Response
     * @throws ApiError
     */
    public static createBlockSchemaBlockSchemasPost(
        requestBody: BlockSchemaCreate,
        xPrefectApiVersion?: string,
    ): CancelablePromise<BlockSchema> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/block_schemas/',
            headers: {
                'x-prefect-api-version': xPrefectApiVersion,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read Block Schema By Id
     * Get a block schema by id.
     * @param id The block schema id
     * @param xPrefectApiVersion
     * @returns BlockSchema Successful Response
     * @throws ApiError
     */
    public static readBlockSchemaByIdBlockSchemasIdGet(
        id: string,
        xPrefectApiVersion?: string,
    ): CancelablePromise<BlockSchema> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/block_schemas/{id}',
            path: {
                'id': id,
            },
            headers: {
                'x-prefect-api-version': xPrefectApiVersion,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete Block Schema
     * Delete a block schema by id.
     * @param id The block schema id
     * @param xPrefectApiVersion
     * @returns void
     * @throws ApiError
     */
    public static deleteBlockSchemaBlockSchemasIdDelete(
        id: string,
        xPrefectApiVersion?: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/block_schemas/{id}',
            path: {
                'id': id,
            },
            headers: {
                'x-prefect-api-version': xPrefectApiVersion,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read Block Schemas
     * Read all block schemas, optionally filtered by type
     * @param xPrefectApiVersion
     * @param requestBody
     * @returns BlockSchema Successful Response
     * @throws ApiError
     */
    public static readBlockSchemasBlockSchemasFilterPost(
        xPrefectApiVersion?: string,
        requestBody?: Body_read_block_schemas_block_schemas_filter_post,
    ): CancelablePromise<Array<BlockSchema>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/block_schemas/filter',
            headers: {
                'x-prefect-api-version': xPrefectApiVersion,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read Block Schema By Checksum
     * @param checksum The block schema checksum
     * @param xPrefectApiVersion
     * @returns BlockSchema Successful Response
     * @throws ApiError
     */
    public static readBlockSchemaByChecksumBlockSchemasChecksumChecksumGet(
        checksum: string,
        xPrefectApiVersion?: string,
    ): CancelablePromise<BlockSchema> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/block_schemas/checksum/{checksum}',
            path: {
                'checksum': checksum,
            },
            headers: {
                'x-prefect-api-version': xPrefectApiVersion,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
