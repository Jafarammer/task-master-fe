# Application Routing

This document explains the routing architecture used in the Task Master frontend, including public routes, protected routes, route guards, nested layouts, navigation, query parameters, and authentication-based redirects.

## Overview

Task Master uses React Router DOM to manage client-side navigation.

The routing system separates pages into two main categories:

- Guest routes
- Protected routes

Public routes can be accessed without authentication.

Protected routes require an Access Token before they can be rendered.

```text
Browser Request
      │
      ▼
React Router
      │
   ┌──┴──────────────┐
   │                 │
Guest Route    Protected Route
   │                 │
   ▼                 ▼
Render Page     Check Access Token
                     │
               ┌─────┴─────┐
               │           │
            Available    Missing
               │           │
               ▼           ▼
          Render Page   Redirect Login
```

---

# Technology Stack

The routing implementation uses:

- React Router DOM
- TypeScript
- React
- Protected Route components
- Shared layouts
- URL query parameters
- Programmatic navigation

---

# Route Categories

## Guest Routes

Guest routes do not require authentication.

Examples:

```text
/login
/register
/forgot-password
/reset-password
/activate
/reactivate
```

These pages are used for account authentication and recovery.

## Protected Routes

Protected routes require an authenticated user.

Examples:

```text
/my-task?filter=all | completed | pending
/task/create
/task/edit/:id
/profile
/trash
```

Protected routes are wrapped using the `ProtectedRoute` component.

---

# Route Structure

Example application route structure:

```text
/
├── /login
├── /register
├── /forgot-password
├── /reset-password
├── /activate
├── /reactivate
│
├── /my-task?filter=all | completed | pending
├── /task/create
├── /task/edit/:id
└── /profile
└── /trash
```

The application may redirect the root path based on authentication state.

```text
/
├── Authenticated user
│   └── Redirect to /my-task?filter=all
│
└── Unauthenticated user
    └── Redirect to /login
```

---

# Router Configuration

Example router configuration:

```tsx
import { Routes, Route, Navigate } from "react-router-dom";
import { SnackbarAlert } from "./components";
// layout
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
// protected Routes
import ProtectedRoute from "./routes/ProtectedRoute";
import GuestRoute from "./routes/GuestRoute";
// page
import Login from "./pages/login";
import Register from "./pages/register";
import ForgotPassword from "./pages/forgotPassword";
import ResetPassword from "./pages/resetPassword";
import MyTask from "./pages/myTask";
import Task from "./pages/task";
import DetailTask from "./pages/detailTask";
import Profile from "./pages/profile";
import Trash from "./pages/trash";
import NotFound from "./pages/notFound";
// hooks

function App() {
  return (
    <>
      <SnackbarAlert />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        {/* Auth layout */}
        <Route
          element={
            <GuestRoute>
              <AuthLayout />
            </GuestRoute>
          }
        >
          <Route index path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Route>
        {/* Main layout */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/my-task" element={<MyTask />} />
          <Route path="/task/create" element={<Task />} />
          <Route path="/task/update/:id" element={<Task />} />
          <Route path="/task/detail/:id" element={<DetailTask />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/trash" element={<Trash />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
```

The exact file names and paths may differ depending on the project structure.

---

# Protected Route

The `ProtectedRoute` component prevents unauthenticated users from accessing private pages.

Example:

```tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { getAccessToken } from "../utils/auth";

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: Props): React.ReactElement | null => {
  const token = getAccessToken();

  if (!token) return <Navigate to="/login" replace />;
  return children as React.ReactElement;
};

export default ProtectedRoute;
```

Routing flow:

```text
Protected Route Requested
        │
        ▼
Read Access Token
        │
   ┌────┴─────┐
   │          │
Found       Missing
   │          │
   ▼          ▼
Render     Redirect
Page       /login
```

The frontend route guard only performs an initial access check.

The backend remains responsible for validating the Access Token.

---

# Guest Route Guard

Authenticated users may be prevented from accessing pages such as login or register.

Example:

```tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { getAccessToken } from "../utils/auth";

type Props = {
  children: React.ReactNode;
};

const GuestRoute = ({ children }: Props): React.ReactElement | null => {
  const token = getAccessToken();

  if (token) return <Navigate to="/my-task" replace />;

  return children as React.ReactElement;
};

export default GuestRoute;
```

Usage:

```tsx
<Route
  element={
    <GuestRoute>
      <AuthLayout />
    </GuestRoute>
  }
>
  <Route index path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/forgot-password" element={<ForgotPassword />} />
  <Route path="/reset-password" element={<ResetPassword />} />
  <Route path="*" element={<Navigate to="/login" replace />} />
</Route>
```

Flow:

```text
Login Page Requested
        │
        ▼
Check Access Token
        │
   ┌────┴─────┐
   │          │
Found       Missing
   │          │
   ▼          ▼
Redirect    Render
/my-task    Login
```

---

# Layout Routing

Protected pages commonly share the same application layout.

Example layout structure:

```text
MainLayout
├── Header
├── Navigation
└── Outlet
```

Example:

```tsx
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import Header from "./Header";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Container sx={{ mt: 3 }}>
        <Outlet />
      </Container>
    </>
  );
};

export default MainLayout;
```

The `Outlet` component renders the active nested route.

```text
MainLayout
      │
      ▼
Outlet
      │
   ┌──┴─────────────┐
   │                │
/my-task        /profile
   │                │
   ▼                ▼
Task Page      Profile Page
```

---

# Nested Routes

Nested routes allow multiple pages to share a common layout.

Example:

```tsx
<Route
  element={
    <ProtectedRoute>
      <MainLayout />
    </ProtectedRoute>
  }
>
  <Route path="/my-task" element={<MyTaskPage />} />
  <Route path="/profile" element={<ProfilePage />} />
</Route>
```

Benefits:

- Shared header
- Shared navigation
- Centralized route protection
- Cleaner route configuration

---

# Programmatic Navigation

React Router provides the `useNavigate` hook for navigation triggered by application logic.

Example after login:

```ts
const navigate = useNavigate();

navigate("/my-task");
```

Using `replace`:

```ts
navigate("/login", {
  replace: true,
});
```

The `replace` option prevents the previous protected page from remaining in browser history.

Recommended cases for `replace: true`:

- Login redirect
- Logout redirect
- Unauthorized redirect
- Invalid route redirect
- Authentication failure

---

# Navigation After Login

After login succeeds:

```text
Submit Login Form
       │
       ▼
Authentication Successful
       │
       ▼
Store Access Token
       │
       ▼
Navigate to /my-task
```

Example:

```ts
const response = await loginUser(payload);

setAccessToken(response.accessToken);

navigate("/my-task", {
  replace: true,
});
```

---

# Navigation After Logout

After logout:

```text
Call Logout Endpoint
       │
       ▼
Remove Access Token
       │
       ▼
Reset Redux State
       │
       ▼
Purge Redux Persist
       │
       ▼
Navigate to /login
```

Example:

```ts
removeAccessToken();

dispatch({
  type: "app/reset",
});

await persistor.purge();

navigate("/login", {
  replace: true,
});
```

---

# Route Parameters

Dynamic route parameters are used for pages that require an identifier.

Example route:

```tsx
<Route path="/task/edit/:id" element={<TaskFormPage />} />
```

Example URL:

```text
/task/edit/66b1f8b948f123456789abcd
```

The route parameter can be read using `useParams`.

```tsx
import { useParams } from "react-router-dom";

const TaskFormPage = (): React.ReactElement => {
  const { id } = useParams<{
    id: string;
  }>();

  return <div>Task ID: {id}</div>;
};
```

The same form page can support both create and edit modes.

```ts
if (!id) {
  await createTask(payload);
} else {
  await updateTask(id, payload);
}
```

Flow:

```text
/task/create
   │
   └── Create mode

/task/edit/:id
   │
   └── Edit mode
```

---

# Query Parameters

Query parameters are used for filtering, pagination, search, and UI state.

Example URL:

```text
/my-task?filter=all
```

Other examples:

```text
/my-task?filter=completed
/my-task?filter=pending
/my-task?filter=trash
/my-task?page=2
/my-task?search=meeting
```

Query parameters can be read using `useSearchParams`.

```tsx
import { useSearchParams } from "react-router-dom";

const MyTaskPage = (): React.ReactElement => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filter = searchParams.get("filter") ?? "all";

  const handleFilterChange = (value: string): void => {
    setSearchParams({
      filter: value,
    });
  };

  return <div>Current filter: {filter}</div>;
};
```

Benefits of URL query parameters:

- Filter state survives page refresh
- Pages can be bookmarked
- URLs can be shared
- Browser navigation remains consistent

---

# Task Routes

Example task routes:

```text
/my-task
/task/create
/task/edit/:id
```

## Task List

```http
/my-task
```

The task list page may use query parameters:

```text
/my-task?filter=all
/my-task?filter=completed
/my-task?filter=pending
```

## Create Task

```http
/task/create
```

This route renders an empty task form.

## Edit Task

```http
/task/edit/:id
```

This route loads task detail and initializes the form with existing data.

---

# Profile Route

Example:

```http
/profile
```

The profile route allows the authenticated user to:

- View profile information
- Update profile information
- Upload a profile picture
- Change account-related information

The route must be protected.

```tsx
<Route path="/profile" element={<ProfilePage />} />
```

# Trash Route

Example:

```http
/trash
```

The trash route allows the authenticated user to:

- View trash information
- View trash statistics information
- Restore task
- Delete permanently task

The route must be protected.

```tsx
<Route path="/trash" element={<TraashPage />} />
```

---

# Authentication Routes

Example public authentication routes:

```text
/login
/register
/forgot-password
/reset-password
/activate
/reactivate
```

## Login

```http
/login
```

## Register

```http
/register
```

## Forgot Password

```http
/forgot-password
```

## Reset Password

Reset password links may include a token as a query parameter.

Example:

```text
/reset-password?token=abcdef123456
```

Reading the token:

```ts
const [searchParams] = useSearchParams();

const token = searchParams.get("token");
```

## Account Activation

Activation links may also use query parameters.

Example:

```text
/activate?code=123456
```

---

# Unknown Routes

A wildcard route handles URLs that do not match any application route.

Example:

```tsx
<Route path="*" element={<Navigate to="/login" replace />} />
```

A dedicated Not Found page may also be used.

```tsx
<Route path="*" element={<NotFoundPage />} />
```

Recommended behavior:

```text
Unknown Public URL
      │
      ▼
Not Found Page

Unknown Protected URL
      │
      ▼
Not Found Page or Dashboard
```

---

# Access Token Expiration

A user may already be inside a protected route when the Access Token expires.

The route guard does not need to manually refresh the token for every API request.

Axios interceptors handle the refresh process.

```text
Protected Page
      │
      ▼
API Request
      │
      ▼
401 Unauthorized
      │
      ▼
Axios Refresh Token Flow
      │
   ┌──┴──────────┐
   │             │
Success        Failure
   │             │
   ▼             ▼
Retry API     Redirect Login
```

The routing layer handles navigation only after refresh token failure.

---

# Initial Application Load

On application startup, Redux Persist may need time to restore persisted data.

The application should render routes inside `PersistGate`.

```tsx
<Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
    <App />
  </PersistGate>
</Provider>
```

This prevents routes from rendering before persisted state is ready.

```text
Application Start
      │
      ▼
PersistGate
      │
      ▼
Redux State Rehydrated
      │
      ▼
Router Rendered
```

---

# Routing and Redux

Routing state should not normally duplicate data already stored in the URL.

Recommended URL-managed state:

- Filters
- Search terms
- Page numbers
- Selected tabs

Recommended Redux-managed state:

- Task data
- Profile data
- Shared application state
- Global notification state

Example:

```text
URL
└── /my-task?filter=completed&page=2

Redux
├── Task results
├── Loading status
└── Error state
```

This keeps navigation state shareable and predictable.
