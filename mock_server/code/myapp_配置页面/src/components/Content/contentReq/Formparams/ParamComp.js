import React, { PropTypes, Component } from 'react';
import { Row, Col, Icon } from "antd"
import { Form, Input, Cascader } from 'antd'
const FormItem = Form.Item
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from '../contentReqCss/ContentReqCss.css'
import { options, allOptionItems } from '../Utilsvari'
import ParamInput from './ParamInput'
import ParamSel from './ParamSel'

let uuid = 1;
class paramComp extends Component {

	constructor(props) {
		super(props);
		this.state = {
			datatype: 0,
			datatype2: 0,
			datatype2_1: 0,
			datatype2_2: 0,
			datatype2_3: 0,
			datatype2_4: 0,
			datatype2_5: 0,
			datatype3: 0,
			indexTemp: [1]
		}
	}

	remove = (k) => {
	    const indexTemp = this.state.indexTemp;
	    if (indexTemp.length === 1) {
	      return;
	    };console.log("indexTemp:",indexTemp);
	    const arrindexTemp = [];
	    for(let temp=1; temp<=indexTemp.length-1; temp++){
	      arrindexTemp.push(temp);
	    }
	    this.setState({
	      indexTemp: arrindexTemp,
	    });
  	}

	add = () => {
	    // uuid++;
	    const indexTemp = this.state.indexTemp;
	    uuid = indexTemp.length +1;
	    const nextindexTemp = indexTemp.concat(uuid);
	    this.setState({
	      indexTemp: nextindexTemp
	    });
		console.log("indexTemp:", indexTemp);
	}

	DynamicFormArrObj = (k) => {
		switch(k){
			case "arrBe":
			return (
				<div>
					<Row>
						<Col span={3} offset={1}>
							<div className={s.arrLabel}>项数：</div>
						</Col>
						<Col span={4}>
							<ParamInput placevalue="min"/>
						</Col>
						<Col span={1}>~</Col>
						<Col span={4}>
							<ParamInput placevalue="max"/>
						</Col>
						<Col className={s.noteTips}>(array项数)</Col>
					</Row>
					<Row>
						<Row>
							<Col span={3} offset={1}>
								<div className={s.arrLabel}>子项：</div>
							</Col>
						
							<Col span={5}>
								<ParamSel onChangeSel={this.changeSel2} />
							</Col>
							<Col span={15}>
			                  <div>{this.DynamicFormSome(this.state.datatype2)}</div>
			                </Col>
		                </Row>
		                <Row>
		                	<Col span={19} offset={4}>
		               			{this.DynamicFormArrObj2(this.state.datatype2)}
		               		</Col>
		                </Row>
					</Row>
				</div>
			)
			break;
			case "objBe":
			{const indexTemp = this.state.indexTemp;
		    const inFormParam = indexTemp.map((k, index) => {
		      return (
		        <div key={k}>
					<Row>
						<Col span={3} offset={1}>
							<ParamInput placevalue="key"/>
						</Col>
						<Col span={18}>
							<Row>
				                <Col span={5}>
				                  	<ParamSel onChangeSel={this.changeSel2}/>		                  
				                </Col>
				                <Col span={19}>
				                  <div>{this.DynamicFormSome(this.state.datatype2)}</div>
				                </Col>
			               	</Row>
			               	<Row>
				               	<Col span={19}>
				               		{this.DynamicFormArrObj2(this.state.datatype2)}
				               	</Col>
			               	</Row>
						</Col>
						<Col span={1}>
				            <Icon
				                className={s.dynamic_delete_button}
				                type="minus-circle-o"
				                onClick={() => this.remove(k)}
				              />
			            	</Col>
			            <Col span={1}>
			            	<Icon className={s.dynamic_plus_button}
			                	type="plus-circle-o"
			                	onClick={this.add.bind(this)}
			              	/>
			            </Col>
					</Row>
					
				</div>
		      )
		    })
			return (
				<div>{inFormParam}</div>
			)}
			break;
			default:
			return;
		}
	}

	DynamicFormArrObj2 = (k) => {
		switch(k){
			case "arrBe":
			return (
				<div>
					<Row>
						<Col span={3} offset={1}>
							<div className={s.arrLabel}>项数：</div>
						</Col>
						<Col span={4}>
							<ParamInput placevalue="min"/>
						</Col>
						<Col span={1}>~</Col>
						<Col span={4}>
							<ParamInput placevalue="max"/>
						</Col>
						<Col className={s.noteTips}>(array项数)</Col>
					</Row>
					<Row>
						<Row>
							<Col span={3} offset={1}>
								<div className={s.arrLabel}>子项：</div>
							</Col>
						
							<Col span={5}>
								<ParamSel onChangeSel={this.changeSel3} />
							</Col>
							<Col span={15}>
			                  <div>{this.DynamicFormSome(this.state.datatype3)}</div>
			                </Col>
		                </Row>
		                <Row>
		                	<Col span={19} offset={4}>
		               			
		               		</Col>
		                </Row>
					</Row>
				</div>
			)
			break;
			case "objBe":
			{const indexTemp = this.state.indexTemp;
		    const inFormParam = indexTemp.map((k, index) => {
		      return (
		        <div key={k}>
					<Row>
						<Col span={3} offset={1}>
							<ParamInput placevalue="key"/>
						</Col>
						<Col span={18}>
							<Row>
				                <Col span={5}>
				                  	<ParamSel onChangeSel={this.changeSel3}/>		                  
				                </Col>
				                <Col span={19}>
				                  <div>{this.DynamicFormSome(this.state.datatype3)}</div>
				                </Col>
			               	</Row>
			               	<Row>
				               	<Col span={19}>
				               		{this.DynamicFormArrObj2(this.state.datatype3)}
				               	</Col>
			               	</Row>
						</Col>
						<Col span={1}>
				            <Icon
				                className={s.dynamic_delete_button}
				                type="minus-circle-o"
				                onClick={() => this.remove(k)}
				              />
			            	</Col>
			            <Col span={1}>
			            	<Icon className={s.dynamic_plus_button}
			                	type="plus-circle-o"
			                	onClick={this.add.bind(this)}
			              	/>
			            </Col>
					</Row>
					
				</div>
		      )
		    })
			return (
				<div>{inFormParam}</div>
			)}
			break;
			default:
			return;
		}
	}

	DynamicFormSome = (k) => {
		switch(k){
			case "Eq":
			return (<Col span={5}><ParamInput placevalue="value"/></Col>)
			break;
			case "iscBe":
			return (
				<div>
					<Col span={3}>
						<ParamInput placevalue="min"/>
					</Col>
					<Col span={1}>~</Col>
					<Col span={3}>
						<ParamInput placevalue="max"/>
					</Col>
				</div>
			)
			break;
			case "flBe":
			return (
				<Col>
					<Row>
						<Col span={3}>
							<ParamInput placevalue="min"/>
						</Col>
						<Col span={1}>~</Col>
						<Col span={3}>
							<ParamInput placevalue="max"/>
						</Col>
						<Col className={s.noteTips}>(整数部分范围)</Col>
					</Row>
					<Row>
						<Col span={3}>
							<ParamInput placevalue="min"/>
						</Col>
						<Col span={1}>~</Col>
						<Col span={3}>
							<ParamInput placevalue="max"/>
						</Col>
						<Col className={s.noteTips}>(小数部分范围)</Col>
					</Row>
				</Col>
			)
			break;
			case "arrBe":
			return (
				<div></div>
			)
			break;
			case "non":
			return (
				<div></div>
			)
			break;
			case "objBe":
			return (
				<Col>
					
				</Col>
			)
			break;
		}
	}

	changeSel = (k) => {
		console.log("select.value", k[1]);
		if(/\w+Eq$/.test(k[1])){
			console.log("等於");
			this.setState({
				datatype: "Eq"
			})
		}else if(/^intBe$|^strBe$|^chineseBe$/.test(k[1])){
			console.log("整數、str和中文的范围");
			this.setState({
				datatype: "iscBe"
			})
		}else if(/^floatBe$/.test(k[1])){
			console.log("小数范围");
			this.setState({
				datatype: "flBe"
			})
		}else if(/^arrBe$/.test(k[1])){
			console.log("数组范围");
			this.setState({
				datatype: "arrBe"
			})
		}else if(/^bool$|^email$|^ip$|^url$|^address$|^thedate$/.test(k[0])){
			this.setState({
				datatype: "non"
			})
		}else if(/^objBe$/.test(k[1])){
			console.log("对象范围");
			this.setState({
				datatype: "objBe"
			})
		}
	}

	changeSel2 = (k) => {
		console.log("select.value", k[1]);
		if(/\w+Eq$/.test(k[1])){
			console.log("等於");
			this.setState({
				datatype2: "Eq",
				datatype2_1: "Eq",
				datatype2_2: "Eq",
				datatype2_3: "Eq",
				datatype2_4: "Eq",
				datatype2_5: "Eq",
			})
		}else if(/^intBe$|^strBe$|^chineseBe$/.test(k[1])){
			console.log("整數、str和中文的范围");
			this.setState({
				datatype2: "iscBe",
				datatype2_1: "iscBe",
				datatype2_2: "iscBe",
				datatype2_3: "iscBe",
				datatype2_4: "iscBe",
				datatype2_5: "iscBe",
			})
		}else if(/^floatBe$/.test(k[1])){
			console.log("小数范围");
			this.setState({
				datatype2: "flBe"
			})
		}else if(/^arrBe$/.test(k[1])){
			console.log("数组范围");
			this.setState({
				datatype2: "arrBe"
			})
		}else if(/^bool$|^email$|^ip$|^url$|^address$|^thedate$/.test(k[0])){
			this.setState({
				datatype2: "non"
			})
		}else if(/^objBe$/.test(k[1])){
			this.setState({
				datatype2: "objBe"
			})
		}
	}
	
	changeSel3 = (k) => {
		console.log("select.value", k[1]);
		if(/\w+Eq$/.test(k[1])){
			console.log("等於");
			this.setState({
				datatype3: "Eq"
			})
		}else if(/^intBe$|^strBe$|^chineseBe$/.test(k[1])){
			console.log("整數、str和中文的范围");
			this.setState({
				datatype3: "iscBe"
			})
		}else if(/^floatBe$/.test(k[1])){
			console.log("小数范围");
			this.setState({
				datatype3: "flBe"
			})
		}else if(/^arrBe$/.test(k[1])){
			console.log("数组范围");
			this.setState({
				datatype3: "arrBe"
			})
		}else if(/^bool$|^email$|^ip$|^url$|^address$|^thedate$/.test(k[0])){
			this.setState({
				datatype3: "non"
			})
		}
	}

	render() {
		const { getFieldDecorator, getFieldValue } = this.props.form;
		return (
			<div>
				<Col span={3}>
	            	<ParamInput placevalue="key" />
	            </Col>
	            <Col span={19}>
	            	<Row>
		                <Col span={5}>
		                  	<ParamSel onChangeSel={this.changeSel}/>		                  
		                </Col>
		                <Col span={17}>
		                  <div>{this.DynamicFormSome(this.state.datatype)}</div>
		                </Col>
	               	</Row>
	               	<Row>
		               	<Col span={19}>
		               		{this.DynamicFormArrObj(this.state.datatype)}
		               	</Col>
	               	</Row>
	            </Col>
            </div>
		)
	}
}
const ParamComp = Form.create()(paramComp);
export default withStyles(s)(ParamComp);