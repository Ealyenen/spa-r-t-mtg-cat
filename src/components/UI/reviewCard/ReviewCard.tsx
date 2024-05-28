import React from "react";

interface CardProps {
    name: String,
    review: String,
    date: String
}

class ReviewCard extends React.Component<CardProps>  {

    render(){

        return(
            <div className="review-card">
                <p className="reviw-title">{this.props.name}</p>
                <p className="reviw-subtitle">{this.props.date}</p>
                <p className="reviw-txt">{this.props.review}</p>
            </div>
        )
    }
}

export default ReviewCard;
