import Header from "./Header"; // or Reader, depending on your component
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserProvider";
import { useEffect } from "react";

const MainLayout = () => {
  const { id, setId } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) navigate("/login");
  }, []);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default MainLayout;
