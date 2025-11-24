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
  Alert,
  Snackbar,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ButtonCloseSnackbar } from "../../components";
import useRegister from "../../hooks/useRegister";
import { containerSx } from "./styles";

const Register = () => {
  // hooks
  const { formik, loading, onCloseSnackbar, openSnackbar } = useRegister();
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
    event
  ) => {
    event.preventDefault();
  };
  const onMouseUpPassword: React.MouseEventHandler<HTMLButtonElement> = (
    event
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
    event
  ) => {
    event.preventDefault();
  };

  return (
    <React.Fragment>
      <Snackbar
        open={openSnackbar.open}
        autoHideDuration={1500}
        onClose={onCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={openSnackbar.color}
          variant="filled"
          sx={{ width: "100%", color: "white" }}
          action={<ButtonCloseSnackbar onClose={onCloseSnackbar} />}
        >
          {openSnackbar.message}
        </Alert>
      </Snackbar>
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
          <form onSubmit={formik.handleSubmit}>
            <FormControl fullWidth sx={{ my: 1.5 }}>
              <TextField
                placeholder="First Name"
                size="small"
                name="firstName"
                type="text"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={!!formik.touched.firstName && !!formik.errors.firstName}
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <FormHelperText error>{formik.errors.firstName}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ my: 1.5 }}>
              <TextField
                placeholder="Last Name"
                size="small"
                name="lastName"
                type="text"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={!!formik.touched.lastName && !!formik.errors.lastName}
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <FormHelperText error>{formik.errors.lastName}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ my: 1.5 }}>
              <TextField
                placeholder="Email address"
                size="small"
                name="email"
                type="email"
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
            <FormControl fullWidth sx={{ my: 1.5 }}>
              <TextField
                placeholder="Confirm password"
                size="small"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  !!formik.touched.confirmPassword &&
                  !!formik.errors.confirmPassword
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
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <FormHelperText error>
                    {formik.errors.confirmPassword}
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
