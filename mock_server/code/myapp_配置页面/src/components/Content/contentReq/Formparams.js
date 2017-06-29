import React, { PropTypes, Component } from 'react';
import { Row, Col } from "antd"
import { Form, Input, Icon, Button, Select, Cascader } from 'antd'
const FormItem = Form.Item
const Option = Select.Option
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './contentReqCss/ContentReqCss.css'
// import ParamComp from './Formparams/ParamComp'
import ParamComp from './Formparam/Example'

let uuid = 1;
var outKeyVals = {};
outKeyVals.$h = [];
outKeyVals.$b = [];
outKeyVals.$q = [];
outKeyVals.$p = [];
outKeyVals.$in = [];
// outKeyVals.$resB = {};
outKeyVals.$resB1 = [];
outKeyVals.$resB2 = [];
outKeyVals.$resB3 = [];
outKeyVals.$resB4 = [];
outKeyVals.$resB5 = [];
outKeyVals.$resB6 = [];
outKeyVals.$resB7 = [];
outKeyVals.$resB8 = [];
outKeyVals.$resB9 = [];
outKeyVals.$resB10 = [];

let keyVals = {}; 
class paramsComponent extends Component {
  constructor() {
    super();
  }
  remove = (k) => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    if (keys.length === 1) {
      return;
    }
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }

  add = () => {
    uuid++;
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    form.setFieldsValue({
      keys: nextKeys,
    });
  }

  deepCopy = (source) => {
    var result ={};
    for(let key in source){
      result[key]=typeof source[key] === 'object'?this.deepCopy(source[key]): source[key];
    }
    return result;
  } 

//将k值传进来，以及paramform的值
  paramCompChange = (paramform, keyindex, tagsign) => {
    console.log(parseInt(keyindex), tagsign ," 传给Formparam的keyindex的值")
    console.log(outKeyVals.$h, "Formparams中接收到的值")
    console.log(paramform, "paramform的值")
    // const tagsign = this.props.tagsign;

    if(tagsign == "$h"){
      console.log(tagsign, "当tagsign为$q时，是否也执行")
      outKeyVals.$h[parseInt(keyindex)] = this.deepCopy(paramform);
      console.log(outKeyVals.$h, "Formparams里$h的值");
    }else if(tagsign == "$q"){
      outKeyVals.$q[parseInt(keyindex)] = this.deepCopy(paramform);
    }else if(tagsign == "$b"){
      outKeyVals.$b[parseInt(keyindex)] = this.deepCopy(paramform);
    }else if(tagsign == "$p"){
      outKeyVals.$p[parseInt(keyindex)] = this.deepCopy(paramform);
    }else if(tagsign == "$in"){
      outKeyVals.$in[parseInt(keyindex)] = this.deepCopy(paramform);
    }else if(tagsign == "$resB" && this.props.thekey !== undefined){
      // outKeyVals.$resB = Object.assign(outKeyVals.$resB, paramform);
      if(this.props.thekey == 1){
       outKeyVals.$resB1[parseInt(keyindex)] = this.deepCopy(paramform);
      }else if(this.props.thekey == 2){        
        outKeyVals.$resB2[parseInt(keyindex)] = this.deepCopy(paramform);
      }else if(this.props.thekey == 3){        
        outKeyVals.$resB3[parseInt(keyindex)] = this.deepCopy(paramform);
      }else if(this.props.thekey == 4){        
        outKeyVals.$resB4[parseInt(keyindex)] = this.deepCopy(paramform);
      }else if(this.props.thekey == 5){        
        outKeyVals.$resB5[parseInt(keyindex)] = this.deepCopy(paramform);
      }else if(this.props.thekey == 6){        
        outKeyVals.$resB6[parseInt(keyindex)] = this.deepCopy(paramform);
      }else if(this.props.thekey == 7){        
        outKeyVals.$resB7[parseInt(keyindex)] = this.deepCopy(paramform);
      }else if(this.props.thekey == 8){        
        outKeyVals.$resB8[parseInt(keyindex)] = this.deepCopy(paramform);
      }else if(this.props.thekey == 9){        
        outKeyVals.$resB9[parseInt(keyindex)] = this.deepCopy(paramform);
      }else if(this.props.thekey == 10){        
        outKeyVals.$resB10[parseInt(keyindex)] = this.deepCopy(paramform);
      }
    }
    this.props.formParamsVal(outKeyVals);    
  }

  render() {

    const { getFieldDecorator, getFieldValue } = this.props.form;
    
    getFieldDecorator('keys', { initialValue: [1] });
    const keys = getFieldValue('keys');
    const { name, tag } = this.props;
    const optionItems2 = ["等于", "范围"]
    
    const formItems = keys.map((k, index) => { 

      return (
        <div key={k}>
          <Row>
            <Col span={22}>
              <ParamComp tagsign={this.props.tagsign} keyindex={k} clearTag={this.props.clearTag} onParamCompChange={this.paramCompChange}/>
            </Col>
            <Col span={1}>
              <Icon
                className={s.dynamic_delete_button}
                type="minus-circle-o"
                disabled={keys.length === 1}
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
    });

    if(tag == "" && name == ""){
      return (
        <div>
          <Col span={24}>
            {formItems}
          </Col>
        </div>
      )
    }else{
      return (     
        <div>        
          <Row type="flex" justify="start">
            <Col span={3}>
              <p className={s.paramsLabel}>{`${name} ( ${tag} ):`}</p>
            </Col>
            <Col span={19} offset={1}>
                {formItems}
            </Col>
          </Row>
        </div>
      );
    }    
  }
}

const FormParams = Form.create()(paramsComponent);
export default withStyles(s)(FormParams);