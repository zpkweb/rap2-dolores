import React, { Component } from 'react'
import { connect, PropTypes, Link, replace, moment } from '../../family'
import { GoRepo, GoOrganization } from 'react-icons/lib/go'
// DONE 2.1 iconfont => octicons

class Repository extends Component {
  static contextTypes = {
    store: PropTypes.object,
    location: PropTypes.object,
    onDeleteRepository: PropTypes.func
  }
  constructor (props) {
    super(props)
    this.state = { update: false }
  }
  render () {
    let { crapapi, editor } = this.props
    return (
      <div className='Repository card'>
        <div className='card-block'>
          <div className='name'>
            <GoRepo className='mr6 color-9' />
            <Link to={`${editor}?modulesId=${crapapi.modulesId}&password=www.zbgedu.com&code=1111&current=1`}>{crapapi.menuName}</Link>
          </div>
          <div className='desc'>
            {crapapi.menuName}
          </div>
          {/* TODO 2.x 成员列表参考 ProductHunt，仓库成员不怎么重要，暂时不现实 */}
          {/* <div className='members'>
            {repository.members.map(user =>
              <img key={user.id} alt={user.id} title={user.fullname} src={`https://work.alibaba-inc.com/photo/${user.id}.220x220.jpg`} className='avatar' />
            )}
          </div> */}
          
        </div>
        <div className='card-block card-footer'>
          <span className='ownername'><GoOrganization />中博教育</span>
          <span className='fromnow'>{moment(crapapi.createTime).fromNow()}更新</span>
        </div>
      </div>
    )
  }
  handleDeleteRepository = (e) => {
    e.preventDefault()
    let { crapapi } = this.props
    let message = `仓库被删除后不可恢复，并且会删除相关的模块和接口！\n确认继续删除『#${crapapi.id} ${crapapi.name}』吗？`
    if (window.confirm(message)) {
      let { onDeleteRepository } = this.context
      onDeleteRepository(crapapi.id)

      let { store, location: { pathname, hash, search } } = this.context
      store.dispatch(replace(pathname + hash + search))
    }
  }
  handleUpdateRepository = (e) => {
  }
}

// 容器组件
const mapStateToProps = (state) => ({
  auth: state.auth
})
const mapDispatchToProps = ({})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Repository)
