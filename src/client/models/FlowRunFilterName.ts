/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Filter by `FlowRun.name`.
 */
export type FlowRunFilterName = {
    /**
     * A list of flow run names to include
     */
    any_?: Array<string>;
    /**
     * A case-insensitive partial match. For example,  passing 'marvin' will match 'marvin', 'sad-Marvin', and 'marvin-robot'.
     */
    like_?: string;
};

