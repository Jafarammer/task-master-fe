import { Skeleton, Stack } from "@mui/material";

const PaginationSkeleton = () => {
  return (
    <Stack direction="row" justifyContent="center" mt={2} gap={2}>
      <Skeleton variant="circular" width={28} height={28} />
      <Skeleton variant="rounded" width={32} height={32} />
      <Skeleton variant="circular" width={28} height={28} />
    </Stack>
  );
};

export default PaginationSkeleton;
