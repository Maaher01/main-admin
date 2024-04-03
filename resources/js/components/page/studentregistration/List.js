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
    const [searchurl,setSearchurl]= useState("/api/studentregistration"); 
    const columns = [
        {
          name: 'Action',
          cell:row =><div>
                          <Link to={`/app/studentregistration/edit/${row.id}`} className="btn">
                            <i className="material-icons text-warning">edit</i>
                          </Link>
                      </div>,
          selector: row => row.id,
          width: '120px'
        },
        {
          name: 'Name',
          selector: row => row._name,
          width: '150px'
        },
        {
          name: 'Date of Birth',
          selector: row => row._dob,
          width: '150px'
        },
        {
          name: 'Mobile',
          selector: row => row._mobile,
          width: '150px'
        },
        {
          name: 'Email',
          selector: row => row._email,
          width: '150px'
        },
        {
          name: 'Passport',
          selector: row => row._passport == 1 ? 'YES' : 'NO',
          width: '150px'
        },
        {
          name: 'Country',
          selector: row => row.countryname,
          width: '150px'
        },
        {
          name: 'IELTS',
          selector: row => row._ielts == 1 ? 'YES' : 'NO',
          width: '150px'
        },
        {
          name: 'Qualification',
          selector: row => row._qualification,
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
                    <Link to='/app/studentregistration/add' className="btn">
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