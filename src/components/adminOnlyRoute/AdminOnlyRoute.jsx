import React from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import Login from './../../pages/auth/Login';

export const AdminOnlyRoute = (e) => {

  const clearInputs = () => {

    const inputs = document.querySelectorAll('input[type="text"], input[type="password"]');
    inputs.forEach(input => {
      input.value = '';
    });
   
    console.log("🟢clear input runs successfully")
  }

  const notifySuccess = () => toast("Login successfull");
  const notifyError = () => toast("can not find user");

  e.preventDefault();

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

  console.log("before axios")
  axios(formInfo).then((res) => {

    if (res.data.status == 'success') {

      notifySuccess();

      const now = new Date();
      const expireDate = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);

      document.cookie = `admin=true; expires=${expireDate.toUTCString()}; path=/ `;

      console.log("Admin Access")

      setInterval(() => {
        window.location.replace('/admin/admin/home');
      }, 2000);

    }
    else {

      console.log("acess denied")

    }
  }).catch((err) => {

    if (err.response.data.status == "fail") {
      console.log("🔴User Not found")
      notifyError();
      clearInputs();
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
