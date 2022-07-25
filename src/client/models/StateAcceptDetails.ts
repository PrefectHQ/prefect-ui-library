/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Details associated with an ACCEPT state transition.
 */
export type StateAcceptDetails = {
    /**
     * The type of state transition detail. Used to ensure pydantic does not coerce into a different type.
     */
    type?: StateAcceptDetails.type;
};

export namespace StateAcceptDetails {

    /**
     * The type of state transition detail. Used to ensure pydantic does not coerce into a different type.
     */
    export enum type {
        ACCEPT_DETAILS = 'accept_details',
    }


}

