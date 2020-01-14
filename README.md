# Hooks Workshop

## Workshop Instructions

This repo was created for a workshop on React Hooks. It presents examples of traditional React components (built by creating a `class` that extends `React.Component`) being converted to functional component that use hooks.

To begin this workshop
- fork this repo
- clone the repo locally
- Use the latest version of Node indicated in the file `.nvmrc`. If you are using NVM, you can run `nvm use`
- Run `npm install`

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


## Interesting Reads

**Thinking in React Hooks**
- https://wattenberger.com/blog/react-hooks
- Great explanation of how implementing hooks how you think about the changes happening in your omponents. Includes quick comparisons and some custom hook examples.


**A Complete Guide to useEffect**
- https://overreacted.io/a-complete-guide-to-useeffect/
- As the title implies, a thorough guide on useEffect, including some gotchas you might run into


**State Management with React Hooks and Context API in 10 lines of code!**
- https://medium.com/simply/state-management-with-react-hooks-and-context-api-at-10-lines-of-code-baf6be8302c
- Clever and concise use of Hooks and Context to arrive at something that feels very similar to Redux. Keep in mind, however, that the `state` is changed on every dispatch, and all consumers are triggered by that change.


**React issue: Preventing rerenders with React.memo and useContext hook**
- https://github.com/facebook/react/issues/15156#issuecomment-474590693
- The link to this comment on GitHub is actually referenced in the API documentation of `useContext`. It presents 3 different ways you can try to optimize your use of useContext when it has an object value.

**React-Redux Roadmap: v6, Context, Subscriptions, and Hooks**
- https://github.com/reduxjs/react-redux/issues/1177
- React-Redux decided to switch to using Context in v6, ran into performance issues, ditched it in favor returning to something closer to pubsub for v7. This Github Issue goes into great detail about what problems they ran to and had some interesting tidbits of knowledge they gained from this experience.
