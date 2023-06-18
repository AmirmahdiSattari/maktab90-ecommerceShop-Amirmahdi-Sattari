import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { DataGrid } from '@mui/x-data-grid';
import { Button, IconButton, ThemeProvider, createTheme } from '@mui/material';
import { purple } from '@mui/material/colors';
import { FaTrash, FaPenNib } from 'react-icons/fa'

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

    const getRowId = (row) => row._id;

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:8000/api/products?page=${paginationModel.page + 1}`).then((res) => {
                console.log(res);
                const products = res.data.data.products;
                const total = res.data.total;
                console.log(products);

                setRows(products);
                setRowCount(total);
                setLoading(false);
            });
    }, [paginationModel.page, paginationModel.pageSize]);

    const categories = {
        '64820ce2aabca95eac5fb781': 'ساعت مچی',
    }
    const subCategories = {
        '64820eeaaabca95eac5fb79c': ' بند استیل ',
        '64820edaaabca95eac5fb798': ' بند چرم ',
        '64820e8eaabca95eac5fb790': ' تک موتوره ',
    }

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
                            field: 'subcategory',
                            headerName: ' دسته بندی فرعی ',
                            flex: 1,
                            renderCell: (params) => (
                                <p>{subCategories[params.value]}</p>
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
                            renderCell: () => (
                                <div>
                                    <Button
                                        style={{
                                            color: 'red',
                                            fontFamily: 'Vazirmatn'
                                        }}>
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
                                        }}>
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