import React from "react"
import { useGlobal } from "../hooks/useGlobal"
import { CheckoutItem } from "./CheckoutItem"

export const CheckoutContainer = () => {
  const { cart, adopt } = useGlobal()

  return (
    <div className="checkout-container">
      {cart && cart.length > 0 ? (
        <>
          {cart.map((each) => {
            return <CheckoutItem key={each.id} dog={each} />
          })}
          <div className="btn-submit">
            <button onClick={adopt}>submit adoption</button>
          </div>
        </>
      ) : (
        <p>
          Your <span>can</span>didates will show here
        </p>
      )}
    </div>
  )
}
