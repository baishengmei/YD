import React from 'react';
import { expect } from 'chai';
import { render } from 'enzyme';
import App from '../../src/components/App';
import Layout from '../../src/components/Layout';

describe('Layout', () => {

  it('renders children correctly', () => {
    const wrapper = render(
      <App context={{ insertCss: () => {}, store: {} }}>
        <Layout>
          <div className='child' />
        </Layout>
      </App>,
    );
    expect(wrapper.find('div.child').length).to.eq(1);
  });

});
