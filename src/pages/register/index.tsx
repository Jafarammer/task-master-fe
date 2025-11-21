import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Container,
  Box,
  TextField,
  Typography,
  Link,
  Button,
  Stack,
} from "@mui/material";
import { useFormik } from "formik";
import { registerSchema } from "../../utils/validationSchema";
import { useAppDispatch } from "../../app/hooks";
import { registerUser } from "../../features/auth/authThunk";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  // redux
  const dispatch = useAppDispatch();
  // function event
  const formik = useFormik<FormValues>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      dispatch(
        registerUser({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
        })
      );
    },
  });
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
            <TextField
              fullWidth
              placeholder="First Name"
              sx={{ my: 1.5 }}
              size="small"
              name="firstName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <TextField
              fullWidth
              placeholder="Last Name"
              sx={{ my: 1.5 }}
              size="small"
              name="lastName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />

            <TextField
              fullWidth
              placeholder="Email address"
              sx={{ my: 1.5 }}
              size="small"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              fullWidth
              placeholder="Password"
              sx={{ my: 1.5 }}
              size="small"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <TextField
              fullWidth
              placeholder="Confirm password"
              sx={{ my: 1.5 }}
              size="small"
              name="confirmPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
            />

            <Button
              variant="contained"
              fullWidth
              sx={{ fontWeight: "bold", mt: 2 }}
              color="primary"
              type="submit"
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
