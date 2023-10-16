import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import useStore from '../store';


function Signup(){

  const [formData, setFormData] = useState({
    username: '',
    image: '',
    email: '',
    password: '',
  });

  const { signupForm, setSignupForm } = useStore()

  const cloudinaryRef = useRef()
  const widgetRef = useRef()

  const [status, setStatus] = useState(false)
  const navigate = useNavigate()


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setSignupForm({...signupForm, [name]: value})
  };

  function openWidget (){
    widgetRef.current.open()
  }

  useEffect(() => {
    //console.log(window.cloudinary)
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
      <form className='flex flex-col items-center ml-auto mr-auto mt-[10%] rounded-xl bg-light_navy h-fit p-5' onSubmit={handleSubmit}>
        <h2 className='ml-auto mr-auto mb-5'>Welcome!</h2>
        <button
            className='bg-white border-2 border-gray-300 rounded hover:bg-gray-300'
            type='button'
            name='image'
            value={formData.image}
            onClick={openWidget}>
              Upload image
        </button>
        <input
            className='mb-1 mt-1 border-2 border-gray-300'
            type="text"
            name="username"
            placeholder="Username"
            required={true}
            value={formData.username}
            onChange={handleChange}
        />
         <input
            className='mb-1 border-2 border-gray-300'
            type="text"
            name="email"
            required={true}
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
        />
        <input
            className='mb-1 border-2 border-gray-300'
            type="password"
            name="password"
            required={true}
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
        />
        <button className='bg-leafy_green hover:bg-green-600 w-fit ml-auto mr-auto mt-2 border-2 border-black rounded p-1' type="submit">Sign Up</button>
      </form>
   )
}

export default Signup