
import React, {useState, useEffect} from 'react';
import DataTable from 'react-data-table-component';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import axios from 'axios';
export default function Datatablecomponent({columns,url,delrow}) {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const sortIcon = <KeyboardArrowDownIcon />;
  useEffect(() => {
    fetchData(1, perPage);
  }, [perPage,delrow])

  const fetchData = (page, perPage) => {
    axios.get(url+`?page=${page}&limit=${perPage}`).then((response) => {
      console.log();
        setIsLoaded(true);
        setItems(response.data.data.data);
      if(response.data.data){
        setTotalRows(response.data.data.total);
      }else{
        setTotalRows(50);
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }
  
  const handlePageChange = page => {
    fetchData(page, perPage);
  }

  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage);
  }

  const customStyles = {
    headCells: {
        style: {
            fontSize:"16px;",
            fontWeight:"bold",
        },
    },
    cells: {
        style: {
          fontSize:"16px;"
        },
    },
};

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      
        <DataTable
          columns={columns}
          data={items}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handlePerRowsChange}
          customStyles={customStyles}
        />
      
    );
  }
}