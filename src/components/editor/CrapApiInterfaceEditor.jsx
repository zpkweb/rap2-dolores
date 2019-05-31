import React, { Component } from 'react'
import { connect } from '../../family'

// TODO 2.x 参考 MySQL Workbench 的字段编辑器
// TODO 2.x 支持复制整个接口到其他模块、其他项目
class InterfaceEditor extends Component {
  render () {
    const { properties } = this.props
    console.log(properties)
    return (
      <article>
        { JSON.stringify(properties) }
      </article>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})
const mapDispatchToProps = ({})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InterfaceEditor)