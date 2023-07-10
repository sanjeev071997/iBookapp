import React from 'react'
import { Link } from 'react-router-dom'

// Footer date 
const date = new Date()
const year = date.getFullYear()

const Footer = () => {
    return (
        <>
            <div className='container mt-5 d-flex align-items-center justify-content-center w-100 h-100vh footer' style={{ maxHeight: '100%' }}>
                <p> <Link to="/" style={{color:"inherit", textDecoration:"none" }}> <b>iBook App</b></Link></p>
                <p className='footer-copyright'>Copyright &#169; {year} {" "} Sanjeev Kumar </p>
            </div>
        </>
    )
}

export default Footer