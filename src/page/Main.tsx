import React from "react";
import { connect } from 'react-redux';
import ReviewCard from "../components/UI/reviewCard/ReviewCard";
import jsonData from "../common/test_data/data.json"

interface MainProps {
    language: string; // Добавьте свойство language в интерфейс MainProps
}

interface MainState {
    reviews: Array<{ name: String, review: String, date: String }>,
    limit: number,
    offset: number,
    outputReviews: Array<{ name: String, review: String, date: String }>
}

class Main extends React.Component<MainProps, MainState> {
    constructor(props: MainProps) {
        super(props);
        this.state = {
            reviews: [{ name: "Иванова Елена", review: "Очень понравилось качество продукта, буду заказывать еще.", date: "16.01.2021" }],
            limit: 10,
            offset: 0,
            outputReviews: []
        };
    }

    updateReviews = () => {
        type ReviewsObj = {
            [key: string]: { name: string, review: String, date: String }
        }
        function parseFullName(fullName: string) {
            let formattedName = "";

            // Разделяем полное имя на части
            let parts = fullName.split(' ');

            // Обрабатываем разные варианты формата
            if (parts.length === 2) {
                formattedName = parts[0] + " " + parts[1].charAt(0) + ".";
            } else if (parts.length === 1) {
                formattedName = fullName;
            } else if (parts.length === 3) {
                formattedName = parts[0] + " " + parts[2].charAt(0) + ".";
            } else if (parts.length === 4) {
                formattedName = parts[0] + " " + parts[3];
            }

            return formattedName;
        }

        const data: ReviewsObj = this.props.language === "ru" ? jsonData?.ru : jsonData?.en
        const dataArray = Object.keys(data).map(key => ({
            name: parseFullName(data[key].name),
            review: data[key].review,
            date: data[key].date
        }))
        this.setState({ reviews: dataArray, outputReviews: dataArray.slice(this.state.offset, this.state.offset + this.state.limit) })
    }


    componentDidUpdate(prevProps: MainProps) {
        if (prevProps.language !== this.props.language) {
            this.updateReviews();
        }
    }


    componentDidMount() {
        this.updateReviews()
    }

    isCurentPage = (pageNum: number): boolean => {
        if ((this.state.offset / this.state.limit) + 1 === pageNum) {
            return true
        } else return false
    }

    prevPageNum = (): number => {
        return Math.floor(this.state.offset / this.state.limit)
    }

    nextPageNum = (): number => {
        return Math.ceil(this.state.offset / this.state.limit) + 2
    }

    lastPageNum = (): number => {
        return Math.ceil(this.state.reviews?.length / this.state.limit)
    }

    currentPageNum = (): number => {
        return this.state.offset / this.state.limit + 1
    }

    handleBtnClick = (page: number) => {
        const newOffset = (page - 1) * this.state.limit
        const newOutputReviews = this.state.reviews.slice(newOffset, newOffset + this.state.limit)
        this.setState({ offset: newOffset, outputReviews: newOutputReviews })
    }

    render() {
        // console.log(this.props.language)

        return (
            <section className="main-section">
                <div className="cards-wrap">
                    {this.state.outputReviews?.length > 0 && this.state.outputReviews.map((review, index) => {
                        return (
                            <ReviewCard
                                key={index}
                                name={review.name}
                                review={review.review}
                                date={review.date}
                            />
                        )
                    })}
                </div>
                <div className="pagination">
                    <button
                        className="btn"
                        disabled={this.isCurentPage(1)}
                        onClick={() => this.handleBtnClick(1)}
                    >
                        {1}
                    </button>
                    {this.state.offset - this.state.limit > 0 &&
                        <button
                            className="btn"
                            disabled={this.isCurentPage(this.prevPageNum())}
                            onClick={() => this.handleBtnClick(this.prevPageNum())}
                        >
                            {this.prevPageNum()}
                        </button>
                    }
                    {this.state.offset !== 0 && !(this.state.offset + this.state.limit >= this.state.reviews?.length) &&

                        <button
                            className="btn"
                            disabled
                        >
                            {this.currentPageNum()}
                        </button>

                    }
                    {(this.state.offset + 2 * this.state.limit) < this.state.reviews?.length &&
                        <button
                            className="btn"
                            disabled={this.isCurentPage(this.nextPageNum())}
                            onClick={() => this.handleBtnClick(this.nextPageNum())}
                        >
                            {this.nextPageNum()}
                        </button>
                    }
                    <button
                        className="btn"
                        disabled={this.isCurentPage(this.lastPageNum())}
                        onClick={() => this.handleBtnClick(this.lastPageNum())}
                    >
                        {this.lastPageNum()}
                    </button>
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        language: state.language
    };
};

export default connect(mapStateToProps)(Main);
