import React, { createContext, useEffect, useState } from "react";
import { axios } from "../axiosConfig";
import Loading from "../pages/Loading";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await axios.get("/profile");
        if (res.data.success) {
          setUser(res.data.user);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {loading ? <Loading/> : children}
    </AuthContext.Provider>
  );
};
