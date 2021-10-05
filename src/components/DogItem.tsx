import { FC } from "react"
import { useGlobal } from "../hooks/useGlobal"
import { Dog } from "../interfaces/interfaces"

interface Props {
  dog: Dog
}

function checkIsDisabled(cart: Dog[], dogId: string) {
  const isDisabled = cart.some((each) => each.id === dogId)
  return isDisabled
}

export const DogItem: FC<Props> = ({ dog }) => {
  const { addToCart, cart } = useGlobal()

  const disable = cart && checkIsDisabled(cart, dog.id)

  return (
    <div className={"dog-item"}>
      <img src={dog.url} alt="dog" decoding="async" />
      <p>{dog.title}</p>
      {!dog.isAdopted && (
        <button
          disabled={disable || undefined}
          className={disable ? "in-cart" : undefined}
          onClick={() => addToCart({ ...dog, isAdopted: true })}
        >
          Adopt
        </button>
      )}
    </div>
  )
}
