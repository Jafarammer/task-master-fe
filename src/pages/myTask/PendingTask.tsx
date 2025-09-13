import React, { useState } from "react";
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
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { getTaskItemSx } from "./styles";

type Task = {
  id: number;
  title: string;
  dueDate: string;
  completed: boolean;
};

const initialTask: Task[] = [
  { id: 1, title: "Grocery Shopping", dueDate: "2024-03-15", completed: false },
  {
    id: 2,
    title: "Book Appointment with Dr. Smith",
    dueDate: "2024-03-18",
    completed: false,
  },
  {
    id: 3,
    title: "Plan Weekend Trip",
    dueDate: "2024-03-22",
    completed: false,
  },
  {
    id: 4,
    title: "Submit Project Report",
    dueDate: "2024-03-25",
    completed: false,
  },
];

const PendingTask = () => {
  // useState
  const [tasks, setTasks] = useState<Task[]>(initialTask);
  // function event
  const onChecked = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  return (
    <React.Fragment>
      <List sx={{ m: 0 }}>
        {tasks.map((task, index) => (
          <ListItem
            key={task.id}
            sx={(theme) => getTaskItemSx(theme, index, tasks.length)}
            secondaryAction={
              <IconButton edge="end" aria-label="more">
                <MoreVertIcon />
              </IconButton>
            }
          >
            <ListItemIcon>
              <Checkbox
                checked={task.completed}
                onChange={() => onChecked(task.id)}
              />
            </ListItemIcon>
            <ListItemText
              primary={<Typography>{task.title}</Typography>}
              secondary={<Typography>Due {task.dueDate}</Typography>}
            />
          </ListItem>
        ))}
      </List>
      <Stack direction={"row"} justifyContent={"center"} my={3}>
        <Pagination count={10} shape="rounded" color="primary" />
      </Stack>
    </React.Fragment>
  );
};

export default PendingTask;
