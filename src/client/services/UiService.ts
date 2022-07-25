/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_read_flow_run_history_ui_flow_runs_history_post } from '../models/Body_read_flow_run_history_ui_flow_runs_history_post';
import type { SimpleFlowRun } from '../models/SimpleFlowRun';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UiService {

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
