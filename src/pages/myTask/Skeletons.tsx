import { Box, Skeleton, Stack } from "@mui/material";

const Skeletons = () => {
  return (
    <Box
      sx={{
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        p: 2,
        mb: 2,
        bgcolor: "background.paper",
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        {/* Checkbox */}
        <Skeleton variant="rectangular" width={20} height={20} />

        {/* Content */}
        <Box sx={{ flex: 1 }}>
          {/* Priority badge + Title */}
          <Stack direction="row" spacing={2} alignItems="center">
            <Skeleton variant="rounded" width={70} height={24} />
            <Skeleton variant="text" width="40%" height={24} />
          </Stack>

          {/* Due date */}
          <Skeleton variant="text" width="25%" height={18} />
        </Box>

        {/* Menu */}
        <Skeleton variant="circular" width={24} height={24} />
      </Stack>

      {/* Pagination skeleton */}
      {/* <Stack direction="row" justifyContent="center" mt={2}>
        <Skeleton variant="circular" width={28} height={28} />
        <Skeleton variant="rounded" width={32} height={32} />
        <Skeleton variant="circular" width={28} height={28} />
      </Stack> */}
    </Box>
  );
};

export default Skeletons;
