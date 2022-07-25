/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Data used by the Orion API to create a block type.
 */
export type BlockTypeCreate = {
    /**
     * A block type's name
     */
    name: string;
    /**
     * Web URL for the block type's logo
     */
    logo_url?: string;
    /**
     * Web URL for the block type's documentation
     */
    documentation_url?: string;
    /**
     * A short blurb about the corresponding block's intended use
     */
    description?: string;
    /**
     * A code snippet demonstrating use of the corresponding block
     */
    code_example?: string;
};

