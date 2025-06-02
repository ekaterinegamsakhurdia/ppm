import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./ProductForm.css";

const ProductForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
    category: 'Transportation',
  });

  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const id = Date.now(); // temporary ID
    onAdd({ ...formData, id });
    navigate(`/category/${formData.category.toLowerCase()}`);
  };

  const [image, setImage] = useState(null);
const [preview, setPreview] = useState(null);

// handle file input
const handleImageChange = (e) => {
  const file = e.target.files[0];
  setImage(file);
  setPreview(URL.createObjectURL(file));
};


  return (
<div className='card'>
  <h1>List your product</h1>
    <form onSubmit={handleSubmit}>
      <div class="form">
      <input name="name" class="namebox" placeholder="Product Name" onChange={handleChange} />
      <input name="price" class="pricebox" placeholder="Price in georgian Lari" onChange={handleChange} />
      <textarea name="description" className='descriptionbox' placeholder="Short Description of your product" onChange={handleChange} />

      <select name="category" className='category' onChange={handleChange}>
        <option>Transportation</option>
        <option>Home Appliances</option>
        <option>Other</option>
      </select>
      </div>
      
<label className='picture'>
  Upload Image of your product:
  <input type="file" accept="image/*" onChange={handleImageChange} />
</label>
{preview && (
  <img src={preview} alt="Preview" style={{ width: '100%', marginTop: '10px' }} />
)}
    


      
      <button className='submitbutton' type="submit">Add Product</button>
    
    </form>


    </div>
  );
};

export default ProductForm;
