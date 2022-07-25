/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_read_work_queue_runs_work_queues__id__get_runs_post } from '../models/Body_read_work_queue_runs_work_queues__id__get_runs_post';
import type { Body_read_work_queues_work_queues_filter_post } from '../models/Body_read_work_queues_work_queues_filter_post';
import type { FlowRun } from '../models/FlowRun';
import type { WorkQueue } from '../models/WorkQueue';
import type { WorkQueueCreate } from '../models/WorkQueueCreate';
import type { WorkQueueUpdate } from '../models/WorkQueueUpdate';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class WorkQueuesService {

    /**
     * Create Work Queue
     * Creates a new work queue.
     *
     * If a work queue with the same name already exists, an error
     * will be raised.
     * @param requestBody
     * @param xPrefectApiVersion
     * @returns WorkQueue Successful Response
     * @throws ApiError
     */
    public static createWorkQueueWorkQueuesPost(
        requestBody: WorkQueueCreate,
        xPrefectApiVersion?: string,
    ): CancelablePromise<WorkQueue> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/work_queues/',
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
     * Read Work Queue
     * Get a work queue by id.
     * @param id The work queue id
     * @param xPrefectApiVersion
     * @returns WorkQueue Successful Response
     * @throws ApiError
     */
    public static readWorkQueueWorkQueuesIdGet(
        id: string,
        xPrefectApiVersion?: string,
    ): CancelablePromise<WorkQueue> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/work_queues/{id}',
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
     * Delete Work Queue
     * Delete a work queue by id.
     * @param id The work queue id
     * @param xPrefectApiVersion
     * @returns void
     * @throws ApiError
     */
    public static deleteWorkQueueWorkQueuesIdDelete(
        id: string,
        xPrefectApiVersion?: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/work_queues/{id}',
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
     * Update Work Queue
     * Updates an existing work queue.
     * @param id The work queue id
     * @param requestBody
     * @param xPrefectApiVersion
     * @returns void
     * @throws ApiError
     */
    public static updateWorkQueueWorkQueuesIdPatch(
        id: string,
        requestBody: WorkQueueUpdate,
        xPrefectApiVersion?: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/work_queues/{id}',
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
     * Read Work Queue By Name
     * Get a work queue by id.
     * @param name The work queue name
     * @param xPrefectApiVersion
     * @returns WorkQueue Successful Response
     * @throws ApiError
     */
    public static readWorkQueueByNameWorkQueuesNameNameGet(
        name: string,
        xPrefectApiVersion?: string,
    ): CancelablePromise<WorkQueue> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/work_queues/name/{name}',
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
     * Read Work Queue Runs
     * Get flow runs from the work queue.
     * @param id The work queue id
     * @param xPrefectApiVersion
     * @param requestBody
     * @returns FlowRun Successful Response
     * @throws ApiError
     */
    public static readWorkQueueRunsWorkQueuesIdGetRunsPost(
        id: string,
        xPrefectApiVersion?: string,
        requestBody?: Body_read_work_queue_runs_work_queues__id__get_runs_post,
    ): CancelablePromise<Array<FlowRun>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/work_queues/{id}/get_runs',
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
     * Read Work Queues
     * Query for work queues.
     * @param xPrefectApiVersion
     * @param requestBody
     * @returns WorkQueue Successful Response
     * @throws ApiError
     */
    public static readWorkQueuesWorkQueuesFilterPost(
        xPrefectApiVersion?: string,
        requestBody?: Body_read_work_queues_work_queues_filter_post,
    ): CancelablePromise<Array<WorkQueue>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/work_queues/filter',
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
