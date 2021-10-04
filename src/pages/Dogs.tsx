import { DogsList } from "../components/DogsList"
import { useGlobal } from "../hooks/useGlobal"

export const Dogs = () => {
  const { notAdoptedList } = useGlobal()
  return (
    <div className="not-adopted">
      <DogsList dogsList={notAdoptedList} />
    </div>
  )
}
