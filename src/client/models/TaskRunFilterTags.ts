/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Filter by `TaskRun.tags`.
 */
export type TaskRunFilterTags = {
    /**
     * A list of tags. Task runs will be returned only if their tags are a superset of the list
     */
    all_?: Array<string>;
    /**
     * If true, only include task runs without tags
     */
    is_null_?: boolean;
};

