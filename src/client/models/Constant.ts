/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Represents constant input value to a task run.
 */
export type Constant = {
    input_type?: Constant.input_type;
    type: string;
};

export namespace Constant {

    export enum input_type {
        CONSTANT = 'constant',
    }


}

