import React from 'react';
import ContentLoader from 'react-content-loader';

const LoadingMuralContent = (props) => (
  <ContentLoader
    speed={0.75}
    width={800}
    height={800}
    viewBox="0 0 800 800"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="10" rx="0" ry="0" width="600" height="450" />
    <rect x="0" y="480" rx="0" ry="0" width="279" height="20" />
    <rect x="0" y="515" rx="0" ry="0" width="192" height="20" />
    <rect x="0" y="550" rx="0" ry="0" width="209" height="20" />
    <rect x="0" y="585" rx="0" ry="0" width="239" height="20" />
    <rect x="150" y="620" rx="0" ry="0" width="150" height="30" />
    <rect x="310" y="620" rx="0" ry="0" width="150" height="30" />
  </ContentLoader>
);

export default LoadingMuralContent;
