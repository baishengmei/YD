import React from 'react'
import { Layout } from 'antd'
const { Content }= Layout
import { Row, Col } from 'antd'
import ContentName from "../comps/ContentName"
import ContentReq from "../comps/ContentReq"
import ContentRes from "../comps/ContentRes"

class MockContent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mockNames: {
        ruleName: "",//规则名
        projName: "" //项目名
      }
    }
  }


  render() {
    return (
      <div className="content">
        <ContentName mockNames={this.state.mockNames} className="content_name" />
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          <ContentReq mockNames_req={this.state.mockNames} />
          <ContentRes mockNames_res={this.state.mockNames} />
        </div>
      </div>
    );
  }
}

export default MockContent;