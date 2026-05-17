import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import {
  Box,
  Typography,
  Grid2,
  Divider,
  Stack,
  Button,
  IconButton,
  Card,
  CardContent,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";
import useProfile from "../../hooks/useProfile";
import { parseParams } from "../../helpers/filterParamsHelper";
import FormPersonalInformation from "./FormPersonalInformation";
import FormSecurity from "./FormSecurity";
// styles
import {
  iconButtonSX,
  cardSX,
  cardContentSX,
  avatartSX,
  dividerLineSX,
  fontBodySX,
  fontLabelSx,
  fontTitleSX,
} from "./styles";

const Profile = () => {
  // router
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const filterParams = parseParams(searchParams.get("filter"));
  // redux
  const { items } = useAppSelector((state) => state.profile);
  // hooks
  const { fileInputRef, onChangePicture, loadingUpdatePicture } = useProfile();
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
                {loadingUpdatePicture && <CircularProgress />}
                {!loadingUpdatePicture && (
                  <Avatar sx={avatartSX()} src={items?.data?.profilePicture}>
                    {!items?.data?.profilePicture &&
                      items?.data?.fullName.charAt(0).toUpperCase()}
                  </Avatar>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={onChangePicture}
                />
                <Button
                  disabled={loadingUpdatePicture}
                  onClick={() => fileInputRef.current?.click()}
                >
                  Edit
                </Button>
                <Typography sx={fontBodySX()} fontWeight="bold">
                  {items?.data?.fullName}
                </Typography>
                <Typography sx={fontBodySX()} color="text.secondary">
                  {items?.data?.email}
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
            <FormPersonalInformation />

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
            {open && <FormSecurity setOpen={setOpen} />}
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Profile;
