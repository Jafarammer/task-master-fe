import React from "react";
import {
  Menu,
  MenuItem,
  MenuList,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Edit,
  Delete,
  Logout,
  Info,
  Settings,
  FolderDelete,
} from "@mui/icons-material";
import { fontBodySX, fontLabelSx } from "../global.styles";

type Props = {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onLogout?: () => void;
  onDetail?: () => void;
  onSetting?: () => void;
  onTrash?: () => void;
};

const MenuOptions: React.FC<Props> = ({
  anchorEl,
  open,
  onClose,
  onEdit,
  onDelete,
  onLogout,
  onDetail,
  onSetting,
  onTrash,
}) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      sx={{ mt: "12px", borderRadius: 6 }}
      PaperProps={{
        sx: {
          borderRadius: 2,
        },
      }}
    >
      <MenuList>
        {onEdit && (
          <MenuItem onClick={onEdit}>
            <ListItemIcon>
              <Edit color="info" sx={fontLabelSx()} />
            </ListItemIcon>
            <ListItemText sx={fontBodySX()}>Edit</ListItemText>
          </MenuItem>
        )}
        {onDetail && (
          <MenuItem onClick={onDetail}>
            <ListItemIcon>
              <Info color="inherit" sx={fontLabelSx()} />
            </ListItemIcon>
            <ListItemText sx={fontBodySX()}>Detail</ListItemText>
          </MenuItem>
        )}
        {onDelete && (
          <MenuItem onClick={onDelete}>
            <ListItemIcon>
              <Delete color="error" sx={fontLabelSx()} />
            </ListItemIcon>
            <ListItemText sx={fontBodySX()}>Delete</ListItemText>
          </MenuItem>
        )}
        {onSetting && (
          <MenuItem onClick={onSetting}>
            <ListItemIcon>
              <Settings color="primary" sx={fontLabelSx()} />
            </ListItemIcon>
            <ListItemText sx={fontBodySX()}>Setting</ListItemText>
          </MenuItem>
        )}
        {onTrash && (
          <MenuItem onClick={onTrash}>
            <ListItemIcon>
              <FolderDelete color="error" sx={fontLabelSx()} />
            </ListItemIcon>
            <ListItemText sx={fontBodySX()}>Trash</ListItemText>
          </MenuItem>
        )}
        {onLogout && (
          <MenuItem onClick={onLogout}>
            <ListItemIcon>
              <Logout color="primary" sx={fontLabelSx()} />
            </ListItemIcon>
            <ListItemText sx={fontBodySX()}>Logout</ListItemText>
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
};

export default MenuOptions;
