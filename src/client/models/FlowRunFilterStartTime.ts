/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Filter by `FlowRun.start_time`.
 */
export type FlowRunFilterStartTime = {
    /**
     * Only include flow runs starting at or before this time
     */
    before_?: string;
    /**
     * Only include flow runs starting at or after this time
     */
    after_?: string;
    /**
     * If true, only return flow runs without a start time
     */
    is_null_?: boolean;
};

