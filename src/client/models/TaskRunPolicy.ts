/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Defines of how a task run should retry.
 */
export type TaskRunPolicy = {
    max_retries?: number;
    retry_delay_seconds?: number;
};

