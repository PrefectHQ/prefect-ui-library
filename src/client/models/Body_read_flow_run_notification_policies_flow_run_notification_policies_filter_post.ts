/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FlowRunNotificationPolicyFilter } from './FlowRunNotificationPolicyFilter';

export type Body_read_flow_run_notification_policies_flow_run_notification_policies_filter_post = {
    flow_run_notification_policy_filter?: FlowRunNotificationPolicyFilter;
    offset?: number;
    /**
     * Defaults to PREFECT_ORION_API_DEFAULT_LIMIT if not provided.
     */
    limit?: number;
};

