import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'


function Signup(){

  const [formData, setFormData] = useState({
    username: '',
    image: '',
    email: '',
    password: '',
  });

  const cloudinaryRef = useRef()
  const widgetRef = useRef()

  const [status, setStatus] = useState(false)
  const navigate = useNavigate()


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  function openWidget (){
    widgetRef.current.open()
  }

  useEffect(() => {
    console.log(window.cloudinary)
    cloudinaryRef.current = window.cloudinary
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
        cloudName: 'dcejyrcsu',
        uploadPreset: 'cohort'
    }, (error, result) => {
        if (result.event === 'success'){
            setFormData({...formData, image: result.info.url})
        }
    }
    )
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
        const response = await fetch('/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
        )

      if (response.ok) {
        setStatus(true)
        navigate('/login')
      } else {
        const data = await response.json();
        alert(`Registration failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className='flex flex-col ml-auto mr-auto mt-5'>
      <h2>Sign Up</h2>
      <form className='flex flex-col' onSubmit={handleSubmit}>
        <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
        />
        <input 
            type='button'
            name='image'
            placeholder="user profile picture"
            value={formData.image}
            onClick={openWidget}>
        </input>
         <input
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
        />
        <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
   )
}

export default Signup