import React, { useState } from "react";
import {
  Typography,
  Stack,
  Button,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
  Box,
} from "@mui/material";
import { toggleGroupSx } from "./styles";
import AllTask from "./AllTask";
import CompletedTask from "./CompletedTask";
import PendingTask from "./PendingTask";

const MyTask = () => {
  // useState
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");
  // function event
  const onChangeToggle = (
    _event: React.MouseEvent<HTMLElement>,
    newValue: "all" | "pending" | "completed" | null
  ) => {
    if (newValue !== null) {
      setFilter(newValue);
    }
  };
  return (
    <React.Fragment>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          my: 4,
        }}
      >
        <Typography variant="h4" fontWeight={"bold"} letterSpacing={1}>
          My Tasks
        </Typography>
        <Button variant="contained" sx={{ fontWeight: "bold" }}>
          + Add New Task{" "}
        </Button>
      </Stack>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{
          justifyContent: { xs: "center", sm: "flex-start" },
          alignItems: "center",
          width: "100%",
        }}
      >
        <TextField placeholder="Search tasks..." size="small" fullWidth />
        <ToggleButtonGroup
          value={filter}
          exclusive
          onChange={onChangeToggle}
          aria-label="task filter"
          size="small"
          sx={toggleGroupSx}
        >
          <ToggleButton value="all" aria-label="all">
            All
          </ToggleButton>
          <ToggleButton value="completed" aria-label="completed">
            Completed
          </ToggleButton>
          <ToggleButton value="pending" aria-label="pending">
            Pending
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
      <Box sx={{ border: "1px solid blue", mt: 4 }}>
        {filter === "all" && <AllTask />}
        {filter === "completed" && <CompletedTask />}
        {filter === "pending" && <PendingTask />}
      </Box>
    </React.Fragment>
  );
};

export default MyTask;
