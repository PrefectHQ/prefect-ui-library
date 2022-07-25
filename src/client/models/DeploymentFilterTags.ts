/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Filter by `Deployment.tags`.
 */
export type DeploymentFilterTags = {
    /**
     * A list of tags. Deployments will be returned only if their tags are a superset of the list
     */
    all_?: Array<string>;
    /**
     * If true, only include deployments without tags
     */
    is_null_?: boolean;
};

