import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
} from "@mui/material";
import {
  ArrowBackIos,
  DeleteSweepOutlined,
  CalendarTodayOutlined,
  DeleteForeverOutlined,
  RestoreOutlined,
  Storage,
} from "@mui/icons-material";
import { parseParams } from "../../helpers/filterParamsHelper";
import {
  iconButtonSX,
  cardSX,
  cardListSX,
  cardContentSX,
  avatartSX,
  fontBodySX,
  cardListContentSX,
  fontTitleSX,
  storageIconSX,
} from "./styles";

const Trash = () => {
  // router
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const filterParams = parseParams(searchParams.get("filter"));
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
          Tasks Deleted
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
                      12
                    </Typography>
                  </Stack>

                  <Divider />

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
                      4.2 MB
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Box>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 8 }}>
          <Box component={"div"}>
            <Card sx={cardListSX()}>
              <CardContent sx={cardListContentSX()}>
                <Stack spacing={1}>
                  <Typography
                    sx={fontBodySX()}
                    lineHeight={1.2}
                    fontWeight={"bold"}
                  >
                    Draft Desain Landing Page
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <CalendarTodayOutlined sx={fontBodySX()} color="disabled" />
                    <Typography
                      fontWeight={500}
                      sx={fontBodySX()}
                      color="textDisabled"
                    >
                      Due: 18 Jan 2024
                    </Typography>
                  </Stack>
                </Stack>
                <Stack
                  spacing={2}
                  direction={{
                    xs: "column",
                    sm: "row",
                  }}
                >
                  <Button variant="outlined" startIcon={<RestoreOutlined />}>
                    Restore
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteForeverOutlined />}
                  >
                    Delete
                  </Button>
                </Stack>
              </CardContent>
            </Card>
            <Stack direction={"row"} justifyContent={"center"} my={3}>
              <Pagination
                count={200}
                page={1}
                shape="rounded"
                color="primary"
              />
            </Stack>
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Trash;
