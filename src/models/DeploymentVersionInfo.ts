// Ref: prefect repo src/prefect/versioning/py

type SimpleVersionInfo = {
  type: 'prefect:simple',
  version: string,
  branch?: string | null,
  url?: string | null,
}

type GithubVersionInfo = {
  type: 'vcs:github',
  version: string,
  branch: string,
  url: string,
  repository: string,
}

type GitVersionInfo = {
  type: 'vcs:git',
  version: string,
  branch: string,
  url: string,
  repository: string,
}

type DockerVersionInfo = {
  type: 'container:docker',
  version: string,
  branch: string,
  url: string,
  image_name: string,
  registry: string,
  image: string,
}

export type DeploymentVersionInfo = SimpleVersionInfo | GithubVersionInfo | GitVersionInfo | DockerVersionInfo
