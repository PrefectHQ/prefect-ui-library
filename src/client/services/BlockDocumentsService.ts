/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BlockDocument } from '../models/BlockDocument';
import type { BlockDocumentCreate } from '../models/BlockDocumentCreate';
import type { BlockDocumentUpdate } from '../models/BlockDocumentUpdate';
import type { Body_read_block_documents_block_documents_filter_post } from '../models/Body_read_block_documents_block_documents_filter_post';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class BlockDocumentsService {

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
     * Create Block Document
     * Create a new block document.
     * @param requestBody
     * @param xPrefectApiVersion
     * @returns BlockDocument Successful Response
     * @throws ApiError
     */
    public static createBlockDocumentBlockDocumentsPost(
        requestBody: BlockDocumentCreate,
        xPrefectApiVersion?: string,
    ): CancelablePromise<BlockDocument> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/block_documents/',
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
     * Read Block Documents
     * Query for block documents.
     * @param xPrefectApiVersion
     * @param requestBody
     * @returns BlockDocument Successful Response
     * @throws ApiError
     */
    public static readBlockDocumentsBlockDocumentsFilterPost(
        xPrefectApiVersion?: string,
        requestBody?: Body_read_block_documents_block_documents_filter_post,
    ): CancelablePromise<Array<BlockDocument>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/block_documents/filter',
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
     * Read Block Document By Id
     * @param id The block document id
     * @param includeSecrets Whether to include sensitive values in the block document.
     * @param xPrefectApiVersion
     * @returns BlockDocument Successful Response
     * @throws ApiError
     */
    public static readBlockDocumentByIdBlockDocumentsIdGet(
        id: string,
        includeSecrets: boolean = false,
        xPrefectApiVersion?: string,
    ): CancelablePromise<BlockDocument> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/block_documents/{id}',
            path: {
                'id': id,
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
     * Delete Block Document
     * @param id The block document id
     * @param xPrefectApiVersion
     * @returns void
     * @throws ApiError
     */
    public static deleteBlockDocumentBlockDocumentsIdDelete(
        id: string,
        xPrefectApiVersion?: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/block_documents/{id}',
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
     * Update Block Document Data
     * @param id The block document id
     * @param requestBody
     * @param xPrefectApiVersion
     * @returns void
     * @throws ApiError
     */
    public static updateBlockDocumentDataBlockDocumentsIdPatch(
        id: string,
        requestBody: BlockDocumentUpdate,
        xPrefectApiVersion?: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/block_documents/{id}',
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

}
