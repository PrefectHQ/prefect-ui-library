/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DeploymentFilter } from './DeploymentFilter';
import type { FlowFilter } from './FlowFilter';
import type { FlowRunFilter } from './FlowRunFilter';
import type { TaskRunFilter } from './TaskRunFilter';

export type Body_flow_run_history_flow_runs_history_post = {
    /**
     * The history's start time.
     */
    history_start: string;
    /**
     * The history's end time.
     */
    history_end: string;
    /**
     * The size of each history interval, in seconds. Must be at least 1 second.
     */
    history_interval_seconds: number;
    flows?: FlowFilter;
    flow_runs?: FlowRunFilter;
    task_runs?: TaskRunFilter;
    deployments?: DeploymentFilter;
};

