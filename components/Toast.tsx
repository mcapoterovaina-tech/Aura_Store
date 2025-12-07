import React, { useEffect } from 'react';
import { X, CheckCircle, Info, AlertCircle } from 'lucide-react';
import { Notification } from '../types';

interface ToastContainerProps {
  notifications: Notification[];
  removeNotification: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ notifications, removeNotification }) => {
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
      {notifications.map((note) => (
        <Toast key={note.id} note={note} onClose={() => removeNotification(note.id)} />
      ))}
    </div>
  );
};

const Toast: React.FC<{ note: Notification; onClose: () => void }> = ({ note, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="pointer-events-auto flex items-center gap-3 bg-white/90 backdrop-blur-xl border border-white/20 shadow-soft p-4 rounded-2xl w-80 animate-slide-up">
      <div className={`
        w-8 h-8 rounded-full flex items-center justify-center shrink-0
        ${note.type === 'success' ? 'bg-green-100 text-green-600' : ''}
        ${note.type === 'info' ? 'bg-blue-100 text-blue-600' : ''}
        ${note.type === 'error' ? 'bg-red-100 text-red-600' : ''}
      `}>
        {note.type === 'success' && <CheckCircle size={16} />}
        {note.type === 'info' && <Info size={16} />}
        {note.type === 'error' && <AlertCircle size={16} />}
      </div>
      <p className="text-sm font-medium text-slate-800 flex-1">{note.message}</p>
      <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
        <X size={16} />
      </button>
    </div>
  );
};