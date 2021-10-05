import { FC, useEffect, useState } from "react"
import { DogItem } from "./DogItem"
import { Dog } from "../interfaces/interfaces"

interface Props {
  dogsList: Dog[] | null
}

export const DogsList: FC<Props> = ({ dogsList }) => {
  const [shownAmount, setShownAmount] = useState(9)
  const [shownList, setShownList] = useState<Dog[] | null>(null)

  function handlePages(howMany: number) {
    shownAmount + howMany > dogsList!.length
      ? setShownAmount(dogsList!.length)
      : setShownAmount((prev) => prev + howMany)
  }

  useEffect(() => {
    if (dogsList) {
      const currentLength =
        shownAmount > dogsList.length ? dogsList.length : shownAmount
      const current: Dog[] | null = []
      for (let i = 0; i < currentLength; i++) {
        current.push(dogsList[i])
      }
      setShownList(current)
    }
  }, [dogsList, shownAmount])

  return (
    <div className="dogs-list">
      {dogsList &&
        shownList?.map((each) => {
          return <DogItem key={each.id} dog={each} />
        })}

      {shownList?.length !== dogsList?.length && (
        <div className="pages">
          <p>show</p>
          <button onClick={() => handlePages(10)} className="show-10">
            {shownAmount + 10 < dogsList!.length
              ? 10
              : dogsList!.length - shownAmount}
          </button>
          {shownAmount + 20 < dogsList!.length && (
            <button onClick={() => handlePages(20)} className="show-20">
              20
            </button>
          )}
          {shownAmount + 50 < dogsList!.length && (
            <button onClick={() => handlePages(50)} className="show-50">
              50
            </button>
          )}
          <p>more</p>
        </div>
      )}
    </div>
  )
}
