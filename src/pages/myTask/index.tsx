import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Typography,
  Stack,
  Button,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
  Box,
  InputAdornment,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { toggleGroupSx } from "./styles";
import AllTask from "./AllTask";
import CompletedTask from "./CompletedTask";
import PendingTask from "./PendingTask";
// helper
import { parseParams, ParamsFilter } from "../../helpers/filterParamsHelper";

const MyTask = () => {
  // react router
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialFilter = parseParams(searchParams.get("filter"));
  // useState
  const [params, setParams] = useState<ParamsFilter>(initialFilter);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>(search);
  // function event
  const onChangeToggle = (
    _event: React.MouseEvent<HTMLElement>,
    newValue: ParamsFilter | null
  ) => {
    if (!newValue) return;
    setParams(newValue);
    setSearchParams({ filter: newValue });
  };
  // useEffect
  useEffect(() => {
    const p = parseParams(searchParams.get("filter"));
    setParams(p);
  }, [searchParams]);

  useEffect(() => {
    const filter = searchParams.get("filter");

    if (!filter) {
      setSearchParams({ filter: "all" }, { replace: true });
    }
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);
    return () => clearTimeout(handler);
  }, [search]);

  return (
    <Box>
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
        <Button
          variant="contained"
          sx={{ fontWeight: "bold" }}
          onClick={() => navigate(`/task/create?filter=${params}`)}
        >
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
        <TextField
          placeholder="Search tasks..."
          size="small"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <ToggleButtonGroup
          value={params}
          exclusive
          onChange={onChangeToggle}
          aria-label="task filter"
          size="small"
          sx={toggleGroupSx()}
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
      <Box sx={{ mt: 4 }}>
        {params === "all" && (
          <AllTask params={params} search={debouncedSearch} />
        )}
        {params === "completed" && (
          <CompletedTask params={params} search={debouncedSearch} />
        )}
        {params === "pending" && (
          <PendingTask params={params} search={debouncedSearch} />
        )}
      </Box>
    </Box>
  );
};

export default MyTask;
