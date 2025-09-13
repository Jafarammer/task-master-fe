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

const settings = ["Profile", "Account", "Logout"];

const Header = () => {
  // react router dom
  const navigate = useNavigate();
  // useState
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  // function event
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
      <Container
        sx={{
          width: "100vw",
          maxWidth: "100vw !important",
          py: 0,
          px: 8,
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Task Master
          </Typography>

          <Box>
            <Tooltip title="Open Setting">
              <IconButton onClick={onOpenMenuUser} sx={{ p: 0 }}>
                <Avatar>WJ</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
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
                      onGo();
                    }
                    onCloseMenuUser();
                  }}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
