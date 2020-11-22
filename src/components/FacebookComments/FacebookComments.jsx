import React from 'react';
import { FacebookProvider, Comments } from 'react-facebook';

const FacebookComments = props => {
    // appId - application id in facebook developer account
    // href - application root url or current page, where rendered this form
    const { appId, href, ...rest } = props;
    return (
      <FacebookProvider appId={appId}>
          <Comments href={href} {...rest} />
        </FacebookProvider>
    );
};

export default FacebookComments;
