/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Body_read_work_queue_runs_work_queues__id__get_runs_post = {
    /**
     * Only flow runs scheduled to start before this time will be returned. If not provided, defaults to now.
     */
    scheduled_before?: string;
    /**
     * An optional unique identifier for the agent making this query. If provided, the Orion API will track the last time this agent polled the work queue.
     */
    agent_id?: string;
    /**
     * Defaults to PREFECT_ORION_API_DEFAULT_LIMIT if not provided.
     */
    limit?: number;
};

