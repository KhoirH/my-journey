import React, { useState, useEffect, useRef, type ReactNode, memo } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronDown } from 'lucide-react';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  height?: 'auto' | 'half' | 'full' | string;
  showHandle?: boolean;
  showHeader?: boolean;
  showFooter?: boolean;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  container?: HTMLElement;
  isDraggable?: boolean;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  children,
  height = 'auto',
  showHandle = true,
  showHeader = true,
  showFooter = true,
  onConfirm,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  container,
  isDraggable = true
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const startYRef = useRef<number>(0);
  const startOffsetRef = useRef<number>(0);

  // Height configurations
  const getSheetHeight = () => {
    switch (height) {
      case 'half':
        return 'h-1/2';
      case 'full':
        return 'h-full';
      case 'auto':
        return 'h-full max-h-[80vh]';
      default:
        return typeof height === 'string' ? `h-[${height}]` : 'max-h-[80vh]';
    }
  };

  // Create or get modal root element
  useEffect(() => {
    if (container) {
      setModalRoot(container);
      return;
    }

    let root = document.getElementById('bottomsheet-root');
    
    if (!root) {
      root = document.createElement('div');
      root.id = 'bottomsheet-root';
      root.style.cssText = `
        position: fixed;
        top: 0;
        left: 20%;
        right: 20%;
        bottom: 0;
        pointer-events: none;
        z-index: 9999;
      `;
      document.body.appendChild(root);
    }
    
    setModalRoot(root);

    return () => {
      if (!container && root && root.children.length === 0) {
        document.body.removeChild(root);
      }
    };
  }, [container]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsVisible(true);
      setIsAnimating(true);
      
      const timer = setTimeout(() => setIsAnimating(false), 10);
      return () => clearTimeout(timer);
    } else if (isVisible) {
      document.body.style.overflow = 'unset';
      setIsAnimating(true);
      setDragOffset(0);
      
      const timer = setTimeout(() => {
        setIsVisible(false);
        setIsAnimating(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isVisible]);

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

  // Touch/Mouse drag handlers
  const handleDragStart = (clientY: number) => {
    if (!isDraggable) return;
    
    setIsDragging(true);
    startYRef.current = clientY;
    startOffsetRef.current = dragOffset;
  };

  const handleDragMove = (clientY: number) => {
    if (!isDragging || !isDraggable) return;
    
    const deltaY = clientY - startYRef.current;
    const newOffset = Math.max(0, startOffsetRef.current + deltaY);
    setDragOffset(newOffset);
  };

  const handleDragEnd = () => {
    if (!isDragging || !isDraggable) return;
    
    setIsDragging(false);
    
    // If dragged down more than 100px, close the sheet
    if (dragOffset > 100) {
      onClose();
    } else {
      // Snap back to original position
      setDragOffset(0);
    }
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    handleDragStart(e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientY);
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  // Add global mouse events when dragging
  useEffect(() => {
    if (isDragging) {
      const handleGlobalMouseMove = (e: MouseEvent) => {
        handleDragMove(e.clientY);
      };

      const handleGlobalMouseUp = () => {
        handleDragEnd();
      };

      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleGlobalMouseMove);
        document.removeEventListener('mouseup', handleGlobalMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  if (!isVisible || !modalRoot) return null;

  const sheetContent = (
    <div 
      className="flex items-end justify-center min-h-screen"
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
      
      {/* Bottom Sheet */}
      <div 
        ref={sheetRef}
        className={`relative bg-white rounded-t-xl shadow-2xl w-full max-w-7xl ${getSheetHeight()} overflow-hidden transition-transform duration-300 ease-out ${
          isAnimating ? 'translate-y-full' : 'translate-y-0'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "sheet-title" : undefined}
        style={{
          transform: `translateY(${isAnimating ? '100%' : `${dragOffset}px`})`,
          transition: isDragging ? 'none' : 'transform 300ms ease-out'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {/* Drag Handle */}
        {showHandle && (
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-12 h-1 bg-gray-300 rounded-full cursor-grab active:cursor-grabbing"></div>
          </div>
        )}

        {/* Header */}
        {showHeader && title && (
          <div className="flex items-center justify-between px-6 pb-4 border-b border-gray-200">
            <h2 id="sheet-title" className="text-xl font-semibold text-gray-900">
              {title}
            </h2>
            {/* <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200 hover:bg-gray-100 rounded-full p-1"
              aria-label="Close"
            >
              <X size={20} />
            </button> */}
          </div>
        )}
        
        {/* Content */}
        <div className="overflow-y-auto p-6 flex-1 h-full">
          {children}
        </div>
        
        {/* Footer */}
        {showFooter && (
          <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-white">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-200"
            >
              {cancelText}
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-200"
            >
              {confirmText}
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(sheetContent, modalRoot);
};

export default memo(BottomSheet);