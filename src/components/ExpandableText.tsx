import { useState } from "react";
import { Typography, Button } from "@mui/material";
import { fontBodySX } from "../global.styles";

type Props = {
  text: string;
};

const ExpandableText = ({ text }: Props) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const MAX_LENGTH = 60;
  const isLongText = text.length > MAX_LENGTH;
  const displayText =
    expanded || !isLongText ? text : text.slice(0, MAX_LENGTH) + "...";

  return (
    <>
      <Typography sx={fontBodySX()}>{displayText}</Typography>

      {isLongText && (
        <Button
          variant="text"
          size="small"
          color="inherit"
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? "Show less" : "Show more"}
        </Button>
      )}
    </>
  );
};

export default ExpandableText;
