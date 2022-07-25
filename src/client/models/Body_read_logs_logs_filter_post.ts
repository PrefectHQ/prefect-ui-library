/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LogFilter } from './LogFilter';
import type { LogSort } from './LogSort';

export type Body_read_logs_logs_filter_post = {
    offset?: number;
    logs?: LogFilter;
    sort?: LogSort;
    /**
     * Defaults to PREFECT_ORION_API_DEFAULT_LIMIT if not provided.
     */
    limit?: number;
};

