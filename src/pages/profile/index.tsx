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
// styles
import {
  iconButtonSX,
  cardSX,
  cardContentSX,
  avatartSX,
  dividerLineSX,
  formLabelSX,
  fontBodySX,
  fontLabelSx,
  fontTitleSX,
} from "./styles";

const Profile = () => {
  // router
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const filterParams = parseParams(searchParams.get("filter"));
  // useState
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Box component={"div"}>
      <Typography fontWeight={"bold"} sx={fontTitleSX()}>
        <IconButton
          sx={iconButtonSX()}
          onClick={() => navigate(`/my-task?filter=${filterParams}`)}
        >
          <ArrowBackIos />
        </IconButton>
        Profile Settings
      </Typography>
      <Typography color="textDisabled" sx={fontBodySX()}>
        Manage your account details and preferences.
      </Typography>
      <Grid2 container spacing={2} mt={5}>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <Box component={"div"}>
            <Card variant="elevation" sx={cardSX()}>
              <CardContent sx={cardContentSX()}>
                <Avatar sx={avatartSX()}>WJ</Avatar>
                <Button>Edit</Button>
                <Typography sx={fontBodySX()} fontWeight="bold">
                  Wan Jafar
                </Typography>
                <Typography sx={fontBodySX()} color="text.secondary">
                  wan.jafar1@gmail.com
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 8 }}>
          <Box component={"div"}>
            <Typography mb={2} sx={fontLabelSx()} fontWeight={"bold"}>
              Personal Information
            </Typography>

            <Divider />

            <form>
              <Stack
                direction={{ xs: "column", md: "row" }}
                mt={5}
                mb={3}
                spacing={4}
              >
                <FormControl fullWidth>
                  <FormLabel sx={formLabelSX()}>Full Name</FormLabel>
                  <TextField value={"Wan Jafar"} size="small" />
                </FormControl>
                <FormControl fullWidth>
                  <FormLabel sx={formLabelSX()}> Email</FormLabel>
                  <TextField value={"wan.jafar1@gmail.com"} size="small" />
                </FormControl>
              </Stack>
              <Stack
                direction={"row"}
                justifyContent={"right"}
                alignItems={"center"}
                mb={3}
              >
                <Button variant="contained" color="primary">
                  Update Profile
                </Button>
              </Stack>
            </form>
            <Typography mb={2} sx={fontLabelSx()} fontWeight={"bold"}>
              Security
            </Typography>
            <Divider sx={dividerLineSX()} />
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              spacing={3}
              mt={5}
              mb={3}
            >
              <Typography sx={fontBodySX()} color="textDisabled">
                Update your password for enhanced security.
              </Typography>
              <Button
                color="inherit"
                variant="contained"
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
                <Stack
                  direction={"row"}
                  justifyContent={"right"}
                  alignItems={"center"}
                  my={3}
                >
                  <Button variant="contained">Save Password</Button>
                </Stack>
              </form>
            )}
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Profile;
