/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Details associated with a REJECT state transition.
 */
export type StateRejectDetails = {
    /**
     * The type of state transition detail. Used to ensure pydantic does not coerce into a different type.
     */
    type?: StateRejectDetails.type;
    /**
     * The reason why the state transition was rejected.
     */
    reason?: string;
};

export namespace StateRejectDetails {

    /**
     * The type of state transition detail. Used to ensure pydantic does not coerce into a different type.
     */
    export enum type {
        REJECT_DETAILS = 'reject_details',
    }


}

