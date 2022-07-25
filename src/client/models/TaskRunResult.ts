/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Represents a task run result input to another task run.
 */
export type TaskRunResult = {
    input_type?: TaskRunResult.input_type;
    id: string;
};

export namespace TaskRunResult {

    export enum input_type {
        TASK_RUN = 'task_run',
    }


}

