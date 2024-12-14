import React,{useState} from 'react'
import { API_URL } from '../../data/apiPath'

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [price,setPrice] =  useState("");
  const [category,setCategory] = useState([]);
  const [bestseller, setBestSeller] = useState(false);
  const [image,setImage] =useState(null);
  const [description,setDescription]= useState("");
  const [file,setFile]=useState('')

  const handleCategoryChange =(event)=>{
    const value = event.target.value;

    const token = localStorage.getItem('token');
    console.log(token, "tokenData"); // Logs 'your-token-here'
    
    if(category.includes(value)){
      setCategory(category.filter((item)=> item !== value));

    }else{
      setCategory([...category, value])
    }
  }

  const handleBestSeller =(event)=>{
    const value = event.target.value === 'true'
    setBestSeller(value)

  }
  const handleImageUpload =(event)=>{
    const selectedImage =  event.target.files[0];
    setFile(selectedImage)
   
  }
  console.log(file)

 const handleAddProduct  = async(e)=>{
  e.preventDefault()
  try {
    const token = localStorage.getItem('token');
    const firmId = localStorage.getItem('firmId')


    if(!token || !firmId){
      console.log("user not authenticated")
    }
    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('price',price);
    formData.append('description',description);
    formData.append('image',file.name)

  category.forEach((value) => {
      formData.append('category', value)
      
    });
    console.log('firmId', firmId)

    const response = await fetch(`${API_URL}/product/add-product/${firmId}`,{
      method:'POST',
      body:formData
    })
    const data = await response.json()

    if(response.ok){
      alert('product added successfully')
    }
    
    
    
  } catch (error) {
    alert('Failed to add product')
    
  }

 }

  return (

    <div className="firmSection">
    <form  className="tableForm" onSubmit={handleAddProduct}>
        <h3> Add Product</h3>
        <label>Product Name</label>
        <input type="text" value={productName} onChange={(e)=>setProductName(e.target.value)} />
        <label>Price</label>
        <input type="text" value={price} onChange={(e)=>setPrice(e.target.value)}/>
        
         <div className="checkInp">
              <label>Category</label>
              <div className="inputsContainer">
              <div className="checkboxContainer">
                <label>Veg</label>
                <input type="checkbox" value="veg"  cheaked = {category.includes('veg')}  onChange={handleCategoryChange}/>
              </div>
              <div className="checkboxContainer">
                <label>Non-Veg</label>
                <input type="checkbox" value="non-veg"  cheaked = {category.includes('non-veg')}   onChange={handleCategoryChange}/>
              </div>
              </div>
            </div>
        
        <div className="checkInp">
              <label>Best Seller</label>
              <div className="inputsContainer">
              <div className="checkboxContainer">
                <label>Yes</label>
                <input type="radio" value="true" checked ={bestseller=== true} onChange={handleBestSeller}/>
              </div>
              <div className="checkboxContainer">
                <label>No</label>
                <input type="radio" value="false" checked ={bestseller=== false} onChange={handleBestSeller}/>
              </div>
              </div>
            </div>
        <label>Description</label>
        <input type="text"  onChange={(e)=>setDescription(e.target.value)}/>
        <label>Firm Image</label>
        <input type="file" onChange={handleImageUpload} />
        <br/>
        <div className="btnSubmit">
        <button type='submit'>Submit</button>
     </div>
    </form>
   
</div>
  )
}

export default AddProduct