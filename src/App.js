import React, { Component } from 'react';

import './App.css';
import Products from './components/Products';
import Filter from './components/Filter';
import Basket from './components/Basket';

class App extends Component {

  constructor(props){
    super(props);
    this.state = { products:[], filteredProducts: [], cartItems: []};   
    this.handleChangeSort =this.handleChangeSort.bind(this);
    this.handleChangeSize =this.handleChangeSize.bind(this);
    this.handleAddToCart =this.handleAddToCart.bind(this);
    this.handleRemoveFromCart =this.handleRemoveFromCart.bind(this);
  }

  componentWillMount(){
    fetch("http://localhost:8000/products").then(res =>res.json())
    .then(data => this.setState({
      products:data,
      filteredProducts:data
    }))
  }

  handleChangeSort(e){
    this.setState({sort: e.target.value});
    this.listProducts();
  }

  handleChangeSize(e){
    this.setState({size: e.target.value});
    this.listProducts();
  }
  listProducts(){
    this.setState(state => {
      if(state.sort !== ''){
        state.products.sort((a,b) =>(state.sort ==='lowest')? (a.price > b.price?1:-1):(a.price < b.price?1:-1))
      }else{
        state.products.sort((a,b) => (a.id < b.id?1:-1));
      }

      if(state.size !==''){
        return { filteredProducts: state.products.filter(a=>
          a.availableSizes.indexOf(state.size) >= 0
        )}
      }
      return {filteredProducts: state.products};
    })
  }


  handleAddToCart(e,product){
     this.setState(state =>{
       const cartItems = state.cartItems;
       let productAlreadyInCart = false;
       cartItems.forEach(item => {
         if(item.id === product.id){
           productAlreadyInCart = true;
           item.count++;
         }
       });
       if(!productAlreadyInCart){
         cartItems.push({...product, count:1});
       }
       localStorage.setItem("cartItems",JSON.stringify(cartItems));
       return cartItems;
     })    
  }
  
  handleRemoveFromCart(e, item){
    this.setState(state => {
      const cartItems = state.cartItems.filter(elm => elm.id !== item.id);
      localStorage.setItem('cartItem',cartItems);
      return {cartItems};
    })
  }
  render() {
  return (
    <div className="container">
      <h1>Ecommerce Shopping cart Application</h1>
      <hr/>
      <div className="row">
        <div className="col-sm-8">
          <Filter size={this.state.size} sort={this.state.sort} handleChangeSize={this.handleChangeSize}
          handleChangeSort={this.handleChangeSort} count={this.state.filteredProducts.lenght} />
          <hr/>
          <Products products={this.state.filteredProducts} handleAddToCart={this.handleAddToCart} />
        </div>
        <div className="col-sm-4">
          <Basket cartItems={this.state.cartItems} handleRemoveFromCart={this.handleRemoveFromCart} />
        </div>
      </div>
      
    </div>
  );
  }
}

export default App;

{/*https://www.youtube.com/watch?v=-xyKczajZb0  ,   npm install -g json-server  ,   json-server public/db.json --port 8000 */}
