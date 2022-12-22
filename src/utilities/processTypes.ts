  // Expand this mapper as more process types are added to backend
export function mapProcessTypeValueToProcessTypeLabel(processType: string | null | undefined): string {
  switch (processType) {
    case 'prefect-agent':
      return 'Prefect Agent'
    default:
      return 'Unknown'
  }
}