"use client"
import { useRef, useImperativeHandle, forwardRef, ReactNode, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export interface ModalHandle {
  open: () => void;
  close: () => void;
}

interface ModalProps {
  children: ReactNode;
}

const Modal = forwardRef<ModalHandle, ModalProps>(
  function Modal({children}, ref) {
    const [isOpen, setIsOpen] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => {
      return {
        open: () => setIsOpen(true),
        close: () => setIsOpen(false)
      };
    });

    // Close on ESC key
    useEffect(() => {
      if (!isOpen) return;
      
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          setIsOpen(false);
        }
      };
      
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen]);

    const handleClickOutside = () => {
      setIsOpen(false);
    };
    
    if (!isOpen) return null;
    
    return createPortal(
      <>
        <div 
          className="modal-backdrop"
          onClick={handleClickOutside}
        />
        <div 
          ref={modalRef}
          className="modal"
        >
          <div className="modal">
            {children}
          </div>
        </div>
      </>,
      document.body
    );
  }
);

export default Modal;