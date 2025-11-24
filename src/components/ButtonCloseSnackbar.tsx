import React from "react";
import { IconButton } from "@mui/material";
import { Cancel } from "@mui/icons-material";

type Props = {
  onClose: () => void;
};

const ButtonCloseSnackbar: React.FC<Props> = ({ onClose }) => {
  return (
    <React.Fragment>
      <IconButton size="small" onClick={onClose}>
        <Cancel fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
};

export default ButtonCloseSnackbar;
