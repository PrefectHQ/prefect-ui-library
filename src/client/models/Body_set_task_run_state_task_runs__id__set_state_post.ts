/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { StateCreate } from './StateCreate';

export type Body_set_task_run_state_task_runs__id__set_state_post = {
    /**
     * The intended state.
     */
    state: StateCreate;
    /**
     * If false, orchestration rules will be applied that may alter or prevent the state transition. If True, orchestration rules are not applied.
     */
    force?: boolean;
};

