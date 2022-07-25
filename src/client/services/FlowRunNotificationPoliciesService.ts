/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_read_flow_run_notification_policies_flow_run_notification_policies_filter_post } from '../models/Body_read_flow_run_notification_policies_flow_run_notification_policies_filter_post';
import type { FlowRunNotificationPolicy } from '../models/FlowRunNotificationPolicy';
import type { FlowRunNotificationPolicyCreate } from '../models/FlowRunNotificationPolicyCreate';
import type { FlowRunNotificationPolicyUpdate } from '../models/FlowRunNotificationPolicyUpdate';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class FlowRunNotificationPoliciesService {

    /**
     * Create Flow Run Notification Policy
     * Creates a new flow run notification policy.
     * @param requestBody
     * @param xPrefectApiVersion
     * @returns FlowRunNotificationPolicy Successful Response
     * @throws ApiError
     */
    public static createFlowRunNotificationPolicyFlowRunNotificationPoliciesPost(
        requestBody: FlowRunNotificationPolicyCreate,
        xPrefectApiVersion?: string,
    ): CancelablePromise<FlowRunNotificationPolicy> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/flow_run_notification_policies/',
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
     * Read Flow Run Notification Policy
     * Get a flow run notification policy by id.
     * @param id The flow run notification policy id
     * @param xPrefectApiVersion
     * @returns FlowRunNotificationPolicy Successful Response
     * @throws ApiError
     */
    public static readFlowRunNotificationPolicyFlowRunNotificationPoliciesIdGet(
        id: string,
        xPrefectApiVersion?: string,
    ): CancelablePromise<FlowRunNotificationPolicy> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/flow_run_notification_policies/{id}',
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
     * Delete Flow Run Notification Policy
     * Delete a flow run notification policy by id.
     * @param id The flow run notification policy id
     * @param xPrefectApiVersion
     * @returns void
     * @throws ApiError
     */
    public static deleteFlowRunNotificationPolicyFlowRunNotificationPoliciesIdDelete(
        id: string,
        xPrefectApiVersion?: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/flow_run_notification_policies/{id}',
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
     * Update Flow Run Notification Policy
     * Updates an existing flow run notification policy.
     * @param id The flow run notification policy id
     * @param requestBody
     * @param xPrefectApiVersion
     * @returns void
     * @throws ApiError
     */
    public static updateFlowRunNotificationPolicyFlowRunNotificationPoliciesIdPatch(
        id: string,
        requestBody: FlowRunNotificationPolicyUpdate,
        xPrefectApiVersion?: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/flow_run_notification_policies/{id}',
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
     * Read Flow Run Notification Policies
     * Query for flow run notification policies.
     * @param xPrefectApiVersion
     * @param requestBody
     * @returns FlowRunNotificationPolicy Successful Response
     * @throws ApiError
     */
    public static readFlowRunNotificationPoliciesFlowRunNotificationPoliciesFilterPost(
        xPrefectApiVersion?: string,
        requestBody?: Body_read_flow_run_notification_policies_flow_run_notification_policies_filter_post,
    ): CancelablePromise<Array<FlowRunNotificationPolicy>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/flow_run_notification_policies/filter',
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
