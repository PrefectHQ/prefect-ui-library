/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * An ORM representation of log data.
 */
export type Log = {
    id?: string;
    created?: string;
    updated?: string;
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

