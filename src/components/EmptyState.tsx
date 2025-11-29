import React from "react";
import { Box, Typography, Button } from "@mui/material";
import EmptyImage from "../assets/empty.svg?react";

type EmptyStateProps = {
  title?: string;
  description?: string;
  buttonText?: string;
  onAction?: () => void;
};

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No Data Found",
  description = "There is no data to display here.",
  buttonText,
  onAction,
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="60vh"
      textAlign="center"
      gap={2}
      mb={3}
    >
      <EmptyImage style={{ width: "100%" }} />
      <Typography variant="h6" fontWeight="bold">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
      {buttonText && onAction && (
        <Button
          variant="contained"
          size="small"
          sx={{ mt: 2, fontWeight: "bold" }}
          onClick={onAction}
        >
          {buttonText}
        </Button>
      )}
    </Box>
  );
};

export default EmptyState;
