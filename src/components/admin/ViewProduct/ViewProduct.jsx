import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { DataGrid } from '@mui/x-data-grid';
import { Button, ThemeProvider, createTheme } from '@mui/material';
import { purple } from '@mui/material/colors';
import { FaTrash, FaPenNib, FaClipboardCheck } from 'react-icons/fa'

// sweet alert
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import EditProduct from './../editProduct/EditProduct';

const ViewProduct = () => {

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
        pageSize: 10,
    });

    const [rows, setRows] = useState([]);
    const [rowCount, setRowCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [renderNewData, setRenderNewData] = useState(false);
    const [edit, setEdit] = useState(null);
    const [modal, setModal] = useState(false);

    const getRowId = (row) => row._id;

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:8000/api/products?page=${paginationModel.page + 1}`).then((res) => {
                const products = res.data.data.products;
                const total = res.data.total;
                setRows(products);
                setRowCount(total);
                setLoading(false);
            });
    }, [paginationModel.page, paginationModel.pageSize, renderNewData]);


    const categories = {
        '64820ce2aabca95eac5fb781': 'ساعت مچی',
        '64820cf9aabca95eac5fb785': 'ساعت مردانه',
        '64820d06aabca95eac5fb789': 'ساعت زنانه',
        '64916d1760da5072b2c63d80': 'ساعت های ست'
    }


    const hadleConfirmDelete = () => {
        Swal.fire({
            title: 'همه ی تغییرات به حالت اولیه برگردد',
            text: "این مرحله قابل بازگشت نمیباشد",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'بله , تغییرات را لغو کن'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'تغییرات لغو شد',
                    'همه چیز به حالت قبلی بازگشت',
                    'success'
                )
            }
        })
    }

    const handleDelete = (id) => {


        Swal.fire({
            title: 'آیا میخواهید محصول را حذف کنید',
            text: "این مرحله قابل بازگشت نمیباشد",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: ' بله '
        }).then((result) => {
            if (result.isConfirmed) {

                const formInfo = {
                    method: 'delete',
                    url: `http://localhost:8000/api/products/${id}`,
                }
                console.log(`Delete product with ID ${id}`);
                axios(formInfo).then((res) => {
                    console.log(res)
                    setRenderNewData(!renderNewData);
                })


                Swal.fire(
                    'تغییرات لغو شد',
                    'همه چیز به حالت قبلی بازگشت',
                    'success'
                )
            }
        })

    };

    const handleEdit = (id) => {
        console.log(id)
        console.log(edit)
        setModal(!modal)
        setEdit(id);
        setRenderNewData(!renderNewData)
        console.log(edit)
    }

    return (
        <ThemeProvider theme={theme}>
            <div style={{
                height: '100%', width: '100%',
                margin: '0 auto', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                borderRadius: '5px', 
            }}>

                {modal && <EditProduct data={edit}></EditProduct>}

                <div class="mydict">
                    <button className='--btn-save'>
                        <FaClipboardCheck style={{
                            paddingTop: '3',
                            margin: '0 2'
                        }} />
                        ذخیره ی تغییرات
                    </button>

                    <button className='--btn-discard'
                        onClick={hadleConfirmDelete}>
                        <FaTrash style={{
                            paddingTop: '3',
                            margin: '0 2'
                        }} />
                        لغو تغییرات

                    </button>
                </div>

                <DataGrid
                    rows={rows}
                    getRowId={getRowId}
                    columns={[
                        {
                            field: 'thumbnail',
                            headerName: 'عکس محصول',
                            width: 100,
                            renderCell: (params) => (
                                <img
                                    src={`http://localhost:8000/images/products/thumbnails/${params.value}`}
                                    alt={params.value}
                                    style={{ width: '100%', borderRadius: '15%', objectFit: 'cover', padding: '15px' }}
                                />
                            ),
                        },
                        { field: 'name', headerName: ' نام محصول ', flex: 2 },
                        {
                            field: 'category',
                            headerName: ' دسته بندی اصلی ',
                            flex: 1,
                            renderCell: (params) => (
                                <p>{categories[params.value]}</p>
                            )
                        },
                        {
                            field: 'price',
                            headerName: ' قیمت ',
                            flex: 1,

                        },
                        {
                            field: 'quantity',
                            headerName: ' موجودی ',
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
                                        onClick={() => handleDelete(params.id)}>
                                        <FaTrash style={{
                                            opacity: '.7',
                                            marginLeft: '5'
                                        }} />
                                        حذف
                                    </Button>

                                    <Button
                                        style={{
                                            color: 'darkblue',
                                            fontFamily: 'Vazirmatn'
                                        }}
                                        onClick={() => handleEdit(params)}>
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
        </ThemeProvider>
    );
}


export default ViewProduct