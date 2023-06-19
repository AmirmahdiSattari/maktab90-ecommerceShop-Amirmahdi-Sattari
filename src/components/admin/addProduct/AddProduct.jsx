import React from 'react';
import styles from './AddProduct.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

const AddProduct = () => {

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const [thumbnail, setThumbnail] = useState('');

  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedSubCategory, setSelectedSubCategory] = useState(0);


  const handleValidateData = (e) => {

    e.preventDefault();

    //define user input data to variables
    let productName = e.target[0].value;
    let productPrice = e.target[1].value;
    let productAmount = e.target[2].value;
    let productCategory = selectedCategory;
    let productSubCategory = selectedSubCategory;
    let productBrand = e.target[5].value;
    let productDesc = e.target[6].value;

    console.log(productCategory," 🟢 ", productSubCategory)

    // Define regex patterns for each input field
    const nameRegex = /^[a-zA-Z0-9\s_-]{4,50}$/;
    const priceRegex = /^([2-9][5-9]\d{3,}|[3-9]\d{4,}|[1-9]\d{5,})$/;
    const amountRegex = /^[1-9]\d*$/;
    const brandRegex = /^[a-zA-Z0-9\s_-]{4,50}$/;
    const descRegex = /^[a-zA-Z0-9\s_-]{10,250}$/;

    // Check if each input field matches its corresponding regex pattern
    if (!nameRegex.test(productName)) {
      toast(' نام کالا معتبر نیست');
      return;
    }

    if (!priceRegex.test(productPrice) || parseFloat(productPrice) <= 0) {
      toast('قیمت محصول باید بیشتر از 250000 تومان باشد');
      return;
    }

    if (!amountRegex.test(productAmount)) {
      toast('موجودی محصول معتبر نیست');
      return;
    }

    // if (productCategory) {
    //   toast('دسته بندی محصول معتبر نیست');
    //   return;
    // }

    // if (productSubCategory) {
    //   toast('زیر گروه محصول معتبر نیست');
    //   return;
    // }

    if (!brandRegex.test(productBrand)) {
      toast('برند محصول معتبر نیست');
      return;
    }

    if (!descRegex.test(productDesc)) {
      toast('توضیحات محصول معتبر نیست');
      return;
    }

    // If all input fields are valid, submit the form
    const formInfo = {
      method: 'post',
      url: 'http://localhost:8000/api/products',
      data: {
        'category': productCategory,
        'subcategory': productSubCategory,
        'price': productPrice,
        'name': productName,
        'quantity': productAmount,
        'description': productDesc,
        'brand': productBrand,
      },
    }

    console.log(formInfo.data)

    axios(formInfo)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })

    toast('اطلاعات با موفقیت ارسال شد');

    e.target.reset();
  }

  const handleClear = (e) => {
    e.target.reset();
  }


  const handleChangeCategory = (e) => {

    let categoryId = e.target.selectedOptions[0].id
    console.log(" cate ", categoryId)
    setSelectedCategory(categoryId);

    axios.get(`http://localhost:8000/api/subcategories?category=${categoryId}`)
      .then((res) => {

        setSubCategories(res.data.data.subcategories)

      }).catch((error) => {
        console.log(error)
      })
  }

  const handleChangeSubCategory = (e) => {

    let subCategory = e.target.selectedOptions[0].id
    console.log(" subcate " , subCategory)
    setSelectedSubCategory(subCategory)

  }

  useEffect(() => {
    axios.get(`http://localhost:8000/api/categories`)
      .then((res) => {
        setCategories(res.data.data.categories)
      }).
      catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    < div >

      <form onSubmit={(e) => handleValidateData(e)}>

        <div>
          <label>
            نام کالا :
          </label>
          <input type='text' />
        </div>

        <div>
          <label>
            قیمت :
          </label>
          <input type='number' />
        </div>

        <div>
          <label>
            موجودی :
          </label>
          <input type='number' />
        </div>

        <div className={styles.categories}>
          <div>
            <label>
              دسته بندی :
            </label>
            <select onChange={(e) => handleChangeCategory(e)}
              id="categorySelector">
              {categories.map((data) => (

                <option key={data._id}
                  id={data._id}>{data.name}</option>

              ))}
            </select>
          </div>

          <div>
            <label>
              زیر گروه :
            </label>
            <select onChange={(e) => { handleChangeSubCategory(e) }}>
              {subcategories.map((data) => (

                <option key={data._id}
                  id={data._id}>{data.name}</option>

              ))}

            </select>
          </div>
        </div>

        <div>
          <label>
            برند :
          </label>
          <input type='text' />
        </div>

        <div>
          <label>
            توضیحات :
          </label>
          <textarea></textarea>
        </div>

        <div className={styles.buttonContainer}>
          <button className={styles.buttonAddData} type="submit">
            اضافه کردن کالا
          </button>

          <button className={styles.buttonClearData} type="button"
            onClick={(e) => handleClear(e)}>
            پاک کردن اطلاعات
          </button>
        </div>

      </form>

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
    </div >
  )
}

export default AddProduct