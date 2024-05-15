export const en = {
  docs: {
    artifacts: 'https://docs.prefect.io/concepts/artifacts',
    gettingStarted: 'https://docs.prefect.io/getting-started/overview/',
    flows: 'https://docs.prefect.io/concepts/flows/',
    flowRuns: 'https://docs.prefect.io/concepts/flow-runs/',
    blocks: 'https://docs.prefect.io/concepts/blocks/',
    workQueues: 'https://docs.prefect.io/ui/work-queues/',
    notifications: 'https://docs.prefect.io/latest/guides/host/#devex-notifications',
    deployments: 'https://docs.prefect.io/latest/concepts/deployments/',
    concurrency: 'https://docs.prefect.io/concepts/tasks#task-run-concurrency-limits',
    globalConcurrency: 'https://docs.prefect.io/guides/global-concurrency-limits/',
    automations: 'https://docs.prefect.io/ui/automations/',
    automationTriggers: 'https://docs.prefect.io/ui/automations/#triggers',
    workPools: 'https://docs.prefect.io/latest/concepts/work-pools/',
    collections: 'https://docs.prefect.io/collections/catalog/',
    resultsPersistence: 'https://docs.prefect.io/concepts/results/#persisting-results',
    infrastructure: 'https://docs.prefect.io/latest/concepts/infrastructure/',
    variables: 'https://docs.prefect.io/latest/guides/variables/',
  },
  error: {
    activateDeployment: 'Failed to activate deployment',
    activateDeploymentSchedule: 'Failed to activate deployment schedule',
    activateNotification: 'Failed to activate notification',
    activateWorkPool: 'Failed to activate work pool',
    activateWorkPoolQueue: 'Failed to activate work queue',
    activateWorkQueue: 'Failed to activate work queue',
    cancelFlowRun: 'Failed to cancel flow run',
    changeFlowRunState: 'Failed to change flow run state',
    changeTaskRunState: 'Failed to change task run state',
    createBlock: 'Failed to create block',
    createConcurrencyLimit: 'Failed to create concurrency limit',
    resetConcurrencyLimit: 'Failed to reset concurrency limit',
    createNotification: 'Failed to create notification',
    createSavedSearch: 'Failed to create saved filter',
    createSchedule: 'Failed to create schedule',
    createVariable: 'Failed to create variable',
    createWorkPool: 'Failed to create work pool',
    createWorkPoolQueue: 'Failed to create work queue',
    createWorkQueue: 'Failed to create work queue',
    delete: (type: string) => `Failed to delete ${type}`,
    deleteSavedSearch: 'Failed to delete saved filter',
    editVariable: 'Failed to updated variable',
    invalidJSON: 'Invalid JSON',
    pauseDeployment: 'Failed to pause deployment',
    pauseDeploymentSchedule: 'Failed to deactivate deployment schedule',
    pauseNotification: 'Failed to pause notification',
    pauseWorkPool: 'Failed to pause work pool',
    pauseWorkPoolQueue: 'Failed to pause work queue',
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
    suspendFlowRun: 'Failed to suspend flow run',
    updateBlock: 'Failed to update block',
    updateConcurrencyLimit: 'Failed to update concurrency limit',
    updateDeploymentSchedule: 'Failed to update deployment schedule',
    updateNotification: 'Failed to update notification',
    updateSchedule: 'Failed to update schedule',
    updateWorkPool: 'Failed to update work pool',
    updateWorkPoolQueue: 'Failed to update work queue',
    updateWorkQueue: 'Failed to update work queue',
    variableAlreadyExists: 'A variable with this name already exists',
    automationToggle: (enabled: boolean) => enabled ? 'Sorry, something went wrong enabling your automation' : 'Sorry, something went wrong disabling your automation',
    automationDelete: 'Sorry, something went wrong deleting your automation',
    automationCreate: 'Sorry, something went wrong creating your automation',
    automationUpdate: 'Sorry, something went wrong updating your automation',
  },
  success: {
    activateDeployment: 'Deployment active',
    activateDeploymentSchedule: 'Deployment schedule active',
    activateNotification: 'Notification active',
    activateWorkPool: 'Work pool active',
    activateWorkPoolQueue: 'Work queue active',
    activateWorkQueue: 'Work queue active',
    cancelFlowRun: 'Flow run cancelled',
    changeFlowRunState: 'Flow run state changed',
    changeTaskRunState: 'Task run state changed',
    createBlock: 'Block created',
    createConcurrencyLimit: 'Concurrency limit added',
    resetConcurrencyLimit: 'Concurrency limit reset',
    createNotification: 'Notification created',
    createSavedSearch: 'Filter saved',
    createSchedule: 'Schedule added',
    createVariable: 'Variable created',
    createWorkPool: 'Work pool created',
    createWorkPoolQueue: 'Work queue created',
    createWorkQueue: 'Work queue created',
    delete: (type: string) => `${type} deleted`,
    deleteSavedSearch: 'Saved filter deleted',
    editVariable: 'Variable updated',
    pauseDeployment: 'Deployment paused',
    pauseDeploymentSchedule: 'Deployment schedule inactive',
    pauseNotification: 'Notification paused',
    pauseWorkPool: 'Work pool paused',
    pauseWorkPoolQueue: 'Work queue paused',
    pauseWorkQueue: 'Work queue paused',
    removeSchedule: 'Schedule removed',
    resumeFlowRun: 'Flow run resumed',
    retryRun: 'Retrying run',
    scheduleFlowRun: 'Flow run scheduled',
    suspendFlowRun: 'Flow run suspended',
    updateBlock: 'Block updated',
    updateDeploymentSchedule: 'Deployment schedule updated',
    updateNotification: 'Notification updated',
    updateConcurrencyLimit: 'Concurrency limit updated',
    updateSchedule: 'Schedule updated',
    updateWorkPool: 'Work pool updated',
    updateWorkPoolQueue: 'Work queue updated',
    updateWorkQueue: 'Work queue updated',
    automationEnable: (enabled: boolean = true) => enabled ? 'Automation enabled' : 'Automation disabled',
    automationDelete: 'Automation deleted',
    automationCreate: 'Automation created',
    automationUpdate: 'Automation updated',
  },
  info: {
    form: 'Form',
    json: 'JSON',
    schemaHasNoProperties: 'This schema has no properties',
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
    artifactsEmptyState: 'Artifacts are byproducts of your runs; they can be anything from a markdown string to a table.',
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
    editVariable: (name: string) => `Edit ${name}`,
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
    values: 'Values',
    nextRun: 'Next run',
    lastRun: 'Last run',
    workPool: 'Work Pool',
    workQueue: 'Work Queue',
    filterByTags: 'Filter by tags',
    invalidData: (docsUrl: string) => `Invalid data, see [documentation](${docsUrl}) for more information`,
    result: 'Result',
    noResults: 'No tracked results, enable [result persistence](https://docs.prefect.io/concepts/results/#persisting-results) to track results.',
    none: 'None',
    noDescription: 'No description',
    dashboardWorkPoolCardTitle: 'Active Work Pools',
    dashboardWorkPoolCardEmpty: 'There are no active work pools to show. Any work pools you do have are paused.',
    dashboardWorkPoolCardViewAll: 'View all work pools',
    percentChangeOverTimePeriod: (percent: string | number) => `${percent}% change compared to the previous time period.`,
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
    workPoolInfrastructureConfigurationInstructions: 'Below you can configure defaults for deployments that use this work pool. Use the editor in the **Advanced** section to modify the existing configuration options, if needed.\nIf you don\'t need to change the default configuration, click **Create** to create your work pool!',
    workPoolInfrastructureConfigurationAgent: 'Prefect Agents handle infrastructure configuration via infrastructure blocks attached to deployments. You can hit **Create** to create this work pool and then head over to the **Blocks** tab to create an infrastructure block for your deployments.\nTo learn more about how to configure infrastructure for Prefect Agents, check out the [docs](https://docs.prefect.io/latest/concepts/infrastructure/).',
    disableFlowRunCancel: 'Only runs created from a deployment can be cancelled',
    flowRunGraphNotDisplayedHeader: 'Manual graph rendering',
    flowRunGraphNotDisplayedCopy: 'Large graphs are hidden by default. They may take time to generate and in extreme circumstances, may impact browser performance.',
    flowRunGraphNotDisplayedCta: 'Display graph',
  },
}
