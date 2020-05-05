import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import RegisterForm from './RegisterForm';

class Register extends Component {
  submit = (formValues) => {
    console.log(formValues);
    // this.props.signUpWithEmail(formValues);
  };

  render() {
    return (
      // <div className="ui one column center aligned grid">
      //   <div className="ui segment">
      //     <RegisterForm onSubmit={this.submit} />
      //     <div className="ui horizontal divider">Or</div>
      //     {/* <div className="ui one column center aligned grid"> */}
      //     <div className="column twelve wide">
      //       <div>
      //         Already Have An Account?{'   '}
      //         <Link to="/login">Sign In</Link>
      //       </div>
      //     </div>
      //     {/* </div> */}
      //   </div>
      // </div>
      <div className="ui one column center aligned grid">
        <div className="ui segment column six wide">
          <RegisterForm onSubmit={this.submit} />
          <div className="ui horizontal divider">Or</div>
          <div className="ui one column center aligned grid">
            <div className="column twelve wide">
              <div className="ui">
                Already Have An Account?{'   '}
                <Link to="/login">Sign In</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      // <div className="ui one column center aligned grid">
      //   <div className="ui">
      //     <RegisterForm onSubmit={this.submit} />
      //     <div className="column twelve wide"></div>
      //   </div>
      // </div>
    );
  }
}

// <div className="ui divider"></div>
// <div>
//   Already Have An Account?{'   '}
//   <Link to="/login">Sign In</Link>
// </div>

export default connect(null, {})(Register);
