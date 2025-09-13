import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Container,
  Box,
  TextField,
  Typography,
  Link,
  Button,
} from "@mui/material";

const Register = () => {
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
          <TextField
            fullWidth
            placeholder="First Name"
            sx={{ my: 1.5 }}
            size="small"
          />
          <TextField
            fullWidth
            placeholder="Last Name"
            sx={{ my: 1.5 }}
            size="small"
          />

          <TextField
            fullWidth
            placeholder="Email address"
            sx={{ my: 1.5 }}
            size="small"
          />
          <TextField
            fullWidth
            placeholder="Password"
            sx={{ my: 1.5 }}
            size="small"
          />
          <TextField
            fullWidth
            placeholder="Confirm password"
            sx={{ my: 1.5 }}
            size="small"
          />

          <Button
            variant="contained"
            fullWidth
            sx={{ fontWeight: "bold", mt: 2 }}
            color="primary"
          >
            Register
          </Button>
        </Container>
      </Box>
    </React.Fragment>
  );
};

export default Register;
