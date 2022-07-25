/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Data used by the Orion API to update a flow run notification policy.
 */
export type FlowRunNotificationPolicyUpdate = {
    is_active?: boolean;
    state_names?: Array<string>;
    tags?: Array<string>;
    block_document_id?: string;
    message_template?: string;
};

