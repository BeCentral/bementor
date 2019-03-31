import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

const Modal = ({ children, title, ...rest }) => (
  <ReactModal overlayClassName="modal-overlay" className="modal" {...rest}>
    <div className="modal__content">
      <h2 className="modal__title">{title}</h2>
      {children}
    </div>
  </ReactModal>
);

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default Modal;
