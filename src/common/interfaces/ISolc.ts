interface Build {
  path: string;
  version: string;
  build: string;
  longVersion: string;
  keccak256: string;
  sha256: string;
  prerelease: string;
  urls: string[];
}

export interface IReleases {
  [version: string]: string;
}

export interface IBuildStructure {
  builds: Build[];
  releases: IReleases;
  latestRelease: string;
}