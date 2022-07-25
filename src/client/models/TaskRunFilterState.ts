/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TaskRunFilterStateName } from './TaskRunFilterStateName';
import type { TaskRunFilterStateType } from './TaskRunFilterStateType';

/**
 * Base model for Prefect filters
 */
export type TaskRunFilterState = {
    type?: TaskRunFilterStateType;
    name?: TaskRunFilterStateName;
};

