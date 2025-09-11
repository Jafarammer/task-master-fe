import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  TextField,
  Typography,
  Link,
  Button,
} from "@mui/material";

const Login = () => {
  // react router dom
  const navigate = useNavigate();
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
            onClick={onGo}
          >
            Log In
          </Button>
        </Container>
      </Box>
    </React.Fragment>
  );
};

export default Login;
