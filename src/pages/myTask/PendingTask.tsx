import React, { useState } from "react";
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
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { getTaskItemSx } from "./styles";
// reusable components
import { MenuOptions } from "../../components";
// type declaration
import { MenuState } from "../../types/global";

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
  // router
  const navigate = useNavigate();
  // useState
  const [tasks, setTasks] = useState<Task[]>(initialTask);
  const [menu, setMenu] = useState<MenuState>({ anchorEl: null, open: false });
  // function event
  const onChecked = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  const onOpenMenu = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setMenu({
      anchorEl: event.currentTarget,
      open: true,
    });
  };
  const onCloseMenu = (): void => {
    setMenu({
      anchorEl: null,
      open: false,
    });
  };
  return (
    <React.Fragment>
      <List sx={{ m: 0 }}>
        {tasks.map((task, index) => (
          <ListItem
            key={task.id}
            sx={getTaskItemSx(index, tasks.length)}
            secondaryAction={
              <React.Fragment>
                <IconButton edge="end" aria-label="more" onClick={onOpenMenu}>
                  <MoreVertIcon />
                </IconButton>
                <MenuOptions
                  anchorEl={menu.anchorEl}
                  open={menu.open}
                  onClose={onCloseMenu}
                  onEdit={() => navigate("/task/update")}
                />
              </React.Fragment>
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
