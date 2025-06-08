import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Check } from 'lucide-react';
import { TaskItem } from '../../types/task'
import { getNotification } from '../../api/task'
import { useAuth } from '../AuthContext';
const LOCAL_STORAGE_KEY = 'unreadNotifications';

const NotificationPanel: React.FC = () => {
  const [notifications, setNotifications] = useState<TaskItem[]>([]);
  const [isOpen, setIsOpen] = useState(true);
  const panelRef = useRef<HTMLDivElement>(null);
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const result = await getNotification();
        const storedRaw = localStorage.getItem(LOCAL_STORAGE_KEY);
        const stored: TaskItem[] = storedRaw ? JSON.parse(storedRaw) : [];
        const merged = [
          ...result,
          ...stored.filter(
            (s) => !result.some((n) => n.taskId === s.taskId)
          ),
        ];
        setNotifications(merged);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(merged));

      } catch (error) {

      }
    };

    if (isLoggedIn == true) {
      fetchNotification();
    }
  }, [isLoggedIn]);

  // Outside click handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAllAsRead = () => {
    setNotifications([]);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  const removeNotification = (taskId: number) => {
    const updated = notifications.filter((n) => n.taskId !== taskId);
    setNotifications(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  };

  if (!isOpen || notifications.length === 0) return null;

  return (
    <div
      ref={panelRef}
      style={{
        backgroundColor: ' rgba(230, 232, 255, 1)',
        borderRadius: '16px',
        padding: '24px',
        maxWidth: '700px',
        fontFamily: 'Arial, sans-serif',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        position: 'absolute',
        top: '80px',
        margin: '0 auto',
        zIndex: 50,
      }}
    >
      <div
        onClick={markAllAsRead}
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginBottom: '16px',
          color: '#3d3dee',
          fontWeight: 'bold',
          fontSize: '16px',
          cursor: 'pointer',
          gap: '6px',
        }}
      >
        모두 읽음 처리
        <Check size={20} />
      </div>

      {notifications.map((notif, idx) => (
        <div
          key={notif.taskId}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '12px',
            padding: '4px 16px',
            borderRadius: '10px',
            transition: 'all 0.2s ease',
            backgroundColor: 'rgba(255, 255, 255, 0)',
            opacity: 0.6,
            cursor: 'default',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0)';
            e.currentTarget.style.opacity = '1';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0)';
            e.currentTarget.style.opacity = '0.6';
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, marginRight: '8px' }}>
            <div
              style={{ fontSize: '16px', fontWeight: 'bold', color: '#3d3dee', display: 'flex', whiteSpace: 'nowrap', cursor: 'pointer' }}
              onClick={() => {
                removeNotification(notif.taskId);
                navigate(`/issue/?taskId=${notif.taskId}`);
              }}>
              태스크 "
              <span
                style={{
                  maxWidth: '200px', // 제목 너비 제한
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  display: 'inline-block',
                  cursor: 'pointer',
                  margin: '0 4px',
                }}
                title={notif.title}
              >
                {notif.title}
              </span>
              "가 업데이트({notif.status}) 되었습니다!
            </div>
          </div>
          <X
            size={24}
            style={{
              cursor: 'pointer',
              color: '#555',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#e00')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#555')}
            onClick={() => removeNotification(notif.taskId)}
          />
        </div>
      ))}

      {notifications.length === 0 && (
        <div style={{ textAlign: 'center', color: '#555' }}>새 알림이 없습니다.</div>
      )}
    </div>
  );
};

export default NotificationPanel;
