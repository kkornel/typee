import React from 'react';
import { connect } from 'react-redux';

import { testauth } from '../../actions/userActions';

function TestAuth(props) {
  props.testauth();

  return (
    <div>
      <div>TESTING</div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    state,
  };
};

export default connect(mapStateToProps, { testauth })(TestAuth);
