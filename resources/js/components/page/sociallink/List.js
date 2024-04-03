import { useState,useEffect,React } from "react";

import {
    Box, 
    Button,
    Container,
    TextField,
    CssBaseline,
    Typography
} from "@mui/material";

import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Layout from "../../layout/Layout";
import BackupIcon from '@mui/icons-material/Backup';
import { spacing } from '@mui/system';
import Datatablecomponent from '../../Datatable';
import Search from '../../search';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

function List() {

    const [delrow, setDelrow] = useState(0);
    const [searchurl,setSearchurl]= useState("/api/sociallink"); 
    const columns = [
        {
          name: 'Action',
          cell:row =><div>
                          <Link to={`/app/sociallink/edit/${row.id}`} className="btn">
                            <i className="material-icons text-warning">edit</i>
                          </Link>
                      </div>,
          selector: row => row.id,
          width: '120px'
        },
        {
          name: 'Title',
          selector: row => row._title,
          width: '150px'
        },
        {
          name: 'URL',
          selector: row => row._url,
          width: '150px'
        }
    ];


const renderDatatable = () => {
  return (
        <Datatablecomponent columns = {columns} url={searchurl} delrow = {delrow} ></Datatablecomponent>
      )
  }
    return (
        <>
            <Layout>
                <Grid container>
                 
                 <Grid item xs={1}></Grid>
                    <Grid item xs={11}>
                    <Link to='/app/sociallink/add' className="btn">
                       <Button variant="outlined" startIcon={<AddIcon />}>
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
    )
}

export default List