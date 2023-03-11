import React,{useState,useContext,useEffect} from 'react';
import Axios from 'axios';
import { AuthContext } from  '../../../AuthContext';
import { useNavigate} from 'react-router-dom';

const Admin = () => {
  const navigate=useNavigate();

    const { isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
      if (!isAuthenticated) {
        navigate("/adminlogin");
      }
    }, [isAuthenticated,navigate]);

    const [formData, setFormData] = useState({
        name: "",
        password: "",
        email:"",
        branch:"",
        regno:"",
      });

      const validateEmail = (email) => {
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return regex.test(email);
      }


      const handleSubmit = (e) => {
        e.preventDefault();
        
        if(validateEmail(formData.email) && formData.name!=="" && formData.password!=="" && formData.email!=="" && formData.branch!=="" && formData.regno!==""){
            Axios.post('http://localhost:3001/users/new',formData)
                .then((response) => {
                console.log('Response:', response.data);
                })
                .catch((error) => {
                console.log('Error:', error.message);
                });
            window.location.reload();
            window.alert("User saved");
        }else{
            window.alert("You may have typed the wrong email or unfilled the details");
        }
      };

      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };

    return (
        <div>
        <form onSubmit={handleSubmit}>
  <div>
    <label htmlFor="name">name:</label>
    <input
      type="text"
      name="name"
      value={formData.name}
      maxLength={20}
      onChange={handleChange}
    />
  </div>
  <div>
    <label htmlFor="password">Password:</label>
    <input
      type="password"
      name="password"
      value={formData.password}
      onChange={handleChange}
      maxLength={20}
    />
  </div>
  <div>
    <label htmlFor="email">email:</label>
    <input
      type="string"
      name="email"
      value={formData.email}
      onChange={handleChange}
    />
  </div>
  <div>
    <label htmlFor="branch">branch:</label>
    <input
      type="string"
      name="branch"
      value={formData.branch}
      onChange={handleChange}
      maxLength={10}
    />
    <div>
    <label htmlFor="regno">regno:</label>
    <input
      type="string"
      name="regno"
      value={formData.regno}
      onChange={handleChange}
      maxLength={15}
    />
  </div>
  </div>
  <button type="submit">create</button>
</form>


    </div>
    );
}

export default Admin;
