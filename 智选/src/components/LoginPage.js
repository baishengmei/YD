import React, { PropTypes, Component } from 'react';
import styles from './LoginPage.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Alert from './Alert';


@withStyles(styles)
class LoginPage extends Component {

  static propTyps = {
    isLoggingIn: PropTypes.bool.isRequired,
    login: PropTypes.bool.isRequired,
    goHome: PropTypes.func.isRequired,
    sendErrorMessage: PropTypes.func.isRequired,
    resetMessage: PropTypes.func.isRequired,
    message: PropTypes.object.isRequired,
    onLogin: PropTypes.func.isRequired
  };

  static contextTypes = {
    setTitle: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.context.setTitle('登录');
    this.refs.username.focus();
  }

  componentWillReceiveProps(nextProps) {
    if ( nextProps.login ) {
      this.props.goHome()
    }
  }

  handleDismissClick = (e) => {
    e && e.preventDefault();
    this.props.resetMessage();
  }

  renderErrorMessage = () => {
    const { message: {
      type,
      message
    }} = this.props;
    return (
      <Alert
        type={type}
        open={!!message}
        content={message}
        style={{zIndex: 3000}}
        onClose={this.handleDismissClick} />
    );
  }

  render() {

    return (
      <div className="container">
        <div id="main">
          <div id="top"></div>
          <div className="login">
            <div className="logo"></div>
            <form ref="loginForm">
              <p className="login_title">用户登录</p>
              <p>
                <label>用户名:</label>
                <input type="text" ref="username" name="username" /> @163.com
              </p>
              <p>
                <label>密码:</label>
                <input type="password" ref="password" name="password" />
                <a href="http://reg.163.com/RecoverPasswd1.shtml" title="找回密码" target="_blank">忘记密码</a>
              </p>
              <input
                className="login_btn"
                type="submit"
                value={this.props.isLoggingIn ? "登录中..." : "登录" }
                onClick={this.onLogin} />
            </form>
            {this.renderErrorMessage()}
          </div>
        </div>
        <div id="bottom"> &copy;2016 网易公司</div>
      </div>
    );
  }

  onLogin = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if ( this.props.isLoggingIn || !this.validate() ) {
      return false;
    }

    this.props.onLogin(this.name, this.pw);
  }

  validate = () => {

    let name = this.name = this.refs.username.value.replace(/^\s+|\s+$/g, '');
    let pw = this.pw = this.refs.password.value.replace(/^\s+|\s+$/g, '');

    if( !name || name.length < 1 || name.length > 20 ) {
      this.props.sendErrorMessage("请输入正确的网易通行证用户名 !!");
      return false;
    }
    if( !pw || pw.length < 1 || pw.length > 16 ) {
      this.props.sendErrorMessage("请您输入正确的登录密码 !!");
      return false;
    }

    return true;
  }
}

// 此时的 LoginPage 是高阶修饰器处理后的 class 了
// 所以在此之后定义
// LoginPage.contextTypes 等等相当于重写
// 故而要使用 class static 的方式定义

// LoginPage.contextTypes = {
//   setTitle: PropTypes.func.isRequired
// };

export default LoginPage;
