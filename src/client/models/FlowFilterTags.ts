/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Filter by `Flow.tags`.
 */
export type FlowFilterTags = {
    /**
     * A list of tags. Flows will be returned only if their tags are a superset of the list
     */
    all_?: Array<string>;
    /**
     * If true, only include flows without tags
     */
    is_null_?: boolean;
};

