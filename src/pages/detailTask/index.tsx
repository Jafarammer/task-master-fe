import React from "react";
import { useNavigate } from "react-router-dom";
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

const DetailTask = () => {
  // router
  const navigate = useNavigate();
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
            <Typography sx={titleSx()}>Title</Typography>

            <Chip
              label="Pending"
              color="warning"
              size="small"
              variant="filled"
              sx={chipStatusSx()}
            />
          </Stack>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
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
              <Typography fontWeight={600}>July 15, 2024</Typography>
            </Box>
            <Box width="100%">
              <Typography variant="body2" color="text.secondary">
                Priority
              </Typography>
              <Chip
                label="High"
                color="error"
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
              >
                Mark as Complete
              </Button>

              <Button
                fullWidth
                variant="contained"
                color="inherit"
                startIcon={<EditOutlined />}
                sx={buttonActionSx()}
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
              >
                Delete Task
              </Button>
            </Stack>
          </Stack>
        </CardActions>
      </Card>
    </Box>
  );
};

export default DetailTask;
