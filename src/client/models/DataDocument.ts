/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * A data document includes an encoding string and a blob of encoded data
 *
 * Subclasses can define the expected type for the blob's underlying type using the
 * generic variable `D`.
 *
 * For example `DataDocument[str]` indicates that a string should be passed when
 * creating the document and a string will be returned when it is decoded.
 */
export type DataDocument = {
    encoding: string;
    blob: Blob;
};

