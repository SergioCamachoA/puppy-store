import { FC, useEffect, useState } from "react"
import { DogItem } from "./DogItem"
import { Dog } from "../interfaces/interfaces"
import { Pagination } from "./Pagination"

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

      <Pagination
        dogsList={dogsList}
        shownList={shownList}
        handlePages={handlePages}
        shownAmount={shownAmount}
      />
    </div>
  )
}
