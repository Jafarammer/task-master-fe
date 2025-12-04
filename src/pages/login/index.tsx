import React, { useState, useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  Container,
  Box,
  TextField,
  Typography,
  Link,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useLogin from "../../hooks/useLogin";
import useSnackbarAlert from "../../hooks/useSnackbarAlert";
import { containerSx, linkContainerSx, linkForgotPasswordSx } from "./styles";

const Login = () => {
  // router
  const location = useLocation();
  // hooks
  const { formik, loading } = useLogin();
  const notify = useSnackbarAlert();
  // useState
  const [showPassword, setShowPassword] = useState<boolean>(false);
  // function event
  const onClickShowPassword: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    setShowPassword((prev) => !prev);
  };
  const onMouseDownPassword: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    event.preventDefault();
  };
  const onMouseUpPassword: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    event.preventDefault();
  };
  // useEffect
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const status = params.get("status");
    const message = params.get("message");
    if (status && message) {
      notify(decodeURIComponent(message), status as any);
    }
  }, []);

  return (
    <Box>
      <Box component={"div"} sx={containerSx()}>
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
                type={showPassword ? "text" : "password"}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={!!formik.touched.password && !!formik.errors.password}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={onClickShowPassword}
                          onMouseDown={onMouseDownPassword}
                          onMouseUp={onMouseUpPassword}
                        >
                          {showPassword ? (
                            <VisibilityOff fontSize="small" />
                          ) : (
                            <Visibility fontSize="small" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
              {formik.touched.password && formik.errors.password && (
                <FormHelperText error>{formik.errors.password}</FormHelperText>
              )}
            </FormControl>
            <Box sx={linkContainerSx()}>
              <Link
                href="/forgot-password"
                underline="none"
                sx={linkForgotPasswordSx()}
              >
                Forgot your password?
              </Link>
            </Box>
            <Button
              variant="contained"
              fullWidth
              sx={{ fontWeight: "bold", mt: 2 }}
              color="primary"
              loading={loading}
              disabled={loading}
              type="submit"
            >
              Log In
            </Button>
          </form>
        </Container>
      </Box>
    </Box>
  );
};

export default Login;
