import React, { useState } from "react";
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
import useLogout from "../hooks/useLogout";
import { headerTitleSx, containerSx, toolbarSx } from "./styles";
// custome components
import { MenuOptions } from "../components";
// type declaration
import { MenuState } from "../types/global";

const Header = () => {
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
                <Avatar>WJ</Avatar>
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
