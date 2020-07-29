import React,{Component} from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Button,
    Modal,ModalBody,ModalHeader,Row ,Label,Col} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
import { Link } from 'react-router-dom';


const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


function RenderDish({dish}){
    if (dish.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (dish.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{dish.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (dish != null) {
        return(
        <div key={dish.id}>
            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
            <Card>
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
            </FadeTransform>
    </div>
        )}
    else
        return(
            <div></div>
        )
}

function RenderComments({comments, addComment, dishId}){
    if (comments !== null){
        const comment = comments.map((comment) => {
            return (
                <Stagger in key={comment.id}>
                <Fade in>
                <li >
                <p>{comment.comment}</p>
                <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                </li>
                </Fade>
                </Stagger>
            );
    
    });
    return(
            <div key={comments.id} >
               <h4>Comments</h4>
                <ul  className = "list-unstyled">
                    {comment}
                </ul>
                <CommentForm dishId={dishId} addComment={addComment} />
            </div>
        )   
    }
    else
         return(
        <div></div>
            );
}


function Dishdetail(props) {
    return (
        <div className="container">
        <div className="row">
            <Breadcrumb>
                <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
                <h3>{props.dish.name}</h3>
                <hr />
            </div>                
        </div>
        <div className="row">
            <div className="col-12 col-md-5 m-1">
                <RenderDish dish={props.dish}/>
                
            </div>
            <div className="col-12 col-md-5 m-1">
            <RenderComments comments={props.comments}
                addComment={props.addComment}
                dishId={props.dish.id}
            />
            </div>
        </div>
        </div>
    )
}


class CommentForm extends Component{

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
        };

        this.toggleModal = this.toggleModal.bind(this);

      }

    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
      }

      handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
        // event.preventDefault();
      }

    render(){
        return(
            <div>
                <Button outline color="secondary" onClick={this.toggleModal}>
                    <i className="fa fa-pencil"></i> Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                <LocalForm className="m-3" onSubmit={(values) => this.handleSubmit(values)}>
                             <Col className="form-group">
                                <Label htmlFor="rating" md={5}>Ratings</Label>
                                <Col md={10}>
                                    <Control.select model=".rating" id="rating" name="rating"                                  
                                        className="form-control"
                                        validators={{
                                             
                                        }}
                                         >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                                <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                     />
                                </Col>
                            </Col>
                            <Col className="form-group">
                                <Label htmlFor="author" md={5}>Your Name</Label>
                                <Col md={10}>
                                    <Control.text model=".author" id="author" name="author"
                                        className="form-control"
                                        validators={{
                                           
                                            minLength: minLength(3), 
                                            maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Col>
                            </Col>
                            <Col className="form-group">
                                <Label htmlFor="comment" md={5}>Comments</Label>
                                <Col md={10}>
                                    <Control.textarea md={12} model=".comment" id="comment" name="comment"
                                        className="form-control"
                                        validators={{
                                             minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".comment"
                                        show="touched"
                                        messages={{
                                        
                                            minLength: 'Must be greater than 2 numbers',
                                            maxLength: 'Must be 100 numbers or less',
                                        }}
                                     />
                                </Col>
                            </Col>
                            <Row className="form-group">
                                <Col md={{size:10, offset: 1}}>
                                    <Button type="submit" value='submit' color="primary">
                                    Send Feedback
                                    </Button>
                                </Col>
                            </Row>
                            </LocalForm>
                    </ModalBody>
                </Modal>

            </div>
        )
    }
}

export default Dishdetail
