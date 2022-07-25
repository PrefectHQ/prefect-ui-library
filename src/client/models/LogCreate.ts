/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Data used by the Orion API to create a log.
 */
export type LogCreate = {
    /**
     * The logger name.
     */
    name: string;
    /**
     * The log level.
     */
    level: number;
    /**
     * The log message.
     */
    message: string;
    /**
     * The log timestamp.
     */
    timestamp: string;
    /**
     * The flow run ID associated with the log.
     */
    flow_run_id: string;
    /**
     * The task run ID associated with the log.
     */
    task_run_id?: string;
};

