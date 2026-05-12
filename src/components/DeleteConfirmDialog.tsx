import React from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { Cancel } from "@mui/icons-material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  fontBodySX,
  fontLabelSx,
  logoLabelSX,
  fontTitleSX,
  buttonSX,
  iconButtonSX,
  dialogContentSX,
  paperPropsSX,
} from "./DeleteConfirmDialog.style";

type Props = {
  open: boolean;
  taskName: string;
  onClose: () => void;
  onConfirm: () => void;
};

const DeleteConfirmDialog: React.FC<Props> = ({
  open,
  taskName,
  onClose,
  onConfirm,
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
            <DeleteOutlineIcon color="error" sx={fontTitleSX()} />
          </Box>
        </Box>

        {/* Title */}
        <Typography
          sx={fontLabelSx()}
          fontWeight="bold"
          textAlign="center"
          gutterBottom
        >
          Are you sure you want to delete this task?
        </Typography>

        {/* Description */}
        <Typography
          textAlign="center"
          color="textDisabled"
          sx={fontBodySX()}
          mb={4}
        >
          This action cannot be undone. The following task will be permanently
          deleted: <b>"{taskName}"</b>
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
