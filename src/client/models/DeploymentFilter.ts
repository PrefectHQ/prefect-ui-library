/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DeploymentFilterId } from './DeploymentFilterId';
import type { DeploymentFilterIsScheduleActive } from './DeploymentFilterIsScheduleActive';
import type { DeploymentFilterName } from './DeploymentFilterName';
import type { DeploymentFilterTags } from './DeploymentFilterTags';

/**
 * Filter for deployments. Only deployments matching all criteria will be returned.
 */
export type DeploymentFilter = {
    /**
     * Filter criteria for `Deployment.id`
     */
    id?: DeploymentFilterId;
    /**
     * Filter criteria for `Deployment.name`
     */
    name?: DeploymentFilterName;
    /**
     * Filter criteria for `Deployment.is_schedule_active`
     */
    is_schedule_active?: DeploymentFilterIsScheduleActive;
    /**
     * Filter criteria for `Deployment.tags`
     */
    tags?: DeploymentFilterTags;
};

