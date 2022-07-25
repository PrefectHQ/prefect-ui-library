/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Details associated with a WAIT state transition.
 */
export type StateWaitDetails = {
    /**
     * The type of state transition detail. Used to ensure pydantic does not coerce into a different type.
     */
    type?: StateWaitDetails.type;
    /**
     * The length of time in seconds the client should wait before transitioning states.
     */
    delay_seconds: number;
    /**
     * The reason why the state transition should wait.
     */
    reason?: string;
};

export namespace StateWaitDetails {

    /**
     * The type of state transition detail. Used to ensure pydantic does not coerce into a different type.
     */
    export enum type {
        WAIT_DETAILS = 'wait_details',
    }


}

