import "./App.scss"
import { Route, Switch } from "react-router"
import { Adopted } from "./pages/Adopted"
import { Checkout } from "./pages/Checkout"
import { Dogs } from "./pages/Dogs"
import { NavBar } from "./components/NavBar"
// import { useFetch } from "./hooks/useFetch"
// import { FC } from "react"

export const App = () => {
  // const [data] = useFetch()

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
