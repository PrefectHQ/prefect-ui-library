/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { QueueFilter } from './QueueFilter';

/**
 * Data used by the Orion API to update a work queue.
 */
export type WorkQueueUpdate = {
    /**
     * Filter criteria for the work queue.
     */
    filter?: QueueFilter;
    /**
     * The name of the work queue.
     */
    name?: string;
    /**
     * An optional description for the work queue.
     */
    description?: string;
    /**
     * Whether or not the work queue is paused.
     */
    is_paused?: boolean;
    /**
     * An optional concurrency limit for the work queue.
     */
    concurrency_limit?: number;
};

