/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class BlockCapabilitiesService {

    /**
     * Read Available Block Capabilities
     * @param xPrefectApiVersion
     * @returns string Successful Response
     * @throws ApiError
     */
    public static readAvailableBlockCapabilitiesBlockCapabilitiesGet(
        xPrefectApiVersion?: string,
    ): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/block_capabilities/',
            headers: {
                'x-prefect-api-version': xPrefectApiVersion,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
