import { useState, MouseEventHandler, Dispatch, SetStateAction } from "react";
import {
  TextField,
  FormControl,
  FormHelperText,
  Stack,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useProfile from "../../hooks/useProfile";
import { ShowPassword } from "../../types/profile";
// styles
import { fontBodySX } from "./styles";

type Props = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const FormSecurity = ({ setOpen }: Props) => {
  // hooks
  const { formikUpdateProfilePasswrod, laodingUpdatePassword } = useProfile();
  // useState
  const [showPassword, setShowPassword] = useState<ShowPassword>({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  // function event
  const onTogglePassword = (field: keyof ShowPassword) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };
  const onMousePassword: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
  };
  return (
    <form onSubmit={formikUpdateProfilePasswrod.handleSubmit}>
      <FormControl fullWidth sx={{ mt: 3 }}>
        <TextField
          name="currentPassword"
          placeholder="Current Password"
          size="small"
          type={showPassword.currentPassword ? "text" : "password"}
          value={formikUpdateProfilePasswrod.values.currentPassword}
          onChange={formikUpdateProfilePasswrod.handleChange}
          onBlur={formikUpdateProfilePasswrod.handleBlur}
          error={
            !!formikUpdateProfilePasswrod.touched.currentPassword &&
            !!formikUpdateProfilePasswrod.errors.currentPassword
          }
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => onTogglePassword("currentPassword")}
                    onMouseDown={onMousePassword}
                    onMouseUp={onMousePassword}
                  >
                    {showPassword.currentPassword ? (
                      <VisibilityOff sx={fontBodySX()} />
                    ) : (
                      <Visibility sx={fontBodySX()} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
        {formikUpdateProfilePasswrod.touched.currentPassword &&
          formikUpdateProfilePasswrod.errors.currentPassword && (
            <FormHelperText error>
              {formikUpdateProfilePasswrod.errors.currentPassword}
            </FormHelperText>
          )}
      </FormControl>
      <Stack direction={{ xs: "column", md: "row" }} spacing={4} mt={3}>
        <FormControl fullWidth>
          <TextField
            name="newPassword"
            placeholder="New Password"
            size="small"
            value={formikUpdateProfilePasswrod.values.newPassword}
            type={showPassword.newPassword ? "text" : "password"}
            onChange={formikUpdateProfilePasswrod.handleChange}
            onBlur={formikUpdateProfilePasswrod.handleBlur}
            error={
              !!formikUpdateProfilePasswrod.touched.newPassword &&
              !!formikUpdateProfilePasswrod.errors.newPassword
            }
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => onTogglePassword("newPassword")}
                      onMouseDown={onMousePassword}
                      onMouseUp={onMousePassword}
                    >
                      {showPassword.newPassword ? (
                        <VisibilityOff sx={fontBodySX()} />
                      ) : (
                        <Visibility sx={fontBodySX()} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          {formikUpdateProfilePasswrod.touched.newPassword &&
            formikUpdateProfilePasswrod.errors.newPassword && (
              <FormHelperText error>
                {formikUpdateProfilePasswrod.errors.newPassword}
              </FormHelperText>
            )}
        </FormControl>
        <FormControl fullWidth>
          <TextField
            name="confirmPassword"
            placeholder="Confirm Password"
            size="small"
            value={formikUpdateProfilePasswrod.values.confirmPassword}
            type={showPassword.confirmPassword ? "text" : "password"}
            onChange={formikUpdateProfilePasswrod.handleChange}
            onBlur={formikUpdateProfilePasswrod.handleBlur}
            error={
              !!formikUpdateProfilePasswrod.touched.confirmPassword &&
              !!formikUpdateProfilePasswrod.errors.confirmPassword
            }
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => onTogglePassword("confirmPassword")}
                      onMouseDown={onMousePassword}
                      onMouseUp={onMousePassword}
                    >
                      {showPassword.confirmPassword ? (
                        <VisibilityOff sx={fontBodySX()} />
                      ) : (
                        <Visibility sx={fontBodySX()} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          {formikUpdateProfilePasswrod.touched.confirmPassword &&
            formikUpdateProfilePasswrod.errors.confirmPassword && (
              <FormHelperText error>
                {formikUpdateProfilePasswrod.errors.confirmPassword}
              </FormHelperText>
            )}
        </FormControl>
      </Stack>
      <Stack
        direction={"row"}
        justifyContent={"right"}
        alignItems={"center"}
        my={3}
        gap={2}
      >
        <Button
          variant="contained"
          color="inherit"
          onClick={() => setOpen(false)}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          loading={laodingUpdatePassword}
          variant="contained"
          disabled={
            laodingUpdatePassword ||
            !formikUpdateProfilePasswrod.dirty ||
            !formikUpdateProfilePasswrod.isValid
          }
        >
          Save Password
        </Button>
      </Stack>
    </form>
  );
};

export default FormSecurity;
