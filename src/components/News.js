import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export class News extends Component {
constructor(){
super();
this.state = {
  articles: [],
  loading:false,
  page:1
}
}
async componentDidMount(){
  let url=`https://newsapi.org/v2/top-headlines?country=us&apiKey=00d639c2e9cf4c8cb043d42cb9c32c30&page=1&pageSize=20`;
  this.setState({loading:true});
  let data=await fetch(url);
  let parseData=await data.json()
  console.log(parseData)
  this.setState({articles: parseData.articles,
    totalResults: parseData.totalResults,
  loading:false})
}
handleNextClick= async()=>{
  if(!this.state.page +1 > Math.ceil(this.state.totalResults/20))
  {
  let url=`https://newsapi.org/v2/top-headlines?country=us&apiKey=00d639c2e9cf4c8cb043d42cb9c32c30&page=${this.state.page +1}&pageSize=20`;
  this.setState({loading:true})
  let data=await fetch(url);
  let parseData=await data.json()
  console.log(parseData)
  this.setState({articles: parseData.articles,
    page: this.state.page +1,
    loading:false
  })
  }
}
handlePrevClick= async()=>{
  let url=`https://newsapi.org/v2/top-headlines?country=us&apiKey=00d639c2e9cf4c8cb043d42cb9c32c30&page=${this.state.page - 1}&pageSize=20`;
  this.setState({loading:true})
  let data=await fetch(url);
  let parseData=await data.json()
  console.log(parseData)
  this.setState({articles: parseData.articles,
    page: this.state.page - 1,
  loading:false})
}
  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center'>MonkeyNews- Top Headlines</h1>
       {this.state.loading && <Spinner/>}
        <div className='row'>
        {this.state.articles.map((element) => {
          return <div className='col-md-4' key={element.url}>
            <NewsItem title={element.title?element.title.slice(0,20):""} description={element.description?element.description.slice(0,45):""} imageUrl={element.urlToImage?element.urlToImage:"https://ichef.bbci.co.uk/news/1024/branded_news/C705/production/_129394905_front.jpg"} newsUrl={element.url} />
            </div>})}
        </div>
        <div className='container d-flex justify-content-between'>
        <button disabled={this.state.page <=1 }type="button" className="btn btn-outline-dark" onClick={this.handlePrevClick}>&larr; Previous</button>

        <button  type="button" className="btn btn-outline-dark" onClick={this.handleNextClick}>  &rarr; Next</button>
        </div>
      </div>
     
    )
  }
}

export default News
