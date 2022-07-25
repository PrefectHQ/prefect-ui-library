/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Data used by the Orion API to create a block document.
 */
export type BlockDocumentCreate = {
    /**
     * The block document's name. Not required for anonymous block documents.
     */
    name?: string;
    /**
     * The block document's data
     */
    data?: any;
    /**
     * A block schema ID
     */
    block_schema_id: string;
    /**
     * A block type ID
     */
    block_type_id: string;
    /**
     * Whether the block is anonymous (anonymous blocks are usually created by Prefect automatically)
     */
    is_anonymous?: boolean;
};

