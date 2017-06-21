import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from '../contentReqCss/ContentReqCss.css'
import ParamInput from './ParamInput'
import ParamSel from './ParamSel'
import { Row, Col, Icon } from 'antd'

let uuid = 1;
let objBe = {};//value所对应的对象
let objBeV = {};//value中包含若干key->value键值对，其中每一项key对应的value值
class ArrBe extends Component {

	constructor(props) {
		super(props);
		this.state = {
			indexTemp: [1],
			clearState: false
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

	//错误提示框
	error = (errMsg) => {
	  	Modal.error({
	    	title: 'This is an error message',
	    	content: errMsg,
	  	});
	}

	eachKey = (val) => {
		if(objBe[val] == undefined){
			this.setState({
				clearState: false
			})
			objBe[val] = {};
			console.log(objBe, "objBe")
		}else{
			this.setState({
				clearState: true
			})
			this.error("The key cann't be the same!");
		}
	}

	render() {
		const indexTemp = this.state.indexTemp;
	    const inFormParam = indexTemp.map((k, index) => {
	      return (
	        <div key={k}>
				<Row>
					<Col span={3} offset={1}>
						<ParamInput placevalue="key" onChangeInput={this.eachKey} clearState={this.state.clearState}/>
					</Col>
					<Col span={18}>
						<Row>
			                <Col span={5}>
			                  	<ParamSel />		                  
			                </Col>
			                <Col span={19}>
			                  <div>hello</div>
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
	    	<div>
	    		{inFormParam}
	    	</div>
	    )
	}
}

export default withStyles(s)(ArrBe);