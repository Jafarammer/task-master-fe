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
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
// type declaration
import { IFormValuesTask } from "../../types/task";

const Task = () => {
  // react router
  const { mode } = useParams();
  // formik
  const formik = useFormik<IFormValuesTask>({
    initialValues: {
      title: "",
      description: "",
      dueDate: dayjs(),
      priority: "",
    },
    onSubmit: (values) => {
      console.info("values", values);
    },
  });
  return (
    <React.Fragment>
      <Typography variant="h4" fontWeight={"bold"} letterSpacing={1}>
        {mode === "create" && "Create New Task"}
        {mode === "update" && "Update Task"}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {mode === "create" && "Fill in the details below to create a new task."}
      </Typography>
      {/* form */}
      <Box sx={{ mt: 3 }}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl fullWidth>
            <TextField
              placeholder="Title task"
              name="title"
              size="small"
              // multiline
              // minRows={4}
              // maxRows={5}
              // onChange={formik.handleChange}
              // onBlur={formik.handleBlur}
              // error={
              //   formik.touched.firstName && Boolean(formik.errors.firstName)
              // }
              // helperText={formik.touched.firstName && formik.errors.firstName}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              placeholder="Description task"
              sx={{ my: 1.5 }}
              size="small"
              name="description"
              multiline
              minRows={4}
              // onChange={formik.handleChange}
              // onBlur={formik.handleBlur}
              // error={
              //   formik.touched.firstName && Boolean(formik.errors.firstName)
              // }
              // helperText={formik.touched.firstName && formik.errors.firstName}
            />
          </FormControl>
          <Stack
            direction={{ xs: "column", sm: "column", md: "row", lg: "row" }}
            gap={2}
            mt={2}
          >
            <FormControl fullWidth>
              <DatePicker
                value={formik.values.dueDate}
                name="dueDate"
                onChange={(v) => {
                  formik.setFieldValue("dueDate", v);
                }}
                slotProps={{
                  textField: {
                    size: "small",
                  },
                }}
              />
            </FormControl>

            <FormControl fullWidth>
              <Select
                displayEmpty
                value={formik.values.priority}
                onChange={formik.handleChange}
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
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <Stack direction={"row"} gap={2} justifyContent={"end"} mt={5}>
            <Button
              variant="contained"
              // fullWidth
              sx={{ fontWeight: "bold", mt: 2, width: 92 }}
              color="inherit"
              type="submit"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              // fullWidth
              sx={{ fontWeight: "bold", mt: 2, width: 92 }}
              color="primary"
              type="submit"
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
