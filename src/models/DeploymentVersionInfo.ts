type SimpleVersionInfo = {
  type: 'prefect:simple',
  /** "" as default */
  version: string,
  branch?: string | null,
  url?: string | null,
}

type GitVersionInfo = {
  type: 'vcs:git',
  version: string,
  branch: string,
  url: string,
  repository: string,
}

type GithubVersionInfo = GitVersionInfo & {
  type: 'vcs:github',
}

export type DeploymentVersionInfo = (SimpleVersionInfo | GithubVersionInfo | GitVersionInfo) & Record<string, unknown>
