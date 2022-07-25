/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Filter by `Deployment.name`.
 */
export type DeploymentFilterName = {
    /**
     * A list of deployment names to include
     */
    any_?: Array<string>;
    /**
     * A case-insensitive partial match. For example,  passing 'marvin' will match 'marvin', 'sad-Marvin', and 'marvin-robot'.
     */
    like_?: string;
};

