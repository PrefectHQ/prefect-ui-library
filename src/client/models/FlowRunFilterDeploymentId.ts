/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Filter by `FlowRun.deployment_id`.
 */
export type FlowRunFilterDeploymentId = {
    /**
     * A list of flow run deployment ids to include
     */
    any_?: Array<string>;
    /**
     * If true, only include flow runs without deployment ids
     */
    is_null_?: boolean;
};

