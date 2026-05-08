import React from "react";
import {
  Box,
  Typography,
  Grid2,
  Divider,
  TextField,
  FormControl,
  FormHelperText,
  FormLabel,
  Stack,
  Button,
} from "@mui/material";

const Profile = () => {
  return (
    <Box component={"div"}>
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        Profile Settings
      </Typography>
      <Typography color="textDisabled">
        Manage your account details and preferences.
      </Typography>
      <Grid2 container spacing={2} mt={5}>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <Box component={"div"}>photos</Box>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 8 }}>
          <Box component={"div"}>
            <Typography variant="h5" fontWeight={"bold"}>
              Personal Information
            </Typography>
            <Divider sx={{ mt: 3 }} />
            <form>
              <Stack
                direction={{ xs: "column", md: "row" }}
                mt={5}
                mb={3}
                spacing={4}
              >
                <FormControl fullWidth>
                  <FormLabel sx={{ mb: 2 }}>Full Name</FormLabel>
                  <TextField value={"Wan Jafar"} size="small" />
                </FormControl>
                <FormControl fullWidth>
                  <FormLabel sx={{ mb: 2 }}> Email</FormLabel>
                  <TextField value={"wan.jafar1@gmail.com"} size="small" />
                </FormControl>
              </Stack>
              <Button
                variant="contained"
                sx={{ fontWeight: "bold", float: "right" }}
                color="primary"
              >
                Update Profile
              </Button>
            </form>
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Profile;
