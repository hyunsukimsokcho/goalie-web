import React from 'react';
import './InfoTableEntry.scss';
import { FormattedMessage } from 'react-intl';

const InfoTableEntry = props => {
  return (
    <div 
      className={`info-table-entry-container`}
    >
      <div className={'information-text'}>
        <FormattedMessage id={`infoTableEntry.${props.tabKey==0 ? 'networkError' : props.tabKey==1 ? 'noWip' : 'noDone'}`} />
      </div>
    </div>
  );
}
export default InfoTableEntry;
