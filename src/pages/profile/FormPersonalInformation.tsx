import {
  TextField,
  FormControl,
  FormHelperText,
  FormLabel,
  Stack,
  Button,
} from "@mui/material";
import useProfile from "../../hooks/useProfile";
// styles
import { formLabelSX } from "./styles";

const FormPersonalInformation = () => {
  // hooks
  const { formikUpdateProfile, loading, setIsUpdate, isUpdate } = useProfile();
  return (
    <form onSubmit={formikUpdateProfile.handleSubmit}>
      <Stack direction={{ xs: "column", md: "row" }} mt={5} mb={3} spacing={4}>
        <FormControl fullWidth>
          <FormLabel sx={formLabelSX()}>Full Name</FormLabel>
          <TextField
            name="fullName"
            value={formikUpdateProfile.values.fullName}
            size="small"
            onChange={formikUpdateProfile.handleChange}
            onBlur={formikUpdateProfile.handleBlur}
            error={
              !!formikUpdateProfile.touched.fullName &&
              !!formikUpdateProfile.errors.fullName
            }
            slotProps={{
              input: {
                readOnly: !isUpdate,
              },
            }}
          />
          {formikUpdateProfile.touched.fullName &&
            formikUpdateProfile.errors.fullName && (
              <FormHelperText error>
                {formikUpdateProfile.errors.fullName}
              </FormHelperText>
            )}
        </FormControl>
        <FormControl fullWidth>
          <FormLabel sx={formLabelSX()}> Email</FormLabel>
          <TextField
            name="email"
            value={formikUpdateProfile.values.email}
            size="small"
            onChange={formikUpdateProfile.handleChange}
            onBlur={formikUpdateProfile.handleBlur}
            error={
              !!formikUpdateProfile.touched.email &&
              !!formikUpdateProfile.errors.email
            }
            slotProps={{
              input: {
                readOnly: !isUpdate,
              },
            }}
          />
          {formikUpdateProfile.touched.email &&
            formikUpdateProfile.errors.email && (
              <FormHelperText error>
                {formikUpdateProfile.errors.email}
              </FormHelperText>
            )}
        </FormControl>
      </Stack>
      <Stack
        direction={"row"}
        justifyContent={"right"}
        alignItems={"center"}
        mb={3}
        gap={2}
      >
        {isUpdate && (
          <Button
            variant="contained"
            color="inherit"
            onClick={() => {
              formikUpdateProfile.resetForm();
              setIsUpdate(false);
            }}
          >
            Cancel
          </Button>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsUpdate(true)}
          type={isUpdate ? "submit" : "button"}
          disabled={
            loading ||
            (isUpdate &&
              (!formikUpdateProfile.dirty || !formikUpdateProfile.isValid))
          }
          loading={loading}
        >
          {isUpdate && "Save"}
          {!isUpdate && "Update Profile"}
        </Button>
      </Stack>
    </form>
  );
};

export default FormPersonalInformation;
