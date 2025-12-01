import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
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
  Snackbar,
  Alert,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { getTaskItemSx, chipSx } from "./styles";
import { fetchPendingTask } from "../../features/myTask/pendingTaskThunk";
// reusable components
import {
  MenuOptions,
  EmptyState,
  DeleteConfirmDialog,
  ButtonCloseSnackbar,
} from "../../components";
// custome hooks
import useTask from "../../hooks/useTask";
// type declaration
import { MenuState, PaginationState } from "../../types/global";

const PendingTask = () => {
  // router
  const navigate = useNavigate();
  // redux
  const dispatch = useAppDispatch();
  const { items, meta_data, loading, error } = useAppSelector(
    (state) => state.pendingTask
  );
  // hooks
  const {
    onUpdateStatus,
    onGetDetailTask,
    onDeleteTask,
    openSnackbar,
    onCloseSnackbar,
  } = useTask();
  // useState
  const [menu, setMenu] = useState<MenuState>({
    anchorEl: null,
    open: false,
    context: null,
  });
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    limit: 5,
  });
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  // function event
  const openConfirmDelete = (): void => {
    setConfirmDelete(true);
    onCloseMenu();
  };
  const closeConfirmDelete = (): void => {
    setConfirmDelete(false);
    setMenu((prev) => ({ ...prev, context: null }));
  };
  const onChecked = (page: string, id: string, checked: boolean) => {
    onUpdateStatus(page, id, !checked);
  };
  const onOpenMenu = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string,
    title: string
  ): void => {
    setMenu({
      anchorEl: event.currentTarget,
      open: true,
      context: {
        id,
        title,
      },
    });
  };
  const onCloseMenu = (): void => {
    setMenu((prev) => ({
      ...prev,
      anchorEl: null,
      open: false,
    }));
  };
  // useEffect
  useEffect(() => {
    dispatch(
      fetchPendingTask({ page: pagination.page, limit: pagination.limit })
    );
  }, [dispatch, pagination]);

  return (
    <React.Fragment>
      {/* alert */}
      <Snackbar
        open={openSnackbar.open}
        autoHideDuration={1500}
        onClose={onCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={openSnackbar.color}
          variant="filled"
          sx={{ width: "100%", color: "white" }}
          action={<ButtonCloseSnackbar onClose={onCloseSnackbar} />}
        >
          {openSnackbar.message}
        </Alert>
      </Snackbar>
      {/* content */}
      {items.length === 0 && (
        <EmptyState
          buttonText="Create Task"
          onAction={() => navigate("/task/create")}
        />
      )}
      {items.length > 0 && (
        <React.Fragment>
          <List sx={{ m: 0 }}>
            {items?.map((task, index) => (
              <ListItem
                key={task._id}
                sx={getTaskItemSx(index, items.length)}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="more"
                    onClick={(e) => onOpenMenu(e, task._id, task.title)}
                  >
                    <MoreVert />
                  </IconButton>
                }
              >
                <ListItemIcon>
                  <Checkbox
                    checked={task.is_completed}
                    onChange={() =>
                      onChecked("pending,", task._id, task.is_completed)
                    }
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
                  secondary={<Typography>Due {task.due_date}</Typography>}
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
      )}
      {/* pop up */}
      <MenuOptions
        anchorEl={menu.anchorEl}
        open={menu.open}
        onClose={onCloseMenu}
        onEdit={() => {
          if (menu.context) {
            onGetDetailTask(menu.context.id);
          }
        }}
        onDelete={openConfirmDelete}
      />
      <DeleteConfirmDialog
        open={confirmDelete}
        taskName={menu.context?.title ?? ""}
        onClose={closeConfirmDelete}
        onConfirm={() => {
          onDeleteTask("pending", menu.context.id);
          closeConfirmDelete();
        }}
      />
    </React.Fragment>
  );
};

export default PendingTask;
