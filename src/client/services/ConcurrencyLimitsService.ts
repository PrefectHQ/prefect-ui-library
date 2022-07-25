/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_read_concurrency_limits_concurrency_limits_filter_post } from '../models/Body_read_concurrency_limits_concurrency_limits_filter_post';
import type { ConcurrencyLimit } from '../models/ConcurrencyLimit';
import type { ConcurrencyLimitCreate } from '../models/ConcurrencyLimitCreate';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ConcurrencyLimitsService {

    /**
     * Create Concurrency Limit
     * @param requestBody
     * @param xPrefectApiVersion
     * @returns ConcurrencyLimit Successful Response
     * @throws ApiError
     */
    public static createConcurrencyLimitConcurrencyLimitsPost(
        requestBody: ConcurrencyLimitCreate,
        xPrefectApiVersion?: string,
    ): CancelablePromise<ConcurrencyLimit> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/concurrency_limits/',
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
     * Read Concurrency Limit
     * Get a concurrency limit by id.
     *
     * The `active slots` field contains a list of TaskRun IDs currently using a
     * concurrency slot for the specified tag.
     * @param id The concurrency limit id
     * @param xPrefectApiVersion
     * @returns ConcurrencyLimit Successful Response
     * @throws ApiError
     */
    public static readConcurrencyLimitConcurrencyLimitsIdGet(
        id: string,
        xPrefectApiVersion?: string,
    ): CancelablePromise<ConcurrencyLimit> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/concurrency_limits/{id}',
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
     * Delete Concurrency Limit
     * @param id The concurrency limit id
     * @param xPrefectApiVersion
     * @returns any Successful Response
     * @throws ApiError
     */
    public static deleteConcurrencyLimitConcurrencyLimitsIdDelete(
        id: string,
        xPrefectApiVersion?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/concurrency_limits/{id}',
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
     * Read Concurrency Limit By Tag
     * Get a concurrency limit by tag.
     *
     * The `active slots` field contains a list of TaskRun IDs currently using a
     * concurrency slot for the specified tag.
     * @param tag The tag name
     * @param xPrefectApiVersion
     * @returns ConcurrencyLimit Successful Response
     * @throws ApiError
     */
    public static readConcurrencyLimitByTagConcurrencyLimitsTagTagGet(
        tag: string,
        xPrefectApiVersion?: string,
    ): CancelablePromise<ConcurrencyLimit> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/concurrency_limits/tag/{tag}',
            path: {
                'tag': tag,
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
     * Delete Concurrency Limit By Tag
     * @param tag The tag name
     * @param xPrefectApiVersion
     * @returns any Successful Response
     * @throws ApiError
     */
    public static deleteConcurrencyLimitByTagConcurrencyLimitsTagTagDelete(
        tag: string,
        xPrefectApiVersion?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/concurrency_limits/tag/{tag}',
            path: {
                'tag': tag,
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
     * Read Concurrency Limits
     * Query for concurrency limits.
     *
     * For each concurrency limit the `active slots` field contains a list of TaskRun IDs
     * currently using a concurrency slot for the specified tag.
     * @param xPrefectApiVersion
     * @param requestBody
     * @returns ConcurrencyLimit Successful Response
     * @throws ApiError
     */
    public static readConcurrencyLimitsConcurrencyLimitsFilterPost(
        xPrefectApiVersion?: string,
        requestBody?: Body_read_concurrency_limits_concurrency_limits_filter_post,
    ): CancelablePromise<Array<ConcurrencyLimit>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/concurrency_limits/filter',
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
