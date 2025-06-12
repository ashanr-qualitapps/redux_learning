import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Routes, Route } from 'react-router-dom';
import store, { persistor } from './store';
import Counter from './components/Counter';
import TodoList from './components/TodoList';
import HomePage from './components/HomePage';
import { RTKQueryComponent } from './components/RTKQueryComponent';
import { UndoRedoPatternComponent } from './components/AdvancedTopics';
import './App.css';
import { 
  ActionsComponent, 
  ReducersComponent, 
  StoreComponent, 
  HooksComponent, 
  ThunksComponent, 
  MiddlewareComponent, 
  ReduxThunkComponent, 
  ReduxSagaComponent, 
  ReduxObservableComponent,
  // Re-export RTK Query component
  ReduxWithGraphQLComponent,
  EventSourcingComponent,
  ReduxOfflineFirstComponent,
  ReduxMicroFrontendsComponent,
  ReduxSecurityComponent
} from './components/TopicComponents';
import { NormalizationComponent, ManualNormalizationComponent, NormalizrComponent, EntityAdapterComponent } from './components/NormalizationComponents';
import { ReselectComponent, BasicReselectComponent, ParameterizedSelectorsComponent, FilteringTodosComponent } from './components/ReselectComponents';
import { ReduxPersistComponent } from './components/PersistComponents';

// Import our new advanced topic components
import { 
  ReReselectComponent,
  DynamicReducersComponent,
  ReduxToolkitComponent,
  ImmutablePatternsComponent,
  TestingReduxComponent,
  TypeScriptIntegrationComponent,
  SSRReduxComponent,
  EntityRelationshipsComponent,
  WebSocketsComponent,
  // Import the BFFPatternComponent
  BFFPatternComponent
} from './components/AdvancedTopics';
import { ReduxArchitecturePatternsComponent } from './components/ArchitecturePatternsComponent';

// Import React-Redux integration components
import { 
  ContextVsReduxComponent,
  ReactReduxPerformanceComponent,
  CustomReduxHooksComponent,
  ReduxRouterIntegrationComponent,
  ReduxSuspenseComponent
} from './components/ReactReduxIntegration';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <div className="App">
          <header className="App-header">
            <h1>Redux</h1>
          </header>
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/concepts/actions" element={<ActionsComponent />} />
              <Route path="/concepts/reducers" element={<ReducersComponent />} />
              <Route path="/concepts/store" element={<StoreComponent />} />
              <Route path="/concepts/hooks" element={<HooksComponent />} />
              <Route path="/concepts/middleware" element={<MiddlewareComponent />} />
              <Route path="/concepts/thunks" element={<ThunksComponent />} />
              <Route path="/concepts/redux-thunk" element={<ReduxThunkComponent />} />
              <Route path="/concepts/redux-saga" element={<ReduxSagaComponent />} />
              <Route path="/concepts/redux-observable" element={<ReduxObservableComponent />} />
              
              {/* Normalization Routes */}
              <Route path="/concepts/normalization" element={<NormalizationComponent />} />
              <Route path="/concepts/normalization/manual-normalization" element={<ManualNormalizationComponent />} />
              <Route path="/concepts/normalization/normalizr" element={<NormalizrComponent />} />
              <Route path="/concepts/normalization/entity-adapter" element={<EntityAdapterComponent />} />
              
              {/* Reselect Routes */}
              <Route path="/concepts/reselect" element={<ReselectComponent />} />
              <Route path="/concepts/reselect/basic-reselect" element={<BasicReselectComponent />} />
              <Route path="/concepts/reselect/parameterized-selectors" element={<ParameterizedSelectorsComponent />} />
              <Route path="/concepts/reselect/filtering-todos" element={<FilteringTodosComponent />} />

              {/* Advanced Topics Routes */}
              <Route path="/concepts/re-reselect" element={<ReReselectComponent />} />
              <Route path="/concepts/dynamic-reducers" element={<DynamicReducersComponent />} />
              <Route path="/concepts/redux-toolkit" element={<ReduxToolkitComponent />} />
              <Route path="/concepts/immutable-patterns" element={<ImmutablePatternsComponent />} />
              <Route path="/concepts/testing-redux" element={<TestingReduxComponent />} />
              <Route path="/concepts/typescript" element={<TypeScriptIntegrationComponent />} />
              <Route path="/concepts/ssr" element={<SSRReduxComponent />} />
              
              {/* New Topic Routes */}
              <Route path="/concepts/entity-relationships" element={<EntityRelationshipsComponent />} />
              <Route path="/concepts/websockets" element={<WebSocketsComponent />} />
              
              {/* Add Redux Persist Route */}
              <Route path="/concepts/redux-persist" element={<ReduxPersistComponent />} />
              
              {/* Add Architecture Patterns Route */}
              <Route path="/concepts/architecture-patterns" element={<ReduxArchitecturePatternsComponent />} />
              
              {/* RTK Query route */}
              <Route path="/concepts/rtk-query" element={<RTKQueryComponent />} />
              
              {/* Add BFF Pattern Route */}
              <Route path="/concepts/bff-pattern" element={<BFFPatternComponent />} />

              {/* React-Redux Integration routes */}
              <Route path="/concepts/context-vs-redux" element={<ContextVsReduxComponent />} />
              <Route path="/concepts/react-redux-performance" element={<ReactReduxPerformanceComponent />} />
              <Route path="/concepts/custom-redux-hooks" element={<CustomReduxHooksComponent />} />
              <Route path="/concepts/redux-router-integration" element={<ReduxRouterIntegrationComponent />} />
              <Route path="/concepts/redux-suspense" element={<ReduxSuspenseComponent />} />

              {/* Undo/Redo Pattern */}
              <Route path="/concepts/undo-redo-pattern" element={<UndoRedoPatternComponent />} />
            </Routes>
          </main>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
