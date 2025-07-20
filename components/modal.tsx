import React, { useState, useEffect, type ReactNode, memo } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showFooter?: boolean;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  container?: HTMLElement;
}

interface ModalSize {
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  children,
  size = 'md',
  showFooter = true,
  onConfirm,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  container
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  const modalSizes: ModalSize = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl'
  };

  // Create or get modal root element
  useEffect(() => {
    if (container) {
      setModalRoot(container);
      return;
    }

    let root = document.getElementById('modal-root');
    
    if (!root) {
      root = document.createElement('div');
      root.id = 'modal-root';
      root.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        z-index: 9999;
      `;
      document.body.appendChild(root);
    }
    
    setModalRoot(root);

    return () => {
      // Clean up only if we created the root
      if (!container && root && root.children.length === 0) {
        document.body.removeChild(root);
      }
    };
  }, [container]);

  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
      
      setIsVisible(true);
      setIsAnimating(true);
      
      const timer = setTimeout(() => setIsAnimating(false), 10);
      return () => clearTimeout(timer);
    } else if (isVisible) {
      // Restore body scroll when modal closes
      document.body.style.overflow = 'unset';
      
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setIsAnimating(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isVisible]);

  // Clean up body scroll on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    } else {
      onClose();
    }
  };

  if (!isVisible || !modalRoot) return null;

  const modalContent = (
    <div 
      className="flex items-center justify-center p-4 min-h-screen"
      onKeyDown={handleKeyDown}
      tabIndex={-1}
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        pointerEvents: 'auto'
      }}
    >
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-300 ease-out ${
          isAnimating ? 'opacity-0' : 'opacity-50'
        }`}
        onClick={handleBackdropClick}
        style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}
      />
      
      {/* Modal */}
      <div 
        className={`relative bg-white rounded-lg shadow-2xl ${modalSizes[size]} w-full max-h-[90vh] overflow-hidden transform transition-all duration-300 ease-out ${
          isAnimating ? 'scale-95 opacity-0 translate-y-4' : 'scale-100 opacity-100 translate-y-0'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        style={{
          position: 'relative',
          zIndex: 10000,
          // Reset any inherited transforms
          transform: isAnimating ? 'scale(0.95) translateY(1rem)' : 'scale(1) translateY(0)',
          transformOrigin: 'center center'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white sticky top-0 z-10">
          <h2 id="modal-title" className="text-xl font-semibold text-gray-900 pr-4">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200 hover:bg-gray-100 rounded-full p-1 flex-shrink-0"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {children}
        </div>
        
        {/* Footer */}
        {showFooter && (
          <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-white sticky bottom-0 z-10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              {cancelText}
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {confirmText}
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // Render modal in portal to escape parent context
  return createPortal(modalContent, modalRoot);
};

export default memo(Modal);