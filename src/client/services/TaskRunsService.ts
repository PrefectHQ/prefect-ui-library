/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_count_task_runs_task_runs_count_post } from '../models/Body_count_task_runs_task_runs_count_post';
import type { Body_read_task_runs_task_runs_filter_post } from '../models/Body_read_task_runs_task_runs_filter_post';
import type { Body_set_task_run_state_task_runs__id__set_state_post } from '../models/Body_set_task_run_state_task_runs__id__set_state_post';
import type { Body_task_run_history_task_runs_history_post } from '../models/Body_task_run_history_task_runs_history_post';
import type { HistoryResponse } from '../models/HistoryResponse';
import type { OrchestrationResult } from '../models/OrchestrationResult';
import type { TaskRun } from '../models/TaskRun';
import type { TaskRunCreate } from '../models/TaskRunCreate';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TaskRunsService {

    /**
     * Create Task Run
     * Create a task run. If a task run with the same flow_run_id,
     * task_key, and dynamic_key already exists, the existing task
     * run will be returned.
     *
     * If no state is provided, the task run will be created in a PENDING state.
     * @param requestBody
     * @param xPrefectApiVersion
     * @returns TaskRun Successful Response
     * @throws ApiError
     */
    public static createTaskRunTaskRunsPost(
        requestBody: TaskRunCreate,
        xPrefectApiVersion?: string,
    ): CancelablePromise<TaskRun> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/task_runs/',
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
     * Count Task Runs
     * Count task runs.
     * @param xPrefectApiVersion
     * @param requestBody
     * @returns number Successful Response
     * @throws ApiError
     */
    public static countTaskRunsTaskRunsCountPost(
        xPrefectApiVersion?: string,
        requestBody?: Body_count_task_runs_task_runs_count_post,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/task_runs/count',
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
     * Task Run History
     * Query for task run history data across a given range and interval.
     * @param requestBody
     * @param xPrefectApiVersion
     * @returns HistoryResponse Successful Response
     * @throws ApiError
     */
    public static taskRunHistoryTaskRunsHistoryPost(
        requestBody: Body_task_run_history_task_runs_history_post,
        xPrefectApiVersion?: string,
    ): CancelablePromise<Array<HistoryResponse>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/task_runs/history',
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
     * Read Task Run
     * Get a task run by id.
     * @param id The task run id
     * @param xPrefectApiVersion
     * @returns TaskRun Successful Response
     * @throws ApiError
     */
    public static readTaskRunTaskRunsIdGet(
        id: string,
        xPrefectApiVersion?: string,
    ): CancelablePromise<TaskRun> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/task_runs/{id}',
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
     * Delete Task Run
     * Delete a task run by id.
     * @param id The task run id
     * @param xPrefectApiVersion
     * @returns void
     * @throws ApiError
     */
    public static deleteTaskRunTaskRunsIdDelete(
        id: string,
        xPrefectApiVersion?: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/task_runs/{id}',
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
     * Read Task Runs
     * Query for task runs.
     * @param xPrefectApiVersion
     * @param requestBody
     * @returns TaskRun Successful Response
     * @throws ApiError
     */
    public static readTaskRunsTaskRunsFilterPost(
        xPrefectApiVersion?: string,
        requestBody?: Body_read_task_runs_task_runs_filter_post,
    ): CancelablePromise<Array<TaskRun>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/task_runs/filter',
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
     * Set Task Run State
     * Set a task run state, invoking any orchestration rules.
     * @param id The task run id
     * @param requestBody
     * @param xPrefectApiVersion
     * @returns OrchestrationResult Successful Response
     * @throws ApiError
     */
    public static setTaskRunStateTaskRunsIdSetStatePost(
        id: string,
        requestBody: Body_set_task_run_state_task_runs__id__set_state_post,
        xPrefectApiVersion?: string,
    ): CancelablePromise<OrchestrationResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/task_runs/{id}/set_state',
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
