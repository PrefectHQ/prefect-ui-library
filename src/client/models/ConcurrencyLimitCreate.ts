/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Data used by the Orion API to create a concurrency limit.
 */
export type ConcurrencyLimitCreate = {
    /**
     * A tag the concurrency limit is applied to.
     */
    tag: string;
    /**
     * The concurrency limit.
     */
    concurrency_limit: number;
};

