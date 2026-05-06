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
import useAuth from "../../hooks/useAuth";
import useSnackbarAlert from "../../hooks/useSnackbarAlert";
import { containerSx, linkContainerSx, linkForgotPasswordSx } from "./styles";

const Login = () => {
  // router
  const location = useLocation();
  // hooks
  // const { formik, loading } = useLogin();
  const { formikLogin, loading } = useAuth();
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
    event,
  ) => {
    event.preventDefault();
  };
  const onMouseUpPassword: React.MouseEventHandler<HTMLButtonElement> = (
    event,
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
          <form onSubmit={formikLogin.handleSubmit}>
            <FormControl fullWidth sx={{ my: 1.5 }}>
              <TextField
                placeholder="Username or Email"
                size="small"
                name="email"
                value={formikLogin.values.email}
                onChange={formikLogin.handleChange}
                onBlur={formikLogin.handleBlur}
                error={
                  !!formikLogin.touched.email && !!formikLogin.errors.email
                }
              />
              {formikLogin.touched.email && formikLogin.errors.email && (
                <FormHelperText error>
                  {formikLogin.errors.email}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ my: 1.5 }}>
              <TextField
                placeholder="Password"
                size="small"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formikLogin.values.password}
                onChange={formikLogin.handleChange}
                onBlur={formikLogin.handleBlur}
                error={
                  !!formikLogin.touched.password &&
                  !!formikLogin.errors.password
                }
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
              {formikLogin.touched.password && formikLogin.errors.password && (
                <FormHelperText error>
                  {formikLogin.errors.password}
                </FormHelperText>
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
