import React, { Component } from 'react'

export default class Filter extends Component {
  render() {
    return (
      <div className="row">
          <div className="col-md-4">
            {this.props.count} Products Found
          </div>
          <div className="col-md-4">
              <label>
                  Order By  
                  <select className="form-control" value={this.props.sort} onChange={this.props.handleChangeSort}>
                    <option value="">Select</option>
                    <option value="lowest">Lowest To Highset</option>
                    <option value="highest">Highest To Lowsest</option>
                  </select>
              </label>
          </div>
          <div className="col-md-4">
             <label>
                Filter Size 
                <select className="form-control" value={this.props.size} onChange={this.props.handleChangeSize}>
                    <option value="">All</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                </select>
              </label>
          </div>
        
      </div>
    )
  }
}
