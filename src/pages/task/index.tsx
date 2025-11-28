import React from "react";
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
  Snackbar,
  Alert,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useParams, useNavigate } from "react-router-dom";
import useTask from "../../hooks/useTask";
// reusable components
import { ButtonCloseSnackbar } from "../../components";

const Task = () => {
  // react router
  const { mode } = useParams();
  const navigate = useNavigate();
  //  hooks
  const { formik, loading, onCloseSnackbar, openSnackbar } = useTask();
  return (
    <React.Fragment>
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
      <Typography variant="h4" fontWeight={"bold"} letterSpacing={1}>
        {mode === "create" && "Create New Task"}
        {mode === "update" && "Update Task"}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {mode === "create" && "Fill in the details below to create a new task."}
        {mode === "update" && "Update the task details below."}
      </Typography>
      {/* form */}
      <Box sx={{ mt: 3 }}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl fullWidth sx={{ my: 1.5 }}>
            <TextField
              placeholder="Title task"
              name="title"
              size="small"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={!!formik.touched.title && !!formik.errors.title}
            />
            {formik.touched.title && formik.errors.title && (
              <FormHelperText error>{formik.errors.title}</FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ my: 1.5 }}>
            <TextField
              placeholder="Description task"
              size="small"
              name="description"
              multiline
              minRows={4}
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
                    true
                  );
                }}
                onAccept={() => formik.setFieldTouched("due_date", true)}
                minDate={dayjs().startOf("day")}
                slotProps={{
                  textField: {
                    size: "small",
                    error: Boolean(
                      formik.touched.due_date && formik.errors.due_date
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
                    <span
                      style={{
                        opacity: 0.4,
                        fontSize: "16px",
                      }}
                    >
                      Select Priority
                    </span>
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
              sx={{ fontWeight: "bold", mt: 2, width: 92 }}
              color="inherit"
              onClick={() => navigate("/my-task")}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{ fontWeight: "bold", mt: 2, width: 92 }}
              color="primary"
              type="submit"
              loading={loading}
              disabled={loading}
            >
              Save
            </Button>
          </Stack>
        </form>
      </Box>
    </React.Fragment>
  );
};

export default Task;
