import React from 'react'
import { Layout } from 'antd'
const { Content }= Layout
import { Row, Col } from 'antd'
import ContentName from "../comps/content/ContentName"
import ContentReq from "../comps/content/ContentReq"
import ContentRes from "../comps/content/ContentRes"

class MockContent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mockNames: {
        ruleName: "test1",//规则名
        projName: "yadk1" //项目名
      }
    }
  }

  handleChange(e) {
    const that = this;
    that.setState({ 
      mockNames: {
        ruleName: e.target.value,
        projName: "yadk2"
      }
    });
  }

  render() {
    return (
      <div className="content">
        <ContentName 
          mockNames={this.state.mockNames} 
          className="content_name" 
          changeRulename={this.handleChange.bind(this)}
        />
        <div className="contentRe">
          <ContentReq mockNames_req={this.state.mockNames} />
          <ContentRes mockNames_res={this.state.mockNames} />
        </div>
      </div>
    );
  }
}

export default MockContent;