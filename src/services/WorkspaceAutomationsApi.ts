import { isAxiosError, AxiosError } from 'axios'
import { AutomationResponse } from '@/automations/types/api/automation'
import { Automation } from '@/automations/types/automation'
import { AutomationsFilter } from '@/automations/types/filter'
import { mapper } from '@/services/Mapper'
import { WorkspaceApi } from '@/services/WorkspaceApi'
import { Require } from '@/types/utilities'
import { httpStatus } from '@/utilities/httpStatus'

export class WorkspaceAutomationsApi extends WorkspaceApi {

  protected override routePrefix = '/automations'

  public async getAutomations(filter: AutomationsFilter = {}): Promise<Automation[]> {
    const { data } = await this.post<AutomationResponse[]>('/filter', filter)

    return mapper.map('AutomationResponse', data, 'Automation')
  }

  public async validateTemplate(template: string): Promise<string | true> {
    try {
      await this.post('/templates/validate', template)

      return true
    } catch (error) {
      if (isInvalidAutomationTemplateError(error)) {
        const { line, message } = error.response.data.error

        return `Error on line ${line}: ${message} `
      }

      throw error
    }
  }

}

type InvalidAutomationTemplateError = {
  error: {
    line: number,
    message: string,
    source: string,
  },
}

function isInvalidAutomationTemplateError(error: unknown): error is Require<AxiosError<InvalidAutomationTemplateError>, 'response'> {
  if (!isAxiosError(error)) {
    return false
  }

  return httpStatus(error).is('UnprocessableEntity')
}