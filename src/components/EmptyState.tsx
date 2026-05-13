import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { fontLabelSx, fontBodySX } from "../global.styles";
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
      height={{
        xs: "50vh",
        sm: "60vh",
      }}
      textAlign="center"
      gap={2}
      mb={3}
    >
      <EmptyImage style={{ width: "100%" }} />
      <Typography sx={fontLabelSx()} fontWeight="bold">
        {title}
      </Typography>
      <Typography sx={fontBodySX()} color="textDisabled">
        {description}
      </Typography>
      {buttonText && onAction && (
        <Button variant="contained" size="small" onClick={onAction}>
          {buttonText}
        </Button>
      )}
    </Box>
  );
};

export default EmptyState;
