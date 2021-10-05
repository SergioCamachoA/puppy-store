import { DogsList } from "../components/DogsList"
import { useGlobal } from "../hooks/useGlobal"

export const Dogs = () => {
  const { notAdoptedList } = useGlobal()

  return (
    <div className="not-adopted">
      {notAdoptedList ? (
        <DogsList dogsList={notAdoptedList} />
      ) : (
        <div className="loader">
          <p>loading some pups...</p>
        </div>
      )}
    </div>
  )
}
