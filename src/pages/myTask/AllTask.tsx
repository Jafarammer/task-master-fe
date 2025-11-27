import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Typography,
  IconButton,
  Stack,
  Pagination,
  Chip,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { getTaskItemSx, chipSx } from "./styles";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchAllTask } from "../../features/myTask/myTaskThunk";
// types declaration
import { MenuState, PaginationState } from "../../types/global";
// reusable components
import { MenuOptions } from "../../components";

const AllTask = () => {
  // router
  const navigate = useNavigate();
  // redux
  const dispatch = useAppDispatch();
  const { items, meta_data, loading, error } = useAppSelector(
    (state) => state.allTask
  );

  // useState
  const [menu, setMenu] = useState<MenuState>({ anchorEl: null, open: false });
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    limit: 5,
  });
  // function event
  // const onChecked = (id: string) => {
  //   setTasks((prev) =>
  //     prev.map((task) =>
  //       task.id === id ? { ...task, completed: !task.completed } : task
  //     )
  //   );
  // };
  const onOpenMenu = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setMenu({
      anchorEl: event.currentTarget,
      open: true,
    });
  };
  const onCloseMenu = (): void => {
    setMenu({
      anchorEl: null,
      open: false,
    });
  };
  // useEffect
  useEffect(() => {
    dispatch(fetchAllTask({ page: pagination.page, limit: pagination.limit }));
  }, [dispatch, pagination]);
  return (
    <React.Fragment>
      <List sx={{ m: 0 }}>
        {items?.map((task, index) => (
          <ListItem
            key={task._id}
            sx={getTaskItemSx(index, items.length)}
            secondaryAction={
              <React.Fragment>
                <IconButton edge="end" onClick={onOpenMenu}>
                  <MoreVert />
                </IconButton>
                <MenuOptions
                  anchorEl={menu.anchorEl}
                  open={menu.open}
                  onClose={onCloseMenu}
                  onEdit={() => navigate("/task/update")}
                />
              </React.Fragment>
            }
          >
            <ListItemIcon>
              <Checkbox
                checked={task.is_completed}
                // onChange={() => onChecked(task._id)}
              />
            </ListItemIcon>
            <ListItemText
              primary={
                <Stack direction={"row"} spacing={2} alignItems={"center"}>
                  <Chip
                    label={task.priority}
                    color={
                      task.priority === "low"
                        ? "success"
                        : task.priority === "medium"
                        ? "warning"
                        : "error"
                    }
                    size="small"
                    variant="outlined"
                    sx={chipSx()}
                  />
                  <Typography variant="h6">{task.title}</Typography>
                </Stack>
              }
              secondary={
                <Typography variant="caption" color="textDisabled">
                  Due : {task.due_date}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
      <Stack direction={"row"} justifyContent={"center"} my={3}>
        <Pagination
          count={meta_data.total_pages}
          page={pagination.page}
          onChange={(_, value) => setPagination({ page: value, limit: 5 })}
          shape="rounded"
          color="primary"
        />
      </Stack>
    </React.Fragment>
  );
};

export default AllTask;
