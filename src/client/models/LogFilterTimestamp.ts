/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Filter by `Log.timestamp`.
 */
export type LogFilterTimestamp = {
    /**
     * Only include logs with a timestamp at or before this time
     */
    before_?: string;
    /**
     * Only include logs with a timestamp at or after this time
     */
    after_?: string;
};

