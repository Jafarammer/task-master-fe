# Redux State Management

This document explains the Redux architecture used in the Task Master frontend, including Redux Toolkit, asynchronous thunks, Redux Persist, LocalForage, typed hooks, state rehydration, and application state cleanup during logout.

## Overview

Task Master uses Redux Toolkit as the main global state management solution.

Redux is used to manage shared application data such as:

- User profile
- Task data
- Loading states
- API request states
- Global notification state
- Filter and pagination state

The application also uses Redux Persist with LocalForage to preserve selected Redux state after a browser refresh.

```text
React Component
      │
      ▼
Redux Action / Async Thunk
      │
      ▼
Redux Slice
      │
      ▼
Redux Store
      │
      ▼
Redux Persist
      │
      ▼
LocalForage
```

---

# Technology Stack

The Redux implementation uses:

- Redux Toolkit
- React Redux
- Redux Thunk
- Redux Persist
- LocalForage
- TypeScript

Redux Thunk is already included by default when the store is created using `configureStore`.

---

# Project Structure

Example Redux structure:

```text
src/
└── app/
    ├── store.ts
    ├── rootReducer.ts
    ├── hooks.ts
    ├── persistConfig.ts
```

Each feature has its own slice and may have its own asynchronous thunk.

```text
redux/
├── store.ts
│   └── Creates the Redux store and persistor
├── rootReducer.ts
│   └── Combines all application reducers
├── hooks.ts
│   └── Provides typed Redux hooks
├── persistConfig.ts
│   └── Configuration memory with localforage and whitlist redux
```

---

# Redux Store

The Redux store is created using `configureStore`.

Example:

```ts
import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import rootReducer from "./rootReducer";
import persistConfig from "./persistConfig";

const persistedReducer = persistReducer<ReturnType<typeof rootReducer>>(
  persistConfig,
  rootReducer,
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ] as any,
      },
    }),
});

export const persistor = persistStore(store);
```

---

# Redux Persist

Redux Persist stores Redux state outside the application memory.

Without Redux Persist:

```text
Browser Refresh
      │
      ▼
Redux Store Reset
      │
      ▼
State Returns to Initial Value
```

With Redux Persist:

```text
Redux State Updated
      │
      ▼
State Saved to LocalForage
      │
      ▼
Browser Refresh
      │
      ▼
Persisted State Rehydrated
```

The persisted reducer is created using:

```ts
const persistedReducer = persistReducer(persistConfig, rootReducer);
```

The persistor is created using:

```ts
export const persistor = persistStore(store);
```

---

# LocalForage

Task Master uses LocalForage as the Redux Persist storage engine.

LocalForage provides an asynchronous storage API and commonly uses:

- IndexedDB
- WebSQL fallback
- LocalStorage fallback

Configuration example:

```ts
const persistConfig = {
  key: "root",
  storage: localForage,
};
```

Compared with regular LocalStorage, LocalForage is more suitable for larger and asynchronous application state.

```text
Redux Persist
      │
      ▼
LocalForage
      │
      ├── IndexedDB
      ├── WebSQL fallback
      └── LocalStorage fallback
```

---

# Persist Gate

The application should use `PersistGate` to delay rendering until persisted state has been restored.

Example:

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import App from "./App";
import { store, persistor } from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
```

Application flow:

```text
Application Start
      │
      ▼
PersistGate Waits
      │
      ▼
LocalForage State Loaded
      │
      ▼
Redux Store Rehydrated
      │
      ▼
Application Rendered
```

---

# Root Reducer

All feature reducers are combined inside the root reducer.

Example:

```ts
import { combineReducers } from "@reduxjs/toolkit";
import snackbarReducer from "../features/components/snackbarSlice";
import profileReducer from "../features/profile/profileSlice";
import myTaskReducer from "../features/myTask/myTaskSlice";
import trashReducer from "../features/trash/trashSlice";
const rootReducer = combineReducers({
  snackbar: snackbarReducer,
  profile: profileReducer,
  myTasks: myTaskReducer,
  trash: trashReducer,
});

export default rootReducer;
```

---

# Typed Redux Hooks

Typed hooks should be used instead of importing the default `useDispatch` and `useSelector` hooks directly.

Example:

```ts
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

Usage:

```tsx
const dispatch = useAppDispatch();

const tasks = useAppSelector((state) => state.task.tasks);
```

Typed hooks provide:

- Typed dispatch
- Typed Redux state
- Better autocomplete
- Compile-time type checking

---

# Redux Slice

A Redux slice contains:

- Slice name
- Initial state
- Synchronous reducers
- Extra reducers for asynchronous thunks

Example task state:

```ts
interface TaskState {
  tasks: ITask[];
  selectedTask: ITask | null;
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  selectedTask: null,
  loading: false,
  error: null,
};
```

Example slice:

```ts
import { createSlice } from "@reduxjs/toolkit";

import { getTasksThunk, getTaskDetailThunk } from "./taskThunk";

const taskSlice = createSlice({
  name: "task",

  initialState,

  reducers: {
    clearSelectedTask(state) {
      state.selectedTask = null;
    },

    resetTaskState() {
      return initialState;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getTasksThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTasksThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(getTasksThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch tasks";
      })
      .addCase(getTaskDetailThunk.fulfilled, (state, action) => {
        state.selectedTask = action.payload;
      });
  },
});

export const { clearSelectedTask, resetTaskState } = taskSlice.actions;

export default taskSlice.reducer;
```

---

# Async Thunk

Asynchronous API requests can be handled using `createAsyncThunk`.

Example:

```ts
import { createAsyncThunk } from "@reduxjs/toolkit";

import { getTasks } from "../../services/task.service";

export const getTasksThunk = createAsyncThunk(
  "task/getTasks",

  async (_, { rejectWithValue }) => {
    try {
      const response = await getTasks();

      return response.data;
    } catch (error: unknown) {
      return rejectWithValue("Failed to fetch tasks");
    }
  },
);
```

Async thunk lifecycle:

```text
dispatch(thunk)
      │
      ▼
pending
      │
      ├── Set loading to true
      │
      ▼
API Request
      │
   ┌──┴───────────┐
   │              │
fulfilled       rejected
   │              │
   ▼              ▼
Save data      Save error
```

---

# Thunk Usage

Example inside a component:

```tsx
const dispatch = useAppDispatch();

useEffect(() => {
  dispatch(getTasksThunk());
}, [dispatch]);
```

Using `.unwrap()`:

```ts
try {
  const result = await dispatch(getTasksThunk()).unwrap();

  console.log(result);
} catch (error) {
  console.error(error);
}
```

The `.unwrap()` method allows thunk results to be handled using standard `try...catch`.

---

# API Services and Redux

API requests are separated from Redux logic.

```text
Component
   │
   ▼
Redux Thunk
   │
   ▼
Service
   │
   ▼
Axios Instance
   │
   ▼
Backend API
```

Example service:

```ts
import api from "../app/api";

export const getTasks = async () => {
  const response = await api.get("/task");

  return response.data;
};
```

Example thunk:

```ts
export const getTasksThunk = createAsyncThunk(
  "task/getTasks",

  async (_, { rejectWithValue }) => {
    try {
      return await getTasks();
    } catch {
      return rejectWithValue("Failed to fetch tasks");
    }
  },
);
```

The service layer is responsible for HTTP requests.

The thunk is responsible for connecting the service response with Redux.

---

# State Selection

Redux state is accessed using `useAppSelector`.

Example:

```tsx
const { tasks, loading, error } = useAppSelector((state) => state.task);
```

Rendering example:

```tsx
if (loading) {
  return <Loading />;
}

if (error) {
  return <p>{error}</p>;
}

return <TaskList tasks={tasks} />;
```

---

# Persisted and Non-Persisted State

Not every Redux state needs to be persisted.

Recommended persisted state:

- User profile
- Task filters
- Pagination preferences
- UI preferences

Recommended non-persisted state:

- Loading state
- Temporary API errors
- Modal visibility
- Form input state
- Temporary selected values

A whitelist can be used:

```ts
const persistConfig = {
  key: "root",
  storage: localForage,
  whitelist: ["profile", "task"],
};
```

A blacklist can also be used:

```ts
const persistConfig = {
  key: "root",
  storage: localForage,
  blacklist: ["snackbar"],
};
```

Use either `whitelist` or `blacklist` depending on the application requirements.

---

# Redux Persist Rehydration

Rehydration is the process of restoring persisted state into the Redux store.

```text
LocalForage
      │
      ▼
persist/REHYDRATE
      │
      ▼
Redux Store Updated
```

During rehydration, the application should wait using `PersistGate`.

State such as `loading` should normally not remain `true` after rehydration.

For example, slices may handle the rehydration action if needed:

```ts
builder.addCase("persist/REHYDRATE" as never, (state) => {
  state.loading = false;
});
```

In most cases, excluding temporary state from persistence is cleaner.

---

# Authentication and Redux

The Access Token is not required to be stored inside Redux if it is already managed through the authentication utility.

```text
Access Token
   └── Client cookie or memory

Refresh Token
   └── HttpOnly cookie

Profile Data
   └── Redux Store
```

Redux may store:

```ts
interface ProfileState {
  profile: IUserProfile | null;
  loading: boolean;
  error: string | null;
}
```

The token itself can remain outside Redux to avoid unnecessary persistence.

---

# Logout Cleanup

Logout must clear both:

1. Active Redux state in memory.
2. Persisted Redux state in LocalForage.

Example:

```ts
const handleLogout = async (): Promise<void> => {
  try {
    const response = await logoutUser();

    notify(response.message, "success");
  } catch {
    notify("Logout failed", "error");
  } finally {
    removeAccessToken();

    dispatch({
      type: "app/reset",
    });

    await persistor.purge();

    navigate("/login", {
      replace: true,
    });
  }
};
```

The reset action clears the active Redux store:

```ts
dispatch({
  type: "app/reset",
});
```

The purge method removes persisted data:

```ts
await persistor.purge();
```

Both operations are needed because they handle different storage layers.

```text
Redux Store in Memory
      │
      └── Cleared using app/reset

LocalForage Persisted Data
      │
      └── Cleared using persistor.purge()
```

---

# Why Local Storage Is Not Cleared Directly

The application should avoid:

```ts
localStorage.clear();
```

Task Master uses Redux Persist with LocalForage, which commonly stores data in IndexedDB.

Clearing regular LocalStorage may not remove the persisted Redux data.

Use:

```ts
await persistor.purge();
```

This allows Redux Persist to clear its configured storage correctly.

---

# Global Reset Action

A global reset action avoids resetting every slice individually.

Without a global reset:

```ts
dispatch(resetTaskState());
dispatch(resetProfileState());
dispatch(resetSnackbarState());
```

With a global reset:

```ts
dispatch({
  type: "app/reset",
});
```

Root reducer example:

```ts
const rootReducer = (
  state: AppState | undefined,
  action: {
    type: string;
  },
) => {
  if (action.type === "app/reset") {
    state = undefined;
  }

  return appReducer(state, action);
};
```

When `state` becomes `undefined`, every reducer returns its initial state.

---

# Snackbar State

Global notifications may be managed through Redux.

Example state:

```ts
interface SnackbarState {
  open: boolean;
  message: string;
  severity: "success" | "error" | "warning" | "info";
}
```

Example reducer:

```ts
const snackbarSlice = createSlice({
  name: "snackbar",

  initialState: {
    open: false,
    message: "",
    severity: "success",
  } as SnackbarState,

  reducers: {
    showSnackbar(state, action) {
      state.open = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity;
    },

    hideSnackbar(state) {
      state.open = false;
    },
  },
});
```

Temporary snackbar state should normally not be persisted.

---

# Error Handling

Thunk errors should return serializable values.

Recommended:

```ts
return rejectWithValue({
  message: "Failed to fetch tasks",
});
```

Avoid returning the complete Axios error object:

```ts
return rejectWithValue(error);
```

Axios error objects may contain non-serializable values.

Serializable error interface:

```ts
interface ThunkError {
  message: string;
  status?: number;
}
```

Example:

```ts
return rejectWithValue({
  message: error.response?.data?.message ?? "Request failed",
  status: error.response?.status,
});
```

---

# Redux DevTools

Redux Toolkit enables Redux DevTools automatically during development.

Redux DevTools can be used to inspect:

- Dispatched actions
- Current Redux state
- Previous Redux state
- Thunk lifecycle actions
- Persist rehydration actions

Example actions:

```text
task/getTasks/pending
task/getTasks/fulfilled
persist/REHYDRATE
app/reset
```

---

# Testing Redux

Redux slices and thunks should be tested separately.

Recommended testing scope:

- Initial state
- Synchronous reducers
- Pending state
- Fulfilled state
- Rejected state
- Thunk API interaction
- Global reset behavior

Example reducer test:

```ts
import taskReducer, { resetTaskState } from "../src/redux/task/taskSlice";

describe("taskSlice", () => {
  it("should return the initial state", () => {
    const state = taskReducer(undefined, {
      type: "unknown",
    });

    expect(state.tasks).toEqual([]);
    expect(state.loading).toBe(false);
  });

  it("should reset task state", () => {
    const previousState = {
      tasks: [
        {
          id: "1",
          title: "Test task",
        },
      ],
      selectedTask: null,
      loading: false,
      error: null,
    };

    const state = taskReducer(previousState as never, resetTaskState());

    expect(state.tasks).toEqual([]);
  });
});
```

---

# Data Flow Summary

```text
COMPONENT
   │
   ├── useAppSelector
   └── useAppDispatch
   │
   ▼
ASYNC THUNK
   │
   ▼
SERVICE
   │
   ▼
AXIOS
   │
   ▼
BACKEND API
   │
   ▼
THUNK RESULT
   │
   ├── fulfilled
   └── rejected
   │
   ▼
SLICE
   │
   ▼
REDUX STORE
   │
   ▼
REDUX PERSIST
   │
   ▼
LOCALFORAGE
```

---

# Best Practices

- Use Redux Toolkit instead of manually creating Redux actions.
- Keep API requests inside service files.
- Use async thunks for shared asynchronous state.
- Keep temporary form state inside Formik or local component state.
- Do not persist loading and temporary error state.
- Use typed Redux hooks.
- Return serializable errors from thunks.
- Use a global reset action during logout.
- Use `persistor.purge()` to clear LocalForage.
- Do not store the Refresh Token in Redux.
- Avoid storing sensitive token data inside persisted Redux state.
- Keep each Redux slice focused on one application domain.
- Test reducers and asynchronous thunks independently.

---

# Redux Summary

```text
Redux Toolkit
├── Manages global application state
├── Creates slices and reducers
└── Includes Redux Thunk by default

Redux Persist
├── Persists selected Redux state
└── Rehydrates state after refresh

LocalForage
├── Stores persisted state asynchronously
└── Commonly uses IndexedDB

Async Thunk
├── Handles API requests
├── Provides pending state
├── Provides fulfilled state
└── Provides rejected state

Logout
├── Resets Redux state
├── Purges LocalForage
├── Removes Access Token
└── Redirects to login
```
