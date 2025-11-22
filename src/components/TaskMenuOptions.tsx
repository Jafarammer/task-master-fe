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
  editLabel?: string;
  deleteLabel?: string;
};

const TaskMenuOptions: React.FC<Props> = ({
  anchorEl,
  open,
  onClose,
  onEdit,
  onDelete,
  editLabel = "Unknown label",
  deleteLabel = "Unknown label",
}) => {
  return (
    <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
      <MenuList>
        <MenuItem onClick={onEdit}>
          <ListItemIcon>
            <EditDocument color="info" fontSize="small" />
          </ListItemIcon>
          <ListItemText>{editLabel}</ListItemText>
        </MenuItem>
        <MenuItem onClick={onDelete}>
          <ListItemIcon>
            <Delete color="error" fontSize="small" />
          </ListItemIcon>
          <ListItemText>{deleteLabel}</ListItemText>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default TaskMenuOptions;
