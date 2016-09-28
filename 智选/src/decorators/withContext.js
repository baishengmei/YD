// including necessary methods and muiTheme
//
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import React, { PropTypes, Component } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { fontFamilyBase } from '../components/variables';

function withContext(ComposedComponent) {
  return class WithContext extends Component {

    constructor() {
      super();
    }

    componentWillMount() {
      /**
       * Tell any CSS tooling (such as Material UI) to use vendor prefixes
       * if the user agent is not known.
       *
       * it's a bug fix with material-ui's warning:
       * https://github.com/callemall/material-ui/issues/2316
       */
      this.muiTheme = getMuiTheme({
        fontFamily: fontFamilyBase,
        userAgent: this.props.context.getUA()
      });
    }

    static propTypes = {
      context: PropTypes.shape({
        insertCss: PropTypes.func.isRequired,
        setTitle: PropTypes.func.isRequired,
        setMeta: PropTypes.func.isRequired,
        getUA: PropTypes.func.isRequired,
        getUsername: PropTypes.func.isRequired
      }).isRequired
    };

    static childContextTypes = {
      insertCss: PropTypes.func.isRequired,
      setTitle: PropTypes.func.isRequired,
      setMeta: PropTypes.func.isRequired,
      getUsername: PropTypes.func.isRequired,
      muiTheme: PropTypes.object.isRequired
    };

    getChildContext() {
      const context = this.props.context;
      return {
        insertCss: context.insertCss,
        setTitle: context.setTitle,
        setMeta: context.setMeta,
        getUsername: context.getUsername,
        muiTheme: this.muiTheme
      };
    }

    render() {
      const { context, ...other } = this.props; // eslint-disable-line no-unused-vars
      return <ComposedComponent {...other} />;
    }

  };
}

export default withContext;
