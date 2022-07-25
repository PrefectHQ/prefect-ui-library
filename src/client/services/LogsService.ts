/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_read_logs_logs_filter_post } from '../models/Body_read_logs_logs_filter_post';
import type { Log } from '../models/Log';
import type { LogCreate } from '../models/LogCreate';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class LogsService {

    /**
     * Create Logs
     * Create new logs from the provided schema.
     * @param requestBody
     * @param xPrefectApiVersion
     * @returns any Successful Response
     * @throws ApiError
     */
    public static createLogsLogsPost(
        requestBody: Array<LogCreate>,
        xPrefectApiVersion?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/logs/',
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
     * Read Logs
     * Query for logs.
     * @param xPrefectApiVersion
     * @param requestBody
     * @returns Log Successful Response
     * @throws ApiError
     */
    public static readLogsLogsFilterPost(
        xPrefectApiVersion?: string,
        requestBody?: Body_read_logs_logs_filter_post,
    ): CancelablePromise<Array<Log>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/logs/filter',
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
