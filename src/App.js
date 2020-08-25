import React, { useReducer } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from './Component/UserHomepage'
import LeftPanel from './Component/LeftPanel'
import CoursesList from './Component/Courses/CoursesList'
import CourseDetail from './Component/Courses/CourseDetail'
import ShoppingCart from './Component/Cart/CheckoutCart'
import LogIn from './Component/Auth/Login'
import SignUp from './Component/Auth/Signup'

export const AppContext = React.createContext();

const initialState = {
  open: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_DRAWER_OPEN':
      return {
        open: action.opendrawer
      };
    default:
      return initialState;
  }
}

function App() {

  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <div className="App">
      <AppContext.Provider value={{ state, dispatch }}>
        <Router>
          <Route exact path="/" render={props => <HomePage {...props} />} />
          <Switch>
            <Route exact path="/Courses" render={props => <HomePage {...props} />} />
            <Route exact path="/Courses/:category" render={props => <CoursesList {...props} />} />
            <Route exact path="/Courses/:maincatnm/:subcatnm" render={props => <CourseDetail {...props} />} />
            <Route exact path="/ShoppingCart" render={props=><ShoppingCart {...props} />}/>
            <Route exact path="/LogIn" render={props=><LogIn {...props}/>}/>
            <Route exact path="/SignUp" render={props=><SignUp {...props}/>}/>
          </Switch>
        </Router>
      </AppContext.Provider>
    </div>
  );
}

export default App;
