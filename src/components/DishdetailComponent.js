import React,{Component} from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Button,
    Modal,ModalBody,ModalHeader,Row ,Label,Col} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));


function RenderDish({dish}){
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
        )
    else
        return(
            <div></div>
        )
}

function RenderComments({comments}){
    console.log(comments)
    if (comments !== null){
        const comment = comments.map((comments) => {
        return (
          <li  key={comments.id} >
              <p>{comments.comment}</p>
              <p>--{comments.author},{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comments.date)))}</p>
           
          </li>
        );
        
    });
    return(
            <div key={comments.id} >
               <h4>Comments</h4>
                <ul  className = "list-unstyled">
                    {comment}
                </ul>
                <CommentForm/>
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
                <RenderComments comments={props.comments}/>
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

    render(){
        return(
            <div>
                
                <Button outline color="secondary" onClick={this.toggleModal}>
                    <i class="fa fa-pencil"></i> Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                <LocalForm className="m-3" onSubmit={(values) => this.handleSubmit(values)}>
                             <Col className="form-group">
                                <Label htmlFor="Ratings" md={5}>Ratings</Label>
                                <Col md={10}>
                                    <Control.input type="number" model=".Ratings" id="Ratings" name="Ratings"                                  
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".Ratings"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            isNumber: 'isNumber'
                                        }}
                                     />
                                </Col>
                            </Col>
                            <Col className="form-group">
                                <Label htmlFor="name" md={5}>Your Name</Label>
                                <Col md={10}>
                                    <Control.text model=".name" id="name" name="name"
                                        className="form-control"
                                        validators={{
                                            required: 'Required', 
                                            minLength: minLength(3), 
                                            maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Col>
                            </Col>
                            <Col className="form-group">
                                <Label htmlFor="comments" md={5}>Comments</Label>
                                <Col md={10}>
                                    <Control.textarea md={12} model=".comments" id="comments" name="comments"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15), isNumber
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".comments"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 numbers',
                                            maxLength: 'Must be 100 numbers or less',
                                        }}
                                     />
                                </Col>
                            </Col>
                            <Row className="form-group">
                                <Col md={{size:10, offset: 1}}>
                                    <Button type="submit" color="primary">
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
