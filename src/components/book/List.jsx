import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Pagination from '../utils/Pagination'
import './List.css'

// 展示组件
class BookList extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    let {  location, bookList } = this.props;
    return (
      <section className='UserList'>
    <div className='header'>
      <span className='title'>文档管理</span>
    </div>
    <nav className='toolbar clearfix'>
      <div className="btn-group" role="group" aria-label="Basic example">
        { bookList.others.categorys.map(item =>
          <button key={item} type="button" className={`btn btn-secondary ${ item === bookList.others.category ? "active": ""}`}><Link to={`/book/list?category=${item}`} className="btn ">{item}</Link></button>
        )}
      </div>
    </nav>
    <div className='body'>
      <div className="list-group">
        { bookList.data.map(item =>
          <Link key={item.id} to={`/book/detail?id=${item.id}`} className="list-group-item list-group-item-action">{item.name}</Link>
        )}
      </div>
    </div>
    <div className='footer'>
      <Pagination location={location} calculated={bookList.page} />
    </div>
  </section>
    )
  }
}


// 容器组件
const mapStateToProps = (state) => ({
  bookList: state.bookList
})

export default connect(
  mapStateToProps
)(BookList)
