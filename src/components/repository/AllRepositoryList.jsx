import React, { Component } from 'react'
import { connect } from 'react-redux'
import { contextTypes, childContextTypes, getChildContext, RepositoriesTypeDropdown, SearchGroup, mapDispatchToProps, RepositoryListWithSpin, PaginationWithLocation } from './RepositoryListParts'
import CrapApi from './crapApi'

import './Repository.css'

// 全部仓库
class AllRepositoryList extends Component {
  static contextTypes = contextTypes
  static propTypes = {}
  static childContextTypes = childContextTypes
  getChildContext = getChildContext.bind(this)
  render () {
    let { location, match, repositories, crapApi } = this.props
    return (
      <section className='RepositoryListWrapper'>
        <nav className='toolbar clearfix'>
          <RepositoriesTypeDropdown url={match.url} />
          <SearchGroup name={location.params.name} />
        </nav>
        <div className='body'>
          <div className='RepositoryList row'>
            {crapApi.data.map(crapapi =>
              <div key={crapapi.id} className='col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3'>
                <CrapApi crapapi={crapapi} editor='/repository/editor/crapapi' />
              </div>
            )}
          </div>
        </div>
        <div className='body'>
          <RepositoryListWithSpin name={location.params.name} repositories={repositories} />
        </div>
        <div className='footer'>
          <PaginationWithLocation calculated={repositories.pagination} />
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state) => ({
  joiner: state.auth,
  repositories: state.repositories,
  crapApi: state.crapApi,
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllRepositoryList)
