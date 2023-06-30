import React, { useEffect, useState } from 'react'
import styles from './ProductCategory.module.scss'
import ViewAllProducts from './../../viewAllProducts/ViewAllProducts';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../../../assets/spinner.jpg'

const ProductCategory = () => {
    const { categoryName } = useParams();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [category, setCategory] = useState([]);
  
    useEffect(() => {
      const dataInfo = {
        method: "get",
        url: `http://localhost:8000/api/categories`,
      };
  
      axios(dataInfo)
        .then((res) => {
          setCategory(res.data.data.categories);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
  
    useEffect(() => {
      const filteredCategory = category.find((data) => data.slugname === categoryName);
      if (filteredCategory) {
        setSelectedCategory(filteredCategory._id);
        console.log("📌", selectedCategory);
      } else {
        console.log(" ⛔ ", filteredCategory);
      }
    }, [category, categoryName]);
  
    return (
      <section className={styles.productCategoryContainer}>
        {selectedCategory !== null ? (
          <ViewAllProducts categoryId={selectedCategory} />
        ) : (
          <img src={Spinner} />
        )}
      </section>
    );
  };
  
  export default ProductCategory;