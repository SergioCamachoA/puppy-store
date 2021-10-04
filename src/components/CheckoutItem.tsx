import React, { FC } from "react"
import { useGlobal } from "../hooks/useGlobal"
import { Dog } from "../interfaces/interfaces"

interface Props {
  dog: Dog
}

export const CheckoutItem: FC<Props> = ({ dog }) => {
  const { removeFromCart } = useGlobal()

  return (
    <div className="checkout-item">
      <img src={dog.url} alt={dog.title} />
      <div className="info">
        <p>{dog.title}</p>
        <div className="btn">
          <button onClick={() => removeFromCart(dog.id)} className="remove">
            remove
          </button>
        </div>
      </div>
    </div>
  )
}
