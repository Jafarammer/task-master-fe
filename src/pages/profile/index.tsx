import { useState, MouseEventHandler } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
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
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { ArrowBackIos, Visibility, VisibilityOff } from "@mui/icons-material";
import useProfile from "../../hooks/useProfile";
import { parseParams } from "../../helpers/filterParamsHelper";
import { ShowPassword } from "../../types/profile";
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
  // redux
  const { items } = useAppSelector((state) => state.profile);
  // hooks
  const {
    formikUpdateProfile,
    loading,
    setIsUpdate,
    isUpdate,
    fileInputRef,
    onChangePicture,
    loadingUpdatePicture,
    formikUpdateProfilePasswrod,
    laodingUpdatePassword,
  } = useProfile();
  // useState
  const [open, setOpen] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<ShowPassword>({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  // function event
  const onTogglePassword = (field: keyof ShowPassword) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };
  const onMousePassword: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
  };

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

            <form onSubmit={formikUpdateProfile.handleSubmit}>
              <Stack
                direction={{ xs: "column", md: "row" }}
                mt={5}
                mb={3}
                spacing={4}
              >
                <FormControl fullWidth>
                  <FormLabel sx={formLabelSX()}>Full Name</FormLabel>
                  <TextField
                    name="fullName"
                    value={formikUpdateProfile.values.fullName}
                    size="small"
                    onChange={formikUpdateProfile.handleChange}
                    onBlur={formikUpdateProfile.handleBlur}
                    error={
                      !!formikUpdateProfile.touched.fullName &&
                      !!formikUpdateProfile.errors.fullName
                    }
                    slotProps={{
                      input: {
                        readOnly: !isUpdate,
                      },
                    }}
                  />
                  {formikUpdateProfile.touched.fullName &&
                    formikUpdateProfile.errors.fullName && (
                      <FormHelperText error>
                        {formikUpdateProfile.errors.fullName}
                      </FormHelperText>
                    )}
                </FormControl>
                <FormControl fullWidth>
                  <FormLabel sx={formLabelSX()}> Email</FormLabel>
                  <TextField
                    name="email"
                    value={formikUpdateProfile.values.email}
                    size="small"
                    onChange={formikUpdateProfile.handleChange}
                    onBlur={formikUpdateProfile.handleBlur}
                    error={
                      !!formikUpdateProfile.touched.email &&
                      !!formikUpdateProfile.errors.email
                    }
                    slotProps={{
                      input: {
                        readOnly: !isUpdate,
                      },
                    }}
                  />
                  {formikUpdateProfile.touched.email &&
                    formikUpdateProfile.errors.email && (
                      <FormHelperText error>
                        {formikUpdateProfile.errors.email}
                      </FormHelperText>
                    )}
                </FormControl>
              </Stack>
              <Stack
                direction={"row"}
                justifyContent={"right"}
                alignItems={"center"}
                mb={3}
                gap={2}
              >
                {isUpdate && (
                  <Button
                    variant="contained"
                    color="inherit"
                    onClick={() => {
                      formikUpdateProfile.resetForm();
                      setIsUpdate(false);
                    }}
                  >
                    Cancel
                  </Button>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setIsUpdate(true)}
                  type={isUpdate ? "submit" : "button"}
                  disabled={
                    loading ||
                    (isUpdate &&
                      (!formikUpdateProfile.dirty ||
                        !formikUpdateProfile.isValid))
                  }
                  loading={loading}
                >
                  {isUpdate && "Save"}
                  {!isUpdate && "Update Profile"}
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
              <form onSubmit={formikUpdateProfilePasswrod.handleSubmit}>
                <FormControl fullWidth sx={{ mt: 3 }}>
                  <TextField
                    name="currentPassword"
                    placeholder="Current Password"
                    size="small"
                    type={showPassword.currentPassword ? "text" : "password"}
                    value={formikUpdateProfilePasswrod.values.currentPassword}
                    onChange={formikUpdateProfilePasswrod.handleChange}
                    onBlur={formikUpdateProfilePasswrod.handleBlur}
                    error={
                      !!formikUpdateProfilePasswrod.touched.currentPassword &&
                      !!formikUpdateProfilePasswrod.errors.currentPassword
                    }
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() =>
                                onTogglePassword("currentPassword")
                              }
                              onMouseDown={onMousePassword}
                              onMouseUp={onMousePassword}
                            >
                              {showPassword.currentPassword ? (
                                <VisibilityOff sx={fontBodySX()} />
                              ) : (
                                <Visibility sx={fontBodySX()} />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                  {formikUpdateProfilePasswrod.touched.currentPassword &&
                    formikUpdateProfilePasswrod.errors.currentPassword && (
                      <FormHelperText error>
                        {formikUpdateProfilePasswrod.errors.currentPassword}
                      </FormHelperText>
                    )}
                </FormControl>
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  spacing={4}
                  mt={3}
                >
                  <FormControl fullWidth>
                    <TextField
                      name="newPassword"
                      placeholder="New Password"
                      size="small"
                      value={formikUpdateProfilePasswrod.values.newPassword}
                      type={showPassword.newPassword ? "text" : "password"}
                      onChange={formikUpdateProfilePasswrod.handleChange}
                      onBlur={formikUpdateProfilePasswrod.handleBlur}
                      error={
                        !!formikUpdateProfilePasswrod.touched.newPassword &&
                        !!formikUpdateProfilePasswrod.errors.newPassword
                      }
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => onTogglePassword("newPassword")}
                                onMouseDown={onMousePassword}
                                onMouseUp={onMousePassword}
                              >
                                {showPassword.newPassword ? (
                                  <VisibilityOff sx={fontBodySX()} />
                                ) : (
                                  <Visibility sx={fontBodySX()} />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                    {formikUpdateProfilePasswrod.touched.newPassword &&
                      formikUpdateProfilePasswrod.errors.newPassword && (
                        <FormHelperText error>
                          {formikUpdateProfilePasswrod.errors.newPassword}
                        </FormHelperText>
                      )}
                  </FormControl>
                  <FormControl fullWidth>
                    <TextField
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      size="small"
                      value={formikUpdateProfilePasswrod.values.confirmPassword}
                      type={showPassword.confirmPassword ? "text" : "password"}
                      onChange={formikUpdateProfilePasswrod.handleChange}
                      onBlur={formikUpdateProfilePasswrod.handleBlur}
                      error={
                        !!formikUpdateProfilePasswrod.touched.confirmPassword &&
                        !!formikUpdateProfilePasswrod.errors.confirmPassword
                      }
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() =>
                                  onTogglePassword("confirmPassword")
                                }
                                onMouseDown={onMousePassword}
                                onMouseUp={onMousePassword}
                              >
                                {showPassword.confirmPassword ? (
                                  <VisibilityOff sx={fontBodySX()} />
                                ) : (
                                  <Visibility sx={fontBodySX()} />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                    {formikUpdateProfilePasswrod.touched.confirmPassword &&
                      formikUpdateProfilePasswrod.errors.confirmPassword && (
                        <FormHelperText error>
                          {formikUpdateProfilePasswrod.errors.confirmPassword}
                        </FormHelperText>
                      )}
                  </FormControl>
                </Stack>
                <Stack
                  direction={"row"}
                  justifyContent={"right"}
                  alignItems={"center"}
                  my={3}
                  gap={2}
                >
                  <Button
                    variant="contained"
                    color="inherit"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    loading={laodingUpdatePassword}
                    variant="contained"
                    disabled={
                      laodingUpdatePassword ||
                      !formikUpdateProfilePasswrod.dirty ||
                      !formikUpdateProfilePasswrod.isValid
                    }
                  >
                    Save Password
                  </Button>
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
