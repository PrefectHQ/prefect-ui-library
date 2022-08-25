import axios, { AxiosInstance } from 'axios'
import { inject } from '@/utilities'
import { combine } from '@/utilities/path'

export type ApiAxiosInstance = (route: string) => Promise<AxiosInstance>

export async function getBaseInstance(route: string = ''): Promise<AxiosInstance> {
  const server: string | Promise<string> = inject('serverKey')

  return axios.create({
    baseURL: combine(await server, route),
  })
}