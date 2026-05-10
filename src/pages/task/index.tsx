import React, { useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Stack,
  Select,
  MenuItem,
  FormControl,
  Button,
  FormHelperText,
  IconButton,
} from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import useMyTask from "../../hooks/useMyTask";
import { fetchDetailTask } from "../../services/myTaskService";
// helper
import { parseParams } from "../../helpers/filterParamsHelper";
// styles
import {
  fontTitleSX,
  iconButtonSX,
  fontBodySX,
  formControlSX,
  selectRenderValueSX,
} from "./styles";

const Task = () => {
  // react router
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const filterParams = parseParams(searchParams.get("filter"));
  //  hooks
  const { formik, loading, setDetailTask } = useMyTask();
  // function event
  const onCancel = (): void => {
    setDetailTask(null);
    navigate(`/my-task?filter=${filterParams}`);
  };
  // useEffect
  useEffect(() => {
    if (!id) return;
    fetchDetailTask(id).then((res) => {
      setDetailTask(res.data);
    });
  }, [id]);

  return (
    <Box component={"div"}>
      <Typography sx={fontTitleSX()} fontWeight={"bold"}>
        <IconButton
          sx={iconButtonSX()}
          onClick={() => navigate(`/my-task?filter=${filterParams}`)}
        >
          <ArrowBackIos />
        </IconButton>
        {!id && "Create New Task"}
        {!!id && "Update Task"}
      </Typography>
      <Typography sx={fontBodySX()} color="textDisabled" mb={3}>
        {!id && "Fill in the details below to create a new task."}
        {!!id && "Update the task details below."}
      </Typography>
      {/* form */}
      <Box component={"div"}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl fullWidth sx={formControlSX()}>
            <TextField
              placeholder="Title task"
              name="title"
              size="small"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={!!formik.touched.title && !!formik.errors.title}
            />
            {formik.touched.title && formik.errors.title && (
              <FormHelperText error>{formik.errors.title}</FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={formControlSX()}>
            <TextField
              placeholder="Description task"
              name="description"
              multiline
              minRows={4}
              size="small"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                !!formik.touched.description && !!formik.errors.description
              }
            />
            {formik.touched.description && formik.errors.description && (
              <FormHelperText error>{formik.errors.description}</FormHelperText>
            )}
          </FormControl>
          <Stack
            direction={{ xs: "column", sm: "column", md: "row", lg: "row" }}
            gap={2}
            mt={2}
          >
            <FormControl fullWidth>
              <DatePicker
                value={
                  formik.values.due_date ? dayjs(formik.values.due_date) : null
                }
                onChange={(value) => {
                  formik.setFieldValue(
                    "due_date",
                    value ? value.format("YYYY-MM-DD") : "",
                    true,
                  );
                }}
                onAccept={() => formik.setFieldTouched("due_date", true)}
                minDate={dayjs().startOf("day")}
                slotProps={{
                  textField: {
                    size: "small",
                    error: Boolean(
                      formik.touched.due_date && formik.errors.due_date,
                    ),
                  },
                }}
                format="YYYY-MM-DD"
              />
              {formik.touched.due_date && formik.errors.due_date && (
                <FormHelperText error>{formik.errors.due_date}</FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth>
              <Select
                displayEmpty
                value={formik.values.priority}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="priority"
                renderValue={(value) =>
                  value ? (
                    value
                  ) : (
                    <Box component={"span"} sx={selectRenderValueSX()}>
                      Select Priority
                    </Box>
                  )
                }
                size="small"
                error={!!formik.touched.priority && !!formik.errors.priority}
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
              {formik.touched.priority && formik.errors.priority && (
                <FormHelperText error>{formik.errors.priority}</FormHelperText>
              )}
            </FormControl>
          </Stack>
          <Stack direction={"row"} gap={2} justifyContent={"end"} mt={5}>
            <Button
              variant="contained"
              color="inherit"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              loading={loading}
              disabled={!formik.dirty || !formik.isValid || loading}
            >
              Save
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default Task;
