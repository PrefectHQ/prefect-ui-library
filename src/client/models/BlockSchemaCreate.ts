/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Data used by the Orion API to create a block schema.
 */
export type BlockSchemaCreate = {
    /**
     * The block schema's field schema
     */
    fields?: any;
    /**
     * A block type ID
     */
    block_type_id: string;
    /**
     * A list of Block capabilities
     */
    capabilities?: Array<string>;
};

