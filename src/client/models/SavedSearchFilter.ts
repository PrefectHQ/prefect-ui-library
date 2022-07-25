/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * A filter for a saved search model. Intended for use by the Prefect UI.
 */
export type SavedSearchFilter = {
    /**
     * The object over which to filter.
     */
    object: string;
    /**
     * The property of the object on which to filter.
     */
    property: string;
    /**
     * The type of the property.
     */
    type: string;
    /**
     * The operator to apply to the object. For example, `equals`.
     */
    operation: string;
    /**
     * A JSON-compatible value for the filter.
     */
    value: any;
};

