/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Data used by the Orion API to create a flow.
 */
export type FlowCreate = {
    /**
     * The name of the flow
     */
    name: string;
    /**
     * A list of flow tags
     */
    tags?: Array<string>;
};

