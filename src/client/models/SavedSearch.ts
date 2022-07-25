/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SavedSearchFilter } from './SavedSearchFilter';

/**
 * An ORM representation of saved search data. Represents a set of filter criteria.
 */
export type SavedSearch = {
    id?: string;
    created?: string;
    updated?: string;
    /**
     * The name of the saved search.
     */
    name: string;
    /**
     * The filter set for the saved search.
     */
    filters?: Array<SavedSearchFilter>;
};

