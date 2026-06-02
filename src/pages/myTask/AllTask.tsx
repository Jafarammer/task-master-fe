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
  Tooltip,
} from "@mui/material";
import { MoreVert, CalendarTodayOutlined, Error } from "@mui/icons-material";
import { getTaskItemSx, chipSx, fontBodySX, fontLabelSx } from "./styles";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchAllTask } from "../../features/myTask/myTaskThunk";
// custome hooks
import useMyTask from "../../hooks/useMyTask";
// types declaration
import { TMenuState, TPagination } from "../../types/common";
// reusable components
import {
  MenuOptions,
  EmptyState,
  DeleteConfirmDialog,
  PaginationSkeleton,
  ListTaskSkeleton,
} from "../../components";
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
  const { tasks, metaData, loading, error } = useAppSelector(
    (state) => state.myTasks,
  );
  console.log("this", tasks);

  // hooks
  const { onSoftDeleteTask, onGetDetailTask, onUpdateStatus, onGetEditTask } =
    useMyTask();
  // useState
  const [menu, setMenu] = useState<TMenuState>({
    anchorEl: null,
    open: false,
    context: null,
  });
  const [pagination, setPagination] = useState<TPagination>({
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
    <Box>
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
      {tasks?.length > 0 && !showSkeleton && (
        <List>
          {tasks?.map((task, index) => (
            <ListItem
              key={index}
              sx={getTaskItemSx(index, tasks?.length)}
              secondaryAction={
                <IconButton
                  edge="end"
                  onClick={(e) => onOpenMenu(e, task.id, task.title)}
                >
                  <MoreVert sx={fontLabelSx()} />
                </IconButton>
              }
            >
              <ListItemIcon>
                <Checkbox
                  checked={task.isCompleted}
                  onChange={() => onChecked("all", task.id, task.isCompleted)}
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
                    <Typography
                      color={task.isExpired ? "error" : ""}
                      sx={fontBodySX()}
                    >
                      {task.title}
                    </Typography>
                  </Stack>
                }
                secondary={
                  <Box
                    display={"flex"}
                    flexDirection={{ xs: "column", sm: "row" }}
                    gap={{ xs: 0, sm: 2 }}
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1}
                      mt={2}
                    >
                      <CalendarTodayOutlined
                        sx={fontBodySX()}
                        color="disabled"
                      />
                      <Typography sx={fontBodySX()} mt={1} color="textDisabled">
                        Start : {task.startDate}
                      </Typography>
                    </Stack>
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1}
                      mt={2}
                    >
                      <CalendarTodayOutlined
                        sx={fontBodySX()}
                        color="disabled"
                      />
                      <Typography sx={fontBodySX()} mt={1} color="textDisabled">
                        End : {task.endDate}
                      </Typography>
                    </Stack>
                  </Box>
                }
              />
              {task.isExpired && (
                <Tooltip title="This task has expired" placement="top">
                  <Error color="error" sx={fontLabelSx()} />
                </Tooltip>
              )}
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
          onSoftDeleteTask("all", menu.context.id);
          closeConfirmDelete();
        }}
      />
    </Box>
  );
};

export default AllTask;
