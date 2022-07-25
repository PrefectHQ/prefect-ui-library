/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { State } from './State';
import type { TaskRunResult } from './TaskRunResult';

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
export type DependencyResult = {
    id: string;
    upstream_dependencies: Array<TaskRunResult>;
    state: State;
    expected_start_time?: string;
    start_time?: string;
    end_time?: string;
    total_run_time?: number;
    estimated_run_time?: number;
};

