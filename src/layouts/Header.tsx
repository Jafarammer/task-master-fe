import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
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

const settings = ["Profile", "Account", "Logout"];

const Header = () => {
  // react router dom
  const navigate = useNavigate();
  // hooks
  const { onLogout } = useLogout();
  // useState
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
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
  const onOpenMenuUser = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const onCloseMenuUser = () => {
    setAnchorElUser(null);
  };
  const onGo = () => {
    navigate("/login", { replace: true });
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
              // onEdit={() => navigate("/task/update")}
            />
            {/* <Menu
              sx={{ mt: "45px" }}
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={onCloseMenuUser}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => {
                    if (setting === "Logout") {
                      // onGo();
                      onLogout();
                    }
                    onCloseMenuUser();
                  }}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu> */}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
