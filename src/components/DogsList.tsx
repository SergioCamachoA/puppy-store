import React, { FC } from "react"
// import { useGlobal } from "../context/useGlobal"
import { DogContainer } from "./DogContainer"
import { Dog } from "../interfaces/interfaces"

interface Props {
  dogsList: Dog[] | null
}

export const DogsList: FC<Props> = ({ dogsList }) => {
  return (
    <div className="dogs-list">
      {dogsList !== null &&
        dogsList.map((each) => {
          return <DogContainer key={each.id} dog={each} />
        })}
    </div>
  )
}
