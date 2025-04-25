type SimpleVersionInfo = {
  type: 'prefect:simple',
  /** "" as default */
  version: string,
  branch?: string | null,
  url?: string | null,
}

type GitVersionInfoBase = {
  type: string,
  version: string,
  commit_sha: string,
  message: string,
  branch: string,
  url: string,
  repository: string,
}

type GitVersionInfo = GitVersionInfoBase & {
  type: 'vcs:git',
}

type GithubVersionInfo = GitVersionInfoBase & {
  type: 'vcs:github',
}

type GitlabVersionInfo = GitVersionInfoBase & {
  type: 'vcs:gitlab',
}

type BitbucketVersionInfo = GitVersionInfoBase & {
  type: 'vcs:bitbucket',
}

type AzureDevopsVersionInfo = GitVersionInfoBase & {
  type: 'vcs:azuredevops',
}

export type DeploymentVersionInfo = (SimpleVersionInfo | GithubVersionInfo | GitVersionInfo | GitlabVersionInfo | BitbucketVersionInfo | AzureDevopsVersionInfo) & Record<string, unknown>
