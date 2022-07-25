/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { State } from '../models/State';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TaskRunStatesService {

    /**
     * Read Task Run State
     * Get a task run state by id.
     * @param id The task run state id
     * @param xPrefectApiVersion
     * @returns State Successful Response
     * @throws ApiError
     */
    public static readTaskRunStateTaskRunStatesIdGet(
        id: string,
        xPrefectApiVersion?: string,
    ): CancelablePromise<State> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/task_run_states/{id}',
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
     * Read Task Run States
     * Get states associated with a task run.
     * @param taskRunId
     * @param xPrefectApiVersion
     * @returns State Successful Response
     * @throws ApiError
     */
    public static readTaskRunStatesTaskRunStatesGet(
        taskRunId: string,
        xPrefectApiVersion?: string,
    ): CancelablePromise<Array<State>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/task_run_states/',
            headers: {
                'x-prefect-api-version': xPrefectApiVersion,
            },
            query: {
                'task_run_id': taskRunId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
