import React, { useState, useEffect } from 'react';
import styles from './EditProduct.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import { FaBackspace } from 'react-icons/fa';
import axios from 'axios';

import Spinner from '../../../assets/spinner.jpg'

const EditProduct = (e) => {

  console.log(e.data.id)
  console.log(e.data.row.thumbnail)

  const [show, setShow] = useState(true);
  const [productId, setProductId] = useState(0);

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedSubCategory, setSelectedSubCategory] = useState(0);

  const [renderCategory, setRenderCategory] = useState(0);

  const [data, setData] = useState({
    brand: '',
    category: null,
    description: '',
    name: '',
    price: 0,
    quantity: 0,
    subcategory: 0,
    thumbnail: null,
  });

  const handleCloseModal = () => {
    setShow(!show);
  }

  const handleChangeCategory = (e) => {

    console.log("clickes")

    let categoryId = e.target.selectedOptions[0].id
    axios.get(`http://localhost:8000/api/subcategories?category=${categoryId}`)
      .then((res) => {
        setSubCategories(res.data.data.subcategories)
      }).catch((error) => {
        console.log(error)
      });
    setSelectedCategory(categoryId);
  }

  const handleChangeSubCategory = (e) => {
    let subCategory = e.target.selectedOptions[0].id
    setSelectedSubCategory(subCategory)
    console.log("Sub c is ", selectedSubCategory);
  }

  const handleValidateEditData = (e) => {

    e.preventDefault();
    console.log("started")
    console.log(e)

    let productName = e.target[0].value;
    let productPrice = e.target[1].value;
    let productAmount = e.target[2].value;
    let productCategory = selectedCategory;
    let productSubCategory = selectedSubCategory;
    let productBrand = e.target[5].value;
    let productDesc = e.target[6].value;
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
    if (productCategory == "noCategorySelected") {
      toast('دسته بندی محصول معتبر نیست');
      return;
    }
    if (productSubCategory == "noSubCategorySelected") {
      toast('زیر گروه محصول معتبر نیست');
      return;
    }
    if (!brandRegex.test(productBrand)) {
      toast('برند محصول معتبر نیست');
      return;
    }
    if (!descRegex.test(productDesc)) {
      toast('توضیحات محصول معتبر نیست');
      return;
    }

    // If all input fields are valid, submit the form

    const formData = new FormData();
    formData.append('category', productCategory);
    formData.append('subcategory', productSubCategory);
    formData.append('price', productPrice);
    formData.append('name', productName);
    formData.append('quantity', productAmount);
    formData.append('description', productDesc);
    formData.append('brand', productBrand);

    console.log(formData);

    axios.patch(`http://localhost:8000/api/products/${productId}`, formData)
      .then(response => {
        toast('اطلاعات با موفقیت ارسال شد');
        e.target.reset();
        // Reset the form after the request is complete
      })
      .catch(error => {
        console.error(error);
        toast.error('خطا در ارسال اطلاعات!');
      });
  }


  useEffect(() => {
    axios.get(`http://localhost:8000/api/categories`)
      .then((res) => {
        setCategories(res.data.data.categories)
        setProductId(e.data.id)

      }).
      catch((error) => {
        console.log(error)
      })
  }, [])

  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    setData({
      brand: e.data.row.brand,
      category: e.data.row.category,
      description: e.data.row.description,
      name: e.data.row.name,
      price: e.data.row.price,
      quantity: e.data.row.quantity,
      subcategory: e.data.row.subcategory,
      thumbnail: e.data.row.thumbnail
    });

    setQuantity(data.quantity);
    setPrice(data.price);

    if (e.data.row.category) {
      console.log("run")
      console.log(e.data.row.category)
    } else {
      console.log("no run")
    }
  }, [])

  if (renderCategory == 0) {

    let categoryId = e.data.row.category
    axios.get(`http://localhost:8000/api/subcategories?category=${categoryId}`)
      .then((res) => {
        setSubCategories(res.data.data.subcategories)
      }).catch((error) => {
        console.log(error)
      });
    setSelectedCategory(categoryId);
    setRenderCategory(1)
  }

  function handlePriceChange(e) {
    setPrice(e.target.value);
  }

  function handleQuantityChange(e) {
    setQuantity(e.target.value);
  }

  return (
    <>
      {show &&

        <main>

          <div>

            <div className={styles.backward}>
              <FaBackspace onClick={handleCloseModal} />
            </div>

            <form onSubmit={(e) => handleValidateEditData(e)}>
             
                <div className={styles.prodcutEditThumbnailContainer}>
                  <img src={`http://localhost:8000/images/products/thumbnails/${data.thumbnail}`} alt="ساعت " />
                </div>

              <div>
                <label>نام کالا : </label>
                <input type='text' defaultValue={data.name} />
              </div>

              <div>
                <label> قیمت : </label>
                <input type='number' Value={data.price} onChange={handlePriceChange} />
              </div>

              <div>
                <label>موجودی : </label>
                <input type='number' Value={data.quantity} onChange={handleQuantityChange} />
              </div>


              <div className={styles.categories}>
                <div>
                  <label> انتخاب دسته بندی : </label>
                  <select onChange={(e) => handleChangeCategory(e)}
                    id="categorySelector" defaultValue={renderCategory} >
                    <option value="nothing" id="noCategorySelected" disabled>انتخاب</option>
                    {categories.map((data) => (
                      <option key={data._id} value={data._id}
                        id={data._id}
                        selected={data._id === e.data.row.category}
                      >{data.name}</option>))}
                  </select>
                </div>
                <div>
                  <label>انتخاب زیر گروه : </label>
                  <select onChange={(e) => { handleChangeSubCategory(e) }}
                    id="subCategorySelector">
                    <option value="nothing" id="noSubCategorySelected" disabled>انتخاب</option>
                    {subcategories.map((data) => (
                      <option key={data._id}
                        id={data._id}
                        selected={data._id === e.data.row.subcategory}
                      >{data.name}</option>))}
                  </select>
                </div>
              </div>

              <div>
                <label>برند : </label>
                <input type='text' defaultValue={data.brand} />
              </div>

              <div>
                <label> توضیحات : </label>
                <textarea defaultValue={data.description}></textarea>
              </div>

              <div className={styles.buttonContainer}>
                <button className={styles.buttonAddData} type="submit">اضافه کردن کالا</button>
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
              theme="light" />


          </div>



        </main >
      }

    </>
  )
}

export default EditProduct