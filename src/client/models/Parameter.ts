/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Represents a parameter input to a task run.
 */
export type Parameter = {
    input_type?: Parameter.input_type;
    name: string;
};

export namespace Parameter {

    export enum input_type {
        PARAMETER = 'parameter',
    }


}

