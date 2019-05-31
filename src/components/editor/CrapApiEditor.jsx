import React, { Component } from 'react'
import { PropTypes, connect, replace, _ } from '../../family'
import { Spin } from '../utils'
import CrapApiModuleList from './CrapApiModuleList'
import CrapApiInterfaceList from './CrapApiInterfaceList'
import CrapApiInterfaceEditor from './CrapApiInterfaceEditor'
import { addRepository, updateRepository, clearRepository, fetchRepository } from '../../actions/repository'
import { fetchCrapApiModules } from '../../actions/crapApi'
import { addModule, updateModule, deleteModule, sortModuleList } from '../../actions/module'
import { addInterface, updateInterface, deleteInterface, lockInterface, unlockInterface, sortInterfaceList } from '../../actions/interface'
import { addProperty, updateProperty, deleteProperty, updateProperties, sortPropertyList } from '../../actions/property'
import { GoRepo } from 'react-icons/lib/go'

import './RepositoryEditor.css'

// DONE 2.1 import Spin from '../utils/Spin'
// TODO 2.2 缺少测试器
// DONE 2.2 各种空数据下的视觉效果：空仓库、空模块、空接口、空属性
// TODO 2.1 大数据测试，含有大量模块、接口、属性的仓库

// 展示组件
class RepositoryEditor extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }
  static propTypes = {
    auth: PropTypes.object.isRequired,
    repository: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    onClearRepository: PropTypes.func.isRequired
  }
  static childContextTypes = {
    onAddRepository: PropTypes.func.isRequired,
    onUpdateRepository: PropTypes.func.isRequired,
    onAddModule: PropTypes.func.isRequired,
    onUpdateModule: PropTypes.func.isRequired,
    onDeleteModule: PropTypes.func.isRequired,
    onSortModuleList: PropTypes.func.isRequired,
    onAddInterface: PropTypes.func.isRequired,
    onUpdateInterface: PropTypes.func.isRequired,
    onDeleteInterface: PropTypes.func.isRequired,
    onLockInterface: PropTypes.func.isRequired,
    onUnlockInterface: PropTypes.func.isRequired,
    onSortInterfaceList: PropTypes.func.isRequired,
    onAddProperty: PropTypes.func.isRequired,
    onUpdateProperty: PropTypes.func.isRequired,
    onUpdateProperties: PropTypes.func.isRequired,
    onDeleteProperty: PropTypes.func.isRequired,
    onSortPropertyList: PropTypes.func.isRequired
  }
  getChildContext () {
    return _.pick(this.props, Object.keys(RepositoryEditor.childContextTypes))
  }

  componentDidMount () {
    // if (!this.props.crapApiModules.data || this.props.crapApiModules.data.id !== id) {
      // this.props.onFetchRepository({ id })
      this.props.onFetchCrapApiModules(this.props.location.params)
    // }
  }

  constructor (props) {
    super(props)
    this.state = {
      update: false,
      exportPostman: false
    }
  }
  render () {
    let { location: { params }, repository, crapApiModules } = this.props
    let module = {
      name : ''
    };
    if(!crapApiModules.fetching && crapApiModules.modules && crapApiModules.modules.length){
      module = crapApiModules.modulesInfo;
    }
    if (module.name) {
      document.title = `RAP2 ${module.name}`
    }
    if (!crapApiModules.fetching && crapApiModules.error) return <div className='p100 fontsize-40 text-center'>{crapApiModules.error.message}</div>

    if (!module.id) return <Spin /> // // DONE 2.2 每次获取仓库都显示加载动画不合理，应该只在初始加载时显示动画。
    let mod = crapApiModules && crapApiModules.modules && crapApiModules.modules.length
      ? (crapApiModules.modules.find(item => item.id === params.mod) || crapApiModules.modules[0]) : {}
    let itf = crapApiModules.interfaces && crapApiModules.interfaces.length
      ? (crapApiModules.interfaces.find(item => item.id === params.itf) || crapApiModules.interfaces[0]) : {}
    let properties = crapApiModules.detail || []


    return (
      <article className='RepositoryEditor'>
        <div className='header'>
          <span className='title'>
            <GoRepo className='mr6 color-9' />
            <span>{module.name}</span>
          </span>
          <div className='desc'>{module.name}</div>
        </div>
        <div className='body'>
          <CrapApiModuleList mods={crapApiModules.modules} repository={crapApiModules} mod={mod} />
          <div className='InterfaceWrapper'>
            <CrapApiInterfaceList itfs={crapApiModules.interfaces} repository={repository} mod={mod} itf={itf} />
            <CrapApiInterfaceEditor itf={itf} properties={properties} mod={mod} repository={repository} />
          </div>
        </div>
      </article>
    )
  }
  handleUpdate = (e) => {
    let { store } = this.context
    let { pathname, hash, search } = store.getState().router.location
    store.dispatch(replace(pathname + search + hash))
  }
  componentWillUnmount () {
    // this.props.onClearRepository()
  }
}

// 容器组件
const mapStateToProps = (state) => ({
  auth: state.auth,
  crapApiModules: state.crapApiModules,
  repository: state.repository
})
const mapDispatchToProps = ({
  onFetchCrapApiModules: fetchCrapApiModules,
  onFetchRepository: fetchRepository,
  onAddRepository: addRepository,
  onUpdateRepository: updateRepository,
  onClearRepository: clearRepository,
  onAddModule: addModule,
  onUpdateModule: updateModule,
  onDeleteModule: deleteModule,
  onSortModuleList: sortModuleList,
  onAddInterface: addInterface,
  onUpdateInterface: updateInterface,
  onDeleteInterface: deleteInterface,
  onLockInterface: lockInterface,
  onUnlockInterface: unlockInterface,
  onSortInterfaceList: sortInterfaceList,
  onAddProperty: addProperty,
  onUpdateProperty: updateProperty,
  onUpdateProperties: updateProperties,
  onDeleteProperty: deleteProperty,
  onSortPropertyList: sortPropertyList
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RepositoryEditor)
