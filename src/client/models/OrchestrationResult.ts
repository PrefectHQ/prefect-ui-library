/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SetStateStatus } from './SetStateStatus';
import type { State } from './State';
import type { StateAbortDetails } from './StateAbortDetails';
import type { StateAcceptDetails } from './StateAcceptDetails';
import type { StateRejectDetails } from './StateRejectDetails';
import type { StateWaitDetails } from './StateWaitDetails';

/**
 * A container for the output of state orchestration.
 */
export type OrchestrationResult = {
    state?: State;
    status: SetStateStatus;
    details: (StateAcceptDetails | StateWaitDetails | StateRejectDetails | StateAbortDetails);
};

