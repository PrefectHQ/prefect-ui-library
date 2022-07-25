/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FlowRunFilterStateName } from './FlowRunFilterStateName';
import type { FlowRunFilterStateType } from './FlowRunFilterStateType';

/**
 * Base model for Prefect filters
 */
export type FlowRunFilterState = {
    type?: FlowRunFilterStateType;
    name?: FlowRunFilterStateName;
};

