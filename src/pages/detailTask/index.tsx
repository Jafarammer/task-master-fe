import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  Stack,
  Chip,
  IconButton,
  Grid2,
  ButtonGroup,
} from "@mui/material";
import { ArrowBackIos, CalendarTodayOutlined } from "@mui/icons-material";
import {
  cardActionSX,
  iconButtonSX,
  fontBodySX,
  fontTitleSX,
  fontLabelSx,
  chipSX,
  cardDetailSX,
} from "./styles";
import dayjs from "dayjs";
import { DeleteConfirmDialog } from "../../components";
import useMyTask from "../../hooks/useMyTask";
import {
  IMyTaskDetailResponse,
  IMyTaskData,
} from "../../interfaces/myTaskInterface";
import { fetchDetailTask } from "../../services/myTaskService";
// helper
import { parseParams } from "../../helpers/filterParamsHelper";

const DetailTask = () => {
  // router
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const filterParams = parseParams(searchParams.get("filter"));
  // hooks
  const { onSoftDeleteTask, onUpdateStatus } = useMyTask();
  // useState
  const [data, setData] = useState<IMyTaskData | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  // function event
  const getPriorityColor = (p: IMyTaskDetailResponse["data"]["priority"]) =>
    p === "high" ? "error" : p === "medium" ? "warning" : "success";
  const openConfirmDelete = (): void => {
    setConfirmDelete(true);
  };
  const closeConfirmDelete = (): void => {
    setConfirmDelete(false);
  };
  // useEffect
  useEffect(() => {
    if (!id) return;
    fetchDetailTask(id).then((res) => {
      setData(res.data);
    });
  }, [id]);

  return (
    <Box component={"div"}>
      <Typography fontWeight={"bold"} sx={fontTitleSX()}>
        <IconButton
          sx={iconButtonSX()}
          onClick={() => navigate(`/my-task?filter=${filterParams}`)}
        >
          <ArrowBackIos />
        </IconButton>
        Detail Task
      </Typography>
      <Typography sx={fontBodySX()} color="textDisabled">
        Manage your details task and preferences.
      </Typography>
      <Grid2 container spacing={2} mt={5}>
        <Grid2 size={{ xs: 12, md: 8 }}>
          <Box component={"div"}>
            <Card variant="elevation" sx={cardDetailSX()}>
              <CardContent>
                <Stack direction={"row"} spacing={2} mb={3}>
                  <Chip
                    label={`Priority ${data?.priority}`}
                    color={
                      data?.priority
                        ? getPriorityColor(data.priority)
                        : "default"
                    }
                    variant="outlined"
                    sx={chipSX()}
                  />
                  <Chip
                    label={`Status ${data?.isCompleted === true ? "Complete" : "Pending"}`}
                    color={data?.isCompleted === true ? "primary" : "warning"}
                    variant="outlined"
                    sx={chipSX()}
                  />
                </Stack>
                <Typography fontWeight={"bold"} sx={fontLabelSx()}>
                  {data?.title}
                </Typography>
                <Typography color="textDisabled" sx={fontBodySX()}>
                  {data?.description}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <Box component={"div"} mb={3}>
            <Card variant="elevation" sx={cardActionSX()}>
              <CardContent>
                <Typography sx={fontBodySX()} fontWeight={"bold"}>
                  Meta Information
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1} my={2}>
                  <CalendarTodayOutlined sx={fontLabelSx()} color="disabled" />
                  <Typography
                    fontWeight={500}
                    sx={fontBodySX()}
                    color="textDisabled"
                  >
                    Due Date: {dayjs(data?.dueDate).format("MMMM D, YYYY")}
                  </Typography>
                </Stack>

                <Stack justifyContent={"center"} alignItems={"center"} mt={5}>
                  <ButtonGroup
                    variant="contained"
                    size="small"
                    color="secondary"
                  >
                    <Button
                      disabled={data?.isCompleted}
                      onClick={() => {
                        if (!id) return;
                        onUpdateStatus("detail", id, true);
                        navigate(`/my-task?filter=${filterParams}`);
                      }}
                    >
                      Completed
                    </Button>
                    <Button onClick={() => navigate(`/task/update/${id}`)}>
                      Edit
                    </Button>
                    <Button onClick={openConfirmDelete}>Delete</Button>
                  </ButtonGroup>
                </Stack>
              </CardContent>
            </Card>
          </Box>
        </Grid2>
      </Grid2>

      {/* pop up */}
      <DeleteConfirmDialog
        open={confirmDelete}
        onClose={closeConfirmDelete}
        taskName={data?.title ?? ""}
        onConfirm={() => {
          if (!id) return;
          onSoftDeleteTask("detail", id);
          navigate(`/my-task?filter=${filterParams}`);
          closeConfirmDelete();
        }}
      />
    </Box>
  );
};

export default DetailTask;
