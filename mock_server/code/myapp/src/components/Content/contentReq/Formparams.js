import React, { PropTypes, Component } from 'react';
import { Row, Col } from "antd"
import { Form, Input, Icon, Button, Select, Cascader } from 'antd'
const FormItem = Form.Item
const Option = Select.Option
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './contentReqCss/ContentReqCss.css'
// import ParamComp from './Formparams/ParamComp'
import ParamComp from './Formparam/ParamComp'

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

  remove = (k, tagsign) => {
    const { form } = this.props;
    let keys = form.getFieldValue('keys');
    if (keys.length === 1) {
      return;
    }   
    outKeyVals[tagsign][parseInt(k)-1] = {};
    this.props.formParamsVal(outKeyVals);
    form.setFieldsValue({
      keys: keys = keys.filter(key => key !== k)
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
    //paramform为当前输入的项（key-value为一项）的值，比如header有三个参数，指的是当前操作的参数对象（当前的key-value）
    if(tagsign == "$h"){
      outKeyVals.$h[eval(parseInt(keyindex)-1)] = this.deepCopy(paramform);
    }else if(tagsign == "$q"){
      outKeyVals.$q[eval(parseInt(keyindex)-1)] = this.deepCopy(paramform);
    }else if(tagsign == "$b"){
      outKeyVals.$b[eval(parseInt(keyindex)-1)] = this.deepCopy(paramform);
    }else if(tagsign == "$p"){
      outKeyVals.$p[eval(parseInt(keyindex)-1)] = this.deepCopy(paramform);
    }else if(tagsign == "$in"){
      outKeyVals.$in[eval(parseInt(keyindex)-1)] = this.deepCopy(paramform);
    }else if(tagsign == "$resB" && this.props.thekey !== undefined){
      // outKeyVals.$resB = Object.assign(outKeyVals.$resB, paramform);
      if(this.props.thekey == 1){
       outKeyVals.$resB1[eval(parseInt(keyindex)-1)] = this.deepCopy(paramform);
      }else if(this.props.thekey == 2){        
        outKeyVals.$resB2[eval(parseInt(keyindex)-1)] = this.deepCopy(paramform);
      }else if(this.props.thekey == 3){        
        outKeyVals.$resB3[eval(parseInt(keyindex)-1)] = this.deepCopy(paramform);
      }else if(this.props.thekey == 4){        
        outKeyVals.$resB4[eval(parseInt(keyindex)-1)] = this.deepCopy(paramform);
      }else if(this.props.thekey == 5){        
        outKeyVals.$resB5[eval(parseInt(keyindex)-1)] = this.deepCopy(paramform);
      }else if(this.props.thekey == 6){        
        outKeyVals.$resB6[eval(parseInt(keyindex)-1)] = this.deepCopy(paramform);
      }else if(this.props.thekey == 7){        
        outKeyVals.$resB7[eval(parseInt(keyindex)-1)] = this.deepCopy(paramform);
      }else if(this.props.thekey == 8){        
        outKeyVals.$resB8[eval(parseInt(keyindex)-1)] = this.deepCopy(paramform);
      }else if(this.props.thekey == 9){        
        outKeyVals.$resB9[eval(parseInt(keyindex)-1)] = this.deepCopy(paramform);
      }else if(this.props.thekey == 10){        
        outKeyVals.$resB10[eval(parseInt(keyindex)-1)] = this.deepCopy(paramform);
      }
    }
    for(let i in outKeyVals){
      if(outKeyVals[i].length !== 0){
        outKeyVals[i] = this.setDefault(outKeyVals[i], this.props.form.getFieldValue('keys'));
      }
    }
    this.props.formParamsVal(outKeyVals); 
  }

  componentWillReceiveProps (nextProps) {
      if (nextProps.clearTag) {
        outKeyVals = {};
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
      }
  }

  //将数组中每一项应该均有值，将undefined值，设置默认值；
  setDefault = (arr, keys) => {
    for(let i=0; i<keys.length; i++){
      if(arr[keys[i]] == undefined){
        arr[keys[i]] = {};
      }
    }
    return arr;
  }

  //判断某个值是否为空对象
  isEmptyObject = (e) => {
    if(Object.prototype.toString.call(e).toLowerCase()=="[object object]"){         
      let t; 
      for (t in e) {
        if(t.trim()=="" || t==undefined){
          return !0;
        }else{
          return !1;
        }
      }
      return !0 
    }else {
      return !1; 
    }
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
              <ParamComp tagsign={this.props.tagsign} keyindex={k} clearTag={this.props.clearTag} onParamCompChange={this.paramCompChange} />
            </Col>
            <Col span={1}>
              <Icon
                className={s.dynamic_delete_button}
                type="minus-circle-o"
                disabled={keys.length === 1}
                onClick={() => this.remove(k, this.props.tagsign)}
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