import React, { Component } from 'react'
import util from '../util';
export default class Basket extends Component {
  render() {
      const {cartItems} = this.props;
    return (
      <div className="alert alert-info">
        {cartItems.length === 0? "Basket Is Empty": <div> You have {cartItems.length} products in basket. </div>}
        {cartItems.length > 0 && 
          <div>
              <ul>
                  {cartItems.map(item => 
                    <li>
                        <b>{item.title}</b>
                        x {item.count} = {item.price * item.count}
                        <button className="btn btn-danger" onClick={(e) => this.props.handleRemoveFromCart(e, item)}>
                            X
                        </button>
                    </li>
                  )}
              </ul>
              Total {util.formatCurrency(cartItems.reduce((a, c) => a+c.price*c.count, 0))}

              <br/>
              <button className="btn btn-primary" onClick={() => alert("Checkout need to implement...")}>
              Checkout    </button>
          </div>
        }
        
      </div>
    )
  }
}
