import React from "react";
import {
  Container,
  Box,
  TextField,
  Typography,
  Link,
  Button,
} from "@mui/material";

const Login = () => {
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
            href="/signup"
            underline="none"
            sx={{ color: "#08CB00", fontWeight: 500 }}
          >
            Sign up
          </Link>
        </Typography>
        <Container maxWidth="xs" sx={{ mt: 2 }}>
          <TextField
            fullWidth
            placeholder="Username or Email"
            sx={{ my: 1.5 }}
            size="small"
          />
          <TextField
            fullWidth
            placeholder="Password"
            sx={{ my: 1.5 }}
            size="small"
          />
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
          >
            Log In
          </Button>
        </Container>
      </Box>
    </React.Fragment>
  );
};

export default Login;
