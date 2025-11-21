import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/login";
import Register from "./pages/register";
import MyTask from "./pages/myTask";
import Task from "./pages/task";

function App() {
  return (
    <Routes>
      {/* Auth layout */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      {/* Main layout */}
      <Route element={<MainLayout />}>
        <Route index element={<Navigate to="/my-task" replace />} />
        <Route path="/my-task" element={<MyTask />} />
        <Route path="/task/:mode" element={<Task />} />
      </Route>
    </Routes>
  );
}

export default App;
