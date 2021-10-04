import React from "react"
import { Link } from "react-router-dom"
// import "../styles/_navbar.scss"
import { CheckoutIcon } from "./CheckoutIcon"

export const NavBar = () => {
  return (
    <div className="navbar">
      <div className="center-nav">
        <Link to="/">
          <h2>DOGS</h2>
        </Link>
        <Link to="adopted">
          <h2>ADOPTIONS</h2>
        </Link>
      </div>
      <div className="checkout-nav">
        <Link to="/checkout">
          <h2>CHECKOUT</h2>
        </Link>
        <CheckoutIcon />
      </div>
    </div>
  )
}
