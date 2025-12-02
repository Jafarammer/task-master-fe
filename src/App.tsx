import { Routes, Route } from "react-router-dom";
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
import MyTask from "./pages/myTask";
import Task from "./pages/task";
import DetailTask from "./pages/detailTask";

function App() {
  return (
    <>
      <SnackbarAlert />
      <Routes>
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
        </Route>
      </Routes>
    </>
  );
}

export default App;
