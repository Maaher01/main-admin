import { useState, React } from "react";
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
  const [searchurl, setSearchurl] = useState("/api/country");
  const columns = [
    {
      name: "Country Name",
      selector: (row) => row._name,
      center: true,
    },
    {
      name: "Image",
      cell: (row) => <img src={row._image} width={50} alt={"nothing"} />,
      selector: (row) => row.link,
      center: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Link to={`/app/country/edit/${row.id}`} className="btn">
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
      center: true,
      selector: (row) => row.id,
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
            <Link to="/app/country/add" className="btn">
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
