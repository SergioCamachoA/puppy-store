import "./App.scss"
import { Route, Switch } from "react-router"
import { Adopted } from "./pages/Adopted"
import { Checkout } from "./pages/Checkout"
import { Dogs } from "./pages/Dogs"
import { NavBar } from "./components/NavBar"
import { useEffect, useState } from "react"
import { useGlobal } from "./hooks/useGlobal"
import { Dog } from "./interfaces/interfaces"
import axios from "axios"

type DataType = {
  count: number
  data: { data: Dog[] }
}

export const App = () => {
  const { adoptedList, setNotAdoptedList } = useGlobal()
  const [fetchedList, setFetchedList] = useState<Dog[] | null>(null)

  useEffect(() => {
    !fetchedList && getData()

    async function getData() {
      try {
        const data: DataType = await axios.get("/")
        setFetchedList(data.data.data)
      } catch (error) {
        console.log(error)
      }
    }
  }, [fetchedList])

  useEffect(() => {
    const filteredList = fetchedList && filterAdopted(fetchedList)
    filteredList && setNotAdoptedList(filteredList)

    function filterAdopted(dogs: Dog[]) {
      if (adoptedList) {
        return dogs.filter(
          (dog) => !adoptedList.some((each) => each.id === dog.id)
        )
      }
      return dogs
    }
    // eslint-disable-next-line
  }, [fetchedList, adoptedList])

  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/" component={Dogs} />
        <Route exact path="/adopted" component={Adopted} />
        <Route exact path="/checkout" component={Checkout} />
        <Route path="*" component={Dogs} />
      </Switch>
    </div>
  )
}

export default App
