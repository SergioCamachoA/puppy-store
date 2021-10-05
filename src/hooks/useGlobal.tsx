import { useContext } from "react"
import { GlobalContext } from "../context/Context"

export const useGlobal = () => {
  const context = useContext(GlobalContext)
  return context
}
