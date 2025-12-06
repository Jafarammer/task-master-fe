import React from "react";
import {
  Menu,
  MenuItem,
  MenuList,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Edit, Delete, Logout, Info } from "@mui/icons-material";

type Props = {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onLogout?: () => void;
  onDetail?: () => void;
};

const MenuOptions: React.FC<Props> = ({
  anchorEl,
  open,
  onClose,
  onEdit,
  onDelete,
  onLogout,
  onDetail,
}) => {
  return (
    <Menu anchorEl={anchorEl} open={open} onClose={onClose} sx={{ mt: "12px" }}>
      <MenuList>
        {onEdit && (
          <MenuItem onClick={onEdit}>
            <ListItemIcon>
              <Edit color="info" fontSize="small" />
            </ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </MenuItem>
        )}
        {onDetail && (
          <MenuItem onClick={onDetail}>
            <ListItemIcon>
              <Info color="inherit" fontSize="small" />
            </ListItemIcon>
            <ListItemText>Detail</ListItemText>
          </MenuItem>
        )}
        {onDelete && (
          <MenuItem onClick={onDelete}>
            <ListItemIcon>
              <Delete color="error" fontSize="small" />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
        )}
        {onLogout && (
          <MenuItem onClick={onLogout}>
            <ListItemIcon>
              <Logout color="primary" fontSize="small" />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
};

export default MenuOptions;
