
export interface IWorkQueueFilter {
  tags: string[],
  deploymentIds: string[],
}

export class WorkQueueFilter implements IWorkQueueFilter {
  public tags: string[]
  public deploymentIds: string[]

  public constructor(filter: IWorkQueueFilter) {
    this.tags = filter.tags
    this.deploymentIds = filter.deploymentIds
  }
}