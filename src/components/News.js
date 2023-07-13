import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'

export class News extends Component {
    static defaultProps={
      country:"in",
      pageSize:9,
      category:'general'
    }

    static propTypes={
      country:PropTypes.string,
      pageSize:PropTypes.number,
      category:PropTypes.string,
    }
    capitalizeFirstLetter =(string)=> {
     return string.charAt(0).toUpperCase() + string.slice(1);
    }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
    document.title=`${this.capitalizeFirstLetter(this.props.category)}  -NewsMonkey`
  }
  async updateNews(){
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=eb0b92d637394d648aba7f226b3fb66d&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json();
    // console.log(parseData)
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
    });
  }
  async componentDidMount() {
    // const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=eb0b92d637394d648aba7f226b3fb66d&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parseData = await data.json();
    // // console.log(parseData)
    // this.setState({
    //   articles: parseData.articles,
    //   totalResults: parseData.totalResults,
    //   loading: false,
    // });
    this.updateNews();
  }


  handleNextclick = async () => {
    // const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=eb0b92d637394d648aba7f226b3fb66d&page=${
    //   this.state.page + 1
    // }&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parseData = await data.json();
    // // console.log(parseData)

    this.setState({
     
      page: this.state.page + 1,
      
    });
    this.updateNews();
  };

  handlePrevclick = async () => {
    // const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=eb0b92d637394d648aba7f226b3fb66d&page=${
    //   this.state.page - 1
    // }&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });

    // let data = await fetch(url);
    // let parseData = await data.json();
    // console.log(parseData)

    this.setState({
      page: this.state.page - 1,
    });
    this.updateNews();
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="my-3 text-center">NewsMonkey Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner />}
        {!this.state.loading && (
          <div className="row">
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <Newsitem
                    title={element.title}
                    description={element.description}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        )}
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            onClick={this.handlePrevclick}
            type="button"
            className="btn btn-dark mx-2"
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            onClick={this.handleNextclick}
            type="button"
            className="btn btn-dark mx-2"
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
