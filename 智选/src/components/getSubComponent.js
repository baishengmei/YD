import React from 'react';

export default function getSubComponent(ParentComp, SubComp) {
  let props = {};
  Object.keys(SubComp.propTypes).forEach(key => {
    props[key] = ParentComp.props[key];
  });
  return React.createElement(
    SubComp,
    {...props}
  );
}