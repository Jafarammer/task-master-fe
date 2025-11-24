import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  TextField,
  Typography,
  Link,
  Button,
  FormControl,
  FormHelperText,
} from "@mui/material";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  // react router dom
  const navigate = useNavigate();
  // hooks
  const { formik, loading } = useLogin();
  // function event
  const onGo = () => {
    navigate("/my-task", { replace: true });
  };
  return (
    <React.Fragment>
      <Box
        component={"div"}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Welcome back
        </Typography>

        <Typography variant="body1" color="text.secondary">
          Don’t have an account?{" "}
          <Link
            component={RouterLink}
            to="/register"
            underline="none"
            sx={{ color: "#08CB00", fontWeight: 500 }}
          >
            Sign up
          </Link>
        </Typography>
        <Container maxWidth="xs" sx={{ mt: 2 }}>
          <form onSubmit={formik.handleSubmit}>
            <FormControl fullWidth sx={{ my: 1.5 }}>
              <TextField
                placeholder="Username or Email"
                size="small"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={!!formik.touched.email && !!formik.errors.email}
              />
              {formik.touched.email && formik.errors.email && (
                <FormHelperText error>{formik.errors.email}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ my: 1.5 }}>
              <TextField
                placeholder="Password"
                size="small"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={!!formik.touched.password && !!formik.errors.password}
              />
              {formik.touched.password && formik.errors.password && (
                <FormHelperText error>{formik.errors.password}</FormHelperText>
              )}
            </FormControl>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mt: 1,
              }}
            >
              <Link
                href="/forgot-password"
                underline="none"
                sx={{
                  color: "text.secondary",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                }}
              >
                Forgot your password?
              </Link>
            </Box>
            <Button
              variant="contained"
              fullWidth
              sx={{ fontWeight: "bold", mt: 2 }}
              color="primary"
              // onClick={onGo}
              loading={loading}
              type="submit"
            >
              Log In
            </Button>
          </form>
        </Container>
      </Box>
    </React.Fragment>
  );
};

export default Login;
