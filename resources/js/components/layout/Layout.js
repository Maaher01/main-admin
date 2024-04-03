import React from "react";
import Grid from "@mui/material/Grid";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children }) => {
  const section = {
    minHeight: "100vh",
    paddingTop: 5,
    backgroundColor: "#ebedef",
  };

  return (
    <Grid container item xs={12}>
      <ToastContainer autoClose={2000} />
      <Grid item xs={2} md={2}></Grid>
      <Grid item xs={10}>
        <Navbar />
      </Grid>
      <Grid item xs={2} md={2}>
        <Sidebar />
      </Grid>
      <Grid item xs={10} md={10}>
        <div style={section}>{children}</div>
      </Grid>
      <Grid item xs={2} md={2}></Grid>
      <Grid item xs={10} md={10}>
        <Footer />
      </Grid>
    </Grid>
  );
};

export default Layout;
