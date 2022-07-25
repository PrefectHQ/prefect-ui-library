/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

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
export type StateDetails = {
    flow_run_id?: string;
    task_run_id?: string;
    child_flow_run_id?: string;
    scheduled_time?: string;
    cache_key?: string;
    cache_expiration?: string;
};

