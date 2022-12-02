import 'vue-router'
import { PermissionString } from '@/types/permissions'

declare module 'vue-router' {
  interface RouteMeta {
    can?: PermissionString | PermissionString[],
  }
}