import React, { Component } from 'react';
import {Card, CardImg,Breadcrumb, BreadcrumbItem,Button, Modal,
    ModalHeader, ModalBody, Label, Col, Row} from 'reactstrap';
import { Link } from 'react-router-dom';
import { LocalForm, Control, Errors, } from 'react-redux-form';
import { Loading } from './LoadingComponent';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
            touched: {
                author: false,
                // rating : false,
                // comment: false
            }
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleComment = this.handleComment.bind(this);
    }

    toggleModal() {
        this.setState({isModalOpen: !this.state.isModalOpen
        });
    }

    handleComment(values){
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.message);
        // console.log('Current State is: ' + JSON.stringify(values));
        // alert('Current State is: ' + JSON.stringify(values));
    }


    render() {
        return (
            <div>
                <Button outline onClick={this.toggleModal} color="secondary"><span className="fa fa-pencil fa-lg" /> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleComment(values)}>
                            <Col offset="1">
                                <Row className="form-group" md={10}>
                                    <Label htmlFor="rating">Rating</Label>
                                    <Control.select model=".rating" id="rating" name="rating"
                                                    className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Row>
                            </Col>
                            <Col offset="1">
                                <Row className="form-group">
                                    <Label htmlFor="author">Your Name</Label>
                                    <Control.text model=".author" id="author" name="author"
                                                  placeholder="Your Name"
                                                  className="form-control"
                                                  validators={{
                                                      required, minLength: minLength(3), maxLength: maxLength(15)
                                                  }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Row>
                            </Col>
                            <Col offset="1">
                                <Row className="form-group">
                                <Label htmlFor="message">Comment</Label>
                                <Control.textarea model=".message" id="message" name="message"
                                                      rows="6"
                                                      className="form-control" />

                                </Row>
                            </Col>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

function RenderDish({ dish }) {
    return (
        <div key={dish.id} className="col-12 col-md-5 m-1">
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <h4 className="text-left">{dish.name}</h4>
                <p className="text-left">{dish.description}</p>
            </Card>
        </div>
    );
}

function RenderComments({comments, addComment, dishId}) {
    const commentsRendered = comments.map((comment) => {
        const commentDate = new Date(comment.date)
        const dateMonDdYYYY = commentDate.toLocaleDateString('us-EN', { year: 'numeric', month: 'short', day: '2-digit' })
        return (
            <li key={comment.id} className="text-left">
                <p>{comment.comment}</p>
                <p>--{comment.author} , {dateMonDdYYYY}</p>
            </li>
        );
    });

    return (
        <div >
            <h4 className="text-left">Comments</h4>
            <ul className="list-unstyled">
                {commentsRendered}
            </ul>
            <CommentForm dishId={dishId} addComment={addComment} />
        </div>
    );
}

const DishDetail = (props) => {
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null)



        if (props.dish != null) {
        return (
            <div class="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish={props.dish} />
                    <RenderComments comments={props.comments}
                                    addComment={props.addComment}
                                    dishId={props.dish.id}/>

                </div>
            </div>
        );
    }
    else {
        return (
            <div></div>
        );
    }
}

export default DishDetail;