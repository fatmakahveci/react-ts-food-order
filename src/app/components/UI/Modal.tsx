'use client';

import { BackdropProps, ModalOverlayProps, ModalProps } from '@/shared/types/Types';
import { FC } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';

const Backdrop: FC<BackdropProps> = ({ onClose }) => {
  return (
    <div className="backdrop" onClick={onClose} />
  )
};

const ModalOverlay: FC<ModalOverlayProps> = ({ children }) => {
  return (
    <div className="modal">
      <div className="content">
        {children}
      </div>
    </div>
  )
};

const Modal: FC<ModalProps> = ({ children, onClose }) => {
  return (
    <>
      {
        createPortal(<Backdrop onClose={onClose} />, 
        document.getElementById('overlays') as HTMLElement)
      }
      {
        createPortal(<ModalOverlay>{children}</ModalOverlay>,
        document.getElementById('overlays') as HTMLElement)
      }
    </>
  )
}
export default Modal;