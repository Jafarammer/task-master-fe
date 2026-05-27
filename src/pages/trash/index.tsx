import { useState, useEffect, MouseEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  Box,
  Typography,
  IconButton,
  Stack,
  Button,
  Grid2,
  Card,
  CardContent,
  Avatar,
  Divider,
  Pagination,
  InputAdornment,
  TextField,
  List,
  ListItem,
  ListItemText,
  Chip,
} from "@mui/material";
import {
  ArrowBackIos,
  DeleteSweepOutlined,
  CalendarTodayOutlined,
  Storage,
  Search,
  MoreVert,
} from "@mui/icons-material";
import { parseParams } from "../../helpers/filterParamsHelper";
import {
  iconButtonSX,
  cardSX,
  cardContentSX,
  avatartSX,
  fontBodySX,
  fontTitleSX,
  storageIconSX,
  fontLabelSx,
  getTaskItemSx,
  chipSx,
} from "./styles";
// reusable components
import { MenuOptions, EmptyState, DeleteConfirmDialog } from "../../components";
import ListTaskTrashSkeleton from "./listTaskTrashSkeleton";
import PaginationSkeleton from "../../components/PaginationSkeleton";
import { TPagination, TMenuState } from "../../types/common";
import {
  fetchTrash,
  fetchTrashStatistics,
} from "../../features/trash/trashthunk";

const Trash = () => {
  // router
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const filterParams = parseParams(searchParams.get("filter"));
  // redux
  const dispatch = useAppDispatch();
  const { trashTask, metaData, loading, error, statistics } = useAppSelector(
    (state) => state.trash,
  );
  // useState
  const [search, setSearch] = useState<string>("");
  const [showSkeleton, setShowSkeleton] = useState<boolean>(false);
  const [pagination, setPagination] = useState<TPagination>({
    page: 1,
    limit: 5,
  });
  const [menu, setMenu] = useState<TMenuState>({
    anchorEl: null,
    open: false,
    context: null,
  });
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  // function event
  const onOpenMenu = (
    event: MouseEvent<HTMLButtonElement>,
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
  const openConfirmDelete = (): void => {
    setConfirmDelete(true);
    onCloseMenu();
  };
  const closeConfirmDelete = (): void => {
    setConfirmDelete(false);
    onCloseMenu();
  };
  // useEffect
  useEffect(() => {
    dispatch(
      fetchTrash({
        page: pagination.page,
        limit: pagination.limit,
        query: search,
      }),
    );
    dispatch(fetchTrashStatistics());
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
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography sx={fontTitleSX()}>
          <IconButton
            sx={iconButtonSX()}
            onClick={() => navigate(`/my-task?filter=${filterParams}`)}
          >
            <ArrowBackIos />
          </IconButton>
          Trash
        </Typography>
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteSweepOutlined />}
        >
          Empty Trash
        </Button>
      </Stack>
      <Typography sx={fontBodySX()} color="textDisabled">
        Items in the trash will be automatically deleted after 30 days.
      </Typography>
      <Grid2 container spacing={2} mt={5}>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <Box component={"div"}>
            <Card variant="elevation" sx={cardSX()}>
              <CardContent sx={cardContentSX()}>
                <Avatar sx={avatartSX()}>
                  <Storage sx={storageIconSX()} />
                </Avatar>
                <Typography fontSize={20} fontWeight="bold">
                  Trash Statistics
                </Typography>
                <Stack spacing={2} width={"100%"} mt={2}>
                  {/* total items */}
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography
                      fontWeight={500}
                      sx={fontBodySX()}
                      color="textDisabled"
                    >
                      Total Item
                    </Typography>

                    <Typography fontWeight={"bold"} sx={fontBodySX()}>
                      {statistics?.totalItems}
                    </Typography>
                  </Stack>
                  {/* trash items */}
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography
                      fontWeight={500}
                      sx={fontBodySX()}
                      color="textDisabled"
                    >
                      Trash Item
                    </Typography>

                    <Typography fontWeight={"bold"} sx={fontBodySX()}>
                      {statistics?.trashItems}
                    </Typography>
                  </Stack>
                  {/* active item */}
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography
                      fontWeight={500}
                      sx={fontBodySX()}
                      color="textDisabled"
                    >
                      Active Item
                    </Typography>

                    <Typography fontWeight={"bold"} sx={fontBodySX()}>
                      {statistics?.activeItems}
                    </Typography>
                  </Stack>

                  <Divider />
                  {/* used storage */}
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography
                      fontWeight={500}
                      sx={fontBodySX()}
                      color="textDisabled"
                    >
                      Storage Used
                    </Typography>

                    <Typography fontWeight={"bold"} sx={fontBodySX()}>
                      {statistics?.usedStorage}
                    </Typography>
                  </Stack>
                  {/* max storage */}
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography
                      fontWeight={500}
                      sx={fontBodySX()}
                      color="textDisabled"
                    >
                      Maximal Storage Used
                    </Typography>

                    <Typography fontWeight={"bold"} sx={fontBodySX()}>
                      {statistics?.maxStorage}
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Box>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 8 }}>
          <Box component={"div"}>
            <TextField
              placeholder="Search tasks..."
              size="small"
              fullWidth
              sx={{ mb: 3 }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={fontLabelSx()} />
                    </InputAdornment>
                  ),
                },
              }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {trashTask.length === 0 && <EmptyState />}
            {showSkeleton && trashTask?.length !== 0 && (
              <List>
                {Array.from({
                  length: trashTask?.length || pagination.limit,
                }).map((_, index) => (
                  <ListTaskTrashSkeleton key={index} />
                ))}
              </List>
            )}
            {trashTask.length > 0 && !showSkeleton && (
              <List>
                {trashTask.map((trash, index): any => (
                  <ListItem
                    key={index}
                    sx={getTaskItemSx(index, trashTask.length)}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        onClick={(e) => onOpenMenu(e, trash.id, trash.title)}
                      >
                        <MoreVert sx={fontLabelSx()} />
                      </IconButton>
                    }
                  >
                    <ListItemText
                      primary={
                        <Stack
                          direction={"row"}
                          spacing={2}
                          alignItems={"center"}
                        >
                          <Chip
                            label={trash.priority}
                            color={
                              trash.priority === "low"
                                ? "success"
                                : trash.priority === "medium"
                                  ? "warning"
                                  : "error"
                            }
                            size="small"
                            variant="outlined"
                            sx={chipSx()}
                          />
                          <Typography sx={fontBodySX()}>
                            {trash.title}
                          </Typography>
                        </Stack>
                      }
                      secondary={
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
                          <Typography
                            fontWeight={500}
                            sx={fontBodySX()}
                            color="textDisabled"
                          >
                            Due: {trash.dueDate}
                          </Typography>
                        </Stack>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            )}
            {showSkeleton && trashTask?.length !== 0 && <PaginationSkeleton />}
            {!showSkeleton && trashTask.length !== 0 && (
              <Stack direction={"row"} justifyContent={"center"} my={3}>
                <Pagination
                  count={metaData?.totalPages}
                  page={pagination.page}
                  onChange={(_, value) =>
                    setPagination({ page: value, limit: 5 })
                  }
                  shape="rounded"
                  color="primary"
                />
              </Stack>
            )}
          </Box>
        </Grid2>
      </Grid2>
      {/* pop up */}
      <MenuOptions
        anchorEl={menu.anchorEl}
        open={menu.open}
        onClose={onCloseMenu}
        onDelete={openConfirmDelete}
      />
      <DeleteConfirmDialog
        open={confirmDelete}
        taskName={menu.context?.title ?? ""}
        onClose={closeConfirmDelete}
        onConfirm={() => {
          // onSoftDeleteTask("all", menu.context.id);
          closeConfirmDelete();
        }}
      />
    </Box>
  );
};

export default Trash;
