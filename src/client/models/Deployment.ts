/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CronSchedule } from './CronSchedule';
import type { DataDocument } from './DataDocument';
import type { IntervalSchedule } from './IntervalSchedule';
import type { RRuleSchedule } from './RRuleSchedule';

/**
 * An ORM representation of deployment data.
 */
export type Deployment = {
    id?: string;
    created?: string;
    updated?: string;
    /**
     * The name of the deployment.
     */
    name: string;
    /**
     * The flow id associated with the deployment.
     */
    flow_id: string;
    /**
     * A data document representing the flow code to execute.
     */
    flow_data: DataDocument;
    /**
     * A schedule for the deployment.
     */
    schedule?: (IntervalSchedule | CronSchedule | RRuleSchedule);
    /**
     * Whether or not the deployment schedule is active.
     */
    is_schedule_active?: boolean;
    /**
     * Parameters for flow runs scheduled by the deployment.
     */
    parameters?: any;
    /**
     * A list of tags for the deployment
     */
    tags?: Array<string>;
    /**
     * The block document defining infrastructure to use for flow runs.
     */
    infrastructure_document_id?: string;
};

