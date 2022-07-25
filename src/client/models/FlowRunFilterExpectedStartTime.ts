/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Filter by `FlowRun.expected_start_time`.
 */
export type FlowRunFilterExpectedStartTime = {
    /**
     * Only include flow runs scheduled to start at or before this time
     */
    before_?: string;
    /**
     * Only include flow runs scheduled to start at or after this time
     */
    after_?: string;
};

