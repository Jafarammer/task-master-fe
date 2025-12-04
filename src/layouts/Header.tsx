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
import { fetchProfile } from "../features/profile/profileThunk";
import { headerTitleSx, containerSx, toolbarSx } from "./styles";
// custome components
import { MenuOptions } from "../components";
// type declaration
import { MenuState } from "../types/global";

const Header = () => {
  // redux
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.profile);
  // hooks
  const { onLogout } = useLogout();
  // useState
  const [menu, setMenu] = useState<MenuState>({ anchorEl: null, open: false });
  // function event
  const onOpenMenu: React.MouseEventHandler<HTMLButtonElement> = (
    event
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

          <Box>
            <Tooltip title="Open Setting">
              <IconButton onClick={onOpenMenu} sx={{ p: 0 }}>
                <Avatar>
                  {items?.data?.first_name.charAt(0).toUpperCase()}
                  {items?.data?.last_name.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
            </Tooltip>
            <MenuOptions
              anchorEl={menu.anchorEl}
              open={menu.open}
              onClose={onCloseMenu}
              onLogout={onLogout}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
