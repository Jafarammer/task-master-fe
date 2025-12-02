import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Divider,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Stack,
  Chip,
  IconButton,
} from "@mui/material";
import {
  CheckCircleOutline,
  EditOutlined,
  DeleteOutline,
  ArrowBackIos,
} from "@mui/icons-material";
import { titleSx, chipStatusSx, chipProritySx, buttonActionSx } from "./styles";
import { fetchTaskDetail } from "../../services/taskService";
import { CreateTaskPayload } from "../../types/task";
import dayjs from "dayjs";
import { DeleteConfirmDialog } from "../../components";
import useMyTask from "../../hooks/useMyTask";

const DetailTask = () => {
  // router
  const navigate = useNavigate();
  const { id } = useParams();
  // hooks
  const { onDeleteTask, onUpdateStatus } = useMyTask();
  // useState
  const [data, setData] = useState<CreateTaskPayload | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  // function event
  const getPriorityColor = (p: CreateTaskPayload["priority"]) =>
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
    fetchTaskDetail(id).then((res) => {
      setData(res.data);
    });
  }, [id]);

  return (
    <Box mt={4} px={{ xs: 1, sm: 3 }}>
      <IconButton sx={{ mb: 3 }} onClick={() => navigate("/my-task")}>
        <ArrowBackIos />
      </IconButton>
      <Card sx={{ width: "100%" }}>
        <CardContent>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
            mb={3}
          >
            <Typography sx={titleSx()}>{data?.title}</Typography>

            <Chip
              label={data?.is_completed === true ? "Complete" : "Pending"}
              color={data?.is_completed === true ? "primary" : "warning"}
              size="small"
              variant="filled"
              sx={chipStatusSx()}
            />
          </Stack>
          <Typography variant="body2" color="text.secondary" mb={2}>
            {data?.description}
          </Typography>

          <Divider />

          <Typography variant="h6" my={2}>
            Details
          </Typography>

          <Stack direction="row" justifyContent="space-between" spacing={4}>
            <Box width="100%">
              <Typography variant="body2" color="text.secondary">
                Due Date
              </Typography>
              <Typography fontWeight={600}>
                {dayjs(data?.due_date).format("MMMM D, YYYY")}
              </Typography>
            </Box>
            <Box width="100%">
              <Typography variant="body2" color="text.secondary">
                Priority
              </Typography>
              <Chip
                label={data?.priority}
                color={
                  data?.priority ? getPriorityColor(data.priority) : "default"
                }
                size="small"
                variant="outlined"
                sx={chipProritySx()}
              />
            </Box>
          </Stack>
        </CardContent>

        <CardActions
          sx={{
            px: 2,
            py: 2,
          }}
        >
          <Stack
            direction={{ xs: "column", lg: "row" }}
            spacing={2}
            width="100%"
            justifyContent="space-between"
          >
            <Stack
              direction={{ xs: "column", lg: "row" }}
              spacing={2}
              width={{ xs: "100%", lg: "40%" }}
            >
              <Button
                fullWidth
                variant="contained"
                startIcon={<CheckCircleOutline />}
                sx={buttonActionSx()}
                disabled={data?.is_completed}
                onClick={() => {
                  if (!id) return;
                  onUpdateStatus("detail", id, true);
                  navigate("/my-task");
                }}
              >
                Mark as Complete
              </Button>

              <Button
                fullWidth
                variant="contained"
                color="inherit"
                startIcon={<EditOutlined />}
                sx={buttonActionSx()}
                onClick={() => navigate(`/task/update/${id}`)}
              >
                Edit Task
              </Button>
            </Stack>

            <Stack
              direction={{ xs: "column", lg: "row" }}
              spacing={2}
              width={{ xs: "100%", lg: "20%" }}
            >
              <Button
                fullWidth
                variant="contained"
                color="error"
                startIcon={<DeleteOutline />}
                sx={buttonActionSx()}
                onClick={openConfirmDelete}
              >
                Delete Task
              </Button>
            </Stack>
          </Stack>
        </CardActions>
      </Card>
      {/* pop up */}
      <DeleteConfirmDialog
        open={confirmDelete}
        onClose={closeConfirmDelete}
        taskName={data?.title ?? ""}
        onConfirm={() => {
          if (!id) return;
          onDeleteTask("detail", id);
          closeConfirmDelete();
          navigate("/my-task");
        }}
      />
    </Box>
  );
};

export default DetailTask;
