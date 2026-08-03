import React from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { Cancel, DeleteOutline } from "@mui/icons-material";
import {
  fontBodySX,
  fontLabelSx,
  logoLabelSX,
  fontTitleSX,
  buttonSX,
  iconButtonSX,
  dialogContentSX,
  paperPropsSX,
} from "./styles/DeleteConfirmDialog.style";

type Props = {
  open: boolean;
  taskName: string;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
};

const DeleteConfirmDialog: React.FC<Props> = ({
  open,
  taskName,
  onClose,
  onConfirm,
  title = "Are you sure you want to delete this task?",
  description = `This action cannot be undone. The following task will be permanently deleted: "${taskName}"`,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={"sm"}
      fullWidth
      PaperProps={{
        sx: paperPropsSX(),
      }}
    >
      <DialogContent sx={dialogContentSX()}>
        {/* Close Button */}
        <IconButton onClick={onClose} sx={iconButtonSX()}>
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
          {title}
        </Typography>

        {/* Description */}
        <Typography
          textAlign="center"
          color="textDisabled"
          sx={fontBodySX()}
          mb={4}
        >
          {description}
        </Typography>

        {/* Action Buttons */}
        <Box display="flex" gap={2} justifyContent="center">
          <Button
            variant="contained"
            color="inherit"
            onClick={onClose}
            sx={buttonSX()}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={onConfirm}
            sx={buttonSX()}
          >
            Delete
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmDialog;
