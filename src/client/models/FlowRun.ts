/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FlowRunPolicy } from './FlowRunPolicy';
import type { State } from './State';
import type { StateType } from './StateType';

/**
 * An ORM representation of flow run data.
 */
export type FlowRun = {
    id?: string;
    created?: string;
    updated?: string;
    /**
     * The name of the flow run. Defaults to a random slug if not specified.
     */
    name?: string;
    /**
     * The id of the flow being run.
     */
    flow_id: string;
    /**
     * The id of the flow run's current state.
     */
    state_id?: string;
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
     * The type of the current flow run state.
     */
    state_type?: StateType;
    /**
     * The name of the current flow run state.
     */
    state_name?: string;
    /**
     * The number of times the flow run was executed.
     */
    run_count?: number;
    /**
     * The flow run's expected start time.
     */
    expected_start_time?: string;
    /**
     * The next time the flow run is scheduled to start.
     */
    next_scheduled_start_time?: string;
    /**
     * The actual start time.
     */
    start_time?: string;
    /**
     * The actual end time.
     */
    end_time?: string;
    /**
     * Total run time. If the flow run was executed multiple times, the time of each run will be summed.
     */
    total_run_time?: number;
    /**
     * A real-time estimate of the total run time.
     */
    estimated_run_time?: number;
    /**
     * The difference between actual and expected start time.
     */
    estimated_start_time_delta?: number;
    /**
     * Whether or not the flow run was automatically scheduled.
     */
    auto_scheduled?: boolean;
    /**
     * The block document defining infrastructure to use this flow run.
     */
    infrastructure_document_id?: string;
    /**
     * The current state of the flow run.
     */
    state?: State;
};

