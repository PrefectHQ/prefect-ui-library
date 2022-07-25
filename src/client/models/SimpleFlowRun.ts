/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { StateType } from './StateType';

/**
 * A base pydantic.BaseModel for all Prefect schemas and pydantic models.
 *
 * As the basis for most Prefect schemas, this base model usually ignores extra
 * fields that are passed to it at instantiation. Because adding new fields to
 * API payloads is not considered a breaking change, this ensures that any
 * Prefect client loading data from a server running a possibly-newer version
 * of Prefect will be able to process those new fields gracefully. However,
 * when PREFECT_TEST_MODE is on, extra fields are forbidden in order to catch
 * subtle unintentional testing errors.
 */
export type SimpleFlowRun = {
    /**
     * The flow run id.
     */
    id: string;
    /**
     * The state type.
     */
    state_type: StateType;
    /**
     * The start time of the run, or the expected start time if it hasn't run yet.
     */
    timestamp: string;
    /**
     * The total run time of the run.
     */
    duration: number;
    /**
     * The delay between the expected and actual start time.
     */
    lateness: number;
};

