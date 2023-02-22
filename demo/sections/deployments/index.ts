import { Section } from '@/demo/router/routeRecords'

export const deployments: Section = {
  CreateRunForm: () => import('./CreateRunForm.vue'),
  CronScheduleForm: () => import('./CronScheduleForm.vue'),
  DeploymentForm: () => import('./DeploymentForm.vue'),
}