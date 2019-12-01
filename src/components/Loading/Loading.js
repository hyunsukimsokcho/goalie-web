import React from 'react';
import './Loading.scss';

const Loading = () => {
  return (
    <>
      <div className="loader">
        <div className="loader-cover">
          <div className="loader-spinner-container">
            <div className="loader-spinner"/>
          </div>
        </div>
      </div>
    </>
  );
};
export default Loading;