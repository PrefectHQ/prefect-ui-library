/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_count_flows_flows_count_post } from '../models/Body_count_flows_flows_count_post';
import type { Body_read_flows_flows_filter_post } from '../models/Body_read_flows_flows_filter_post';
import type { Flow } from '../models/Flow';
import type { FlowCreate } from '../models/FlowCreate';
import type { FlowUpdate } from '../models/FlowUpdate';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class FlowsService {

    /**
     * Create Flow
     * Gracefully creates a new flow from the provided schema. If a flow with the
     * same name already exists, the existing flow is returned.
     * @param requestBody
     * @param xPrefectApiVersion
     * @returns Flow Successful Response
     * @throws ApiError
     */
    public static createFlowFlowsPost(
        requestBody: FlowCreate,
        xPrefectApiVersion?: string,
    ): CancelablePromise<Flow> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/flows/',
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
     * Read Flow
     * Get a flow by id.
     * @param id The flow id
     * @param xPrefectApiVersion
     * @returns Flow Successful Response
     * @throws ApiError
     */
    public static readFlowFlowsIdGet(
        id: string,
        xPrefectApiVersion?: string,
    ): CancelablePromise<Flow> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/flows/{id}',
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
     * Delete Flow
     * Delete a flow by id.
     * @param id The flow id
     * @param xPrefectApiVersion
     * @returns void
     * @throws ApiError
     */
    public static deleteFlowFlowsIdDelete(
        id: string,
        xPrefectApiVersion?: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/flows/{id}',
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
     * Update Flow
     * Updates a flow.
     * @param id The flow id
     * @param requestBody
     * @param xPrefectApiVersion
     * @returns void
     * @throws ApiError
     */
    public static updateFlowFlowsIdPatch(
        id: string,
        requestBody: FlowUpdate,
        xPrefectApiVersion?: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/flows/{id}',
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
     * Count Flows
     * Count flows.
     * @param xPrefectApiVersion
     * @param requestBody
     * @returns number Successful Response
     * @throws ApiError
     */
    public static countFlowsFlowsCountPost(
        xPrefectApiVersion?: string,
        requestBody?: Body_count_flows_flows_count_post,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/flows/count',
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
     * Read Flow By Name
     * Get a flow by name.
     * @param name The name of the flow
     * @param xPrefectApiVersion
     * @returns Flow Successful Response
     * @throws ApiError
     */
    public static readFlowByNameFlowsNameNameGet(
        name: string,
        xPrefectApiVersion?: string,
    ): CancelablePromise<Flow> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/flows/name/{name}',
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
     * Read Flows
     * Query for flows.
     * @param xPrefectApiVersion
     * @param requestBody
     * @returns Flow Successful Response
     * @throws ApiError
     */
    public static readFlowsFlowsFilterPost(
        xPrefectApiVersion?: string,
        requestBody?: Body_read_flows_flows_filter_post,
    ): CancelablePromise<Array<Flow>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/flows/filter',
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
