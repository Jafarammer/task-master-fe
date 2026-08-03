import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Avatar,
  Container,
  Tooltip,
  IconButton,
  Dialog,
  DialogContent,
  Button,
} from "@mui/material";
import { Cancel, DeleteOutline } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import useLogout from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import { fetchProfile } from "../features/profile/profileThunk";
import {
  headerTitleSx,
  containerSx,
  toolbarSx,
  avatartSX,
  fontBodySX,
  fontLabelSx,
  logoLabelSX,
  fontTitleSX,
  buttonSX,
  iconButtonSX,
  dialogContentSX,
  paperPropsSX,
} from "./styles";
// custome components
import { MenuOptions } from "../components";
// type declaration
import { TMenuState } from "../types/common";

const Header = () => {
  // router
  const navigate = useNavigate();
  // redux
  const dispatch = useAppDispatch();
  const { profiles, loading, error } = useAppSelector((state) => state.profile);
  // hooks
  const { onLogout } = useLogout();
  // useState
  const [menu, setMenu] = useState<TMenuState>({ anchorEl: null, open: false });
  const [confirmLogout, setConfirmLogout] = useState<boolean>(false);
  // function event
  const onSetting = () => {
    navigate("/profile");
  };
  const onTrash = () => {
    navigate("/trash");
  };
  const onOpenMenu: React.MouseEventHandler<HTMLButtonElement> = (
    event,
  ): void => {
    setMenu({
      anchorEl: event.currentTarget,
      open: true,
    });
  };
  const onCloseMenu = (): void => {
    setMenu({
      anchorEl: null,
      open: false,
    });
  };
  const openConfirmLogout = (): void => {
    setConfirmLogout(true);
    onCloseMenu();
  };
  const closeConfirmLogout = (): void => {
    setConfirmLogout(false);
  };
  // useEffect
  useEffect(() => {
    dispatch(fetchProfile());
  }, []);

  return (
    <AppBar
      position="sticky"
      color="default"
      sx={{
        boxShadow: "none",
      }}
    >
      <Container sx={containerSx()}>
        <Toolbar disableGutters sx={toolbarSx()}>
          <Typography variant="h6" noWrap component="a" sx={headerTitleSx()}>
            Task Master
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography
              variant="body2"
              fontWeight={"bold"}
              sx={{
                "@media (max-width:600px)": {
                  display: "none",
                },
              }}
            >
              {profiles?.fullName}
            </Typography>
            <Tooltip title="Open Setting">
              <IconButton onClick={onOpenMenu} sx={{ p: 0 }}>
                <Avatar sx={avatartSX()} src={profiles?.profilePicture}>
                  {!profiles?.profilePicture &&
                    profiles?.fullName.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
            </Tooltip>
            <MenuOptions
              anchorEl={menu.anchorEl}
              open={menu.open}
              onClose={onCloseMenu}
              onLogout={openConfirmLogout}
              onSetting={onSetting}
              onTrash={onTrash}
            />
          </Box>
        </Toolbar>
      </Container>
      {/* modal popup */}
      <Dialog
        open={confirmLogout}
        onClose={closeConfirmLogout}
        maxWidth={"sm"}
        fullWidth
        PaperProps={{
          sx: paperPropsSX(),
        }}
      >
        <DialogContent sx={dialogContentSX()}>
          {/* Close Button */}
          <IconButton onClick={closeConfirmLogout} sx={iconButtonSX()}>
            <Cancel color="disabled" />
          </IconButton>

          {/* Icon */}
          <Box display="flex" justifyContent="center" mb={2}>
            <Box sx={logoLabelSX()}>
              <DeleteOutline color="error" sx={fontTitleSX()} />
            </Box>
          </Box>

          {/* Title */}
          <Typography
            sx={fontLabelSx()}
            fontWeight="bold"
            textAlign="center"
            gutterBottom
          >
            Logout
          </Typography>

          {/* Description */}
          <Typography
            textAlign="center"
            color="textDisabled"
            sx={fontBodySX()}
            mb={4}
          >
            Are you sure, you want to logout ?
          </Typography>

          {/* Action Buttons */}
          <Box display="flex" gap={2} justifyContent="center">
            <Button
              variant="contained"
              color="inherit"
              onClick={closeConfirmLogout}
              sx={buttonSX()}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={onLogout}
              sx={buttonSX()}
            >
              Delete
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </AppBar>
  );
};

export default Header;
