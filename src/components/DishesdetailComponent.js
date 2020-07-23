import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle } from 'reactstrap';


    class Menu extends Component {
  
        constructor(props) {
            super(props);
            console.log(props);
            this.state = {
                selectedDish: null
            }
            
        }

    
        renderDish(dish) {
            if (dish != null)
                return(
                <div  className="col-12 col-md-5 m-1" key={dish.id}>
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
                );
            else
                return(
                    <div></div>
                );
        }

        renderComments(dish){
            if (dish != null){
                const comments = dish.map((dish) => {
                var date = dish.date.substr(0, 10); 
                return (
                 
                  <li className = "list-unstyled">
                      <p>{dish.comment}</p>
                      <p>--{dish.author}, {date}</p>
                      
                  </li>
                );
                
            });
            return(
                    <div className="col-12 col-md-5 m-1" key={dish.id} >
                       <h4>Comments</h4>
                        <ul>
                            {comments}
                        </ul>
                    </div>
                )
            
        }
        else
            return(
                <div></div>
            );
        }

    
        render() {

            return (
                <div className="row" >
                        {this.renderDish(this.setState = this.props.dish)}

                        {this.renderComments(this.setState = this.props.dish.comments)}
                        
                </div>
            );
        }
    }
  
     
  export default Menu;