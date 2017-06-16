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
	    };
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

	}

// 第一级参数定义为数组/对象范围时，对应的value布局
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
// 为了避免出现死循环，当第二级参数定义框内容为数组/对象时，value的布局
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
				                  	<ParamSel onChangeSel={window["changeSel2"+k]}/>		                  
				                </Col>
				                <Col span={19}>
				                  <div>{this.DynamicFormSome(this.state.window["datatype2_"+k])}</div>
				                </Col>
			               	</Row>
			               	<Row>
				               	<Col span={19}>
				               		
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
// 第一级参数定义为除了数组/对象外的其他数据类型时，如regex、float、int、日期、时间等，对应的value布局
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

//第一级参数定义变化时，设置this.state.datatype。
	changeSel = (k) => {

		if(/\w+Eq$/.test(k[1])){
			console.log("changeSel:等於");
			this.setState({
				datatype: "Eq"
			})
		}else if(/^intBe$|^strBe$|^chineseBe$/.test(k[1])){
			console.log("changeSel:整數、str和中文的范围");
			this.setState({
				datatype: "iscBe"
			})
		}else if(/^floatBe$/.test(k[1])){
			console.log("changeSel:小数范围");
			this.setState({
				datatype: "flBe"
			})
		}else if(/^arrBe$/.test(k[1])){
			console.log("changeSel:数组范围");
			this.setState({
				datatype: "arrBe"
			})
		}else if(/^bool$|^email$|^ip$|^url$|^address$|^thedate$/.test(k[0])){
			this.setState({
				datatype: "non"
			})
		}else if(/^objBe$/.test(k[1])){
			console.log("changeSel:对象范围");
			this.setState({
				datatype: "objBe"
			})
		}
	}

	changeSel2 = (k) => {
		if(/\w+Eq$/.test(k[1])){
			console.log("changeSel2:等於");
			this.setState({
				datatype2: "Eq",
			})
		}else if(/^intBe$|^strBe$|^chineseBe$/.test(k[1])){
			console.log("changeSel2:整數、str和中文的范围");
			this.setState({
				datatype2: "iscBe",
			})
		}else if(/^floatBe$/.test(k[1])){
			console.log("changeSel2:小数范围");
			this.setState({
				datatype2: "flBe"
			})
		}else if(/^arrBe$/.test(k[1])){
			console.log("changeSel2:数组范围");
			this.setState({
				datatype2: "arrBe"
			})
		}else if(/^bool$|^email$|^ip$|^url$|^address$|^thedate$/.test(k[0])){
			this.setState({
				datatype2: "non"
			})
		}else if(/^objBe$/.test(k[1])){
			console.log("changeSel2:对象范围");
			this.setState({
				datatype2: "objBe"
			})
		}
	}

	changeSel21 = (k) => {
		console.log("changeSel21:select.value", k[1]);
		if(/\w+Eq$/.test(k[1])){
			console.log("changeSel21:等於");
			this.setState({
				datatype2_1: "Eq"
			})
		}else if(/^intBe$|^strBe$|^chineseBe$/.test(k[1])){
			console.log("changeSel21:整數、str和中文的范围");
			this.setState({
				datatype2_1: "iscBe"
			})
		}else if(/^floatBe$/.test(k[1])){
			console.log("changeSel21:小数范围");
			this.setState({
				datatype2_1: "flBe"
			})
		}else if(/^arrBe$/.test(k[1])){
			console.log("changeSel21:数组范围");
			this.setState({
				datatype2_1: "arrBe"
			})
		}else if(/^bool$|^email$|^ip$|^url$|^address$|^thedate$/.test(k[0])){
			this.setState({
				datatype2_1: "non"
			})
		}else if(/^objBe$/.test(k[1])){
			console.log("changeSel21:对象范围");
			this.setState({
				datatype2_1: "objBe"
			})
		}
	}

	changeSel22 = (k) => {
		if(/\w+Eq$/.test(k[1])){
			console.log("changeSel22:等於");
			this.setState({
				datatype2_2: "Eq",
			})
		}else if(/^intBe$|^strBe$|^chineseBe$/.test(k[1])){
			console.log("changeSel22:整數、str和中文的范围");
			this.setState({
				datatype2_2: "iscBe",
			})
		}else if(/^floatBe$/.test(k[1])){
			console.log("changeSel22:小数范围");
			this.setState({
				datatype2_2: "flBe"
			})
		}else if(/^arrBe$/.test(k[1])){
			console.log("changeSel22:数组范围");
			this.setState({
				datatype2_2: "arrBe"
			})
		}else if(/^bool$|^email$|^ip$|^url$|^address$|^thedate$/.test(k[0])){
			this.setState({
				datatype2_2: "non"
			})
		}else if(/^objBe$/.test(k[1])){
			this.setState({
				datatype2_2: "objBe"
			})
		}
	}
	
	changeSel3 = (k) => {
		if(/\w+Eq$/.test(k[1])){
			console.log("changeSel3:等於");
			this.setState({
				datatype3: "Eq"
			})
		}else if(/^intBe$|^strBe$|^chineseBe$/.test(k[1])){
			console.log("changeSel3:整數、str和中文的范围");
			this.setState({
				datatype3: "iscBe"
			})
		}else if(/^floatBe$/.test(k[1])){
			console.log("changeSel3:小数范围");
			this.setState({
				datatype3: "flBe"
			})
		}else if(/^arrBe$/.test(k[1])){
			console.log("changeSel3:数组范围");
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