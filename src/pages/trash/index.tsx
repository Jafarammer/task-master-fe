import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
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
import { EmptyState, DeleteConfirmDialog, ExpandText } from "../../components";
import ListTaskTrashSkeleton from "./listTaskTrashSkeleton";
import PaginationSkeleton from "../../components/PaginationSkeleton";
import useTrash from "../../hooks/useTrash";

const Trash = () => {
  // router
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const filterParams = parseParams(searchParams.get("filter"));
  // redux
  const { trashTask, metaData, loading, error, statistics } = useAppSelector(
    (state) => state.trash,
  );
  // hooks
  const {
    search,
    setSearch,
    pagination,
    setPagination,
    onHardDeleteSingle,
    onRestoreTask,
    onHardDeleteMany,
  } = useTrash();
  // useState
  const [showSkeleton, setShowSkeleton] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<{
    context: string;
    open: boolean;
  }>({ context: "", open: false });
  const [contextTask, setContextTask] = useState<{ id: string; title: string }>(
    { id: "", title: "" },
  );
  // function event
  const openConfirmDelete = (context: string): void => {
    setConfirmDelete({ context, open: true });
  };
  const closeConfirmDelete = (): void => {
    setContextTask({ id: "", title: "" });
    setConfirmDelete({ context: "", open: false });
  };
  // useEffect
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
          onClick={() => openConfirmDelete("deleteMany")}
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
                  >
                    <Box
                      width="100%"
                      display="flex"
                      justifyContent="space-between"
                      alignItems="flex-start"
                      gap={2}
                      flexDirection={{
                        xs: "column",
                        md: "row",
                      }}
                    >
                      <ListItemText
                        primary={
                          <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
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
                              {trash.title.length > 20
                                ? trash.title.slice(0, 20) + "..."
                                : trash.title}
                            </Typography>
                          </Stack>
                        }
                        secondary={
                          <Box component="div">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={1}
                              my={2}
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

                            <ExpandText text={trash.description} />
                          </Box>
                        }
                      />

                      <Stack
                        direction={"row"}
                        mb={2}
                        gap={2}
                        flexShrink={0}
                        pt={1}
                      >
                        <Button
                          loading={loading}
                          disabled={loading}
                          variant="contained"
                          onClick={() => onRestoreTask(trash.id)}
                        >
                          Restore
                        </Button>

                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => {
                            setContextTask({
                              id: trash.id,
                              title: trash.title,
                            });

                            openConfirmDelete("deleteSingle");
                          }}
                          loading={loading}
                        >
                          Delete
                        </Button>
                      </Stack>
                    </Box>
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
      <DeleteConfirmDialog
        open={confirmDelete.open}
        taskName={
          confirmDelete.context === "deleteSingle" ? contextTask.title : ""
        }
        onClose={closeConfirmDelete}
        onConfirm={() => {
          if (confirmDelete.context === "deleteSingle") {
            onHardDeleteSingle(contextTask.id);
          } else {
            onHardDeleteMany();
          }
          closeConfirmDelete();
        }}
        title={
          confirmDelete.context !== "deleteSingle"
            ? "Are you sure you want to empty trash?"
            : undefined
        }
        description={
          confirmDelete.context !== "deleteSingle"
            ? "This action cannot be undone. The selected tasks will be permanently deleted."
            : undefined
        }
      />
    </Box>
  );
};

export default Trash;
