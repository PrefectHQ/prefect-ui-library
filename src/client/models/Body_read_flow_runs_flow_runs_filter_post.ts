/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DeploymentFilter } from './DeploymentFilter';
import type { FlowFilter } from './FlowFilter';
import type { FlowRunFilter } from './FlowRunFilter';
import type { FlowRunSort } from './FlowRunSort';
import type { TaskRunFilter } from './TaskRunFilter';

export type Body_read_flow_runs_flow_runs_filter_post = {
    sort?: FlowRunSort;
    offset?: number;
    flows?: FlowFilter;
    flow_runs?: FlowRunFilter;
    task_runs?: TaskRunFilter;
    deployments?: DeploymentFilter;
    /**
     * Defaults to PREFECT_ORION_API_DEFAULT_LIMIT if not provided.
     */
    limit?: number;
};

