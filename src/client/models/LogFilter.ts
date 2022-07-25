/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LogFilterFlowRunId } from './LogFilterFlowRunId';
import type { LogFilterLevel } from './LogFilterLevel';
import type { LogFilterTaskRunId } from './LogFilterTaskRunId';
import type { LogFilterTimestamp } from './LogFilterTimestamp';

/**
 * Filter logs. Only logs matching all criteria will be returned
 */
export type LogFilter = {
    /**
     * Filter criteria for `Log.level`
     */
    level?: LogFilterLevel;
    /**
     * Filter criteria for `Log.timestamp`
     */
    timestamp?: LogFilterTimestamp;
    /**
     * Filter criteria for `Log.flow_run_id`
     */
    flow_run_id?: LogFilterFlowRunId;
    /**
     * Filter criteria for `Log.task_run_id`
     */
    task_run_id?: LogFilterTaskRunId;
};

