import {
  ReactNode,
  createContext,
  useContext,
  useReducer,
  useEffect,
} from "react"
import axios from "axios"

interface InitialState {
  dogsList: Dog[] | null
  adoptedList: Dog[] | null
  notAdoptedList: Dog[] | null
  cart: Dog[] | null
}

interface Payload {
  id?: string
  allDogs?: Dog[]
  dog?: Dog
}

interface Action {
  type: string
  payload: Payload
}
type DataType = {
  count: number
  data: { data: Dog[] }
}
interface Dog {
  id: string
  url: string
  title: string
  isAdopted?: boolean
}

const initialState: InitialState = {
  dogsList: null,
  adoptedList: null,
  notAdoptedList: null,
  cart: null,
}

const ACTIONS = {
  GET_ALL_DOGS: "GET ALL DOGS",
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE FROM CART",
  ADOPT: "ADOPT",
}

function reducer(state: InitialState, action: Action) {
  const { id, allDogs, dog } = action.payload

  switch (action.type) {
    case ACTIONS.GET_ALL_DOGS:
      if (allDogs) {
        const cart: Dog[] | null = []
        const adoptedList: Dog[] = []
        const notAdoptedList: Dog[] = []

        localStorage.setItem("fetched", JSON.stringify(allDogs))

        const adoptedString = localStorage.getItem("adoptions")
        const adopted: string[] = adoptedString ? JSON.parse(adoptedString) : []

        const cartString = localStorage.getItem("cart")
        const localCart: string[] = cartString ? JSON.parse(cartString) : []

        allDogs.forEach((eachDog) => {
          localCart.some((each) => each === eachDog.id) && cart.push(eachDog)

          adopted.some((eachAdopted) => eachDog.id === eachAdopted)
            ? adoptedList.push({ ...eachDog, isAdopted: true })
            : notAdoptedList.push(eachDog)
        })

        console.log("NOT ADOPTED", notAdoptedList)

        console.log("ADOPTED", adoptedList)

        return {
          ...state,
          dogsList: allDogs,
          adoptedList,
          notAdoptedList,
          cart,
        }
      }
      return state

    case ACTIONS.ADD_TO_CART:
      if (dog) {
        const cartString = localStorage.getItem("cart")

        const localCart: string[] = cartString ? JSON.parse(cartString) : []

        localStorage.setItem(
          "cart",
          JSON.stringify(
            localCart.find((each) => each === dog.id)
              ? localCart
              : [...localCart, dog.id]
          )
        )

        const cart: Dog[] | null = state.cart
          ? state.cart.includes(dog)
            ? state.cart
            : [...state.cart, dog]
          : [dog]

        return {
          ...state,
          cart,
        }
      }
      return state
    case ACTIONS.REMOVE_FROM_CART:
      if (id) {
        const cartString = localStorage.getItem("cart")
        const localCart: string[] = cartString ? JSON.parse(cartString) : []

        localStorage.setItem(
          "cart",
          JSON.stringify(localCart.filter((each) => each !== id))
        )

        const cart: Dog[] | null =
          state.cart && state.cart.filter((each) => each.id !== id)

        return { ...state, cart }
      }
      return state
    case ACTIONS.ADOPT:
      const adoptedList: Dog[] | null = state.adoptedList && [
        ...state.adoptedList,
      ]
      const notAdoptedList: Dog[] = []
      const localAdopted: string[] = []

      state.notAdoptedList &&
        state.notAdoptedList.forEach((eachDog) => {
          if (state.cart && state.cart.some((cart) => cart.id === eachDog.id)) {
            localAdopted.push(eachDog.id)

            adoptedList && adoptedList.push({ ...eachDog, isAdopted: true })
          } else {
            notAdoptedList.push(eachDog)
          }
        })

      const adoptedString = localStorage.getItem("adoptions")
      const adopted: string[] = adoptedString ? JSON.parse(adoptedString) : []

      localStorage.setItem(
        "adoptions",
        JSON.stringify([...adopted, ...localAdopted])
      )
      localStorage.removeItem("cart")

      return { ...state, adoptedList, notAdoptedList, cart: null }
    default:
      return state
  }
}

const GlobalContext = createContext({
  ...initialState,
  addToCart: (dog: Dog) => {},
  removeFromCart: (id: string) => {},
  adopt: () => {},
})

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const getData = async () => {
      try {
        const localList = localStorage.getItem("fetched")
        if (localList) {
          dispatch({
            type: ACTIONS.GET_ALL_DOGS,
            payload: { allDogs: JSON.parse(localList) },
          })
        } else {
          const data: DataType = await axios.get("/")

          dispatch({
            type: ACTIONS.GET_ALL_DOGS,
            payload: { allDogs: data.data.data },
          })
        }
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])

  function addToCart(dog: Dog) {
    dispatch({ type: ACTIONS.ADD_TO_CART, payload: { dog } })
  }
  function removeFromCart(id: string) {
    dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: { id: id } })
  }
  function adopt() {
    dispatch({ type: ACTIONS.ADOPT, payload: {} })
  }

  return (
    <GlobalContext.Provider
      value={{ ...state, addToCart, removeFromCart, adopt }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobal = () => {
  const context = useContext(GlobalContext)
  return context
}
