import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

const Modal = ({ children, title, ...rest }) => (
  <ReactModal overlayClassName="modal-overlay" className="modal" {...rest}>
    <h2 className="modal__title">{title}</h2>
    {children}
  </ReactModal>
);

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default Modal;
