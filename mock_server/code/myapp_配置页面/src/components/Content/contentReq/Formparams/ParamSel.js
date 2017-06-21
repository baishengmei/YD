import React from 'react'
import { PropTypes, Component } from 'react';
import { Cascader } from 'antd'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from '../contentReqCss/ContentReqCss.css'
import { options, allOptionItems } from '../Utilsvari'

class ParamSel extends Component {
	static propTypes = {
		paramseldisabled: PropTypes.bool,
		// paramseldisabled: PropTypes.bool.isRequired,
	};

	onChangeParaDef = (value) => {
	    this.props.onChangeSel(value);
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
                />
		)
	}
}


export default withStyles(s)(ParamSel);