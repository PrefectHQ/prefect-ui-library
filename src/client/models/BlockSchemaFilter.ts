/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BlockSchemaFilterBlockTypeId } from './BlockSchemaFilterBlockTypeId';
import type { BlockSchemaFilterCapabilities } from './BlockSchemaFilterCapabilities';
import type { BlockSchemaFilterId } from './BlockSchemaFilterId';

/**
 * Filter BlockSchemas
 */
export type BlockSchemaFilter = {
    /**
     * Filter criteria for `BlockSchema.block_type_id`
     */
    block_type_id?: BlockSchemaFilterBlockTypeId;
    /**
     * Filter criteria for `BlockSchema.capabilities`
     */
    block_capabilities?: BlockSchemaFilterCapabilities;
    /**
     * Filter criteria for `BlockSchema.id`
     */
    id?: BlockSchemaFilterId;
};

