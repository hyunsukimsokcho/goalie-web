import React from 'react';
import './ProblemTab.scss';
import { FormattedMessage } from 'react-intl';

const ProblemTab = props => {

  const tabList = [
    {key: 0, id: 'problemtab.all'},
    {key: 1, id: 'problemtab.wip'},
    {key: 2, id: 'problemtab.solved'}
  ];
  return (
    <div className={"problem-tab-container"}>
      {
        tabList
          .map(tab => (
            <div
              className={`tab-item ${props.currClickedItem.id === tab.id ? "clicked" : ""}`} 
              key={tab.id}
              onClick={()=>props.setClickedItem(tab)}
            >
              <FormattedMessage id={tab.id} />
              {
                props.currClickedItem.id === tab.id
                  &&
                <span className={"red-highlight"}></span>
              }
            </div>
          )
        )
      }
    </div>
  );
}

export default ProblemTab;