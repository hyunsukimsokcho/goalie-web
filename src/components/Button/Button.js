import React from 'react';
import './Button.scss';
import { FormattedMessage } from 'react-intl';

// interface Props {
//   textId: string;
//   theme: string;
//   onClick?: () => void;
//   style?: any;
//   isDisabled?: boolean;
//   isLoading?: boolean;
// }

const Button = props => {
  return (
    <div
      className={`button-container ${props.isDisabled ? 'disabled' : props.theme}`}
      onClick={props.isDisabled || props.isLoading ? () => {} : props.onClick}
      style={props.style ? props.style : null}
    >
      {props.isLoading ? (
        <div className={'button-spinner'} />
      ) : (
        <FormattedMessage id={props.textId} />
      )}
    </div>
  );
};

export default Button;
