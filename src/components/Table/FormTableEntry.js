import React from 'react';
import './FormTableEntry.scss';
import { FormattedMessage } from 'react-intl';

const FormTableEntry = props => {
  return (
    <div 
      className={`form-table-entry-container`}
    >
      <div className={'form-text'}>
        <img
          src={require('../../static/image/lightbulb.png')}
          alt="lightbulb"
        />
        <FormattedMessage id={'formTableEntry.formPlz'} />
        <a href="https://forms.gle/WtTnmnsrtEqM23fEA" target="_blank">survey.com/goalie</a>
      </div>
    </div>
  );
}
export default FormTableEntry;
