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
- RTK Query for data fetching and caching
- Redux with GraphQL integration
- Event Sourcing with Redux
- Offline-First Redux Applications
- Redux in Micro Frontends
- Security Best Practices for Redux
- Feature-Sliced Design pattern
- Ducks pattern
- Redux modules
- Event-driven architecture
- Building custom middleware
- Redux performance optimization
- Mastering Redux DevTools
- State machines with Redux
- Form management strategies

## Additional Redux Topics to Explore

Here are more advanced topics to deepen your Redux knowledge:

### Integration & Migration
- Redux with React Native - Mobile-specific patterns and optimizations
- Redux with Next.js - Integration with server components and app router
- Migrating from Context API to Redux - When and how to upgrade
- Migrating legacy Redux to Redux Toolkit - Modernization strategies
- Redux in monorepo architectures - Sharing Redux logic across applications

### Advanced Testing & Debugging
- Redux Saga testing patterns - Testing complex asynchronous flows
- Time-travel debugging advanced techniques - Practical usage scenarios
- Redux DevTools extension customization - Creating custom monitors
- Redux performance profiling - Identifying and fixing bottlenecks
- Visualization of state changes - Custom visualizers for complex state

### Specialized Patterns
- Backend-for-Frontend (BFF) pattern with Redux
- Advanced undo/redo functionality - Implementing application-wide time travel
- Permission-based Redux state - Handling role-based access control
- Feature flags and A/B testing integration with Redux
- Domain-driven design (DDD) with Redux - Strategic and tactical patterns
- Redux and finite state machines - Combining with XState for complex workflows
- Multi-tenant applications - Isolating state in multi-tenant systems
- Internationalization and localization patterns

### Extending Redux
- Custom Redux middleware development - Advanced patterns and use cases
- Higher-order reducers - Enhancing reducers with cross-cutting concerns
- Redux enhancers - Beyond middleware for store customization
- Meta-reducers - Reducers that operate on other reducers
- Custom serialization and persistence strategies

### Performance & Scale
- Large-scale Redux architecture - Patterns for enterprise applications
- Redux sharding - Strategies for very large state trees
- Optimizing selector performance - Advanced memoization techniques
- Worker thread integration - Offloading Redux operations

## Learn More

- [React documentation](https://reactjs.org/)
- [Redux documentation](https://redux.js.org/)
- [React Redux documentation](https://react-redux.js.org/)
- [Redux Toolkit documentation](https://redux-toolkit.js.org/)
- [RTK Query documentation](https://redux-toolkit.js.org/rtk-query/overview)
- [Redux Persist documentation](https://github.com/rt2zz/redux-persist)
- [Feature Sliced Design](https://feature-sliced.design/)
- [XState (for state machines)](https://xstate.js.org/)
