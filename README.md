# Redux Demo

A demonstration project for React Redux core concepts.

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later recommended)
- [pnpm](https://pnpm.io/) (v8 or later recommended)

## Getting Started

### Installation

1. Clone the repository
2. Install dependencies using pnpm:

```bash
pnpm install
```

### Available Scripts

In the project directory, you can run:

#### `pnpm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### `pnpm build`

Builds the app for production to the `build` folder.

#### `pnpm test`

Launches the test runner in interactive watch mode.

#### `pnpm server`

Runs the server-side rendering example (for SSR demo).

## Project Structure

```
src/
  ├── actions/     # Redux actions
  ├── components/  # React components
  ├── reducers/    # Redux reducers
  ├── store/       # Redux store configuration
  └── index.js     # App entry point
```

## Redux Core Concepts

This project demonstrates:

| Concept                                   | Description                                          |
| :---------------------------------------- | :--------------------------------------------------- |
| <a href="https://redux.js.org/basics/actions">Actions and Action Creators</a>               | Functions that create actions to update state        |
| <a href="https://redux.js.org/basics/reducers">Reducers</a>                                  | Functions that determine how state changes           |
| <a href="https://redux.js.org/basics/store">Store</a>                                     | The object that brings actions and reducers together |
| <a href="https://react-redux.js.org/api/hooks">React-Redux integration with hooks</a>        | Using React hooks to interact with Redux store       |
| <a href="https://redux.js.org/usage/writing-logic-thunks">Async operations using Redux Thunk middleware</a> | Handling asynchronous logic in Redux                 |
| <a href="https://github.com/rt2zz/redux-persist">Redux Persist</a> | Persistently storing Redux state across sessions    |
| <a href="https://feature-sliced.design/">Redux Architecture Patterns</a> | Organizing Redux code for better maintainability    |

## Advanced Topics

This project also covers advanced Redux concepts:

- Normalization of state
- Memoized selectors with Reselect
- Advanced caching with re-reselect
- Feature-Sliced Design pattern
- Ducks pattern
- Redux modules
- Event-driven architecture

## Learn More

- [React documentation](https://reactjs.org/)
- [Redux documentation](https://redux.js.org/)
- [React Redux documentation](https://react-redux.js.org/)
- [Redux Persist documentation](https://github.com/rt2zz/redux-persist)
- [Feature Sliced Design](https://feature-sliced.design/)
