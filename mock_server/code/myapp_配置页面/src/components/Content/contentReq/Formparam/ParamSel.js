import React from 'react'
import { PropTypes, Component } from 'react';
import { Cascader } from 'antd'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from '../contentReqCss/ContentReqCss.css'
import { options, allOptionItems } from '../Utilsvari'

class ParamSel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dyanmicVal: ""
		}
	}

	static propTypes = {
		paramseldisabled: PropTypes.bool,
		// paramseldisabled: PropTypes.bool.isRequired,
	};

	onChangeParaDef = (value) => {
		this.setState({
			dyanmicVal: value,
		}, () => {
			this.props.onChangeSel(this.state.dyanmicVal);
		})	    
	}

	componentWillReceiveProps (nextProps) {
    	if (nextProps.clearTag) {
    	  this.setState({
    	  	dyanmicVal: ""
    	  });
    	}
  	}

	render() {
		const { paramseldisabled } = this.props;

		return (
                <Cascader
                	ref="sel1"
                  	options={options}
                 	expandTrigger="hover"
                  	onChange={this.onChangeParaDef}
                  	className={s.paramsSelect}
                  	placeholder="Regex"
                  	disabled={paramseldisabled}
                  	value={this.state.dyanmicVal}
                />
		)
	}
}


export default withStyles(s)(ParamSel);