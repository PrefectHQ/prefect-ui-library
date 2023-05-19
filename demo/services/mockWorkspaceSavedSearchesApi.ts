import { SavedSearch } from '@/models/SavedSearch'
import { IWorkspaceSavedSearchesApi } from '@/services/WorkspaceSavedSearchesApi'

export class MockWorkspaceSavedSearchesApi implements IWorkspaceSavedSearchesApi {

  public getSavedSearches(): Promise<SavedSearch[]> {
    throw new Error('Not Implemented')
  }

  public getSavedSearch(): Promise<SavedSearch> {
    throw new Error('Not Implemented')
  }

  public createSavedSearch(): Promise<SavedSearch> {
    throw new Error('Not Implemented')
  }

  public deleteSavedSearch(): Promise<void> {
    throw new Error('Not Implemented')
  }

}