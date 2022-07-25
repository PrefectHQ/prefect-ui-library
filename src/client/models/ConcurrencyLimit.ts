/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * An ORM representation of a concurrency limit.
 */
export type ConcurrencyLimit = {
    id?: string;
    created?: string;
    updated?: string;
    /**
     * A tag the concurrency limit is applied to.
     */
    tag: string;
    /**
     * The concurrency limit.
     */
    concurrency_limit: number;
    /**
     * A list of active run ids using a concurrency slot
     */
    active_slots?: Array<string>;
};

