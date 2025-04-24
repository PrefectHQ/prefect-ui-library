type SimpleVersionInfo = {
  type: 'prefect:simple',
  /** "" as default */
  version: string,
  branch?: string | null,
  url?: string | null,
}

type GitVersionInfoBase = {
  type: 'vcs:git' | 'vcs:github',
  version: string,
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

export type DeploymentVersionInfo = (SimpleVersionInfo | GithubVersionInfo | GitVersionInfo) & Record<string, unknown>
