/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { StateDetails } from './StateDetails';
import type { StateType } from './StateType';

/**
 * Data used by the Orion API to create a new state.
 */
export type StateCreate = {
    type: StateType;
    name?: string;
    message?: string;
    data?: any;
    state_details?: StateDetails;
};

