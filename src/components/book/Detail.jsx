import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import './Detail.css'

// 展示组件
class BookDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      update: false,
      exportPostman: false
    }
  }
  render () {
    let {  bookDetail } = this.props
    return (
      <section className='UserList'>
    <div className='header'>
      <span className='title'>文档管理</span>
    </div>
    <nav className='toolbar clearfix'>
      <div className="btn-group" role="group" aria-label="Basic example">
        { bookDetail.data.categorys.map(item =>
          <button key={item} type="button" className={`btn btn-secondary ${ item === bookDetail.data.category ? "active": ""}`}><Link to={`/book/list?category=${item}`} className="btn ">{item}</Link></button>
        )}
      </div>
    </nav>
    <div className='body'>
      <div className="list-group">
        <div dangerouslySetInnerHTML={{ __html: bookDetail.data.detail.content }}></div>
      </div>
    </div>
    <div className='footer'>
      
    </div>
  </section>
    )
  }
}


// 容器组件
const mapStateToProps = (state) => ({
  bookDetail: state.bookDetail
})

export default connect(
  mapStateToProps
)(BookDetail)
