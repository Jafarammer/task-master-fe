import { Box, Skeleton, Stack } from "@mui/material";

const ListTaskSkeleton = () => {
  return (
    <Box
      sx={{
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        p: 2,
        mb: 1,
        bgcolor: "background.paper",
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Skeleton variant="rectangular" width={20} height={20} />
        <Box sx={{ flex: 1 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Skeleton variant="rounded" width={70} height={24} />
            <Skeleton variant="text" width="40%" height={24} />
          </Stack>
          <Skeleton variant="text" width="25%" height={18} />
        </Box>
        <Skeleton variant="circular" width={24} height={24} />
      </Stack>
    </Box>
  );
};

export default ListTaskSkeleton;
