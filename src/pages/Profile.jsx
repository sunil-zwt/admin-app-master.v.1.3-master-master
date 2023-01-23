import React from 'react'
import "../css/profile.css"
import avatar from "../images/7309681.jpg"
import * as BsIcons from "react-icons/bs";
import * as FaIcons from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function Profile() {

    const user = JSON.parse(localStorage.getItem('users'))
    let _userA = user && user.map(data => {
        //   let fullname= data.firstname + data.lastname
        return data.address
    })
    console.log(_userA)
    let _user = user && user.map(data => {
        //   let fullname= data.firstname + data.lastname
        return data.name.firstname + ' ' + data.name.lastname
    })
    console.log(_user)
    const navigate = useNavigate()
    const handleProfileEdit = ()=>{
    navigate('/profileEdit')
    }
    return (
        <section className='profile-section'>
            <div className='profile-container'>
                <div className='profile-container-main'>
                    <img src={avatar} alt="" className='avatar-img' />
                    <p>
                        {_user}
                    </p>
                    <BsIcons.BsPencilSquare className='edit-profile-icon' onClick={handleProfileEdit}/>
                </div>
                <div className='profile-container-details'>
                    <h1>Information</h1>
                    <hr />
                    <div>
                        {
                            user.map((data, index) => {
                                return (
                                    <div key={index}>

                                        <div className='general-details'>
                                            <div className='email-details' >
                                                <h3><strong>Email</strong></h3>
                                                <span>{data.email}</span>
                                            </div>
                                            <div className='phone-details' >
                                                <h3><strong>Phone</strong></h3>
                                                <span>{data.phone}</span>
                                            </div>
                                        </div>


                                        <div className='address-container'>
                                            <h2>
                                                Address
                                            </h2>
                                            <hr />
                                            <div className='address-container-details'>
                                                <div className='address-details'>
                                                    <span><strong>City:</strong></span>
                                                    <p>{data.address.city}</p>

                                                </div>
                                                <div className='address-details'>
                                                    <span><strong>Street:</strong></span>
                                                    <p>{data.address.street}</p>
                                                </div>
                                                <div className='address-details'>
                                                    <span><strong>Number:</strong></span>
                                                    <p>{data.address.number}</p>
                                                </div>
                                                <div className='address-details'>
                                                    <span><strong>Zipcode:</strong></span>
                                                    <p>{data.address.zipcode}</p>
                                                </div>

                                            </div>
                                        </div>

                                    </div>

                                )

                            })
                        }
                    </div>
                    <div className='profile-soicial-icons'>
                        <FaIcons.FaFacebook />
                        <FaIcons.FaTwitter />
                        <FaIcons.FaWhatsapp />
                        <FaIcons.FaInstagram />

                    </div>


                </div>

            </div>

        </section>
    )
}

export default Profile