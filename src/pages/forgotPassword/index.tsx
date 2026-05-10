import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  FormControl,
  TextField,
  Button,
  Container,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
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
  return (
    <Box component={"div"} sx={containerSx()}>
      <Typography sx={fontTitleSX()}>Forgot Password?</Typography>
      <Typography sx={fontBodySX()} color="textDisabled" mb={2}>
        Enter your email to receive password recovery instructions.
      </Typography>
      <Container maxWidth={"xs"}>
        <form>
          <FormControl fullWidth sx={formControlSX()}>
            <TextField name="email" placeholder="Email Address" size="small" />
          </FormControl>
          <Button
            variant="contained"
            fullWidth
            color="primary"
            type="submit"
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
