import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import Header from "./Header";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Container sx={{ mt: 3 }}>
        <Outlet />
      </Container>
    </>
  );
};

export default MainLayout;
