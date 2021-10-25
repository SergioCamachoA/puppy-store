import { Dog, InitialState, Action } from "../interfaces/interfaces"
import {
  ReactNode,
  createContext,
  useReducer,
  useEffect,
  useCallback,
} from "react"

const initialState: InitialState = {
  adoptedList: null,
  cart: null,
  notAdoptedList: null,
}

const ACTIONS = {
  INITIAL_STATE: "INITIAL_STATE",
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE FROM CART",
  ADOPT: "ADOPT",
  NOT_ADOPTED_LIST: "NOT_ADOPTED_LIST",
}

function reducer(state: InitialState, action: Action) {
  const { id, adoptedList, cart, dog, notAdoptedList } = action.payload

  switch (action.type) {
    case ACTIONS.INITIAL_STATE:
      return {
        ...state,
        adoptedList: adoptedList!,
        cart: cart!,
      }

    case ACTIONS.NOT_ADOPTED_LIST:
      return {
        ...state,
        notAdoptedList: notAdoptedList!,
      }

    case ACTIONS.ADD_TO_CART:
      return {
        ...state,
        cart: dog && (state.cart ? [...state.cart, dog] : [dog]),
      }

    case ACTIONS.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart!.filter((each) => each.id !== id),
      }

    case ACTIONS.ADOPT:
      return {
        ...state,
        adoptedList: state.adoptedList
          ? [...state.adoptedList, ...state.cart!]
          : [...state.cart!],

        cart: null,
      }
    default:
      return state
  }
}

export const GlobalContext = createContext({
  ...initialState,
  addToCart: (dog: Dog) => {},
  removeFromCart: (id: string) => {},
  adopt: () => {},
  setNotAdoptedList: (notAdoptedList: Dog[]) => {},
})

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const checkLocal = async () => {
      try {
        const data = localStorage.getItem("localState")

        if (data) {
          const localState: InitialState = await JSON.parse(data)
          const cart = localState.cart || null
          const adoptedList = localState.adoptedList || null

          dispatch({
            type: ACTIONS.INITIAL_STATE,
            payload: {
              cart,
              adoptedList,
              id: null,
              dog: null,
              notAdoptedList: null,
            },
          })
        }
      } catch (error) {
        console.log("there was an error")
      }
    }
    checkLocal()
  }, [])

  useEffect(() => {
    localStorage.setItem(
      "localState",
      JSON.stringify({ cart: state.cart, adoptedList: state.adoptedList })
    )
  }, [state])

  const setNotAdoptedList = useCallback((notAdoptedList: Dog[]) => {
    dispatch({
      type: ACTIONS.NOT_ADOPTED_LIST,
      payload: {
        notAdoptedList,
        dog: null,
        cart: null,
        adoptedList: null,
        id: null,
      },
    })
  }, [])

  function addToCart(dog: Dog) {
    dispatch({
      type: ACTIONS.ADD_TO_CART,
      payload: {
        dog,
        cart: null,
        adoptedList: null,
        id: null,
        notAdoptedList: null,
      },
    })
  }
  function removeFromCart(id: string) {
    dispatch({
      type: ACTIONS.REMOVE_FROM_CART,
      payload: {
        id,
        cart: null,
        adoptedList: null,
        dog: null,
        notAdoptedList: null,
      },
    })
  }
  function adopt() {
    dispatch({
      type: ACTIONS.ADOPT,
      payload: {
        id: null,
        adoptedList: null,
        cart: null,
        dog: null,
        notAdoptedList: null,
      },
    })
  }

  return (
    <GlobalContext.Provider
      value={{ ...state, addToCart, removeFromCart, adopt, setNotAdoptedList }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
