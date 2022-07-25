/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Constant } from './Constant';
import type { Parameter } from './Parameter';
import type { StateCreate } from './StateCreate';
import type { TaskRunPolicy } from './TaskRunPolicy';
import type { TaskRunResult } from './TaskRunResult';

/**
 * Data used by the Orion API to create a task run
 */
export type TaskRunCreate = {
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
     * Tracks the source of inputs to a task run. Used for internal bookkeeping.
     */
    task_inputs?: Record<string, Array<(TaskRunResult | Parameter | Constant)>>;
    /**
     * The state of the task run to create
     */
    state?: StateCreate;
};

