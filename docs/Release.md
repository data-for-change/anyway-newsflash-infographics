# ANYWAY: Newsflash InfoGraphics - Releasing

Updating all environments (Production & Demo) are prefeable, although per-envronment release is possible.

### Create a Release

#### Before starting
1. Checkout `dev` branch and `git pull`
1. Make sure you update `version` field in `package.json` for `dev` branch

#### Step 1: Updating target branch (`master` / `demo` etc)

Assuming release is for production (`master` branch)
create PR to update `master` (`master` is base, `dev` should be selected to compare)

_PR name_ format should be: `v0.2.0` - replace with the new version number.

We follow the [semver](https://semver.org/) standard, release considered as a `minor` change,
so if last release was `v0.2.0`, next release should be `v0.3.0`.

#### Step 2: Publish a Release on `dev` branch ( / `demo` etc)

Follow [Creating a release](https://help.github.com/en/github/administering-a-repository/managing-releases-in-a-repository#creating-a-release) steps 1 - 6.

If you want to add changes to your release after creation, You may either:

- Create a new `patch` release (change only the `patch` version number), like: `v0.3.1`
- [Delete the release](https://help.github.com/en/github/administering-a-repository/managing-releases-in-a-repository#deleting-a-release), update `master` and re-create the release with the same verion number
