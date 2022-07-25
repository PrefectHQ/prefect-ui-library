/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FlowFilterId } from './FlowFilterId';
import type { FlowFilterName } from './FlowFilterName';
import type { FlowFilterTags } from './FlowFilterTags';

/**
 * Filter for flows. Only flows matching all criteria will be returned.
 */
export type FlowFilter = {
    /**
     * Filter criteria for `Flow.id`
     */
    id?: FlowFilterId;
    /**
     * Filter criteria for `Flow.name`
     */
    name?: FlowFilterName;
    /**
     * Filter criteria for `Flow.tags`
     */
    tags?: FlowFilterTags;
};

