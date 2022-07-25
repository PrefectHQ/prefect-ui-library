/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * An ORM representation of a block type
 */
export type BlockType = {
    id?: string;
    created?: string;
    updated?: string;
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
    /**
     * Protected block types cannot be modified via API.
     */
    is_protected?: boolean;
};

