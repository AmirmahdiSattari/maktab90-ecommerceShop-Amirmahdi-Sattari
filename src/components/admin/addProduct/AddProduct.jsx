import React from 'react';
import styles from './AddProduct.module.scss';



const AddProduct = () => {
  return (
    <div>

      <form>

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
            <select>
              <option value="option1">
                option 1
              </option>
              <option value="option2">
                option 2
              </option>
            </select>
          </div>
          <div>
            <label>
              زیر گروه :
            </label>
            <select>
              <option value="option1">
                option 1
              </option>
              <option value="option2">
                option 2
              </option>
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

        <div>
          <label>
            تصویر اصلی :
          </label>
          <input type='file' />
        </div>

        <div className={styles.buttonContainer}>

          <button className={styles.buttonAddData} role="button">
          اضافه کردن کالا
          </button>
          
          <button className={styles.buttonClearData} role="button">
          پاک کردن اطلاعات
          </button>

        </div>
    
      </form>


      
   
  


    </div>
  )
}

export default AddProduct