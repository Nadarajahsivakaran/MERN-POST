import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Store/auth";

export default function ButtonAppBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const _logout = () => {
    Cookies.remove("token");
    navigate("/login");
    dispatch(logout());
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/home" className="text-white">
              {" "}
              Expenser
            </Link>
          </Typography>

          <Link to="/category" className="text-white">
            <Button color="inherit">Category</Button>
          </Link>

          {isAuthenticated ? (
            <Button color="inherit" onClick={_logout}>
              Log out
            </Button>
          ) : (
            <>
              <Link to="/login" className="text-white">
                <Button color="inherit">Login</Button>
              </Link>

              <Link to="/register" className="text-white">
                <Button color="inherit">Register</Button>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
