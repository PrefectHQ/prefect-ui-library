/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Filter by `FlowRun.parent_task_run_id`.
 */
export type FlowRunFilterParentTaskRunId = {
    /**
     * A list of flow run parent_task_run_ids to include
     */
    any_?: Array<string>;
    /**
     * If true, only include flow runs without parent_task_run_id
     */
    is_null_?: boolean;
};

