import React, { useState, useEffect } from 'react';
import styles from './AddProduct.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { FaAngleDoubleLeft } from 'react-icons/fa'
import SetW from '../../../assets/SetW.jpg'

const AddProduct = () => {

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);

  const [thumbnail, setThumbnail] = useState('');

  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedSubCategory, setSelectedSubCategory] = useState(0);

  const [selectedImage, setSelectedImage] = useState(null);
  const [data, setData] = useState({ file: null })

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
    let productThumbnail = data.file;

    const formData = new FormData();
    formData.append('category', productCategory);
    formData.append('subcategory', productSubCategory);
    formData.append('price', productPrice);
    formData.append('name', productName);
    formData.append('quantity', productAmount);
    formData.append('description', productDesc);
    formData.append('brand', productBrand);
    formData.append('thumbnail', productThumbnail, productThumbnail.name);

    axios.post('http://localhost:8000/api/products', formData)
      .then(response => {
        toast('اطلاعات با موفقیت ارسال شد');
        e.target.reset();
        setSelectedImage(null) // Reset the form after the request is complete
      })
      .catch(error => {
        console.error(error);
        toast.error('خطا در ارسال اطلاعات!');
      });
  }


  const [previewProduct, setPreviewProduct] = useState({
    productName: '',
    productPrice: null,
    productAmount: null,
    productCategory: '',
    productSubCategory: '',
    productBrand: '',
    productDesc: ''
  });


  const handleChangeCategory = (e) => {

    let categorySelected = e.target.value;
    setPreviewProduct(prevState => ({
      ...prevState,
      productCategory: { categorySelected }
    }))

    console.log(previewProduct.productCategory)

    let categoryId = e.target.selectedOptions[0].id
    axios.get(`http://localhost:8000/api/subcategories?category=${categoryId}`)
      .then((res) => {
        setSubCategories(res.data.data.subcategories)
        console.log(res)
      }).catch((error) => {
        console.log(error)
      });
    setSelectedCategory(categoryId);
  }

  const handleChangeSubCategory = (e) => {

    let subCategorySelected = e.target.value;
    setPreviewProduct(prevState => ({
      ...prevState,
      productSubCategory: { subCategorySelected }
    }))

    console.log(previewProduct.productSubCategory)

    let subCategory = e.target.selectedOptions[0].id
    setSelectedSubCategory(subCategory)
  }

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();
    setData({ file: selectedFile });
    reader.onload = () => { setSelectedImage(reader.result); };
    reader.readAsDataURL(selectedFile);


  };

  useEffect(() => {
    axios.get(`http://localhost:8000/api/categories`)
      .then((res) => {
        setCategories(res.data.data.categories)
      }).
      catch((error) => {
        console.log(error)
      })
  }, [])


  const handlePreview = (e) => {

    const { id, value } = e.target;

    setPreviewProduct(prevState => ({
      ...prevState,
      [id]: value
    }));

    console.log("📌", previewProduct)
  }

  console.log(selectedCategory)
  console.log(previewProduct)

  return (
    < div className={styles.mainContainer}>

      <form onSubmit={(e) => handleValidateData(e)}>
        <div>
          <label>نام کالا : </label>
          <input type='text' id='ProductName' onChange={(e) => { handlePreview(e) }} />
        </div>
        <div>
          <label> قیمت : </label>
          <input type='number' id='ProductPrice' onChange={(e) => { handlePreview(e) }} />
        </div>
        <div>
          <label>موجودی : </label>
          <input type='number' id='ProductAmount' onChange={(e) => { handlePreview(e) }} />
        </div>
        <div className={styles.categories}>
          <div>
            <label> انتخاب دسته بندی : </label>
            <select onChange={(e) => handleChangeCategory(e)}
              id="categorySelector">
              <option value="nothing" id="noCategorySelected" >انتخاب</option>
              {categories.map((data) => (
                <option key={data._id}
                  id={data._id}>{data.name}</option>))}
            </select>
          </div>
          <div>
            <label>انتخاب زیر گروه : </label>
            <select onChange={(e) => { handleChangeSubCategory(e) }}
              id="subCategorySelector">
              <option value="nothing" id="noSubCategorySelected">انتخاب</option>
              {subcategories.map((data) => (
                <option key={data._id}
                  id={data._id}>{data.name}</option>))}
            </select>
          </div>
        </div>
        <div>
          <label>برند : </label>
          <input type='text' id='ProductBrand' onChange={(e) => { handlePreview(e) }} />
        </div>
        <div>
          <label> توضیحات : </label>
          <textarea id='ProducDesc' onChange={(e) => { handlePreview(e) }}></textarea>
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.buttonAddData} type="submit"
            id='ProductDesc' onChange={(e) => { handlePreview(e) }}>اضافه کردن کالا</button>
        </div>
        <div>
          <label> تصویر اصلی :</label>
          <input type="file" onChange={handleImageChange} />
        </div>
      </form>

      <div className={styles.productPreview}>

        {selectedImage ?
          <img className={styles.thumbnail} src={selectedImage} alt="Preview" />
          : <span className={`${styles.loader} ${styles.thumbnail}`}></span>
        }

        <div className={`${styles.previewProductName} ${styles.imageContainer}`}>
          <div className={styles.imageContainerData}>
            {(previewProduct.ProductName) != (null && '') ? `${previewProduct.ProductName}` : "نامی برای کالا وارد نشده"}
          </div>

          <div className={styles.imageGalleryContainer}>

            <div>
              <img src={SetW}/>

            </div>

          </div>
        </div>

        <div className={styles.previewPriceData}>
          <p>
            {(previewProduct.ProductPrice) != (null && '') ? `${previewProduct.ProductPrice} تومان` : " قیمتی وارد نشده"}
          </p>
          <p>
            {(previewProduct.ProductAmount) != (null && '') ? `${previewProduct.ProductAmount} تا از این کالا موجود است` : " تعدای برای محصول وارد نشده"}
          </p>
        </div>

        <div>
          <p className={styles.previewCategory}>
            <span>
              {previewProduct.productCategory.categorySelected || "دسته بندی انتخاب نشده "}
            </span>
            <FaAngleDoubleLeft />
            <span>
              {previewProduct.productSubCategory.subCategorySelected || "زیر گروه انتخاب نشده "}
            </span>
          </p>
        </div>

        <div className={styles.previewProductName}>
          <label>برند : </label>
          {(previewProduct.ProductBrand) != (null && '') ? `${previewProduct.ProductBrand}` : "برندی برای کالا تعیین نشده"}
        </div>

        <div className={styles.previewProductName}>
          <label> توضیحات : </label>
          <textarea className={styles.previewProductName}
            value={(previewProduct.ProducDesc) != (null && '') ? `${previewProduct.ProducDesc}` : "توضیحاتی برای کالا شرح نشده"}>
          </textarea>
        </div>

      </div>

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
    </div >
  )
}
export default AddProduct