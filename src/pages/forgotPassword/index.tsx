import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  FormControl,
  FormHelperText,
  TextField,
  Button,
  Container,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import useAuth from "../../hooks/useAuth";
// styles
import {
  containerSx,
  fontBodySX,
  fontTitleSX,
  formControlSX,
  buttonSX,
} from "./styles";

const ForgotPassword = () => {
  // router
  const navigate = useNavigate();
  // hooks
  const { loading, formikForgotPassword } = useAuth();
  return (
    <Box component={"div"} sx={containerSx()}>
      <Typography sx={fontTitleSX()}>Forgot Password?</Typography>
      <Typography sx={fontBodySX()} color="textDisabled" mb={2}>
        Enter your email to receive password recovery instructions.
      </Typography>
      <Container maxWidth={"xs"}>
        <form onSubmit={formikForgotPassword.handleSubmit}>
          <FormControl fullWidth sx={formControlSX()}>
            <TextField
              type="email"
              name="email"
              value={formikForgotPassword.values.email}
              onChange={formikForgotPassword.handleChange}
              onBlur={formikForgotPassword.handleBlur}
              placeholder="Email Address"
              size="small"
              error={
                !!formikForgotPassword.touched.email &&
                !!formikForgotPassword.errors.email
              }
            />
            {formikForgotPassword.touched.email &&
              formikForgotPassword.errors.email && (
                <FormHelperText error>
                  {formikForgotPassword.errors.email}
                </FormHelperText>
              )}
          </FormControl>
          <Button
            variant="contained"
            fullWidth
            color="primary"
            type="submit"
            disabled={
              loading ||
              !formikForgotPassword.dirty ||
              !formikForgotPassword.isValid
            }
            sx={buttonSX()}
          >
            Send recovery instructions
          </Button>
        </form>
        <Button
          variant="text"
          fullWidth
          color="inherit"
          startIcon={<ArrowBack />}
          onClick={() => navigate("/login")}
        >
          Return to login page
        </Button>
      </Container>
    </Box>
  );
};

export default ForgotPassword;
