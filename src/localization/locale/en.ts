export const en = {
  docs: {
    artifacts: 'https://docs.prefect.io/concepts/artifacts',
    gettingStarted: 'https://docs.prefect.io/getting-started/overview/',
    flows: 'https://docs.prefect.io/concepts/flows/',
    flowRuns: 'https://docs.prefect.io/concepts/flow-runs/',
    blocks: 'https://docs.prefect.io/concepts/blocks/',
    workQueues: 'https://docs.prefect.io/ui/work-queues/',
    notifications: 'https://docs.prefect.io/latest/host/#notifications',
    deployments: 'https://docs.prefect.io/latest/concepts/deployments/',
    concurrency: 'https://docs.prefect.io/concepts/tasks#task-run-concurrency-limits',
    automations: 'https://docs.prefect.io/ui/automations/',
    workPools: 'https://docs.prefect.io/latest/concepts/work-pools/',
    collections: 'https://docs.prefect.io/collections/catalog/',
    resultsPersistence: 'https://docs.prefect.io/concepts/results/#persisting-results',
    infrastructure: 'https://docs.prefect.io/latest/concepts/infrastructure/',
  },
  error: {
    activateDeployment: 'Failed to activate deployment',
    activateNotification: 'Failed to activate notification',
    activateWorkPool: 'Failed to activate work pool',
    activateWorkPoolQueue: 'Failed to activate work pool queue',
    activateWorkQueue: 'Failed to activate work queue',
    cancelFlowRun: 'Failed to cancel flow run',
    changeFlowRunState: 'Failed to change flow run state',
    changeTaskRunState: 'Failed to change task run state',
    createBlock: 'Failed to create block',
    createConcurrencyLimit: 'Failed to create concurrency limit',
    createNotification: 'Failed to create notification',
    createSavedSearch: 'Failed to create saved filter',
    createSchedule: 'Failed to create schedule',
    createVariable: 'Failed to create variable',
    createWorkPool: 'Failed to create work pool',
    createWorkPoolQueue: 'Failed to create work pool queue',
    createWorkQueue: 'Failed to create work queue',
    delete: (type: string) => `Failed to delete ${type}`,
    deleteSavedSearch: 'Failed to delete saved filter',
    editVariable: 'Failed to updated variable',
    invalidJSON: 'Invalid JSON',
    pauseDeployment: 'Failed to pause deployment',
    pauseFlowRun: 'Failed to pause flow run',
    pauseNotification: 'Failed to pause notification',
    pauseWorkPool: 'Failed to pause work pool',
    pauseWorkPoolQueue: 'Failed to pause work pool queue',
    pauseWorkQueue: 'Failed to pause work queue',
    removeSchedule: 'Failed to remove schedule',
    resumeFlowRun: 'Failed to resume flow run',
    retryRun: 'Failed to retry flow run',
    scheduleFlowRun: 'Failed to schedule flow run',
    arrayValueTooLong: (property: string, max: number) => `${property} must have fewer than ${max} items`,
    stringValueTooLong: (property: string, max: number) => `${property} must be less than or equal to ${max} characters`,
    numberValueTooLarge: (property: string, max: number) => `${property} must be less than or equal to ${max}`,
    valueTooLarge: (property: string, max: number) => `${property} must be less than or equal to ${max}`,
    mustBeSnakeCase: (property: string) => `${property} may only contain letters, numbers, and underscores and may not begin or end with an underscore`,
    submitNotification: 'Failed to submit notification',
    updateBlock: 'Failed to update block',
    updateNotification: 'Failed to update notification',
    updateSchedule: 'Failed to update schedule',
    updateWorkPool: 'Failed to update work pool',
    updateWorkPoolQueue: 'Failed to update work pool queue',
    updateWorkQueue: 'Failed to update work queue',
    variableAlreadyExists: 'A variable with this name already exists',
  },
  success: {
    activateDeployment: 'Deployment active',
    activateNotification: 'Notification active',
    activateWorkPool: 'Work pool active',
    activateWorkPoolQueue: 'Work pool queue active',
    activateWorkQueue: 'Work queue active',
    cancelFlowRun: 'Flow run cancelled',
    changeFlowRunState: 'Flow run state changed',
    changeTaskRunState: 'Task run state changed',
    createBlock: 'Block created',
    createConcurrencyLimit: 'Concurrency limit added',
    createNotification: 'Notification created',
    createSavedSearch: 'Filter saved',
    createSchedule: 'Schedule added',
    createVariable: 'Variable created',
    createWorkPool: 'Work pool created',
    createWorkPoolQueue: 'Work pool queue created',
    createWorkQueue: 'Work queue created',
    delete: (type: string) => `${type} deleted`,
    deleteSavedSearch: 'Saved filter deleted',
    editVariable: 'Variable updated',
    pauseDeployment: 'Deployment paused',
    pauseFlowRun: 'Flow run paused',
    pauseNotification: 'Notification paused',
    pauseWorkPool: 'Work pool paused',
    pauseWorkPoolQueue: 'Work pool queue paused',
    pauseWorkQueue: 'Work queue paused',
    removeSchedule: 'Schedule removed',
    resumeFlowRun: 'Flow run resumed',
    retryRun: 'Retrying run',
    scheduleFlowRun: 'Flow run scheduled',
    updateBlock: 'Block updated',
    updateNotification: 'Notification updated',
    updateSchedule: 'Schedule updated',
    updateWorkPool: 'Work pool updated',
    updateWorkPoolQueue: 'Work pool queue updated',
    updateWorkQueue: 'Work queue updated',
  },
  info: {
    filtersActive: 'Filters active',
    resetFilters: 'Reset filters',
    deploymentName: 'Deployment name',
    searchByDeploymentName: 'Search by deployment name',
    workPools: 'Work Pools',
    all: 'All',
    active: 'Active',
    inactive: 'Inactive',
    lastFlowRunState: 'Last Flow Run State',
    lastFlowRunStart: 'Last Flow Run Start',
    schedule: 'Schedule',
    with: 'with',
    artifact: 'Artifact',
    artifacts: 'Artifacts',
    parameters: 'Parameters',
    addTagPlaceholder: 'Add tag (press enter to submit)',
    descriptionPlaceholder: 'Add a description (supports Markdown)',
    parentFlowRun: 'Parent Flow Run',
    flow: 'Flow',
    searchByFlowName: 'Search by flow name',
    deploymentTags: 'Deployment tags',
    artifactSearch: 'Search artifacts',
    variablesSearch: 'Search variables',
    artifactCreated: (key: string) => `Created __${key}__`,
    artifactTypeChanged: (type: string) => `Changed to \`${type}\` artifact`,
    newVariable: 'New variable',
    editVariable: (name: string) => `Edit \`${name}\``,
    deployment: 'Deployment',
    close: 'Close',
    save: 'Save',
    name: 'Name',
    thisVariable: 'this variable',
    theseVariables: 'these variables',
    value: 'Value',
    latest: 'Latest',
    item: 'Item',
    noData: 'No data',
    noVariables: 'No variables',
    noDeployments: 'No deployments',
    noFlowsOrDeploymentsMatchFilter: 'No flows or deployments match your filters',
    deploymentsEmptyStateDescription: (flowName: string = 'flows') => `Create a deployment to begin remotely managing __${flowName}__`,
    copyId: 'Copy ID',
    copyName: 'Copy name',
    copyValue: 'Copy value',
    edit: 'Edit',
    noSchedule: 'No schedule',
    delete: 'Delete',
    tags: 'Tags',
    nextRun: 'Next run',
    lastRun: 'Last run',
    workPool: 'Work Pool',
    workQueue: 'Work Queue',
    filterByTags: 'Filter by tags',
    invalidData: (docsUrl: string) => `Invalid data, see [documentation](${docsUrl}) for more information`,
    result: 'Result',
    noResults: 'No tracked results, enable [result persistence](https://docs.prefect.io/concepts/results/#persisting-results) to track results.',
    none: 'None',
    infraOverrides: 'Infrastructure Overrides',
    terminalTaskRunNoArtifacts: 'This task run did not produce any artifacts; for more information on creating artifacts, see the [documentation](https://docs.prefect.io/concepts/artifacts).',
    nonTerminalTaskRunNoArtifacts: 'This task run has not yet produced artifacts; for more information on creating artifacts, see the [documentation](https://docs.prefect.io/concepts/artifacts).',
    terminalFlowRunNoArtifacts: 'This run did not produce any artifacts; for more information on creating artifacts, see the [documentation](https://docs.prefect.io/concepts/artifacts).',
    nonTerminalFlowRunNoArtifacts: 'This run has not yet produced artifacts; for more information on creating artifacts, see the [documentation](https://docs.prefect.io/concepts/artifacts).',
    flowRun: 'Flow run',
    taskRun: 'Task run',
    taskRuns: 'Task runs',
    variable: 'Variable',
    variables: 'Variables',
    created: 'Created',
    create: 'Create',
    lastUpdated: 'Last Updated',
    deprecatedWorkQueue: 'This work queue uses a deprecated tag-based approach to matching flow runs; it will continue to work but you can\'t modify it',
    deploymentMissingWorkQueue: 'This deployment doesn\'t have an associated work queue; runs will be scheduled but won\'t be picked up by your agents',
    taskInput: 'Task inputs show parameter keys and can also show task run relationships.',
    workPoolInfrastructureConfigurationInstructions: 'Below you can configure workers\' behavior when executing flow runs from this work pool. You can use the editor in the **Advanced** section to modify the existing configuration options if you need additional configuration options.\nIf you don\'t need to change the default behavior, hit **Create** to create your work pool!',
    workPoolInfrastructureConfigurationAgent: 'Prefect Agents handle infrastructure configuration via infrastructure blocks attached to deployments. You can hit **Create** to create this work pool and then head over to the **Blocks** tab to create an infrastructure block for your deployments.\nTo learn more about how to configure infrastructure for Prefect Agents, check out the [docs](https://docs.prefect.io/latest/concepts/infrastructure/).',
    disableFlowRunCancel: 'Prefect only offers cancellation of runs directly created by a deployment.',
  },
}