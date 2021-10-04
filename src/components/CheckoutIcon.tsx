import React from "react"
import { useGlobal } from "../hooks/useGlobal"

export const CheckoutIcon = () => {
  const { cart } = useGlobal()

  return <div>{cart && cart.length > 0 && <p>{cart.length}</p>}</div>
}
