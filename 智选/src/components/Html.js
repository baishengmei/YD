import React, { Component, PropTypes } from 'react';
// 由 assets-webpack-plugin 生成
import hashObj from './public/hash';

class Html extends Component {

  constructor() {
    super();
    this.echartsCode = this.getEchartsCode();
  }

  static propTypes = {
    initialState: PropTypes.object.isRequired,
    title: PropTypes.string,
    keywords: PropTypes.string,
    description: PropTypes.string,
    css: PropTypes.string,
    body: PropTypes.string.isRequired,
    isLogin: PropTypes.bool.isRequired
  };

  static defaultProps = {
    title: '',
    keywords: '',
    description: ''
  };

  getEchartsCode() {
    return {
      __html:
      `
      require.config({
         paths: {
             echarts: 'http://echarts.baidu.com/build/dist'
         }
      });

      function load(arr, cb) {
        require(arr, cb);
      }
      `
    };
  }

  render() {
    let { app: appPath, login: loginPath, common: commonPath } = hashObj['js'];
    let {
      initialState,
      title,
      keywords,
      description,
      body,
      css,
      isLogin,
    } = this.props;

    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <title>{title}</title>
          <meta name="keywords" content={keywords} />
          <meta name="description" content={description} />
          <link rel="shortcut icon" href="http://shared.ydstatic.com/dsp_website/src/favicon.ico" />
          {
            isLogin &&
            <link rel="stylesheet" href="http://cdn.bootcss.com/normalize/4.1.1/normalize.css"/>
          }
          <style id="css" dangerouslySetInnerHTML={{__html: css}} />
        </head>
        <body>
          <div id="app"
            style={{minHeight: '100%'}}
            dangerouslySetInnerHTML={{__html: body}}/>
          <script dangerouslySetInnerHTML={{__html: `window.__PRELOADED_STATE__=${JSON.stringify(initialState)}`}} />
          <script src={commonPath}></script>
          { isLogin &&
            <script src="http://echarts.baidu.com/build/dist/echarts.js" />
          }
          { isLogin &&
            <script dangerouslySetInnerHTML={this.echartsCode} />
          }
          <script src={isLogin ? appPath : loginPath} />
        </body>
      </html>
    );
  }

}

export default Html;
