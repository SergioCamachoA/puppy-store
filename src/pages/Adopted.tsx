import { DogsList } from "../components/DogsList"
import { useGlobal } from "../hooks/useGlobal"

export const Adopted = () => {
  const { adoptedList } = useGlobal()

  return (
    <div className="adopted">
      <h2>Your companions</h2>
      <DogsList dogsList={adoptedList} />
    </div>
  )
}
