/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { StateDetails } from './StateDetails';
import type { StateType } from './StateType';

/**
 * Represents the state of a run.
 */
export type State = {
    id?: string;
    type: StateType;
    name?: string;
    timestamp?: string;
    message?: string;
    data?: any;
    state_details?: StateDetails;
};

