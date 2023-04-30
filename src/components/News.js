import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps={
    country:'us',
    category: 'general'
  }
  static propTypes={
    country: PropTypes.string,
    category: PropTypes.string
  }
constructor(props){
super(props);
this.state = {
  articles: [],
  loading:false,
  page:1,
  totalResults:0
}
}
async componentDidMount(){
  this.props.setProgress(10)
  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=20`;
  this.setState({loading:true});
  let data=await fetch(url);
  this.props.setProgress(30)
  let parseData=await data.json()
  this.props.setProgress(70)
  this.setState({articles: parseData.articles,
    totalResults: parseData.totalResults,
  loading:false,
})
this.props.setProgress(100)
}

// handlePrevClick= async()=>{
//   let url=`https://newsapi.org/v2/top-headlines?county=${this.props.country}&category=${this.props.category}&apiKey=00d639c2e9cf4c8cb043d42cb9c32c30&page=${this.state.page - 1}&pageSize=20`;
//   this.setState({loading:true})
//   let data=await fetch(url);
//   let parseData=await data.json()
//   console.log(parseData)
//    this.setState({articles: parseData.articles,
//     page: this.state.page - 1,
//   loading:false})
// }
fetchMoreData = async () => {
    this.setState({
      page: this.state.page + 1
    });
  const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page +1}&pageSize=20`;
  let data=await fetch(url);
  let parseData=await data.json()
   this.setState({articles: this.state.articles.concat(parseData.articles),
    totalResults:parseData.totalResults,
  })
};
  render() {
    return (
      <>
        <h1 className='text-center' style={{marginTop: '90px'}}>MonkeyNews- Top {this.props.category} Headlines</h1>
       {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner/>}>
        <div className='container'>
        <div className='row'>
        {this.state.articles.map((element) => {
          return <div className='col-md-4' key={element.url}>
            <NewsItem title={element.title?element.title.slice(0,20):""} description={element.description?element.description.slice(0,45):""} imageUrl={element.urlToImage?element.urlToImage:"https://ichef.bbci.co.uk/news/1024/branded_news/C705/production/_129394905_front.jpg"} newsUrl={element.url} author={element.author} date={element.publishedAt}/>
            </div>})}
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className='container d-flex justify-content-between'>
        <button disabled={this.state.page <=1 }type="button" className="btn btn-outline-dark" onClick={this.handlePrevClick}>&larr; Previous</button>

        <button  type="button" className="btn btn-outline-dark" onClick={this.handleNextClick}>  &rarr; Next</button>
        </div> */}
      </>
     
    )
  }
}

export default News
