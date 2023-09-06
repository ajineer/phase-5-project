import { useState, useEffect, useRef } from 'react'

function GroceryItemForm({setToggle, setSelList, selList}){


    const cloudinaryRef = useRef()
    const widgetRef = useRef()
    const [formData, setFormData] = useState({
        name: '',
        price: 0,
        image: ''
    })

    function openWidget (){
        widgetRef.current.open()
    }

    function handleChange (e){
        setFormData({...formData, [e.target.name]: e.target.value})
        console.log(formData)
    }

    function handleSubmit(e){
        e.preventDefault()
        fetch(`/api/grocery_lists/${selList.id}`, {
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        }).then(r => r.json())
        .then(data => (setSelList({...selList, data}), setToggle(false)))
    }
    useEffect(()=>{
        console.log(window.cloudinary)
        cloudinaryRef.current = window.cloudinary
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'dcejyrcsu',
            uploadPreset: 'cohort'
        }, (error, result) => {
            if(result.event === 'success'){
                setFormData({...formData, image: result.info.url})
            }
        })
    },[])

    return(
        <div>
            <h2>Add new grocery item</h2>
            <form onSubmit={handleSubmit}>
                <label>Item name</label>
                <input
                    type='text'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}>
                </input>
                <label>Item price</label>
                <input 
                    type='number'
                    name='price'
                    step={'.01'}
                    value={formData.price}
                    onChange={handleChange}>
                </input>
                <label>Item image</label>
                <input
                    type='button'
                    name='image'
                    value={formData.image}
                    onClick={openWidget}>
                </input>
                <button type='submit'>Add item</button>
            </form>
        </div>
    )

}

export default GroceryItemForm