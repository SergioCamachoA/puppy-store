import { DogsList } from "../components/DogsList"
import { useGlobal } from "../hooks/useGlobal"

export const Adopted = () => {
  const { adoptedList } = useGlobal()

  return (
    <div className="adopted">
      <h2>Your companions</h2>
      {adoptedList ? (
        <DogsList dogsList={adoptedList} />
      ) : (
        <div className="holder">
          <p>no pups adopted yet...</p>
        </div>
      )}
    </div>
  )
}
