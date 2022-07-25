/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SavedSearchFilter } from './SavedSearchFilter';

/**
 * Data used by the Orion API to create a saved search.
 */
export type SavedSearchCreate = {
    /**
     * The name of the saved search.
     */
    name: string;
    /**
     * The filter set for the saved search.
     */
    filters?: Array<SavedSearchFilter>;
};

