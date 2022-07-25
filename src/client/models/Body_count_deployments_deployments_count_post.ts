/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DeploymentFilter } from './DeploymentFilter';
import type { FlowFilter } from './FlowFilter';
import type { FlowRunFilter } from './FlowRunFilter';
import type { TaskRunFilter } from './TaskRunFilter';

export type Body_count_deployments_deployments_count_post = {
    flows?: FlowFilter;
    flow_runs?: FlowRunFilter;
    task_runs?: TaskRunFilter;
    deployments?: DeploymentFilter;
};

