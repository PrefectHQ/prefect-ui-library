/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Filter by `TaskRun.name`.
 */
export type TaskRunFilterName = {
    /**
     * A list of task run names to include
     */
    any_?: Array<string>;
    /**
     * A case-insensitive partial match. For example,  passing 'marvin' will match 'marvin', 'sad-Marvin', and 'marvin-robot'.
     */
    like_?: string;
};

