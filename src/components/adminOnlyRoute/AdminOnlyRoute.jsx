import React from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';

export const AdminOnlyRoute = (e) => {

  const notifySuccess = () => toast("Login successfull");
  const notifyError = () => toast("can not find user");
  e.preventDefault();
  console.log(e)
  //get user data from Inputs
  let userName = e.target[0].value;
  let password = e.target[1].value;

  const formInfo = {
    method: 'post',
    url: 'http://localhost:8000/api/auth/login',
    data: {
      "username": userName,
      "password": password
    },
  }
  axios(formInfo).then((res) => {
    if (res.data.status == 'success') {
      notifySuccess();
      const now = new Date();
      const expireDate = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);

      document.cookie = `admin=true; expires=${expireDate.toUTCString()}; path=/ `;
      setInterval(() => {
        window.location.replace('/admin/admin/home');
      }, 3000);


    }
    else {
      notifyError();
    }
  })
  {

    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  }
}
