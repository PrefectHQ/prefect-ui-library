/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Constant } from './Constant';
import type { Parameter } from './Parameter';
import type { State } from './State';
import type { StateType } from './StateType';
import type { TaskRunPolicy } from './TaskRunPolicy';
import type { TaskRunResult } from './TaskRunResult';

/**
 * An ORM representation of task run data.
 */
export type TaskRun = {
    id?: string;
    created?: string;
    updated?: string;
    name?: string;
    /**
     * The flow run id of the task run.
     */
    flow_run_id: string;
    /**
     * A unique identifier for the task being run.
     */
    task_key: string;
    /**
     * A dynamic key used to differentiate between multiple runs of the same task within the same flow run.
     */
    dynamic_key: string;
    /**
     * An optional cache key. If a COMPLETED state associated with this cache key is found, the cached COMPLETED state will be used instead of executing the task run.
     */
    cache_key?: string;
    /**
     * Specifies when the cached state should expire.
     */
    cache_expiration?: string;
    /**
     * The version of the task being run.
     */
    task_version?: string;
    empirical_policy?: TaskRunPolicy;
    /**
     * A list of tags for the task run.
     */
    tags?: Array<string>;
    /**
     * The id of the current task run state.
     */
    state_id?: string;
    /**
     * Tracks the source of inputs to a task run. Used for internal bookkeeping.
     */
    task_inputs?: Record<string, Array<(TaskRunResult | Parameter | Constant)>>;
    /**
     * The type of the current task run state.
     */
    state_type?: StateType;
    /**
     * The name of the current task run state.
     */
    state_name?: string;
    /**
     * The number of times the task run has been executed.
     */
    run_count?: number;
    /**
     * The task run's expected start time.
     */
    expected_start_time?: string;
    /**
     * The next time the task run is scheduled to start.
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
     * Total run time. If the task run was executed multiple times, the time of each run will be summed.
     */
    total_run_time?: number;
    /**
     * A real-time estimate of total run time.
     */
    estimated_run_time?: number;
    /**
     * The difference between actual and expected start time.
     */
    estimated_start_time_delta?: number;
    /**
     * The current task run state.
     */
    state?: State;
};

