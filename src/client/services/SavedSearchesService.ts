/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_read_saved_searches_saved_searches_filter_post } from '../models/Body_read_saved_searches_saved_searches_filter_post';
import type { SavedSearch } from '../models/SavedSearch';
import type { SavedSearchCreate } from '../models/SavedSearchCreate';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SavedSearchesService {

    /**
     * Create Saved Search
     * Gracefully creates a new saved search from the provided schema.
     *
     * If a saved search with the same name already exists, the saved search's fields are
     * replaced.
     * @param requestBody
     * @param xPrefectApiVersion
     * @returns SavedSearch Successful Response
     * @throws ApiError
     */
    public static createSavedSearchSavedSearchesPut(
        requestBody: SavedSearchCreate,
        xPrefectApiVersion?: string,
    ): CancelablePromise<SavedSearch> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/saved_searches/',
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
     * Read Saved Search
     * Get a saved search by id.
     * @param id The saved search id
     * @param xPrefectApiVersion
     * @returns SavedSearch Successful Response
     * @throws ApiError
     */
    public static readSavedSearchSavedSearchesIdGet(
        id: string,
        xPrefectApiVersion?: string,
    ): CancelablePromise<SavedSearch> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/saved_searches/{id}',
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
     * Delete Saved Search
     * Delete a saved search by id.
     * @param id The saved search id
     * @param xPrefectApiVersion
     * @returns void
     * @throws ApiError
     */
    public static deleteSavedSearchSavedSearchesIdDelete(
        id: string,
        xPrefectApiVersion?: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/saved_searches/{id}',
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
     * Read Saved Searches
     * Query for saved searches.
     * @param xPrefectApiVersion
     * @param requestBody
     * @returns SavedSearch Successful Response
     * @throws ApiError
     */
    public static readSavedSearchesSavedSearchesFilterPost(
        xPrefectApiVersion?: string,
        requestBody?: Body_read_saved_searches_saved_searches_filter_post,
    ): CancelablePromise<Array<SavedSearch>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/saved_searches/filter',
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
