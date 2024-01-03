"use client";

import axios from "axios";
import { useEffect } from "react";

const api = axios.create({
  baseURL: "http://localhost:3000/api"
})

const AuthOnly = () => {
  useEffect(() => {
    const getData = () => api.post("/mf/tokenRefresh")
      .then((e) => console.log("success: ", e))
      .catch((e) => console.log("error: ", e));

    getData();
  }, []);

  return (
    <div>
      <h1>AuthOnly </h1>
    </div>
  )
}

export default AuthOnly
