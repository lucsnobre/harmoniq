import { useEffect, useRef } from 'react';
import { FiX } from 'react-icons/fi';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Modal = ({ isOpen, onClose, title, children, size = 'md' }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on ESC key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.classList.add('overflow-hidden');
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen, onClose]);

  // Close if clicking outside the modal
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  // Get width based on size prop
  const getWidth = () => {
    switch (size) {
      case 'sm': return 'max-w-md';
      case 'md': return 'max-w-2xl';
      case 'lg': return 'max-w-4xl';
      case 'xl': return 'max-w-6xl';
      default: return 'max-w-2xl';
    }
  };

  if (!isOpen) return null;

  // Render the modal in a portal to avoid stacking context issues
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/30 backdrop-blur-sm transition-opacity animate-in fade-in"
      onClick={handleOutsideClick}
    >
      <div
        ref={modalRef}
        className={`glass ${getWidth()} w-full rounded-aero-lg shadow-aero overflow-hidden animate-scaleUp`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-xl font-semibold text-shadow-glow">{title}</h2>
          <button
            onClick={onClose}
            className="glass-button p-2 rounded-full"
            aria-label="Close modal"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 max-h-[calc(100vh-10rem)] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
