/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_count_flow_runs_flow_runs_count_post } from '../models/Body_count_flow_runs_flow_runs_count_post';
import type { Body_flow_run_history_flow_runs_history_post } from '../models/Body_flow_run_history_flow_runs_history_post';
import type { Body_read_flow_run_history_ui_flow_runs_history_post } from '../models/Body_read_flow_run_history_ui_flow_runs_history_post';
import type { Body_read_flow_runs_flow_runs_filter_post } from '../models/Body_read_flow_runs_flow_runs_filter_post';
import type { Body_set_flow_run_state_flow_runs__id__set_state_post } from '../models/Body_set_flow_run_state_flow_runs__id__set_state_post';
import type { DependencyResult } from '../models/DependencyResult';
import type { FlowRun } from '../models/FlowRun';
import type { FlowRunCreate } from '../models/FlowRunCreate';
import type { FlowRunUpdate } from '../models/FlowRunUpdate';
import type { HistoryResponse } from '../models/HistoryResponse';
import type { OrchestrationResult } from '../models/OrchestrationResult';
import type { SimpleFlowRun } from '../models/SimpleFlowRun';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class FlowRunsService {

    /**
     * Create Flow Run
     * Create a flow run. If a flow run with the same flow_id and
     * idempotency key already exists, the existing flow run will be returned.
     *
     * If no state is provided, the flow run will be created in a PENDING state.
     * @param requestBody
     * @param xPrefectApiVersion
     * @returns FlowRun Successful Response
     * @throws ApiError
     */
    public static createFlowRunFlowRunsPost(
        requestBody: FlowRunCreate,
        xPrefectApiVersion?: string,
    ): CancelablePromise<FlowRun> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/flow_runs/',
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
     * Read Flow Run
     * Get a flow run by id.
     * @param id The flow run id
     * @param xPrefectApiVersion
     * @returns FlowRun Successful Response
     * @throws ApiError
     */
    public static readFlowRunFlowRunsIdGet(
        id: string,
        xPrefectApiVersion?: string,
    ): CancelablePromise<FlowRun> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/flow_runs/{id}',
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
     * Delete Flow Run
     * Delete a flow run by id.
     * @param id The flow run id
     * @param xPrefectApiVersion
     * @returns void
     * @throws ApiError
     */
    public static deleteFlowRunFlowRunsIdDelete(
        id: string,
        xPrefectApiVersion?: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/flow_runs/{id}',
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
     * Update Flow Run
     * Updates a flow run.
     * @param id The flow run id
     * @param requestBody
     * @param xPrefectApiVersion
     * @returns void
     * @throws ApiError
     */
    public static updateFlowRunFlowRunsIdPatch(
        id: string,
        requestBody: FlowRunUpdate,
        xPrefectApiVersion?: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/flow_runs/{id}',
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
     * Count Flow Runs
     * Query for flow runs.
     * @param xPrefectApiVersion
     * @param requestBody
     * @returns number Successful Response
     * @throws ApiError
     */
    public static countFlowRunsFlowRunsCountPost(
        xPrefectApiVersion?: string,
        requestBody?: Body_count_flow_runs_flow_runs_count_post,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/flow_runs/count',
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
     * Flow Run History
     * Query for flow run history data across a given range and interval.
     * @param requestBody
     * @param xPrefectApiVersion
     * @returns HistoryResponse Successful Response
     * @throws ApiError
     */
    public static flowRunHistoryFlowRunsHistoryPost(
        requestBody: Body_flow_run_history_flow_runs_history_post,
        xPrefectApiVersion?: string,
    ): CancelablePromise<Array<HistoryResponse>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/flow_runs/history',
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
     * Read Flow Run Graph
     * Get a task run dependency map for a given flow run.
     * @param id The flow run id
     * @param xPrefectApiVersion
     * @returns DependencyResult Successful Response
     * @throws ApiError
     */
    public static readFlowRunGraphFlowRunsIdGraphGet(
        id: string,
        xPrefectApiVersion?: string,
    ): CancelablePromise<Array<DependencyResult>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/flow_runs/{id}/graph',
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
     * Read Flow Runs
     * Query for flow runs.
     * @param xPrefectApiVersion
     * @param requestBody
     * @returns FlowRun Successful Response
     * @throws ApiError
     */
    public static readFlowRunsFlowRunsFilterPost(
        xPrefectApiVersion?: string,
        requestBody?: Body_read_flow_runs_flow_runs_filter_post,
    ): CancelablePromise<Array<FlowRun>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/flow_runs/filter',
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
     * Set Flow Run State
     * Set a flow run state, invoking any orchestration rules.
     * @param id The flow run id
     * @param requestBody
     * @param xPrefectApiVersion
     * @returns OrchestrationResult Successful Response
     * @throws ApiError
     */
    public static setFlowRunStateFlowRunsIdSetStatePost(
        id: string,
        requestBody: Body_set_flow_run_state_flow_runs__id__set_state_post,
        xPrefectApiVersion?: string,
    ): CancelablePromise<OrchestrationResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/flow_runs/{id}/set_state',
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
     * Read Flow Run History
     * @param xPrefectApiVersion
     * @param requestBody
     * @returns SimpleFlowRun Successful Response
     * @throws ApiError
     */
    public static readFlowRunHistoryUiFlowRunsHistoryPost(
        xPrefectApiVersion?: string,
        requestBody?: Body_read_flow_run_history_ui_flow_runs_history_post,
    ): CancelablePromise<Array<SimpleFlowRun>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/ui/flow_runs/history',
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
