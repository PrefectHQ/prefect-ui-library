/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BlockSchemaFilter } from './BlockSchemaFilter';
import type { BlockTypeFilter } from './BlockTypeFilter';

export type Body_read_block_types_block_types_filter_post = {
    block_types?: BlockTypeFilter;
    block_schemas?: BlockSchemaFilter;
    offset?: number;
    /**
     * Defaults to PREFECT_ORION_API_DEFAULT_LIMIT if not provided.
     */
    limit?: number;
};

