import React, { FC } from "react"
import { useGlobal } from "../hooks/useGlobal"
import { Dog } from "../interfaces/interfaces"

interface Props {
  dog: Dog
}

export const DogContainer: FC<Props> = ({ dog }) => {
  const { addToCart } = useGlobal()

  return (
    <div className="dog-container">
      <img src={dog.url} alt="dog" />
      <p>{dog.title}</p>
      {!dog.isAdopted && <button onClick={() => addToCart(dog)}>Adopt</button>}
    </div>
  )
}
