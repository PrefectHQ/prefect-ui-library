/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_count_deployments_deployments_count_post } from '../models/Body_count_deployments_deployments_count_post';
import type { Body_read_deployments_deployments_filter_post } from '../models/Body_read_deployments_deployments_filter_post';
import type { Body_schedule_deployment_deployments__id__schedule_post } from '../models/Body_schedule_deployment_deployments__id__schedule_post';
import type { Deployment } from '../models/Deployment';
import type { DeploymentCreate } from '../models/DeploymentCreate';
import type { DeploymentFlowRunCreate } from '../models/DeploymentFlowRunCreate';
import type { FlowRun } from '../models/FlowRun';
import type { WorkQueue } from '../models/WorkQueue';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DeploymentsService {

    /**
     * Create Deployment
     * Gracefully creates a new deployment from the provided schema. If a deployment with
     * the same name and flow_id already exists, the deployment is updated.
     *
     * If the deployment has an active schedule, flow runs will be scheduled.
     * When upserting, any scheduled runs from the existing deployment will be deleted.
     * @param requestBody
     * @param xPrefectApiVersion
     * @returns Deployment Successful Response
     * @throws ApiError
     */
    public static createDeploymentDeploymentsPost(
        requestBody: DeploymentCreate,
        xPrefectApiVersion?: string,
    ): CancelablePromise<Deployment> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/deployments/',
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
     * Read Deployment By Name
     * Get a deployment using the name of the flow and the deployment.
     * @param flowName The name of the flow
     * @param deploymentName The name of the deployment
     * @param xPrefectApiVersion
     * @returns Deployment Successful Response
     * @throws ApiError
     */
    public static readDeploymentByNameDeploymentsNameFlowNameDeploymentNameGet(
        flowName: string,
        deploymentName: string,
        xPrefectApiVersion?: string,
    ): CancelablePromise<Deployment> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/deployments/name/{flow_name}/{deployment_name}',
            path: {
                'flow_name': flowName,
                'deployment_name': deploymentName,
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
     * Read Deployment
     * Get a deployment by id.
     * @param id The deployment id
     * @param xPrefectApiVersion
     * @returns Deployment Successful Response
     * @throws ApiError
     */
    public static readDeploymentDeploymentsIdGet(
        id: string,
        xPrefectApiVersion?: string,
    ): CancelablePromise<Deployment> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/deployments/{id}',
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
     * Delete Deployment
     * Delete a deployment by id.
     * @param id The deployment id
     * @param xPrefectApiVersion
     * @returns void
     * @throws ApiError
     */
    public static deleteDeploymentDeploymentsIdDelete(
        id: string,
        xPrefectApiVersion?: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/deployments/{id}',
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
     * Read Deployments
     * Query for deployments.
     * @param xPrefectApiVersion
     * @param requestBody
     * @returns Deployment Successful Response
     * @throws ApiError
     */
    public static readDeploymentsDeploymentsFilterPost(
        xPrefectApiVersion?: string,
        requestBody?: Body_read_deployments_deployments_filter_post,
    ): CancelablePromise<Array<Deployment>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/deployments/filter',
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
     * Count Deployments
     * Count deployments.
     * @param xPrefectApiVersion
     * @param requestBody
     * @returns number Successful Response
     * @throws ApiError
     */
    public static countDeploymentsDeploymentsCountPost(
        xPrefectApiVersion?: string,
        requestBody?: Body_count_deployments_deployments_count_post,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/deployments/count',
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
     * Schedule Deployment
     * Schedule runs for a deployment. For backfills, provide start/end times in the past.
     * @param id The deployment id
     * @param xPrefectApiVersion
     * @param requestBody
     * @returns null Successful Response
     * @throws ApiError
     */
    public static scheduleDeploymentDeploymentsIdSchedulePost(
        id: string,
        xPrefectApiVersion?: string,
        requestBody?: Body_schedule_deployment_deployments__id__schedule_post,
    ): CancelablePromise<null> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/deployments/{id}/schedule',
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
     * Set Schedule Active
     * Set a deployment schedule to active. Runs will be scheduled immediately.
     * @param id The deployment id
     * @param xPrefectApiVersion
     * @returns null Successful Response
     * @throws ApiError
     */
    public static setScheduleActiveDeploymentsIdSetScheduleActivePost(
        id: string,
        xPrefectApiVersion?: string,
    ): CancelablePromise<null> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/deployments/{id}/set_schedule_active',
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
     * Set Schedule Inactive
     * Set a deployment schedule to inactive. Any auto-scheduled runs still in a Scheduled
     * state will be deleted.
     * @param id The deployment id
     * @param xPrefectApiVersion
     * @returns null Successful Response
     * @throws ApiError
     */
    public static setScheduleInactiveDeploymentsIdSetScheduleInactivePost(
        id: string,
        xPrefectApiVersion?: string,
    ): CancelablePromise<null> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/deployments/{id}/set_schedule_inactive',
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
     * Create Flow Run From Deployment
     * Create a flow run from a deployment.
     *
     * Any parameters not provided will be inferred from the deployment's parameters.
     * If tags are not provided, the deployment's tags will be used.
     *
     * If no state is provided, the flow run will be created in a PENDING state.
     * @param id The deployment id
     * @param requestBody
     * @param xPrefectApiVersion
     * @returns FlowRun Successful Response
     * @throws ApiError
     */
    public static createFlowRunFromDeploymentDeploymentsIdCreateFlowRunPost(
        id: string,
        requestBody: DeploymentFlowRunCreate,
        xPrefectApiVersion?: string,
    ): CancelablePromise<FlowRun> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/deployments/{id}/create_flow_run',
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
     * Work Queue Check For Deployment
     * Get list of work-queues that are able to pick up the specified deployment.
     *
     * This endpoint is intended to be used by the UI to provide users warnings
     * about deployments that are unable to be executed because there are no work
     * queues that will pick up their runs, based on existing filter criteria. It
     * may be deprecated in the future because there is not a strict relationship
     * between work queues and deployments.
     * @param id The deployment id
     * @param xPrefectApiVersion
     * @returns WorkQueue Successful Response
     * @throws ApiError
     */
    public static workQueueCheckForDeploymentDeploymentsIdWorkQueueCheckGet(
        id: string,
        xPrefectApiVersion?: string,
    ): CancelablePromise<Array<WorkQueue>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/deployments/{id}/work_queue_check',
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

}
