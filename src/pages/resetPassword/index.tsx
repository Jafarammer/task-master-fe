import { useState, MouseEventHandler } from "react";
import {
  Box,
  Typography,
  FormControl,
  FormHelperText,
  TextField,
  Button,
  Container,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { TShowPassword } from "../../types/common";
import useAuth from "../../hooks/useAuth";
// styles
import {
  containerSx,
  fontBodySX,
  fontTitleSX,
  formControlSX,
  buttonSX,
} from "./styles";

const ResetPassword = () => {
  // hooks
  const { loading, formikResetPassword } = useAuth();
  // useState
  const [showPassword, setShowPassword] = useState<TShowPassword>({
    password: false,
    confirmPassword: false,
  });
  // function event
  const onTogglePassword = (filed: keyof TShowPassword) => {
    setShowPassword((prev) => ({
      ...prev,
      [filed]: !prev[filed],
    }));
  };
  const onMousePassword: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
  };
  return (
    <Box component={"div"} sx={containerSx()}>
      <Typography sx={fontTitleSX()}>Reset Password?</Typography>
      <Typography sx={fontBodySX()} color="textDisabled" mb={2}>
        Please enter your new password below
      </Typography>
      <Container maxWidth={"xs"}>
        <form onSubmit={formikResetPassword.handleSubmit}>
          <FormControl fullWidth sx={formControlSX()}>
            <TextField
              name="newPassword"
              placeholder="New Password"
              size="small"
              value={formikResetPassword.values.newPassword}
              onChange={formikResetPassword.handleChange}
              onBlur={formikResetPassword.handleBlur}
              type={showPassword.password ? "text" : "password"}
              error={
                !!formikResetPassword.touched.newPassword &&
                !!formikResetPassword.errors.newPassword
              }
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={() => onTogglePassword("password")}
                        onMouseDown={onMousePassword}
                        onMouseUp={onMousePassword}
                      >
                        {showPassword.password ? (
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
            {formikResetPassword.touched.newPassword &&
              formikResetPassword.errors.newPassword && (
                <FormHelperText error>
                  {formikResetPassword.errors.newPassword}
                </FormHelperText>
              )}
          </FormControl>
          <FormControl fullWidth sx={formControlSX()}>
            <TextField
              name="confirmPassword"
              placeholder="Confirm Password"
              size="small"
              type={showPassword.confirmPassword ? "text" : "password"}
              value={formikResetPassword.values.confirmPassword}
              onChange={formikResetPassword.handleChange}
              onBlur={formikResetPassword.handleBlur}
              error={
                !!formikResetPassword.touched.confirmPassword &&
                !!formikResetPassword.errors.confirmPassword
              }
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
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
            {formikResetPassword.touched.confirmPassword &&
              formikResetPassword.errors.confirmPassword && (
                <FormHelperText error>
                  {formikResetPassword.errors.confirmPassword}
                </FormHelperText>
              )}
          </FormControl>
          <Button
            variant="contained"
            fullWidth
            color="primary"
            type="submit"
            loading={loading}
            sx={buttonSX()}
            disabled={
              loading ||
              !formikResetPassword.dirty ||
              !formikResetPassword.isValid
            }
          >
            Save
          </Button>
        </form>
      </Container>
    </Box>
  );
};

export default ResetPassword;
