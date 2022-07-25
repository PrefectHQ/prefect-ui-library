/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Filter by `FlowRun.tags`.
 */
export type FlowRunFilterTags = {
    /**
     * A list of tags. Flow runs will be returned only if their tags are a superset of the list
     */
    all_?: Array<string>;
    /**
     * If true, only include flow runs without tags
     */
    is_null_?: boolean;
};

