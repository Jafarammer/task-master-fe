# Task Master Frontend

Modern Task Management application built with React, TypeScript, Redux Toolkit, Redux Persist, Material UI, Axios, Formik, Yup, and Vite.

---

## Features

- User Authentication
  - Register
  - Login
  - Logout
  - Refresh Token Authentication
  - Forgot Password
  - Change Password
- Protected Routes
- Task Management (CRUD)
- Profile Management
- Profile Picture Upload
- Pagination
- Search & Filter
- Form Validation
- Persistent Authentication
- Responsive UI
- Integration Testing

---

## Tech Stack

- React
- TypeScript
- Vite
- React Router DOM
- Redux Toolkit
- Redux Persist
- LocalForage
- Axios
- Formik
- Yup
- Material UI
- Day.js
- Vitest
- React Testing Library

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd task-master-fe
```

### Install Dependencies

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the root directory.

Example:

```env
VITE_API_URL=http://localhost:8000/api
```

---

## Running the Application

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

---

## Testing

This project uses:

- Vitest
- React Testing Library
- JSDOM

Run all tests:

```bash
npm test
```

Run UI Test:

```bash
npm run test:ui
```

Generate Coverage Report:

```bash
npm run test:coverage
```

---

## Project Structure

```text
src/
├── app/
├── assets/
├── components/
├── hooks/
├── interfaces/
├── layouts/
├── pages/
├── routes/
├── services/
├── utils/
├── validations/
└── App.tsx
└── main.tsx

tests/
├── features/
├── pages/
├── utils/
├── validatoins/
└── setup.ts

## Authentication Flow

- Login returns an Access Token and stores a Refresh Token inside an HttpOnly Cookie.
- Every API request automatically sends the Access Token.
- When the Access Token expires, Axios automatically requests a new Access Token using the Refresh Token.
- If Refresh Token validation fails, the user is automatically logged out.

---

## State Management

This project uses:

- Redux Toolkit
- Redux Persist
- LocalForage

Application state is automatically persisted across page refreshes.

---

## Form Validation

All forms are validated using:

- Formik
- Yup

Validation includes:

- Register
- Login
- Profile
- Task

---

## UI Library

- Material UI
- Emotion

---

## Related Repository

Backend Repository

https://github.com/jafarammer/task-master-be
---

## License

ISC
```
