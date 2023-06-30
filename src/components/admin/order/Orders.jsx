import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { DataGrid } from '@mui/x-data-grid';
import { ThemeProvider, createTheme, Button } from '@mui/material';
import { purple } from '@mui/material/colors';
import styles from './Orders.modules.scss';
import { FaTrash, FaPenNib, FaClipboardCheck } from 'react-icons/fa'


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
    direction: 'rtl',
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

  const handleFilterOrders = (e) => {

    console.log(e)
    let status = e.target.value

    if (status != "All") {
      axios(`http://localhost:8000/api/orders?deliveryStatus=${status}`).then((res) => {
        console.log(res)

        const deliverdProducts = res.data.data.orders;
        const deliverdTotal = res.data.totalPrice;

        setRows(deliverdProducts);
        setRowCount(deliverdTotal);


      }).catch((err) => { console.log(err) })
    } else {

      axios.get(`http://localhost:8000/api/orders?page=${paginationModel.page + 1}`).then((res) => {
        console.log(res);
        const products = res.data.data.orders;
        const total = res.data.totalPrice;
        setRows(products);
        setRowCount(total);
        setLoading(false);

      }).catch((err) => {
        console.log(err)
      })
    }
  }

  function getProductDetail(e) {
    console.log(e)
  }

  const [showDetail, setShowDetail] = useState(false)
  const [orderDetail, setOrderDetails] = useState(null)

  const handleShowOrder = (e) => {
    console.log(e)
    getProductDetail(e)


    axios(`http://localhost:8000/api/orders/6495499037344f07ea0cf50b`)
      .then((res) => {
        const order = res.data.data.order;
        console.log(order)
        setOrderDetails([order]);
        setShowDetail(!showDetail);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleGoBack() {
    setShowDetail(!showDetail)
  }

  const handleDeliverd = () => {

  }

  
  return (

    <ThemeProvider theme={theme}>


      <div style={{
        height: '100%', width: '95%',
        margin: '0 auto', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        borderRadius: '5px', overflowY: 'hidden',
      }}>

        {
          showDetail &&

          <div style={{
            height: '100%', width: '95%',
            backgroundColor: 'red', overflowY: 'hidden'
          }}>
            <span onClick={handleGoBack}> بازگشت </span>

            {orderDetail.map((res) => (

              <ul key={res._id}>
                <li>
                  نام مشتری
                  {res.user.username}
                </li>
                <li>
                  آدرس
                  {res.user.address}
                </li>
                <li>
                  تلفن
                  {res.user.phoneNumber}
                </li>
                <li>
                  زمان تخویل
                  {res.deliveryDate}
                </li>
                <li>
                  زمان سفارش
                  {res.createdAt}
                </li>

                <li>
                  <button onClick={(res)=>{handleDeliverd(res)}}>
                  تحویل شد
                </button>
              </li>
              </ul>
              


            ))}


      </div>
        }

      <div class="mydict">
        <div>
          <label>
            <input type="radio" name="radio" value={true} onClick={(e) => handleFilterOrders(e)} />

            <span> ارسال شده </span>

          </label>
          <label>
            <input type="radio" name="radio" value={"All"} onClick={(e) => handleFilterOrders(e)} />

            <span> همه</span>

          </label>
          <label>
            <input type="radio" name="radio" value={false} onClick={(e) => handleFilterOrders(e)} />
            <span>ارسال نشده</span>
          </label>

        </div>
      </div>

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
            headerName: ' قیمت ',
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
          {
            field: 'delete-edit',
            headerName: 'تغییر وضعیت ',
            flex: 1,
            renderCell: (params) => (
              <div>
                <Button
                  style={{
                    color: 'red',
                    fontFamily: 'Vazirmatn'
                  }}
                  onClick={() => handleShowOrder(params.id)}>
                  <FaTrash style={{
                    opacity: '.7',
                    marginLeft: '5'
                  }} />
                  حذف
                </Button>

              </div>
            )
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
    </ThemeProvider >
  );
}


export default Orders