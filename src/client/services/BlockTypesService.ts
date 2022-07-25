/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BlockDocument } from '../models/BlockDocument';
import type { BlockType } from '../models/BlockType';
import type { BlockTypeCreate } from '../models/BlockTypeCreate';
import type { BlockTypeUpdate } from '../models/BlockTypeUpdate';
import type { Body_read_block_types_block_types_filter_post } from '../models/Body_read_block_types_block_types_filter_post';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class BlockTypesService {

    /**
     * Create Block Type
     * Create a new block type
     * @param requestBody
     * @param xPrefectApiVersion
     * @returns BlockType Successful Response
     * @throws ApiError
     */
    public static createBlockTypeBlockTypesPost(
        requestBody: BlockTypeCreate,
        xPrefectApiVersion?: string,
    ): CancelablePromise<BlockType> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/block_types/',
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
     * Read Block Type By Id
     * Get a block type by ID.
     * @param id The block type ID
     * @param xPrefectApiVersion
     * @returns BlockType Successful Response
     * @throws ApiError
     */
    public static readBlockTypeByIdBlockTypesIdGet(
        id: string,
        xPrefectApiVersion?: string,
    ): CancelablePromise<BlockType> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/block_types/{id}',
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
     * Delete Block Type
     * @param id The block type ID
     * @param xPrefectApiVersion
     * @returns void
     * @throws ApiError
     */
    public static deleteBlockTypeBlockTypesIdDelete(
        id: string,
        xPrefectApiVersion?: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/block_types/{id}',
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
     * Update Block Type
     * Update a block type.
     * @param id The block type ID
     * @param requestBody
     * @param xPrefectApiVersion
     * @returns void
     * @throws ApiError
     */
    public static updateBlockTypeBlockTypesIdPatch(
        id: string,
        requestBody: BlockTypeUpdate,
        xPrefectApiVersion?: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/block_types/{id}',
            path: {
                'id': id,
            },
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
     * Read Block Type By Name
     * Get a block type by name.
     * @param name The block type name
     * @param xPrefectApiVersion
     * @returns BlockType Successful Response
     * @throws ApiError
     */
    public static readBlockTypeByNameBlockTypesNameNameGet(
        name: string,
        xPrefectApiVersion?: string,
    ): CancelablePromise<BlockType> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/block_types/name/{name}',
            path: {
                'name': name,
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
     * Read Block Types
     * Gets all block types. Optionally limit return with limit and offset.
     * @param xPrefectApiVersion
     * @param requestBody
     * @returns BlockType Successful Response
     * @throws ApiError
     */
    public static readBlockTypesBlockTypesFilterPost(
        xPrefectApiVersion?: string,
        requestBody?: Body_read_block_types_block_types_filter_post,
    ): CancelablePromise<Array<BlockType>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/block_types/filter',
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
     * Read Block Documents For Block Type
     * @param name The block type name
     * @param includeSecrets Whether to include sensitive values in the block document.
     * @param xPrefectApiVersion
     * @returns BlockDocument Successful Response
     * @throws ApiError
     */
    public static readBlockDocumentsForBlockTypeBlockTypesNameNameBlockDocumentsGet(
        name: string,
        includeSecrets: boolean = false,
        xPrefectApiVersion?: string,
    ): CancelablePromise<Array<BlockDocument>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/block_types/name/{name}/block_documents',
            path: {
                'name': name,
            },
            headers: {
                'x-prefect-api-version': xPrefectApiVersion,
            },
            query: {
                'include_secrets': includeSecrets,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read Block Document By Name For Block Type
     * @param blockTypeName The block type name
     * @param blockDocumentName The block type name
     * @param includeSecrets Whether to include sensitive values in the block document.
     * @param xPrefectApiVersion
     * @returns BlockDocument Successful Response
     * @throws ApiError
     */
    public static readBlockDocumentByNameForBlockTypeBlockTypesNameBlockTypeNameBlockDocumentsNameBlockDocumentNameGet(
        blockTypeName: string,
        blockDocumentName: string,
        includeSecrets: boolean = false,
        xPrefectApiVersion?: string,
    ): CancelablePromise<BlockDocument> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/block_types/name/{block_type_name}/block_documents/name/{block_document_name}',
            path: {
                'block_type_name': blockTypeName,
                'block_document_name': blockDocumentName,
            },
            headers: {
                'x-prefect-api-version': xPrefectApiVersion,
            },
            query: {
                'include_secrets': includeSecrets,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Install System Block Types
     * Install block types that the system expects to be present
     * @param xPrefectApiVersion
     * @returns any Successful Response
     * @throws ApiError
     */
    public static installSystemBlockTypesBlockTypesInstallSystemBlockTypesPost(
        xPrefectApiVersion?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/block_types/install_system_block_types',
            headers: {
                'x-prefect-api-version': xPrefectApiVersion,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
