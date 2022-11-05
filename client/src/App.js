import ButtonAppBar from "./Components/AppBar";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getUser } from "./Store/auth.js";
import Cookies from "js-cookie";


function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsloading] = useState(true);
  
  async function fetchUser() {
    const token = Cookies.get("token");
    setIsloading(true);

    const res = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  

    if(res.ok) {
      const user = await res.json();
      dispatch(getUser(user));
    }
    setIsloading(false);
  }

  useEffect(() => {
    fetchUser();
  }, []);

  if (isLoading) {
    <p>loading...</p>;
  }

  return (
    <div>
      <ButtonAppBar />
      <Outlet />
    </div>
  );
}

export default App;
