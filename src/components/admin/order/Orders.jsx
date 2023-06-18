import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { DataGrid } from '@mui/x-data-grid';
import { Button, IconButton, ThemeProvider, createTheme } from '@mui/material';
import { purple } from '@mui/material/colors';
import { FaTrash, FaPenNib } from 'react-icons/fa'

const Orders = () => {

  const theme = createTheme({
    palette: {
      primary: {
        main: purple[500],
      },
      secondary: {
        main: '#f44336',
      },
    },
  });

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 15,
  });

  const [rows, setRows] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const getRowId = (row) => row._id;

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8000/api/orders?page=${paginationModel.page + 1}`).then((res) => {
        console.log(res);
        const products = res.data.data.orders;
        const total = res.data.totalPrice;
        setRows(products);
        setRowCount(total);
        setLoading(false);
       
      });
  }, [paginationModel.page, paginationModel.pageSize]);

  return (

    <ThemeProvider theme={theme}>

      <div style={{
        height: '100%', width: '95%',
        margin: '0 auto', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        borderRadius: '5px', overflowX: 'scroll',
      }}>
        <DataGrid
          rows={rows}
          getRowId={getRowId}
          columns={[

            {
              field: 'firstname', headerName: ' نام کاربر ', flex: 2,
              renderCell: (e) => {
                return (
                  <div>
                    {e.row.user.firstname}
                  </div>
                )
              }
            },
            {
              field: 'totalPrice',
              headerName: ' موجودی ',
              flex: 1,
              renderCell: (e) => {
                return (
                  <div>
                    {e.row.totalPrice}
                  </div>
                )

              },
            },
            {
              field: 'deliveryStatus',
              headerName: ' وضیعت ارسال ',
              flex: 1,
          
            },
            {
              field: 'deliveryDate',
              headerName: ' زمان ارسال',
              flex: 1,
            },

          ]}
          rowCount={rowCount}
          paginationMode="server"
          paginationModel={paginationModel}
          pagination={true}
          loading={loading}
          pageSizeOptions={[10]}
          onPaginationModelChange={setPaginationModel}
        />

      </div>
    </ThemeProvider>
  );
}


export default Orders