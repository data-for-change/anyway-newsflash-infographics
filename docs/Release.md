# ANYWAY: Newsflash InfoGraphics - Releasing

TL;DR

1. Update version in `package.json`
2. Update `dev` and `master` branches
3. [Creating a release](https://help.github.com/en/github/administering-a-repository/managing-releases-in-a-repository#creating-a-release) based on `master`

### Create a Release

#### Before starting

1. Checkout `dev` branch and `git pull`
1. Make sure you update `version` field in `package.json` for `dev` branch

#### Step 1: Updating target branch (`master`)

Assuming release is for production (`master` branch)
create PR to update `master` (`master` is base, `dev` should be selected to compare)

_PR name_ format should be: `v0.2.0` - replace with the new version number.

We follow the [semver](https://semver.org/) standard, release considered as a `minor` change,
so if last release was `v0.2.0`, next release should be `v0.3.0`.

#### Step 2: Publish a Release on `master` branch

Go to [create a new release](https://github.com/hasadna/anyway-newsflash-infographics/releases/new) and create a release with the version number and `Target:master`.

If you're new to github releases, follow [Creating a release](https://help.github.com/en/github/administering-a-repository/managing-releases-in-a-repository#creating-a-release) steps 1 - 6.

If you want to add changes to your release after creation, You may either:

- Create a new `patch` release (change only the `patch` version number), like: `v0.3.1`
- [Delete the release](https://help.github.com/en/github/administering-a-repository/managing-releases-in-a-repository#deleting-a-release), update `master` and re-create the release with the same version number
