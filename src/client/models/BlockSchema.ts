/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BlockType } from './BlockType';

/**
 * An ORM representation of a block schema.
 */
export type BlockSchema = {
    id?: string;
    created?: string;
    updated?: string;
    /**
     * The block schema's unique checksum
     */
    checksum: string;
    /**
     * The block schema's field schema
     */
    fields?: any;
    /**
     * A block type ID
     */
    block_type_id: string;
    /**
     * The associated block type
     */
    block_type?: BlockType;
    /**
     * A list of Block capabilities
     */
    capabilities?: Array<string>;
};

