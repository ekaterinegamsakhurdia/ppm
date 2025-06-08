import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductForm.css";
import axios from "axios";
import { useUser } from "../context/UserProvider";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '../../firebase'

const ProductForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    category: "Transportation",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const { id, setId } = useUser();

  async function addPost() {
    uploadImageToFirebase(image).then((imageUrl) => { // TODO: Add image url to axios call
      console.log("UPLOADED IMAGE URL:", imageUrl)
      axios
        .post("http://localhost:3000/posts", { ...formData, email: id, image_url: imageUrl })
        .then((data) => setErrorMessage("Success! Your listing has been published."))
        .catch((err) => {console.log(err);setErrorMessage(err.response.data.error)});
        
    }).catch(err => {
      setErrorMessage("Error uploading image to storage.")
    })

    
  }

  // const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // const id = Date.now(); // temporary ID
    // onAdd({ ...formData, id });
    // navigate(`/category/${formData.category.toLowerCase()}`);
    addPost();
  };

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // handle file input
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const uploadImageToFirebase = async (file) => {
    console.log(file)
    if (!file) return null

    const imageRef = ref(storage, `kiurent/${Date.now()}_${file.name}`)
    await uploadBytes(imageRef, file)

    const url = await getDownloadURL(imageRef)
    return url
  }

  return (
    <div className="newproductformpage">
      <form className="card" onSubmit={handleSubmit} noValidate>
        <div className="left">
          <div className="form">
            <h1 class="list-text">List your product</h1>
              <input
                name="name"
                class="namebox"
                placeholder="Product Name"
                onChange={handleChange}
              />
              <input
                name="price"
                class="pricebox"
                placeholder="Price for an hour in georgian Lari"
                onChange={handleChange}
                type="number"
                min={0}
              />
              <input
                name="description"
                className="descriptionbox"
                placeholder="Short Description of your product"
                onChange={handleChange}
              />

              <select name="category" className="category" onChange={handleChange}>
                <option>Transportation</option>
                <option>Home Appliances</option>
                <option>Other</option>
              </select>
          </div>

          <button className="submitbutton" type="submit">
          Add Product
          </button>
          <p>{errorMessage}</p>
        </div>

        <div className="picture">
          <p className="comissiontext">Kiurent retains a 10% commission from every completed rental to keep the platform running smoothly.</p>
          <label className="upload-image-text">
            Upload the image of your product:
            <input className="image-button" type="file" accept="image/*" onChange={handleImageChange} style={{ color: 'transparent' }} />
          </label>
          {preview && (
            <img className="image-preview"
              src={preview}
              alt="Preview"
              style={{ width: "100%", marginTop: "3px" }}
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
