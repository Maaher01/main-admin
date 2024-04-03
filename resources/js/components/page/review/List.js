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
  const [searchurl, setSearchurl] = useState("/api/review");
  const columns = [
    {
      name: "Title",
      selector: (row) => row._title,
      center: true,
      width: "250px",
    },
    {
      name: "Sub Title",
      selector: (row) => row._subtitle,
      center: true,
      width: "250px",
    },
    {
      name: "Description",
      selector: (row) => row._description,
      center: true,
      width: "300px",
    },
    {
      name: "Action",
      cell: (row) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Link to={`/app/review/edit/${row.id}`} className="btn">
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
      width: "120px",
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
            <Link to="/app/review/add" className="btn">
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
