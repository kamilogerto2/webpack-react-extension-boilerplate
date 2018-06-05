import React from 'react';
import PropTypes from 'prop-types';

const Button = props => <button onClick={props.action}>{ props.label }</button>;

Button.propTypes = {
  action: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default Button;
