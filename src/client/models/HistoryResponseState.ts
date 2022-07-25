/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { StateType } from './StateType';

/**
 * Represents a single state's history over an interval.
 */
export type HistoryResponseState = {
    /**
     * The state type.
     */
    state_type: StateType;
    /**
     * The state name.
     */
    state_name: string;
    /**
     * The number of runs in the specified state during the interval.
     */
    count_runs: number;
    /**
     * The total estimated run time of all runs during the interval.
     */
    sum_estimated_run_time: number;
    /**
     * The sum of differences between actual and expected start time during the interval.
     */
    sum_estimated_lateness: number;
};

