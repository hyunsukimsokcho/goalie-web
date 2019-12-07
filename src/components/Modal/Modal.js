import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { FormattedMessage } from 'react-intl';
import './Modal.scss';

import { addLocaleData } from 'react-intl';
import { IntlProvider } from 'react-intl';

import messages_ko from '../../translations/ko.json';
import messages_en from '../../translations/en.json';

// interface Props {
//   modalTitle?: string;
//   modalDescription: string;
//   buttonConfig: buttonNameSet;
//   canBeClosedByClickOutside: boolean;
// }

addLocaleData([...locale_en, ...locale_ko]);

const messages = {
  ko: messages_ko,
  en: messages_en,
};

const language = navigator.language.split(/[-_]/)[0];

const Modal = props => {
  const buttonSet = {
    submit: 'modal-button submit-with-blue',
    warning: 'modal-button warning-with-red',
    default: 'modal-button default-with-gray-text',
    confirm: 'modal-button confirm-with-blue-text',
    cancel: 'modal-button cancel-with-light-black',
  };
  useEffect(() => {
    addEventListener('keyup', keyboardListenerFunction, true);
    return () => removeEventListener('keyup', keyboardListenerFunction, true);
  }, []);

  const keyboardListenerFunction = event => {
    if (event.keyCode === 13) {
      event.preventDefault();
      if (document.getElementById('submit-button')) {
        document.getElementById('submit-button').click();
      }
    }
  };

  const doButtonFunc = (e, buttonFunc) => {
    e.stopPropagation();
    buttonFunc();
  };

  const createButtons = functions => {
    return Object.entries(functions).map((item, index) => {
      const [text, buttonConfig] = item;
      const [style, buttonFunction] = buttonConfig;
      return (
        <div
          className={buttonSet[style]}
          onClick={e => doButtonFunc(e, buttonFunction)}
          key={index}
          id={style + '-button'}
        >
          <FormattedMessage id={text} />
        </div>
      );
    });
  };

  return (
    <IntlProvider locale={language} messages={messages[language]}>
      <div
        className="modal-background"
        onClick={() => (props.canBeClosedByClickOutside ? closeModal() : null)}
      >
        <div className="modal-container" onClick={e => e.stopPropagation()}>
          {props.modalTitle != '' ? (
            <div className="modal-title">
              <FormattedMessage id={props.modalTitle} />
            </div>
          ) : null}
          <div
            className="modal-discription"
            style={props.modalTitle ? { marginTop: 10 } : null}
          >
            <FormattedMessage id={props.modalDescription} />
          </div>
          <div className="modal-buttons-container">
            {createButtons(props.buttonConfig)}
          </div>
        </div>
      </div>
    </IntlProvider>
  );
};

const root = document.getElementById('root');
const container = document.createElement('div');

export const closeModal = () => {
  ReactDOM.unmountComponentAtNode(container);
};

export const openModal = ({ title, description, buttonConfig, closable }) => {
  root.appendChild(container);
  const modalToAttach = (
    <Modal
      modalTitle={title}
      modalDescription={description}
      buttonConfig={buttonConfig}
      canBeClosedByClickOutside={closable}
    />
  );
  ReactDOM.render(modalToAttach, container);
};

export default Modal;
