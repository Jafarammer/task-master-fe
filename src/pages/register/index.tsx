import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
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
import { containerSx } from "./styles";

const Register = () => {
  // hooks
  const { formikRegister, loading } = useAuth();
  // useState
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  // fnction event
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
  const onClickShowConfirmPassword: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    setShowConfirmPassword((prev) => !prev);
  };
  const onMouseDownConfirmPassword: React.MouseEventHandler<
    HTMLButtonElement
  > = (event) => {
    event.preventDefault();
  };
  const onMouseUpConfirmPassword: React.MouseEventHandler<HTMLButtonElement> = (
    event,
  ) => {
    event.preventDefault();
  };

  return (
    <React.Fragment>
      <Box component={"div"} sx={containerSx()}>
        <Typography variant="h4" fontWeight="bold">
          Create your account
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Already have an account?{" "}
          <Link
            component={RouterLink}
            to="/login"
            underline="none"
            sx={{ color: "#08CB00", fontWeight: 500 }}
          >
            Sign in
          </Link>
        </Typography>
        <Container maxWidth="xs" sx={{ mt: 2 }}>
          <form onSubmit={formikRegister.handleSubmit}>
            <FormControl fullWidth sx={{ my: 1.5 }}>
              <TextField
                placeholder="First Name"
                size="small"
                name="firstName"
                type="text"
                value={formikRegister.values.firstName}
                onChange={formikRegister.handleChange}
                onBlur={formikRegister.handleBlur}
                error={
                  !!formikRegister.touched.firstName &&
                  !!formikRegister.errors.firstName
                }
              />
              {formikRegister.touched.firstName &&
                formikRegister.errors.firstName && (
                  <FormHelperText error>
                    {formikRegister.errors.firstName}
                  </FormHelperText>
                )}
            </FormControl>
            <FormControl fullWidth sx={{ my: 1.5 }}>
              <TextField
                placeholder="Last Name"
                size="small"
                name="lastName"
                type="text"
                value={formikRegister.values.lastName}
                onChange={formikRegister.handleChange}
                onBlur={formikRegister.handleBlur}
                error={
                  !!formikRegister.touched.lastName &&
                  !!formikRegister.errors.lastName
                }
              />
              {formikRegister.touched.lastName &&
                formikRegister.errors.lastName && (
                  <FormHelperText error>
                    {formikRegister.errors.lastName}
                  </FormHelperText>
                )}
            </FormControl>
            <FormControl fullWidth sx={{ my: 1.5 }}>
              <TextField
                placeholder="Email address"
                size="small"
                name="email"
                type="email"
                value={formikRegister.values.email}
                onChange={formikRegister.handleChange}
                onBlur={formikRegister.handleBlur}
                error={
                  !!formikRegister.touched.email &&
                  !!formikRegister.errors.email
                }
              />
              {formikRegister.touched.email && formikRegister.errors.email && (
                <FormHelperText error>
                  {formikRegister.errors.email}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ my: 1.5 }}>
              <TextField
                placeholder="Password"
                size="small"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formikRegister.values.password}
                onChange={formikRegister.handleChange}
                onBlur={formikRegister.handleBlur}
                error={
                  !!formikRegister.touched.password &&
                  !!formikRegister.errors.password
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
              {formikRegister.touched.password &&
                formikRegister.errors.password && (
                  <FormHelperText error>
                    {formikRegister.errors.password}
                  </FormHelperText>
                )}
            </FormControl>
            <FormControl fullWidth sx={{ my: 1.5 }}>
              <TextField
                placeholder="Confirm password"
                size="small"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formikRegister.values.confirmPassword}
                onChange={formikRegister.handleChange}
                onBlur={formikRegister.handleBlur}
                error={
                  !!formikRegister.touched.confirmPassword &&
                  !!formikRegister.errors.confirmPassword
                }
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={onClickShowConfirmPassword}
                          onMouseDown={onMouseDownConfirmPassword}
                          onMouseUp={onMouseUpConfirmPassword}
                        >
                          {showConfirmPassword ? (
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
              {formikRegister.touched.confirmPassword &&
                formikRegister.errors.confirmPassword && (
                  <FormHelperText error>
                    {formikRegister.errors.confirmPassword}
                  </FormHelperText>
                )}
            </FormControl>
            <Button
              variant="contained"
              fullWidth
              sx={{ fontWeight: "bold", mt: 2 }}
              color="primary"
              type="submit"
              loading={loading}
              disabled={loading}
            >
              Register
            </Button>
          </form>
        </Container>
      </Box>
    </React.Fragment>
  );
};

export default Register;
