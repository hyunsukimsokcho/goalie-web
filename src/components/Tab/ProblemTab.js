import React, { useState } from 'react';
import './ProblemTab.scss';
import { FormattedMessage } from 'react-intl';

const ProblemTab = () => {

  const tabList = [
    {id: 'problemtab.all'},
    {id: 'problemtab.wip'},
    {id: 'problemtab.solved'}
  ];

  const [ currClickedItem, setClickedItem ] = useState(tabList[0]);
  return (
    <div className={"problem-tab-container"}>
      {
        tabList
          .map(tab => (
            <div
              className={`tab-item ${currClickedItem.id === tab.id ? "clicked" : ""}`} 
              key={tab.id}
              onClick={()=>setClickedItem(tab)}
            >
              <FormattedMessage id={tab.id} />
              {
                currClickedItem.id === tab.id
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