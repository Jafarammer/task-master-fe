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
    <Dialog open={open} onClose={onClose} maxWidth={"sm"} fullWidth>
      <DialogContent sx={{ p: 4, position: "relative" }}>
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 12, right: 12 }}
        >
          <Cancel />
        </IconButton>

        {/* Icon */}
        <Box display="flex" justifyContent="center" mb={2}>
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              backgroundColor: "#fdebea",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <DeleteOutlineIcon sx={{ color: "#d32f2f", fontSize: 34 }} />
          </Box>
        </Box>

        {/* Title */}
        <Typography
          variant="h6"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
        >
          Are you sure you want to delete this task?
        </Typography>

        {/* Description */}
        <Typography
          textAlign="center"
          color="text.secondary"
          fontSize={14}
          mb={4}
        >
          This action cannot be undone. The following task will be permanently
          deleted: <b>"{taskName}"</b>
        </Typography>

        {/* Action Buttons */}
        <Box display="flex" gap={2} justifyContent="center">
          <Button
            variant="contained"
            onClick={onClose}
            sx={{
              backgroundColor: "#eee",
              color: "#000",
              minWidth: 120,
              "&:hover": {
                backgroundColor: "#e0e0e0",
              },
              fontWeight: "bold",
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={onConfirm}
            sx={{ minWidth: 120, fontWeight: "bold" }}
          >
            Delete
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmDialog;
