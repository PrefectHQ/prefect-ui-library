/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { HistoryResponseState } from './HistoryResponseState';

/**
 * Represents a history of aggregation states over an interval
 */
export type HistoryResponse = {
    /**
     * The start date of the interval.
     */
    interval_start: string;
    /**
     * The end date of the interval.
     */
    interval_end: string;
    /**
     * A list of state histories during the interval.
     */
    states: Array<HistoryResponseState>;
};

