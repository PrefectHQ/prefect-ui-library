/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BlockSchemaFilter } from './BlockSchemaFilter';

export type Body_read_block_schemas_block_schemas_filter_post = {
    block_schemas?: BlockSchemaFilter;
    offset?: number;
    /**
     * Defaults to PREFECT_ORION_API_DEFAULT_LIMIT if not provided.
     */
    limit?: number;
};

