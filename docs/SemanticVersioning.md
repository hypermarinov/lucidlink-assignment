## Semantic versioning for this package:

This package uses semantic versioning. To bump the version you need to add semver:<patch|minor|major> to commit name.
All PRs will be squashed so when prompted for a commit message add the semver to the commit message if not present. For example if the current version is 1.0.1 and you create a commit message "My perfect PR +semver:minor" it will bump the version to 1.1.0. If no +semver is provided the PR will be treated as a patch PR.
