import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay,
      CardTitle } from 'reactstrap';
import DishesdetailComponet from './DishesdetailComponent'
  
  class Menu extends Component {
  
      constructor(props) {
          super(props);
          this.state = {
              selectedDish: null
          }
          console.log(this.state)
          
      }
  
      onDishSelect(dish) {
          this.setState({ selectedDish: dish});
      }
      
      renderDish(dish) {
        if (dish != null)
            return(
            <DishesdetailComponet dish={dish} />
            );
    }
  
  
      render() {
          const menu = this.props.dishes.map((dish) => {
              return (
                <div  className="col-12 col-md-5 m-1" key={dish.id}>
                  <Card 
                    onClick={() => this.onDishSelect(dish)} >
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardImgOverlay>
                        <CardTitle>{dish.name}</CardTitle>
                    </CardImgOverlay>
                  </Card>
                </div>
              );
          });
  
          return (
              <div className="container">
                  <div className="row">
                      {menu}
                  </div>
                  <div className="row">
                      {this.renderDish(this.state.selectedDish)}
                  </div>
              </div>
          );
      }
  }

   
export default Menu;