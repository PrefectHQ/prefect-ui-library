/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FlowRunFilterDeploymentId } from './FlowRunFilterDeploymentId';
import type { FlowRunFilterExpectedStartTime } from './FlowRunFilterExpectedStartTime';
import type { FlowRunFilterFlowVersion } from './FlowRunFilterFlowVersion';
import type { FlowRunFilterId } from './FlowRunFilterId';
import type { FlowRunFilterName } from './FlowRunFilterName';
import type { FlowRunFilterNextScheduledStartTime } from './FlowRunFilterNextScheduledStartTime';
import type { FlowRunFilterParentTaskRunId } from './FlowRunFilterParentTaskRunId';
import type { FlowRunFilterStartTime } from './FlowRunFilterStartTime';
import type { FlowRunFilterState } from './FlowRunFilterState';
import type { FlowRunFilterTags } from './FlowRunFilterTags';

/**
 * Filter flow runs. Only flow runs matching all criteria will be returned
 */
export type FlowRunFilter = {
    /**
     * Filter criteria for `FlowRun.id`
     */
    id?: FlowRunFilterId;
    /**
     * Filter criteria for `FlowRun.name`
     */
    name?: FlowRunFilterName;
    /**
     * Filter criteria for `FlowRun.tags`
     */
    tags?: FlowRunFilterTags;
    /**
     * Filter criteria for `FlowRun.deployment_id`
     */
    deployment_id?: FlowRunFilterDeploymentId;
    /**
     * Filter criteria for `FlowRun.state`
     */
    state?: FlowRunFilterState;
    /**
     * Filter criteria for `FlowRun.flow_version`
     */
    flow_version?: FlowRunFilterFlowVersion;
    /**
     * Filter criteria for `FlowRun.start_time`
     */
    start_time?: FlowRunFilterStartTime;
    /**
     * Filter criteria for `FlowRun.expected_start_time`
     */
    expected_start_time?: FlowRunFilterExpectedStartTime;
    /**
     * Filter criteria for `FlowRun.next_scheduled_start_time`
     */
    next_scheduled_start_time?: FlowRunFilterNextScheduledStartTime;
    /**
     * Filter criteria for `FlowRun.parent_task_run_id`
     */
    parent_task_run_id?: FlowRunFilterParentTaskRunId;
};

