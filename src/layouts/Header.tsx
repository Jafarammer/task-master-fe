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
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import useLogout from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import { fetchProfile } from "../features/profile/profileThunk";
import { headerTitleSx, containerSx, toolbarSx, avatartSX } from "./styles";
// custome components
import { MenuOptions } from "../components";
// type declaration
import { MenuState } from "../types/global";

const Header = () => {
  // router
  const navigate = useNavigate();
  // redux
  const dispatch = useAppDispatch();
  const { profiles, loading, error } = useAppSelector((state) => state.profile);
  // hooks
  const { onLogout } = useLogout();
  // useState
  const [menu, setMenu] = useState<MenuState>({ anchorEl: null, open: false });
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
              onLogout={onLogout}
              onSetting={onSetting}
              onTrash={onTrash}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
