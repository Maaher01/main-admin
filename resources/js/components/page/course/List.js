import { useState } from "react";
import { Button } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import Grid from "@mui/material/Grid";
import Layout from "../../layout/Layout";
import Datatablecomponent from "../../Datatable";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";

const List = () => {
  const [delrow, setDelrow] = useState(0);
  const [searchurl, setSearchurl] = useState("/api/course");
  const columns = [
    {
      name: "Course Title",
      selector: (row) => row._title,
    },
    {
      name: "Course Sub Title",
      selector: (row) => row._subtitle,
      center: true,
    },
    {
      name: "Country",
      selector: (row) => row.countryname,
      center: true,
    },
    {
      name: "Degree",
      selector: (row) => row.degreename,
      center: true,
    },
    {
      name: "University Name",
      selector: (row) => row.universityname,
      center: true,
    },
    {
      name: "Course Sub Title",
      selector: (row) => row._subtitle,
      center: true,
    },
    {
      name: "Living Cost",
      selector: (row) => row._livingcost,
      center: true,
    },
    {
      name: "Tution Fees",
      selector: (row) => row._tutionfees,
      center: true,
    },
    {
      name: "Application Fees",
      selector: (row) => row._applicationfees,
      center: true,
    },
    {
      name: "Program Intake",
      selector: (row) => row._programintake,
      center: true,
    },
    {
      name: "From Date",
      selector: (row) => row._programintakeopendate,
      center: true,
    },
    {
      name: "To Date",
      selector: (row) => row._programintakedeadline,
      center: true,
    },
    {
      name: "Image",
      cell: (row) => <img src={row._document} width={50} alt={"nothing"} />,
      selector: (row) => row.link,
      center: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Link to={`/app/course/edit/${row.id}`} className="btn">
            <i className="material-icons text-warning">
              <CreateIcon sx={{ color: "green" }} />
            </i>
          </Link>
          <Link className="btn">
            <i className="material-icons text-warning">
              <DeleteIcon sx={{ color: "red" }} />
            </i>
          </Link>
        </div>
      ),
      selector: (row) => row.id,
      center: true,
    },
  ];

  const renderDatatable = () => {
    return (
      <Datatablecomponent
        columns={columns}
        url={searchurl}
        delrow={delrow}
      ></Datatablecomponent>
    );
  };
  return (
    <>
      <Layout>
        <Grid container>
          <Grid item xs={1}></Grid>
          <Grid item xs={11}>
            <Link to="/app/course/add" className="btn">
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                sx={{ marginBottom: "30px" }}
              >
                ADD
              </Button>
            </Link>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={10}>
            {renderDatatable()}
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

export default List;
