/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DeploymentFilter } from './DeploymentFilter';
import type { FlowFilter } from './FlowFilter';
import type { FlowRunFilter } from './FlowRunFilter';
import type { FlowSort } from './FlowSort';
import type { TaskRunFilter } from './TaskRunFilter';

export type Body_read_flows_flows_filter_post = {
    offset?: number;
    flows?: FlowFilter;
    flow_runs?: FlowRunFilter;
    task_runs?: TaskRunFilter;
    deployments?: DeploymentFilter;
    sort?: FlowSort;
    /**
     * Defaults to PREFECT_ORION_API_DEFAULT_LIMIT if not provided.
     */
    limit?: number;
};

