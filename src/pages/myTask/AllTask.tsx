import { useState, useEffect } from "react";
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
  Box,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { getTaskItemSx, chipSx } from "./styles";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchAllTask } from "../../features/myTask/allTaskThunk";
// custome hooks
import useMyTask from "../../hooks/useMyTask";
// types declaration
import { MenuState, PaginationState } from "../../types/global";
// reusable components
import { MenuOptions, EmptyState, DeleteConfirmDialog } from "../../components";
// skeleton
import ListTaskSkeleton from "./ListTaskSkeleton";
import PaginationSkeleton from "./PaginationSkeleton";
// helper
import { ParamsFilter } from "../../helpers/filterParamsHelper";

type Props = {
  params: ParamsFilter;
  search: string;
};

const AllTask = ({ params, search }: Props) => {
  // router
  const navigate = useNavigate();
  // redux
  const dispatch = useAppDispatch();
  const { items, meta_data, loading, error } = useAppSelector(
    (state) => state.allTask
  );
  // hooks
  const { onDeleteTask, onGetDetailTask, onUpdateStatus, onGetEditTask } =
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
  const onChecked = (page: string, id: string, checked: boolean): void => {
    onUpdateStatus(page, id, !checked);
  };
  const openConfirmDelete = (): void => {
    setConfirmDelete(true);
    onCloseMenu();
  };
  const closeConfirmDelete = (): void => {
    setConfirmDelete(false);
    setMenu((prev) => ({ ...prev, context: null }));
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
  const onCloseMenu = () => {
    setMenu((prev) => ({
      ...prev,
      anchorEl: null,
      open: false,
    }));
  };
  // useEffect
  useEffect(() => {
    dispatch(
      fetchAllTask({
        page: pagination.page,
        limit: pagination.limit,
        search: search,
      })
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
    <Box>
      {/* content */}
      {items.length === 0 && (
        <EmptyState
          buttonText="Create Task"
          onAction={() => navigate("/task/create")}
        />
      )}
      {showSkeleton && items.length !== 0 && (
        <List sx={{ m: 0 }}>
          {Array.from({ length: items.length || pagination.limit }).map(
            (_, index) => (
              <ListTaskSkeleton key={index} />
            )
          )}
        </List>
      )}
      {items.length > 0 && !showSkeleton && (
        <List sx={{ m: 0 }}>
          {items?.map((task, index): any => (
            <ListItem
              key={task._id}
              sx={getTaskItemSx(index, items.length)}
              secondaryAction={
                <IconButton
                  edge="end"
                  onClick={(e) => onOpenMenu(e, task._id, task.title)}
                >
                  <MoreVert />
                </IconButton>
              }
            >
              <ListItemIcon>
                <Checkbox
                  checked={task.is_completed}
                  onChange={() => onChecked("all", task._id, task.is_completed)}
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
      )}
      {showSkeleton && items.length !== 0 && <PaginationSkeleton />}
      {!showSkeleton && items.length !== 0 && (
        <Stack direction={"row"} justifyContent={"center"} my={3}>
          <Pagination
            count={meta_data.total_pages}
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
          onDeleteTask("all", menu.context.id);
          closeConfirmDelete();
        }}
      />
    </Box>
  );
};

export default AllTask;
