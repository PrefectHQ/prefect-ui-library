/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FlowRunPolicy } from './FlowRunPolicy';
import type { StateCreate } from './StateCreate';

/**
 * Data used by the Orion API to create a flow run.
 */
export type FlowRunCreate = {
    /**
     * The name of the flow run. Defaults to a random slug if not specified.
     */
    name?: string;
    /**
     * The id of the flow being run.
     */
    flow_id: string;
    /**
     * The id of the deployment associated with this flow run, if available.
     */
    deployment_id?: string;
    /**
     * The version of the flow executed in this flow run.
     */
    flow_version?: string;
    /**
     * Parameters for the flow run.
     */
    parameters?: any;
    /**
     * An optional idempotency key for the flow run. Used to ensure the same flow run is not created multiple times.
     */
    idempotency_key?: string;
    /**
     * Additional context for the flow run.
     */
    context?: any;
    empirical_policy?: FlowRunPolicy;
    /**
     * A list of tags on the flow run
     */
    tags?: Array<string>;
    /**
     * If the flow run is a subflow, the id of the 'dummy' task in the parent flow used to track subflow state.
     */
    parent_task_run_id?: string;
    /**
     * The block document defining infrastructure to use this flow run.
     */
    infrastructure_document_id?: string;
    /**
     * The state of the flow run to create
     */
    state?: StateCreate;
};

