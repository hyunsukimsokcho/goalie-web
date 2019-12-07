import React from 'react';
import './FormTableEntry.scss';
import { FormattedMessage } from 'react-intl';
import { getBrowserLanguageCode } from '../../utils';

const FormTableEntry = props => {
  const lang = getBrowserLanguageCode();
  return (
    <div 
      className={`form-table-entry-container`}
    >
      <div className={'form-text'}>
        <img
          src={require('../../static/image/lightbulb.png')}
          alt="lightbulb"
        />
        <div>
          {lang == "ko"
            ? <div><a href="https://forms.gle/WtTnmnsrtEqM23fEA" target="_blank">설문</a>에 참여해주세요!</div>
            : <div>Please fill out this <a href="https://forms.gle/WtTnmnsrtEqM23fEA" target="_blank">survey</a>!</div>
          }
        </div>
        
      </div>
    </div>
  );
}
export default FormTableEntry;
