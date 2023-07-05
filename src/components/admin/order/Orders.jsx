import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { ThemeProvider, createTheme, Button } from '@mui/material';
import { purple } from '@mui/material/colors';
import styles from './Orders.modules.scss';
import { FaPenNib } from 'react-icons/fa'
import ProductDetails from './../../product/productDetails/ProductDetails';

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
  const [showDetail, setShowDetail] = useState(false)
  const [orderDetail, setOrderDetails] = useState(null)

  const [currentDate, setCurrentDate] = useState(new Date());
  const [renderComponent, setRenderComponent] = useState(false);

  const getRowId = (row) => row._id;

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8000/api/orders?page=${paginationModel.page + 1}`).then((res) => {
        const products = res.data.data.orders;
        const total = res.data.totalPrice;
        setRows(products);
        setRowCount(total);
        setLoading(false);

      });
  }, [paginationModel.page, paginationModel.pageSize, renderComponent]);

  const handleFilterOrders = (e) => {

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

        console.log("🟢", rows)
      }).catch((err) => {
        console.log(err)
      })
    }
  }

  function getProductDetail(e) {
    console.log(e)
  }


  const [allOrderProducts, setAllOrderProducts] = useState([]);
  const handleShowOrder = (e) => {
    axios(`http://localhost:8000/api/orders/${e}`)
      .then((res) => {
        const order = res.data.data.order;
        setOrderDetails([order]);

        order.products.forEach((product) => {
          axios(`http://localhost:8000/api/products/${product.product._id}`)
            .then((res) => {
              const productDetail = res.data.data.product;
              setAllOrderProducts((prevProducts) => [
                ...prevProducts,
                productDetail,
              ]);
            })
            .catch((err) => {
              console.log(err);
            });
        });

        setShowDetail(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(allOrderProducts);

  function handleGoBack() {
    setShowDetail(!showDetail)
    setOrderDetails(null)
    setAllOrderProducts([])

  }
  const [readProduct, setReadProduct] = useState(null)

  const handleDeliverd = (res) => {

    console.log("🟢", res.id)
    console.log("🟠", orderDetail[0].products)

    let newMap = orderDetail[0].products;

    newMap.map((res) => {
      console.log(res.product._id)
      axios(`http://localhost:8000/api/products/${res.product._id}`).then((res) => {
        setReadProduct(prevState => ({
          ...prevState,
          res
        }))
        console.log("🟠", readProduct)
      }).catch((err) => {
        console.log(err)
      })
    })

    console.log("🔵", readProduct)

    axios.patch(`http://localhost:8000/api/orders/${res.target.id}`, {
      deliveryStatus: true,
      deliveryDate: currentDate
    })
      .then((res) => {
        setShowDetail(!showDetail)
        setRenderComponent(!renderComponent)
      }).catch((err) => {
        console.log(err)
      })
  }
  console.log("🔵", orderDetail)
  return (

    <ThemeProvider theme={theme}>

      <div style={{
        height: '100%', width: '100%',
        margin: '0 auto', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        borderRadius: '5px', overflowY: 'hidden',
      }}>

        {
          showDetail &&
          <div style={{
            height: '100%', width: '95%', overflowY: 'hidden'
          }}>
            <div onClick={handleGoBack}
              style={{
                height: '2%',
                width: '10%',
                display: 'inline-block',
                cursor: 'pointer',
                margin: '1rem',
                color: 'red'
              }}> بازگشت </div>

            {orderDetail.map((res) => (

              <div style={{
                width: '100%',
                height: '70%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                fontSize: '1.5rem',
                padding: '1rem',
              }}>
                <ul key={res._id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',

                  }}>
                  <li style={{
                    display: 'flex',
                    width: '60%',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.214)',
                    padding: '5px 8px',
                  }}>
                    <span style={{ color: 'gray', }}>
                      نام مشتری :
                    </span>
                    <span>
                      {res.user.username}
                    </span>
                  </li>
                  <li
                    style={{
                      display: 'flex',
                      width: '60%',
                      justifyContent: 'space-between',
                      borderBottom: '1px solid rgba(0, 0, 0, 0.214)',
                      padding: '5px 8px',
                    }}>
                    <span style={{ color: 'gray', }}>
                      آدرس : </span>
                    {res.user.address}
                  </li>
                  <li
                    style={{
                      display: 'flex',
                      width: '60%',
                      justifyContent: 'space-between',
                      borderBottom: '1px solid rgba(0, 0, 0, 0.214)',
                      padding: '5px 8px',
                    }}>
                    <span style={{ color: 'gray', }}>
                      تلفن : </span>

                    {res.user.phoneNumber}
                  </li>
                  <li
                    style={{
                      display: 'flex',
                      width: '60%',
                      justifyContent: 'space-between',
                      borderBottom: '1px solid rgba(0, 0, 0, 0.214)',
                      padding: '5px 8px',
                    }}>
                    <span style={{ color: 'gray', }}>
                      زمان تخویل :</span>
                    {new Date(res.deliveryDate).toLocaleDateString('fa-IR')}
                  </li>
                  <li
                    style={{
                      display: 'flex',
                      width: '60%',
                      justifyContent: 'space-between',
                      borderBottom: '1px solid rgba(0, 0, 0, 0.214)',
                      padding: '5px 8px',
                    }}>
                    <span style={{ color: 'gray', }}>
                      زمان سفارش :</span>
                    {new Date(res.createdAt).toLocaleDateString('fa-IR')}
                  </li>
                </ul>

                <label>-- مشخصات سفارش ها --</label>
                <table style={{
                  boxShadow: ' rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset',
                  width: '70%',
                  borderRadius: '8px',
                  height: '50%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'start',
                  paddingTop: '3rem',
                }}>
                  <thead style={{
                    width: '90%',
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.214)',
                    margin: '10px 0',
                  }}>
                    <tr style={{
                      width: '90%',
                      display: 'flex',
                      justifyContent: 'space-evenly',
                    }}>
                      <th style={{
                        width: '60%',

                      }}>
                        نام
                      </th>
                      <th style={{
                        width: '25%',
                      }}>
                        قیمت
                      </th>
                      <th style={{
                        width: '15%',
                      }}>
                        تعداد
                      </th>
                    </tr>
                  </thead>
                  <tbody style={{
                    width: '90%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                  }}>

                    {allOrderProducts &&

                      allOrderProducts.map((data, index) => (

                        <tr thead style={{
                          width: '90%',
                          display: 'flex',
                          justifyContent: 'space-evenly',
                          marginBottom: '1rem',
                          boxShadow: 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
                        }}>

                          <td
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              width: '60%',
                              borderRight: '1px solid  rgba(0, 0, 0, 0.214)',
                              borderLeft: '1px solid  rgba(0, 0, 0, 0.214)',
                            }}>
                            {data.name}
                          </td>
                          <td style={{
                            display: 'flex',
                            justifyContent: 'center',
                            width: '25%',
                            borderLeft: '1px solid  rgba(0, 0, 0, 0.214)',
                          }}>
                            {data.price}
                          </td>
                          <td style={{
                            display: 'flex',
                            justifyContent: 'center',
                            width: '15%',
                            borderLeft: '1px solid  rgba(0, 0, 0, 0.214)',
                          }}>
                            {res.products[index].count}
                          </td>
                        </tr>
                      ))}

                  </tbody>
                </table>

                <button id={res._id} onClick={(e) => { handleDeliverd(e) }}
                  style={{
                    boxShadow: 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
                    padding: '.7rem 2rem',
                    border: 'none',
                    borderRadius: '5%',
                    cursor: 'pointer'
                  }}
                >
                  تحویل شد
                </button>
              </div>

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
              valueFormatter: (deliveryStatus) => {
                if (deliveryStatus.value == true) {
                  return 'ارسال شده'
                } else {
                  return 'ارسال نشده'
                }
              }
            },
            {
              field: 'deliveryDate',
              headerName: ' زمان ارسال',
              flex: 1,
              valueFormatter: (deliveryDate) => {
                return new Date(deliveryDate.value).toLocaleDateString('fa-IR')
              }
            },
            {
              field: 'delete-edit',
              headerName: 'تغییر وضعیت ',
              flex: 1,
              renderCell: (params) => (
                <div>
                  <Button
                    style={{
                      color: 'purple',
                      fontFamily: 'Vazirmatn'
                    }}
                    onClick={() => handleShowOrder(params.id)}>
                    <FaPenNib style={{
                      opacity: '.7',
                      marginLeft: '5'
                    }} />
                    ویرایش
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