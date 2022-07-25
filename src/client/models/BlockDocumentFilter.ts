/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BlockDocumentFilterBlockTypeId } from './BlockDocumentFilterBlockTypeId';
import type { BlockDocumentFilterIsAnonymous } from './BlockDocumentFilterIsAnonymous';

/**
 * Filter BlockDocuments. Only BlockDocuments matching all criteria will be returned
 */
export type BlockDocumentFilter = {
    /**
     * Filter criteria for `BlockDocument.is_anonymous`. Defaults to excluding anonymous blocks.
     */
    is_anonymous?: BlockDocumentFilterIsAnonymous;
    /**
     * Filter criteria for `BlockDocument.block_type_id`
     */
    block_type_id?: BlockDocumentFilterBlockTypeId;
};

