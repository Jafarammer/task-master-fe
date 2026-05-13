import { useState, MouseEventHandler } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Container,
  Box,
  TextField,
  Typography,
  Link,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useAuth from "../../hooks/useAuth";
import { ShowPassword } from "../../types/auth";
import { containerSx, fontBodySX, fontTitleSX, formControlSX } from "./styles";

const Register = () => {
  // hooks
  const { formikRegister, loading } = useAuth();
  // useState
  const [showPassword, setShowPassword] = useState<ShowPassword>({
    password: false,
    confirmPassword: false,
  });
  // fnction event
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
    <Box component={"div"} sx={containerSx()}>
      <Typography sx={fontTitleSX()}>Create your account</Typography>
      <Typography sx={fontBodySX()} color="textDisabled" mb={2}>
        Already have an account?{" "}
        <Link
          component={RouterLink}
          to="/login"
          underline="none"
          color="#08CB00"
          fontWeight={500}
        >
          Sign in
        </Link>
      </Typography>
      <Container maxWidth="xs">
        <form onSubmit={formikRegister.handleSubmit}>
          <FormControl fullWidth sx={formControlSX()}>
            <TextField
              placeholder="Full Name"
              size="small"
              name="fullName"
              type="text"
              value={formikRegister.values.fullName}
              onChange={formikRegister.handleChange}
              onBlur={formikRegister.handleBlur}
              error={
                !!formikRegister.touched.fullName &&
                !!formikRegister.errors.fullName
              }
            />
            {formikRegister.touched.fullName &&
              formikRegister.errors.fullName && (
                <FormHelperText error>
                  {formikRegister.errors.fullName}
                </FormHelperText>
              )}
          </FormControl>
          <FormControl fullWidth sx={formControlSX()}>
            <TextField
              placeholder="Email Address"
              size="small"
              name="email"
              type="email"
              value={formikRegister.values.email}
              onChange={formikRegister.handleChange}
              onBlur={formikRegister.handleBlur}
              error={
                !!formikRegister.touched.email && !!formikRegister.errors.email
              }
            />
            {formikRegister.touched.email && formikRegister.errors.email && (
              <FormHelperText error>
                {formikRegister.errors.email}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={formControlSX()}>
            <TextField
              placeholder="Password"
              size="small"
              name="password"
              type={showPassword.password ? "text" : "password"}
              value={formikRegister.values.password}
              onChange={formikRegister.handleChange}
              onBlur={formikRegister.handleBlur}
              error={
                !!formikRegister.touched.password &&
                !!formikRegister.errors.password
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
            {formikRegister.touched.password &&
              formikRegister.errors.password && (
                <FormHelperText error>
                  {formikRegister.errors.password}
                </FormHelperText>
              )}
          </FormControl>
          <FormControl fullWidth sx={formControlSX()}>
            <TextField
              placeholder="Confirm Password"
              size="small"
              name="confirmPassword"
              type={showPassword.confirmPassword ? "text" : "password"}
              value={formikRegister.values.confirmPassword}
              onChange={formikRegister.handleChange}
              onBlur={formikRegister.handleBlur}
              error={
                !!formikRegister.touched.confirmPassword &&
                !!formikRegister.errors.confirmPassword
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
            {formikRegister.touched.confirmPassword &&
              formikRegister.errors.confirmPassword && (
                <FormHelperText error>
                  {formikRegister.errors.confirmPassword}
                </FormHelperText>
              )}
          </FormControl>
          <Button
            variant="contained"
            fullWidth
            color="primary"
            type="submit"
            loading={loading}
            disabled={loading}
          >
            Register
          </Button>
        </form>
      </Container>
    </Box>
  );
};

export default Register;
