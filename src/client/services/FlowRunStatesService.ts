/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { State } from '../models/State';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class FlowRunStatesService {

    /**
     * Read Flow Run State
     * Get a flow run state by id.
     * @param id The flow run state id
     * @param xPrefectApiVersion
     * @returns State Successful Response
     * @throws ApiError
     */
    public static readFlowRunStateFlowRunStatesIdGet(
        id: string,
        xPrefectApiVersion?: string,
    ): CancelablePromise<State> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/flow_run_states/{id}',
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
     * Read Flow Run States
     * Get states associated with a flow run.
     * @param flowRunId
     * @param xPrefectApiVersion
     * @returns State Successful Response
     * @throws ApiError
     */
    public static readFlowRunStatesFlowRunStatesGet(
        flowRunId: string,
        xPrefectApiVersion?: string,
    ): CancelablePromise<Array<State>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/flow_run_states/',
            headers: {
                'x-prefect-api-version': xPrefectApiVersion,
            },
            query: {
                'flow_run_id': flowRunId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
