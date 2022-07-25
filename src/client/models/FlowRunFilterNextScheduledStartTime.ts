/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Filter by `FlowRun.next_scheduled_start_time`.
 */
export type FlowRunFilterNextScheduledStartTime = {
    /**
     * Only include flow runs with a next_scheduled_start_time or before this time
     */
    before_?: string;
    /**
     * Only include flow runs with a next_scheduled_start_time at or after this time
     */
    after_?: string;
};

