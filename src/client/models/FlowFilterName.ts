/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Filter by `Flow.name`.
 */
export type FlowFilterName = {
    /**
     * A list of flow names to include
     */
    any_?: Array<string>;
    /**
     * A case-insensitive partial match. For example,  passing 'marvin' will match 'marvin', 'sad-Marvin', and 'marvin-robot'.
     */
    like_?: string;
};

