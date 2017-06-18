import { Row, Col, Input, Button } from 'antd';
import React, { Component, PropTypes } from "react"
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './contentReqCss/ContentReqCss.css'

class Formgroup extends Component {

	constructor(props) {
		super(props);
		this.state = {
			consIf: "",
			consExp: ""
		}
	}

	handleTagRemove = () => {
		const k = this.props.keyindex;
		this.props.tapRemove(k);
	}

	getIf = (e) => {
		const k = this.props.keyindex;
		this.setState({
			consIf: e.target.value
		}, () => {
			this.props.onConstraintChange(k, this.state.consIf, this.state.consExp);
		})
	}

	getExp = (e) => {
		const k = this.props.keyindex;
		this.setState({
			consExp: e.target.value
		}, () => {
			this.props.onConstraintChange(k, this.state.consIf, this.state.consExp);
		})
	}

	render() {

		const {k} = this.props.keyindex;

		return (
			<Row>
	          	<Col span={18} offset={3}>
		            <Row>
		              	<div className={s.g}>
		               		
		              	Group{this.props.keyindex} ($G{this.props.keyindex} )
		              	</div>
		              	<div className={s.gDel}>
		                	<Button 
			                	disabled={k===1}
	              				onClick={this.handleTagRemove}>
              				删除
              				</Button>
		              	</div>
		            </Row>
		            <Row>
		            	<div className={s.group}>
		                	<div className={s.groupIf}> 
		                  		<Col span={3}>
		                    		<p className={s.groupIfT}>约束条件:</p>
		                  		</Col>
		                  		<Col span={19} offset={1}>
		                    		<input className={s.groupIfInput} placeholder="type = type1" onChange={this.getIf}/>
		                  		</Col>
		                	</div>
		                	<div>
				                <Col span={3}>
				                    <p className={s.groupExpT}>约束表达式:</p>
				                </Col>
				                <Col span={21}>
				                   	<Input className={s.groupExp} type="textarea" placeholder="例：( $h.name=”Join”&& $h.email=”Join@163.com”)&& ($p.name=”*” & $p.email=”*@a.netease.com”)" autosize={{ minRows: 3, maxRows: 3 }} onChange={this.getExp}/>
				                </Col>
			            	</div>
		            	</div>
		            </Row>
	          	</Col>
	        </Row>
		)
	}
}

export default withStyles(s)(Formgroup);