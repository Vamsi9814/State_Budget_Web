import axios from "axios";
import useAuth from "./useAuth";
import { useState } from "react";

const useLogout = () => {
  const { setAuth } = useAuth();
  const [mssg,setMssg]=useState("")

  const logout = async (usertype) => {
    setAuth({});
    try {
      console.log("uygvctcrdc");
      const response = await axios.post(`https://localhost:8000/${usertype}/logout`);
      setMssg(response.data);
    } catch (err) {
      console.error(err);
    }
    return mssg;
  };

  return logout;
};

export default useLogout;