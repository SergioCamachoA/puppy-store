import { FC } from "react"
import { Dog } from "../interfaces/interfaces"

interface Props {
  dogsList: Dog[] | null
  shownList: Dog[] | null
  handlePages: (howMany: number) => void
  shownAmount: number
}

export const Pagination: FC<Props> = ({
  shownList,
  dogsList,
  shownAmount,
  handlePages,
}) => {
  return (
    <>
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
    </>
  )
}
