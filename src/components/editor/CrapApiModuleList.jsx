import React, { Component } from 'react'
import { PropTypes, connect, Link, replace, URI, StoreStateRouterLocationURI } from '../../family'
import { RModal, RSortable } from '../utils'
import ModuleForm from './ModuleForm'

class Module extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    repository: PropTypes.object.isRequired,
    mod: PropTypes.object.isRequired
  }
  static contextTypes = {
    store: PropTypes.object,
    onDeleteModule: PropTypes.func
  }
  constructor (props) {
    super(props)
    this.state = { update: false }
  }
  render () {
    let { store } = this.context
    let { repository, mod } = this.props
    let uri = StoreStateRouterLocationURI(store).removeSearch('itf')
    let selectHref = URI(uri).setSearch('mod', mod.id).href()
    return (
      <div className='Module clearfix'>
        <Link to={selectHref} className='name'>{mod.name}</Link>
        <div className='toolbar'>
         
        </div>
        <RModal when={this.state.update} onClose={e => this.setState({ update: false })} onResolve={this.handleUpdate}>
          <ModuleForm title='修改模块' mod={mod} repository={repository} />
        </RModal>
      </div>
    )
  }
  handleUpdate = (e) => {
    let { store } = this.context
    store.dispatch(replace(StoreStateRouterLocationURI(store).href()))
  }
  handleDelete = (e, mod) => {
    e.preventDefault()
    let message = `模块被删除后不可恢复，并且会删除相关的接口！\n确认继续删除『#${mod.id} ${mod.name}』吗？`
    if (window.confirm(message)) {
      this.context.onDeleteModule(this.props.mod.id, () => {
        let { store } = this.context
        let uri = StoreStateRouterLocationURI(store)
        let deleteHref = this.props.active ? URI(uri).removeSearch('mod').href() : uri.href()
        store.dispatch(replace(deleteHref))
      }, this.props.repository.id)
    }
  }
}

class ModuleList extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired,
    onSortModuleList: PropTypes.func.isRequired
  }
  static propTypes = {
    auth: PropTypes.object.isRequired,
    repository: PropTypes.object.isRequired,
    mods: PropTypes.array,
    mod: PropTypes.object
  }
  static childContextTypes = {}
  getChildContext () {}
  constructor (props) {
    super(props)
    this.state = { create: false }
  }
  render () {
    let { auth, repository = {}, mods = [], mod = {} } = this.props
    return (
      <RSortable onChange={this.handleSort}>
        <ul className='ModuleList clearfix'>
          {mods.map((item, index) =>
            <li key={item.id} className={item.id === mod.id ? 'active sortable' : 'sortable'} data-id={item.id}>
              <Module key={item.id} mod={item} active={item.id === mod.id} repository={repository} auth={auth} />
            </li>
          )}
          
        </ul>
      </RSortable>
    )
  }
  handleCreate = () => {
    let { store } = this.context
    store.dispatch(replace(StoreStateRouterLocationURI(store).href()))
  }
  handleSort = (e, sortable) => {
    let { onSortModuleList } = this.context
    onSortModuleList(sortable.toArray())
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})
const mapDispatchToProps = ({})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModuleList)
