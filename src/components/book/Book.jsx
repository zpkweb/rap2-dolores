import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addUser, deleteUser, fetchUserList } from '../../actions/account'
import './Book.css'

// 展示组件
const UserList = ({ history, match, location, bookModules, onAddUser, onDeleteUser, onFetchUserList, tmpl = {} }) => (
  <section className='UserList'>
    {/* <div className='header'>
      <span className='title'>文档管理</span>
    </div> */}
    <nav className='toolbar clearfix'>
      <div className="btn-group" role="group" aria-label="Basic example">
        { bookModules.data.categorys.map(item =>
          <button type="button" className="btn btn-secondary"><Link to={`/book/list?category=${item}`} className="btn ">{item}</Link></button>
        )}
      </div>
    </nav>
    <div className='body'>
      <div className="alert alert-primary" role="alert">
        {bookModules.data.brief}
      </div>
      <div dangerouslySetInnerHTML={{ __html: bookModules.data.content }}></div>
    </div>
    <div className='footer'>
    </div>
  </section>
)

// 容器组件
const mapStateToProps = (state) => ({
  bookModules: state.bookModules
})
const mapDispatchToProps = ({
  onAddUser: addUser,
  onDeleteUser: deleteUser,
  onFetchUserList: fetchUserList
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserList)
