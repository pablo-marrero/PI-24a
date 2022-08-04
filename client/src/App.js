import './App.css';
import React, { useEffect } from "react"
import { BrowserRouter as Router, Route,Redirect } from 'react-router-dom'
import { Welcome } from './components/Welcome/Welcome';
import { Nav } from "./components/Nav/Nav"
import { MainArea } from './components/Main/MainArea';
import {AddActivity} from "./components/FormCreateActivity/AddActivity"
import {TableActivities} from "./components/Activities/TableActivities"
import { Header } from './components/Header/Header';
import { useDispatch } from "react-redux"
import {getCountries} from "./action/actionCountries/index"
import { DetailsCountry } from './components/DetailCountry/DetailsCountry';
import { AddActCountry } from './components/AddActCountry';
import { ProtectedRoute } from "./components/Welcome/ProtectedRoute"
import { uploadUser } from "./action/actionLogin&Register/action"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase/firebase"

function App() {
  const dispatch = useDispatch()
  
  useEffect(()=>{
    dispatch(getCountries())
  },[dispatch])

  useEffect(()=>{
    const unSuscribe =  onAuthStateChanged(auth, (currentUser)=>{
      if(currentUser)dispatch(uploadUser(currentUser))
  })
    return ()=> unSuscribe()
  },[dispatch])

  return (
    
    <div className='app'>
      <Router>
          <Route exact path="/">
            <Redirect to='/welcome'></Redirect>
          </Route>
          
          <Route path={["/welcome"]} exact><Welcome/></Route>


        <ProtectedRoute>
          <Route path={["/home", "/country", "/add", "/TableActivities","/AddActCountry/:name"]}>
            <Header/>
          </Route>
            
          <Route path={["/home", "/country"]} exact><Nav/></Route>
          <Route path={["/home"]} exact><MainArea/></Route>

          <Route path="/country/:id" exact><DetailsCountry/></Route>
          {/* <Route exact path="/country/?name"><CountryName/></Route> */}
          <Route path="/add" exact><AddActivity/></Route>
          <Route path="/TableActivities" exact><TableActivities/></Route>
          <Route path="/AddActCountry/:name" exact><AddActCountry/></Route>
        </ProtectedRoute>
    </Router>
      </div>
  );
}

export default App;

/**************************************IMPORTANTE*********************************************************/
// PARA INSTALAR ACTUALIZAMOS NUESTRO PROYECTO A LA VERSION 18 DE REACT Y LUEGO DEBEMOS REALIZAR        **
// UNA DE LAS OPCIONES DE ESTE LINK, EN MI CASO FUNCIONÓ LA PRIMERA, DONDE SE MODIFICA EL BROWSERLIST   **
/*********************************************************************************************************/