import React, { Component } from 'react';
import {Switch ,  Route} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./Component/Navbar";
import  Cart from "./Component/Cart/Cart"
import Details from "./Component/Details.js";
import Default from "./Component/Default.js";
import ProductList from "./Component/ProductList.js";
import Modal from "./Component/Modal"




class App extends Component {
  state = {  }
  render() { 
    return ( <React.Fragment>
      <Navbar></Navbar>
      <Switch>
        <Route exact path ="/" component={ProductList}></Route>
        <Route path ="/details" component={Details}></Route>
        <Route path ="/cart" component={Cart}></Route>
        <Route component={Default}></Route> 
      </Switch>
      <Modal></Modal>
    </React.Fragment> 
    
    );
  }
}
 
export default App;






