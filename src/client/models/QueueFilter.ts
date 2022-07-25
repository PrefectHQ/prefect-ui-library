/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Filter criteria definition for a work queue.
 */
export type QueueFilter = {
    /**
     * Only include flow runs with these tags in the work queue.
     */
    tags?: Array<string>;
    /**
     * Only include flow runs from these deployments in the work queue.
     */
    deployment_ids?: Array<string>;
};

