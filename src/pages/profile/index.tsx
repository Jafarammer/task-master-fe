import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
  IconButton,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";
import { parseParams } from "../../helpers/filterParamsHelper";

const Profile = () => {
  // router
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const filterParams = parseParams(searchParams.get("filter"));
  // useState
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Box component={"div"}>
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        <IconButton
          sx={{
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
          onClick={() => navigate(`/my-task?filter=${filterParams}`)}
        >
          <ArrowBackIos />
        </IconButton>
        Profile Settings
      </Typography>
      <Typography color="textDisabled">
        Manage your account details and preferences.
      </Typography>
      <Grid2 container spacing={2} mt={5}>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <Box component={"div"}>
            <Card
              variant="elevation"
              sx={{
                borderRadius: 6,
                border: "1px solid #08CB00",
                p: 2,
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    mb: 2,
                  }}
                >
                  WJ
                </Avatar>

                <Button
                  size="small"
                  sx={{
                    mb: 2,
                    textTransform: "none",
                  }}
                >
                  Edit
                </Button>

                <Typography variant="h6" fontWeight="bold">
                  Wan Jafar
                </Typography>

                <Typography color="text.secondary">
                  wan.jafar1@gmail.com
                </Typography>
              </CardContent>
            </Card>
          </Box>
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
              <Stack
                direction={"row"}
                justifyContent={"right"}
                alignItems={"center"}
                mb={3}
              >
                <Button
                  variant="contained"
                  sx={{ fontWeight: "bold" }}
                  color="primary"
                >
                  Update Profile
                </Button>
              </Stack>
            </form>
            <Typography variant="h5" fontWeight={"bold"}>
              Security
            </Typography>
            <Divider sx={{ mt: 3 }} />
            <Stack
              direction={{ xs: "column", md: "row" }}
              justifyContent={"space-between"}
              alignItems={"center"}
              spacing={3}
              mt={5}
              mb={3}
            >
              <Typography color="textDisabled">
                Update your password for enhanced security.
              </Typography>
              <Button
                color="inherit"
                variant="contained"
                sx={{ fontWeight: "bold" }}
                onClick={() => setOpen(!open)}
              >
                Change Password
              </Button>
            </Stack>
            {open && (
              <form>
                <FormControl fullWidth sx={{ mt: 3 }}>
                  <TextField placeholder="Current Password" size="small" />
                </FormControl>
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  spacing={4}
                  mt={3}
                >
                  <FormControl fullWidth>
                    <TextField placeholder="New Password" size="small" />
                  </FormControl>
                  <FormControl fullWidth>
                    <TextField placeholder="Confirm Password" size="small" />
                  </FormControl>
                </Stack>
                <Button
                  sx={{ fontWeight: "bold", float: "right", my: 3 }}
                  variant="contained"
                >
                  Save Password
                </Button>
              </form>
            )}
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Profile;
