import React from "react";
import {
  Menu,
  MenuItem,
  MenuList,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { EditDocument, Delete } from "@mui/icons-material";

type Props = {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

const MenuOptions: React.FC<Props> = ({
  anchorEl,
  open,
  onClose,
  onEdit,
  onDelete,
}) => {
  return (
    <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
      <MenuList>
        {onEdit && (
          <MenuItem onClick={onEdit}>
            <ListItemIcon>
              <EditDocument color="info" fontSize="small" />
            </ListItemIcon>
            <ListItemText>Edit</ListItemText>
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
      </MenuList>
    </Menu>
  );
};

export default MenuOptions;
