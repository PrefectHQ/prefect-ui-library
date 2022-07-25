/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Filter by `TaskRun.start_time`.
 */
export type TaskRunFilterStartTime = {
    /**
     * Only include task runs starting at or before this time
     */
    before_?: string;
    /**
     * Only include task runs starting at or after this time
     */
    after_?: string;
    /**
     * If true, only return task runs without a start time
     */
    is_null_?: boolean;
};

