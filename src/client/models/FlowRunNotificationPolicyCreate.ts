/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Data used by the Orion API to create a flow run notification policy.
 */
export type FlowRunNotificationPolicyCreate = {
    /**
     * Whether the policy is currently active
     */
    is_active?: boolean;
    /**
     * The flow run states that trigger notifications
     */
    state_names: Array<string>;
    /**
     * The flow run tags that trigger notifications (set [] to disable)
     */
    tags: Array<string>;
    /**
     * The block document ID used for sending notifications
     */
    block_document_id: string;
    /**
     * A templatable notification message. Use {braces} to add variables. Valid variables include: 'flow_id', 'flow_name', 'flow_run_id', 'flow_run_name', 'flow_run_notification_policy_id', 'flow_run_parameters', 'flow_run_state_message', 'flow_run_state_name', 'flow_run_state_timestamp', 'flow_run_state_type'
     */
    message_template?: string;
};

