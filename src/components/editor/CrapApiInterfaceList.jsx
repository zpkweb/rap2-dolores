import React, { Component } from 'react'
import { PropTypes, connect, Link, replace, StoreStateRouterLocationURI } from '../../family'
import { RSortable } from '../utils'
import { GoLock } from 'react-icons/lib/go'
import { getCurrentInterface } from '../../selectors/interface'

class Interface extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired,
    onDeleteInterface: PropTypes.func.isRequired
  }
  static propTypes = {
    auth: PropTypes.object.isRequired,
    repository: PropTypes.object.isRequired,
    mod: PropTypes.object.isRequired,
    itf: PropTypes.object.isRequired,
    active: PropTypes.bool.isRequired,
    curItf: PropTypes.object
  }
  constructor (props) {
    super(props)
    this.state = { update: false }
  }
  render () {
    let { store } = this.context
    let { itf } = this.props
    let selectHref = StoreStateRouterLocationURI(store).setSearch('itf', itf.id).href()
    return (
      <div className='Interface clearfix'>
        {/* 这层 name 包裹的有点奇怪，name 应该直接加到 a 上 */}
        {/* TODO 2.3 <a> 的范围应该扩大至整个 Interface，否则只有点击到 <a> 才能切换，现在不容易点击到 <a> */}
        <span className='name'>
          {itf.locker ? <span className='locked mr5'><GoLock /></span> : null}
          <Link to={selectHref} onClick={(e) => {
            if (this.props.curItf && this.props.curItf.locker && !window.confirm('编辑模式下切换接口，会导致编辑中的资料丢失，是否确定切换接口？')) {
              e.preventDefault()
            }
          }}><span>{itf.interfaceName}</span></Link>
        </span>
      </div>
    )
  }
  handleDelete = (e, itf) => {
    e.preventDefault()
    let message = `接口被删除后不可恢复！\n确认继续删除『#${itf.id} ${itf.name}』吗？`
    if (window.confirm(message)) {
      let { onDeleteInterface } = this.context
      onDeleteInterface(itf.id, () => {
        let { store } = this.context
        let uri = StoreStateRouterLocationURI(store)
        let deleteHref = this.props.active ? uri.removeSearch('itf').href() : uri.href()
        store.dispatch(replace(deleteHref))
      })
    }
  }
  handleUpdate = (e) => {
  }
}

class InterfaceList extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired,
    onSortInterfaceList: PropTypes.func.isRequired
  }
  static propTypes = {
    auth: PropTypes.object.isRequired,
    repository: PropTypes.object.isRequired,
    mod: PropTypes.object.isRequired,
    itfs: PropTypes.array,
    itf: PropTypes.object,
    curItf: PropTypes.object
  }
  constructor (props) {
    super(props)
    this.state = { create: false }
  }
  render () {
    let { auth, repository, mod, itfs = [], itf, curItf } = this.props
    console.log(7777,itf)
    if (!mod.id) return null
    return (
      <article className='InterfaceList'>
        <RSortable onChange={this.handleSort} >
          <ul className='body'>
            {itfs.map(item =>
              <li key={item.id} className={item.id === itf.id ? 'active sortable' : 'sortable'} data-id={item.id}>
                <Interface repository={repository} mod={mod} itf={item} active={item.id === itf.id} auth={auth} curItf={curItf} />
              </li>
            )}
          </ul>
        </RSortable>
        
      </article>
    )
  }
  handleCreate = (e) => {
  }
  handleSort = (e, sortable) => {
    let { onSortInterfaceList } = this.context
    onSortInterfaceList(sortable.toArray())
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  curItf: getCurrentInterface(state)
})

const mapDispatchToProps = ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InterfaceList)
