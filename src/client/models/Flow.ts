/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * An ORM representation of flow data.
 */
export type Flow = {
    id?: string;
    created?: string;
    updated?: string;
    /**
     * The name of the flow
     */
    name: string;
    /**
     * A list of flow tags
     */
    tags?: Array<string>;
};

