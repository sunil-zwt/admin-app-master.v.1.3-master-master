import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from "react-router-dom"

function Edit() {
    const navigate = useNavigate()
    const loc = useLocation()
    const [input, setinput] = useState({
        id:loc.state.id,
        title: loc.state.title,
        category: loc.state.category,
        price: loc.state.price,
        image: ""

    })

    const handleInput = (e) => {
        e.preventDefault()
        const { name, value } = e.target

        setinput({ ...input, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(loc.state);
        let data = localStorage.getItem('dataKey') && localStorage.getItem('dataKey').length > 0 ? JSON.parse(localStorage.getItem('dataKey')) : []
        const _product = data.map((data,dataIndex) => {
           
            if(data.id === loc.state.id){
             
                return input
            }
            else{
                return data
            }
        })
        localStorage.setItem('dataKey', JSON.stringify(_product))
        navigate(-1)
    }
    return (
        <div className='edit-box'>
            <form className='edit-form'>
                <div className='add-input' >
                    <label>Title:</label>
                    <input type={'text'} name="title" value={input.title} onChange={handleInput} />
                </div>
                <div className='add-input'>
                    <label>Category:</label>
                    <input type={'text'} name="category" value={input.category} onChange={handleInput} />
                </div>
                <div className='add-input'>
                    <label>Price:</label>
                    <input type={'number'} name="price" value={input.price} onChange={handleInput} />
                </div>
                <div className='add-input'>
                    <label>Image:</label>
                    <input type={'file'} name="image" accept="image/png, image/gif, image/jpeg,image/svg" alt="" value={input.image} onChange={handleInput} />
                </div>
                <div className='add-btn-product'>

                    <button onClick={handleSubmit} className="addproduct-btn">Update</button>
                </div>
            </form>
        </div>
    )
}

export default Edit