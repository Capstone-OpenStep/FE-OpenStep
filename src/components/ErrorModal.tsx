// ErrorModal.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Sidebar.module.css';

interface ErrorModalProps {
  show: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  onConfirm: () => void;
  onClose?: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({
  show,
  title = "알림",
  message,
  confirmText = "확인",
  onConfirm,
  onClose,
}) => {
  if (!show) return null;

  return ReactDOM.createPortal(
    <div className="modal show d-block" tabIndex={-1} role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            {onClose && (
              <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
            )}
          </div>
          <div className="modal-body">
            <p>{message}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={onConfirm}>
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body // body에 바로 렌더링되므로 항상 동일한 위치에 렌더링
  );
};

export default ErrorModal;
