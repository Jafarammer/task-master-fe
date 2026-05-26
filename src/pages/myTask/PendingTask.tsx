import { useState, useEffect } from "react";
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
  Box,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { getTaskItemSx, chipSx, fontBodySX, fontLabelSx } from "./styles";
import { fetchPendingTask } from "../../features/myTask/myTaskThunk";
// reusable components
import { MenuOptions, EmptyState, DeleteConfirmDialog } from "../../components";
// custome hooks
import useMyTask from "../../hooks/useMyTask";
// type declaration
import { MenuState, PaginationState } from "../../types/global";
// skeleton
import ListTaskSkeleton from "./ListTaskSkeleton";
import PaginationSkeleton from "./PaginationSkeleton";
// helper
import { ParamsFilter } from "../../helpers/filterParamsHelper";

type Props = {
  params: ParamsFilter;
  search: string;
};

const PendingTask = ({ params, search }: Props) => {
  // router
  const navigate = useNavigate();
  // redux
  const dispatch = useAppDispatch();
  const { tasks, metaData, loading, error } = useAppSelector(
    (state) => state.myTasks,
  );
  // hooks
  const { onSoftDeleteTask, onGetDetailTask, onUpdateStatus, onGetEditTask } =
    useMyTask();
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
  const [showSkeleton, setShowSkeleton] = useState<boolean>(false);
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
    title: string,
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
      fetchPendingTask({
        page: pagination.page,
        limit: pagination.limit,
        query: search,
      }),
    );
  }, [dispatch, pagination, search]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (loading) {
      setShowSkeleton(true);
    } else {
      timer = setTimeout(() => {
        setShowSkeleton(false);
      }, 400);
    }
    return () => clearTimeout(timer);
  }, [loading]);

  return (
    <Box component={"div"}>
      {/* content */}
      {tasks?.length === 0 && (
        <EmptyState
          buttonText="Create Task"
          onAction={() => navigate("/task/create")}
        />
      )}
      {showSkeleton && tasks?.length !== 0 && (
        <List>
          {Array.from({ length: tasks?.length || pagination.limit }).map(
            (_, index) => (
              <ListTaskSkeleton key={index} />
            ),
          )}
        </List>
      )}
      {(tasks || []).length > 0 && !showSkeleton && (
        <List>
          {tasks?.map((task, index) => (
            <ListItem
              key={index}
              sx={getTaskItemSx(index, tasks.length)}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="more"
                  onClick={(e) => onOpenMenu(e, task.id, task.title)}
                >
                  <MoreVert sx={fontLabelSx()} />
                </IconButton>
              }
            >
              <ListItemIcon>
                <Checkbox
                  checked={task.isCompleted}
                  onChange={() =>
                    onChecked("pending,", task.id, task.isCompleted)
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
                    <Typography sx={fontBodySX()}>{task.title}</Typography>
                  </Stack>
                }
                secondary={
                  <Typography sx={fontBodySX()} mt={1} color="textDisabled">
                    Due {task.dueDate}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      )}
      {showSkeleton && tasks?.length !== 0 && <PaginationSkeleton />}
      {!showSkeleton && tasks?.length !== 0 && (
        <Stack direction={"row"} justifyContent={"center"} my={3}>
          <Pagination
            count={metaData?.totalPages}
            page={pagination.page}
            onChange={(_, value) => setPagination({ page: value, limit: 5 })}
            shape="rounded"
            color="primary"
          />
        </Stack>
      )}
      {/* pop up */}
      <MenuOptions
        anchorEl={menu.anchorEl}
        open={menu.open}
        onClose={onCloseMenu}
        onEdit={() => {
          if (menu.context) {
            onGetEditTask(menu.context.id, params);
            onCloseMenu();
          }
        }}
        onDetail={() => {
          if (menu.context) {
            onGetDetailTask(menu.context.id, params);
            onCloseMenu();
          }
        }}
        onDelete={openConfirmDelete}
      />
      <DeleteConfirmDialog
        open={confirmDelete}
        taskName={menu.context?.title ?? ""}
        onClose={closeConfirmDelete}
        onConfirm={() => {
          onSoftDeleteTask("pending", menu.context.id);
          closeConfirmDelete();
        }}
      />
    </Box>
  );
};

export default PendingTask;
