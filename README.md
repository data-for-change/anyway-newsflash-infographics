[![deploy-development](https://github.com/hasadna/anyway-newsflash-infographics/workflows/deploy-development/badge.svg)](https://github.com/hasadna/anyway-newsflash-infographics/actions?query=workflow%3Adeploy-development)

[![CI](https://github.com/hasadna/anyway-newsflash-infographics/workflows/CI/badge.svg)](https://github.com/hasadna/anyway-newsflash-infographics/actions?query=workflow%3ACI)

# ANYWAY: Newsflash InfoGraphics.
## About this project
Learn more about our [Vision](https://github.com/hasadna/anyway-newsflash-infographics/blob/development/Vision.md)

## Want to help?
Want to file a bug, contribute some code, or improve documentation? Excellent! Please follow these steps
### First thing first
* Join our [Slack Channel](https://app.slack.com/client/T02G85W3A/CLWT1CLDQ). contact Yuval or Atalya to get invitation.
* Optional: installing [ZenHub](https://chrome.google.com/webstore/detail/zenhub-for-github/ogcgkffhplmphkaahpmffcafajaocjbd) would make it easier to look at our project [board](https://github.com/hasadna/anyway-newsflash-infographics#workspaces/anyway-5e00f3aa79454c5108bf2370/).

### Diving in
* For improving documentation:
    - see issues marked as [documentation](https://github.com/hasadna/anyway-newsflash-infographics/issues?q=is%3Aopen+is%3Aissue+label%3Adocumentation) and contact Yuval for guidance
    - This is a [good summary](https://medium.com/@kvosswinkel/coding-like-a-journalist-ee52360a16bc) for things to keep in mind when writing technical docs
* For feature development, bug fixing etc:
    - Read the [Technical Overview](https://github.com/hasadna/anyway-newsflash-infographics#technical-overview) 
    and [Project directory structure](https://github.com/hasadna/anyway-newsflash-infographics#project-directory-structure) sections 
    - Contact one of the project's leaders, which can help you getting into things easily
    - Select one of the issues marked as [good first issue](https://github.com/hasadna/anyway-newsflash-infographics/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22)
    - Read [Contribution Guidelines](https://github.com/hasadna/anyway-newsflash-infographics#contribution-guidelines) before start working on an issue
* If you have any question - feel free to contact Yuval or Atalya from AnyWAY Project

### Technical Overview
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

It is following [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/) guidelines with the following changes:
* There are no "Organisms" components.
* Atoms and Molecules are not state-aware (do not know MobX store exist)
* Templates and Pages are state-aware
* Molecules may contain other Molecules or Atoms. Atoms does not contain other Atoms.

2rd Party libraries included:
* [React Router](https://reacttraining.com/react-router/web/guides/quick-start)
* [MobX](https://mobx.js.org/) - using [react-mobx-lite](https://github.com/mobxjs/mobx-react-lite) with [hooks](https://mobx-react.js.org/libraries)
* [axios](https://github.com/axios/axios)
* [Storybook](https://storybook.js.org/)
* [Material-UI](https://material-ui.com/)
* [React-Vis](https://uber.github.io/react-vis/) - Graphs Data Visualization Components

### Project directory structure
```
.
+-- assets          // images, icons, audio etc.
+-- components      // internal components (anything other than page component)
|   +-- atoms
|   +-- molecules
|   +-- organisms
|   +-- templates
+-- hooks           // common reusable hooks 
+-- models          // typescript interfaces and classes
+-- pages           // page components
+-- services        // REST API, websocket, storage etc.
+-- store           // MobX stores
+-- style           // css-in-js code and wrappers
|   +-- _globals.ts // sizes, colors etc. - can be divided as project grow
|   +-- theme.ts
+-- utils
+-- App.tsx
+-- index.html
+-- index.css      // global styles (like fonts or reset/normalize css code)
```

### Contribution Guidelines
Branch naming convention is as following
```
TYPE(ISSUE_ID)-DESCRIPTION

examples:
feat(113)-add-newsflash-location-on-map
fix(114)-newsflash-location-not-accurate
```
When `TYPE` can be:
* **feat** - is a new feature
* **doc** - documentation only changes
* **cicd** - changes related to CI/CD system
* **fix** - a bug fix
* **refactor** -  code change that neither fixes a bug nor adds a feature

**All PRs must include commit message with the changes description!**

Branching system:
*master* - used for production <br>
*development* - anything else <br>
A standard procedure for working on an issue would be to:
1. `git pull development`
2. Create new branch from `development` , like: `refactor(137)-making-pie-chart-generic-component`
3. Work - commit - repeat
4. Push branch and open PR to `development`.
5. Get a code review approval / reject
6. After approval, merge your PR
7. Delete your branch after merge

### Server API <a id="serverapi"></a> 
See [API document](https://docs.google.com/document/d/1Hv5ItvwM3z9nn95LjlsYHL-o18V8PgWrrQOKIPiPymU)

### CICD <a id="cicd"></a> 
We use [github actions](https://github.com/marketplace?type=actions) for the following flows:

1. [on-push CI](https://github.com/hasadna/anyway-newsflash-infographics/actions?query=workflow%3ACI) - provide per-PR CI testing
2. [deploy-development](https://github.com/hasadna/anyway-newsflash-infographics/actions?query=workflow%3Adeploy-development) continous deployment of `development` branch to https://anyway-newsflash-infographics.web.app/
3. [deploy-master]() - TBD

Note: see the flows status badge at the top of this file

### About bundle size
Since [Create React App](https://github.com/facebook/create-react-app) uses webpack under the hood,
You can safely use [named imports](https://stackoverflow.com/questions/36795819/when-should-i-use-curly-braces-for-es6-import/36796281#36796281)
when working with [Material UI components](https://material-ui.com/guides/minimizing-bundle-size/#how-to-reduce-the-bundle-size).


### VScode prettier
If you're using VScode prettier, please use the following config:
```
{
  "prettier.jsxSingleQuote": true,
  "javascript.preferences.quoteStyle": "single",
  "typescript.preferences.quoteStyle": "single",
  "prettier.singleQuote": true
} 
```
## Mock Server 
Mock server can be found under https://anyway-mock-server.herokuapp.com/api.
The server caching all responses from each unique request.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run sb`
Run [storybook](https://storybook.js.org/docs/configurations/cli-options/#for-start-storybook) locally.
