import './App.css';
import React, { useEffect } from "react"
import { BrowserRouter, Route,Redirect } from 'react-router-dom'
import { Inicio } from './components/Inicio';
import { Nav } from "./components/Nav"
import { MainArea } from './components/MainArea';
// import {CountryDetails} from "./components/CountryDetails"
import {AddActivity} from "./components/AddActivity"
import {About} from "./components/About"
// import {CountryName} from "./components/CountryName"
import { Header } from './components/Header';
import { useDispatch } from "react-redux"
import {getCountries} from "./action/index"
import { MostrarPais } from './components/MostrarPais';

function App() {

  // const [loading, setLoading] = useState(true)

  // let cambioEstado = (valor)=>{
  //   setLoading(valor)
  // }
  // const { countries } = useSelector((state) => state)
  
  
  const dispatch = useDispatch()
   
  useEffect(()=>{
    dispatch(getCountries())
    // console.log(countries)
  },[dispatch])

  return (
    <BrowserRouter>
      <div className="App">

      {/* <Redirect from='/' to='/home'></Redirect>

      <Route path={"/home"} component={Inicio}/> */}
      
      <Redirect from='/' to='/welcome'></Redirect>
      <Route exact path={["/welcome"]}><Inicio/></Route>

      <Route path={["/home", "/country", "/add", "/about"]}><Header/></Route>
      <Route path={["/home", "/country"]}><Nav/></Route>
      <Route exact path={["/home"]}><MainArea/></Route>
      
      <Route exact path="/country/:id"><MostrarPais/></Route>
      {/* <Route exact path="/country/?name"><CountryName/></Route> */}
      <Route exact path="/add"><AddActivity/></Route>
      <Route exact path="/about"><About/></Route>
      </div>
    </BrowserRouter>
  );
}

export default App;