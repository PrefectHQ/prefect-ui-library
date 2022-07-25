/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BlockDocumentFilter } from './BlockDocumentFilter';
import type { BlockSchemaFilter } from './BlockSchemaFilter';

export type Body_read_block_documents_block_documents_filter_post = {
    block_documents?: BlockDocumentFilter;
    block_schemas?: BlockSchemaFilter;
    /**
     * Whether to include sensitive values in the block document.
     */
    include_secrets?: boolean;
    offset?: number;
    /**
     * Defaults to PREFECT_ORION_API_DEFAULT_LIMIT if not provided.
     */
    limit?: number;
};

