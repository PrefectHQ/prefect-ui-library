/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DeploymentFilter } from './DeploymentFilter';
import type { FlowFilter } from './FlowFilter';
import type { FlowRunFilter } from './FlowRunFilter';
import type { FlowRunSort } from './FlowRunSort';
import type { TaskRunFilter } from './TaskRunFilter';

export type Body_read_flow_run_history_ui_flow_runs_history_post = {
    sort?: FlowRunSort;
    limit?: number;
    offset?: number;
    flows?: FlowFilter;
    flow_runs?: FlowRunFilter;
    task_runs?: TaskRunFilter;
    deployments?: DeploymentFilter;
};

