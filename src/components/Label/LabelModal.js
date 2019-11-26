import React, { useState, useEffect } from 'react';
import './LabelModal.scss';
import Label from './Label';
import ReactDOM from 'react-dom';

const ProfileModal = props => {
  return (
    <div className={'profile-modal'}>
      <div className={'profile-modal-content'}>
        <div className={"add-label-text"}>
          Add label
        </div>
        <div className={"label-select-container"}>
        {
          props.notSelectedLabels.map(label => {
            return (<Label text={label.text} onClick={()=>props.handleOnLabelClick(label.text)} />);
          })
        }
        </div>
      </div>
    </div>
  );
};

const root = document.getElementById('root');
const container = document.createElement('div');


const ProfileModalContainer = props => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);
  const [imgElem, setImgElem] = useState();

  useEffect(() => {
    let profileElement = document
      .getElementById(props.id)
      .getElementsByClassName('more-label-icon')[0];
    setImgElem(profileElement);
    profileElement.style.opacity = "1";
    profileElement.style.visibility = "visible";
    setX(profileElement.getBoundingClientRect()['x'] + 2);
    let obj = document.getElementsByClassName('profile-modal-container')[0];
    setY(profileElement.getBoundingClientRect()['y'] - obj.scrollHeight);
  }, [width]);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  useEffect(() => {
    window.addEventListener('keydown', closeInEsc);
    return () => {
      window.removeEventListener('keydown', closeInEsc);
    };
  }, []);

  const closeInEsc = e => {
    if (
      e.key === 'Escape' ||
      e.key === 'ArrowUp' ||
      e.key === 'ArrowDown' ||
      e.key === 'Space'
    ) {
      e.preventDefault();
      closeProfileModal();
    }
  };

  const closeProfileModalWrapper = () => {
    imgElem.style = null;
    closeProfileModal();
  }

  const handleOnLabelClickWrapper = label => {
    props.handleOnLabelClick(label);
    closeProfileModalWrapper();
  }

  return (
    <div className={'profile-modal-container'} style={{ top: y, left: x }}>
      <div
        className={'profile-modal-background'}
        onClick={closeProfileModalWrapper}
      ></div>
      <ProfileModal notSelectedLabels={props.labelList} handleOnLabelClick={handleOnLabelClickWrapper} />
    </div>
  );
};

export const closeProfileModal = () => {
  ReactDOM.unmountComponentAtNode(container);
};

export const openLabelModal = (id, labelList, handleOnLabelClick) => {
  root.appendChild(container);
  const modalToAttach = (
    <ProfileModalContainer id={id} labelList={labelList} handleOnLabelClick={handleOnLabelClick} />
  );
  ReactDOM.render(modalToAttach, container);
};

export default ProfileModal;
