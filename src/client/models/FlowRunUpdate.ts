/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Data used by the Orion API to update a flow run.
 */
export type FlowRunUpdate = {
    /**
     * The name of the flow run. Defaults to a random slug if not specified.
     */
    name?: string;
    /**
     * The version of the flow executed in this flow run.
     */
    flow_version?: string;
    /**
     * Parameters for the flow run.
     */
    parameters?: any;
    /**
     * A list of tags on the flow run
     */
    tags?: Array<string>;
};

