import { useState, useEffect } from 'react';
import { chatAPI } from '../../api/chat';
import './Chat.css';

export default function Chat() {
  const [contacts, setContacts] = useState([]);
  const [active, setActive] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    chatAPI.getContacts()
      .then(data => {
        setContacts(data);
        if (data.length > 0) setActive(data[0]);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!active) return;
    chatAPI.getMessages(active.userId)
      .then(data => setMessages(data))
      .catch(() => setMessages([]));
  }, [active?.userId]);

  const filtered = contacts.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  async function sendMessage(e) {
    e.preventDefault();
    if (!input.trim() || !active) return;
    try {
      const msg = await chatAPI.sendMessage(active.userId, input.trim());
      setMessages(prev => [...prev, msg]);
      setInput('');
    } catch {
      alert('Failed to send message.');
    }
  }

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--gray)' }}>Loading chat...</div>;
  }

  return (
    <div className="chat-container">
      {/* Contacts */}
      <div className="chat-contacts">
        <div className="chat-contacts-header">
          <span>Messages</span>
          <span style={{ fontSize: '1.2rem' }}>✉️</span>
        </div>
        <div className="chat-search">
          <input placeholder="Search contacts..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="contact-list">
          {filtered.map(c => (
            <div key={c.id} className={`contact-item${active?.id === c.id ? ' active' : ''}`} onClick={() => setActive(c)}>
              <div className="contact-avatar">
                <img src={c.avatar} alt={c.name} />
                {c.online && <span className="online-dot" />}
              </div>
              <div className="contact-info">
                <div className="contact-name">{c.name}</div>
                <div className="contact-preview">{c.lastMsg}</div>
              </div>
              <div className="contact-meta">
                <div className="contact-time">{c.time}</div>
                {c.unread > 0 && <div className="unread-badge">{c.unread}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Window */}
      {active ? (
        <div className="chat-window">
          <div className="chat-window-header">
            <img src={active.avatar} alt={active.name} />
            <div>
              <div className="cw-name">{active.name}</div>
              <div className="cw-status">{active.online ? '● Online' : '○ Offline'}</div>
            </div>
          </div>

          <div className="chat-messages">
            {messages.map(msg => (
              <div key={msg.id} className={`message-row${msg.from === 'me' ? ' mine' : ''}`}>
                {msg.from !== 'me' && (
                  <div className="message-avatar"><img src={active.avatar} alt="" /></div>
                )}
                <div>
                  <div className="message-bubble">{msg.text}</div>
                  <div className="message-time">{msg.time}</div>
                </div>
              </div>
            ))}
          </div>

          <form className="chat-input-area" onSubmit={sendMessage}>
            <input placeholder="Type a message..." value={input} onChange={e => setInput(e.target.value)} />
            <button type="submit" className="chat-send-btn">➤</button>
          </form>
        </div>
      ) : (
        <div className="chat-empty">
          <div className="chat-empty-icon">💬</div>
          <p>Select a conversation to start chatting</p>
        </div>
      )}
    </div>
  );
}
