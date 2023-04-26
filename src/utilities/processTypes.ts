import { titleCase } from '@/utilities/strings'

export function getProcessTypeLabel(processType: string): string {
  switch (processType) {
    case 'cloud-run':
      return 'Google Cloud Run'
    case 'ecs':
      return 'Amazon Elastic Container Service'
    default:
      return titleCase(processType)
  }
}