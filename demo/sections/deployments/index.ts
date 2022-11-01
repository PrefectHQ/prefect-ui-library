import { Section } from '@/demo/router/routeRecords'

export const deployments: Section = {
  CronScheduleForm: () => import ('./CronScheduleForm.vue'),
}