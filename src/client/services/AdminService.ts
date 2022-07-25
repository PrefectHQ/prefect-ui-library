/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_clear_database_admin_database_clear_post } from '../models/Body_clear_database_admin_database_clear_post';
import type { Body_create_database_admin_database_create_post } from '../models/Body_create_database_admin_database_create_post';
import type { Body_drop_database_admin_database_drop_post } from '../models/Body_drop_database_admin_database_drop_post';
import type { Settings } from '../models/Settings';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AdminService {

    /**
     * Read Settings
     * Get the current Orion settings
     * @param xPrefectApiVersion
     * @returns Settings Successful Response
     * @throws ApiError
     */
    public static readSettingsAdminSettingsGet(
        xPrefectApiVersion?: string,
    ): CancelablePromise<Settings> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/admin/settings',
            headers: {
                'x-prefect-api-version': xPrefectApiVersion,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read Version
     * Returns the Prefect version number
     * @param xPrefectApiVersion
     * @returns string Successful Response
     * @throws ApiError
     */
    public static readVersionAdminVersionGet(
        xPrefectApiVersion?: string,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/admin/version',
            headers: {
                'x-prefect-api-version': xPrefectApiVersion,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Clear Database
     * Clear all database tables without dropping them.
     * @param xPrefectApiVersion
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static clearDatabaseAdminDatabaseClearPost(
        xPrefectApiVersion?: string,
        requestBody?: Body_clear_database_admin_database_clear_post,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/admin/database/clear',
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
     * Drop Database
     * Drop all database objects.
     * @param xPrefectApiVersion
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static dropDatabaseAdminDatabaseDropPost(
        xPrefectApiVersion?: string,
        requestBody?: Body_drop_database_admin_database_drop_post,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/admin/database/drop',
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
     * Create Database
     * Create all database objects.
     * @param xPrefectApiVersion
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static createDatabaseAdminDatabaseCreatePost(
        xPrefectApiVersion?: string,
        requestBody?: Body_create_database_admin_database_create_post,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/admin/database/create',
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
