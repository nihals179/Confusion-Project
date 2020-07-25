import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';



class Dishdetail extends Component {
  
        constructor(props) {
            super(props);
            console.log(props);
            this.state = {
                selectedDish: null
            }
            
        }

    
        renderDish(dish) {
            if (dish != null )
                return(
                <div key={dish.id}>
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
                
                return (
                 
                  <li  key={dish.id} >
                      <p>{dish.comment}</p>
                      <p>--{dish.author},{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(dish.date)))}</p>
                      
                  </li>
                );
                
            });
            return(
                    <div key={dish.id} >
                       <h4>Comments</h4>
                        <ul  className = "list-unstyled">
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
                    <div className="container">
                    <div className="row">
                        <Breadcrumb>
    
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{this.props.dish.name}</h3>
                            <hr />
                        </div>                
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            { this.renderDish(this.props.dish)}
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            { this.renderComments(this.props.comments)}
                        </div>
                    </div>
                    </div>
                );
        }
    }
  
     
  export default Dishdetail;