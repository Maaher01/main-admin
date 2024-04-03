import { useState } from "react";
import { Button } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import Grid from "@mui/material/Grid";
import Layout from "../../layout/Layout";
import Datatablecomponent from "../../Datatable";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

function List() {
  const [delrow, setDelrow] = useState(0);
  const [searchurl, setSearchurl] = useState("/api/faq");
  const columns = [
    {
      name: "Action",
      cell: (row) => (
        <div>
          <Link to={`/app/faq/edit/${row.id}`} className="btn">
            <i className="material-icons text-warning">edit</i>
          </Link>
        </div>
      ),
      selector: (row) => row.id,
      width: "120px",
    },
    {
      name: "Question",
      selector: (row) => row._question,
      width: "150px",
    },
    {
      name: "Answer",
      selector: (row) => row._answer,
      width: "150px",
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
            <Link to="/app/faq/add" className="btn">
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
}

export default List;
