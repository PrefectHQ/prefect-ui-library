/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Details associated with an ABORT state transition.
 */
export type StateAbortDetails = {
    /**
     * The type of state transition detail. Used to ensure pydantic does not coerce into a different type.
     */
    type?: StateAbortDetails.type;
    /**
     * The reason why the state transition was aborted.
     */
    reason?: string;
};

export namespace StateAbortDetails {

    /**
     * The type of state transition detail. Used to ensure pydantic does not coerce into a different type.
     */
    export enum type {
        ABORT_DETAILS = 'abort_details',
    }


}

