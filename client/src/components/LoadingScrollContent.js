import React from 'react';
import ContentLoader from 'react-content-loader';

const LoadingScrollContent = (props) => (
  <ContentLoader
    speed={0.75}
    width={600}
    height={250}
    viewBox="0 0 600 250"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="10" rx="0" ry="0" width="1000" height="150" />
    <rect x="0" y="171" rx="0" ry="0" width="279" height="17" />
  </ContentLoader>
);

export default LoadingScrollContent;
