/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';

class Html extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    keywords: PropTypes.string.isRequired,
    styles: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      cssText: PropTypes.string.isRequired,
    }).isRequired),
    state: PropTypes.object,
    scripts: PropTypes.arrayOf(PropTypes.string.isRequired),
    children: PropTypes.string.isRequired,
  };

  static defaultProps = {
    styles: [],
    state: null,
    scripts: [],
  };

  render() {
    const { title, description, keywords, styles, scripts, state, children } = this.props;
    return (
      <html className='no-js' lang='en'>
        <head>
          <meta charSet='utf-8' />
          <meta httpEquiv='x-ua-compatible' content='ie=edge' />
          <title>{title}</title>
          <meta name='description' content={description} />
          <meta name='keywords' content={keywords} />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link rel='shortcut icon' href='http://shared.ydstatic.com/dsp_website/src/favicon.ico' />
          <link rel='apple-touch-icon' href='apple-touch-icon.png' />
          <style
            // 防止 css 加载慢导致页面抖动
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: `
              html,
              body {
                margin:0;
                padding:0;
              }
            ` }}
          />
          {styles.map(style =>
            <style
              key={style.id}
              id={style.id}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: style.cssText }}
            />,
          )}
        </head>
        <body>
          <div
            id='app'
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: children }}
          />
          {state && (
            <script
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html:
                `window.APP_STATE=${JSON.stringify(state)}` }}
            />
          )}
          {scripts.map(script => <script key={script} src={script} />)}
        </body>
      </html>
    );
  }
}

export default Html;
