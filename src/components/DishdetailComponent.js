import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {

    constructor(props) {
        super(props)
    }

    onCommentSelect(comment) {
        this.setState({ selectedComment: comment });
    }

    renderDish(dish) {
        return (
            <Card>
                <CardImg width="100%" src={this.props.dish.image} alt={this.props.dish.name} />
                <CardBody>
                    <CardTitle>{this.props.dish.name}</CardTitle>
                    <CardText>{this.props.dish.description}</CardText>
                </CardBody>
            </Card>
        );
    }

    renderComments(comments) {
        // provide an empty list if no comments are available
        const items = this.props.dish.comments || [];
        const commentList = items.map((comment,i) => {
            return (
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author},
                        &nbsp;
                        {new Intl.DateTimeFormat('en-US', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                        }).format(new Date(comment.date))}
                    </p>
                </li>
            );
        });

        return (
            <div>
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {commentList}
                </ul>
            </div>
        );


    }

    render() {
        if (this.props.dish) {
            return (
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        {this.renderDish(this.props.dish)}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        {this.renderComments(this.props.dish.comments)}
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
}

export default DishDetail;