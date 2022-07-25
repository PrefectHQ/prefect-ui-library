/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BlockSchema } from './BlockSchema';
import type { BlockType } from './BlockType';

/**
 * An ORM representation of a block document.
 */
export type BlockDocument = {
    id: string;
    created?: string;
    updated?: string;
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
     * The associated block schema
     */
    block_schema?: BlockSchema;
    /**
     * A block type ID
     */
    block_type_id: string;
    /**
     * The associated block type
     */
    block_type?: BlockType;
    /**
     * Record of the block document's references
     */
    block_document_references?: Record<string, any>;
    /**
     * Whether the block is anonymous (anonymous blocks are usually created by Prefect automatically)
     */
    is_anonymous?: boolean;
};

