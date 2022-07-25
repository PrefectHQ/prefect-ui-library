/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TaskRunFilterId } from './TaskRunFilterId';
import type { TaskRunFilterName } from './TaskRunFilterName';
import type { TaskRunFilterStartTime } from './TaskRunFilterStartTime';
import type { TaskRunFilterState } from './TaskRunFilterState';
import type { TaskRunFilterSubFlowRuns } from './TaskRunFilterSubFlowRuns';
import type { TaskRunFilterTags } from './TaskRunFilterTags';

/**
 * Filter task runs. Only task runs matching all criteria will be returned
 */
export type TaskRunFilter = {
    /**
     * Filter criteria for `TaskRun.id`
     */
    id?: TaskRunFilterId;
    /**
     * Filter criteria for `TaskRun.name`
     */
    name?: TaskRunFilterName;
    /**
     * Filter criteria for `TaskRun.tags`
     */
    tags?: TaskRunFilterTags;
    /**
     * Filter criteria for `TaskRun.state`
     */
    state?: TaskRunFilterState;
    /**
     * Filter criteria for `TaskRun.start_time`
     */
    start_time?: TaskRunFilterStartTime;
    /**
     * Filter criteria for `TaskRun.subflow_run`
     */
    subflow_runs?: TaskRunFilterSubFlowRuns;
};

