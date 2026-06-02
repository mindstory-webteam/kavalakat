'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Send, X, MessageCircle, Loader2, Phone, Mail, Download } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Message {
  id        : string;
  role      : 'user' | 'assistant';
  content   : string;
  timestamp : Date;
}

interface ChatbotWidgetProps {
  apiEndpoint    ?: string;
  brandColor     ?: string;
  brandName      ?: string;
  companyName    ?: string;
  phoneNumber    ?: string;
  email          ?: string;
  whatsappNumber ?: string;
  brochureUrl    ?: string;
  brochureLabel  ?: string;
}

// ─── Session key (unique per browser tab) ─────────────────────────────────────

function getSessionKey(): string {
  if (typeof window === 'undefined') return 'ssr';
  const KEY = 'kav_chat_session';
  let k = sessionStorage.getItem(KEY);
  if (!k) {
    k = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    sessionStorage.setItem(KEY, k);
  }
  return k;
}

// ─── Bold text renderer (**text** → <strong>) ─────────────────────────────────

function RenderMessage({ content }: { content: string }) {
  const lines = content.split('\n');
  return (
    <div>
      {lines.map((line, i) => {
        const parts = line.split(/(\*\*[^*]+\*\*)/g);
        const rendered = parts.map((part, j) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={j}>{part.slice(2, -2)}</strong>;
          }
          return <span key={j}>{part}</span>;
        });
        return (
          <p key={i} style={{ margin: i === 0 ? 0 : '4px 0 0' }}>
            {rendered}
          </p>
        );
      })}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ChatbotWidget({
  apiEndpoint    = 'https://api.kavalakat.com/api/chat/',
  brandColor     = '#0077be',
  brandName      = 'AI Assistant',
  companyName    = 'Kavalakat',
  phoneNumber    = '0487 244 0380',
  email          = 'contact@kavalakat.com',
  whatsappNumber = '916238000000',
  brochureUrl    = '/kavalakat-brochure.pdf',
  brochureLabel  = 'Download Brochure',
}: ChatbotWidgetProps) {

  const [isOpen,     setIsOpen]     = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading,  setIsLoading]  = useState(false);
  const [sessionKey]                = useState<string>(getSessionKey);
  const [messages,   setMessages]   = useState<Message[]>([
    {
      id       : 'welcome',
      role     : 'assistant',
      content  : `Hi! I'm ${brandName} from ${companyName}. How can I help you today?\n\nYou can ask me about our services, contact info, job openings, or anything else! 😊`,
      timestamp: new Date(),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef       = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  // ── Contact handlers ──────────────────────────────────────────────────────

  const handleCall = useCallback(() => {
    window.location.href = `tel:${phoneNumber.replace(/\s/g, '')}`;
  }, [phoneNumber]);

  const handleEmail = useCallback(() => {
    window.location.href = `mailto:${email}`;
  }, [email]);

  const handleWhatsApp = useCallback(() => {
    window.open(`https://wa.me/${whatsappNumber}`, '_blank');
  }, [whatsappNumber]);

  const handleBrochure = useCallback(() => {
    const a    = document.createElement('a');
    a.href     = brochureUrl;
    a.download = 'Kavalakat-Brochure.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, [brochureUrl]);

  // ── Send message ──────────────────────────────────────────────────────────

  const sendMessage = useCallback(async () => {
    const text = inputValue.trim();
    if (!text || isLoading) return;

    const userMsg: Message = {
      id       : Date.now().toString(),
      role     : 'user',
      content  : text,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const res = await fetch(apiEndpoint, {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify({
          session_key: sessionKey,
          message    : text,
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      setMessages(prev => [
        ...prev,
        {
          id       : (Date.now() + 1).toString(),
          role     : 'assistant',
          content  : data.message || "Sorry, I couldn't process that.",
          timestamp: new Date(),
        },
      ]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages(prev => [
        ...prev,
        {
          id       : (Date.now() + 1).toString(),
          role     : 'assistant',
          content  : `Sorry, something went wrong. 😔\nPlease call us at ${phoneNumber} or try again!`,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [inputValue, isLoading, apiEndpoint, sessionKey, phoneNumber]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    },
    [sendMessage],
  );

  // ── Side button styles ────────────────────────────────────────────────────

  const sideBtn: React.CSSProperties = {
    width         : '48px',
    height        : '48px',
    borderRadius  : '24px',
    color         : 'white',
    border        : 'none',
    cursor        : 'pointer',
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'flex-start',
    paddingLeft   : '12px',
    paddingRight  : '12px',
    gap           : '10px',
    boxShadow     : '0 4px 12px rgba(0,0,0,0.18)',
    transition    : 'all 0.28s cubic-bezier(0.4,0,0.2,1)',
    overflow      : 'hidden',
    whiteSpace    : 'nowrap',
    fontSize      : '13px',
    fontWeight    : '600',
  };

  const labelStyle: React.CSSProperties = {
    opacity   : 0,
    maxWidth  : '0',
    overflow  : 'hidden',
    transition: 'opacity 0.28s ease, max-width 0.28s ease',
  };

  const expandBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = e.currentTarget;
    el.style.width        = 'auto';
    el.style.paddingRight = '16px';
    el.style.transform    = 'translateX(-4px)';
    const span = el.querySelector<HTMLSpanElement>('.btn-label');
    if (span) { span.style.opacity = '1'; span.style.maxWidth = '200px'; }
  };

  const collapseBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = e.currentTarget;
    el.style.width        = '48px';
    el.style.paddingRight = '12px';
    el.style.transform    = 'translateX(0)';
    const span = el.querySelector<HTMLSpanElement>('.btn-label');
    if (span) { span.style.opacity = '0'; span.style.maxWidth = '0'; }
  };

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div>

      {/* ── Side buttons ──────────────────────────────────────────────────── */}
      <div style={{
        position      : 'fixed',
        right         : '1rem',
        top           : '50%',
        transform     : 'translateY(-50%)',
        zIndex        : 9999,
        display       : 'flex',
        flexDirection : 'column',
        gap           : '10px',
        alignItems    : 'flex-end',
      }}>

        {/* Brochure */}
        <button onClick={handleBrochure} style={{ ...sideBtn, backgroundColor: '#e67e22' }}
          onMouseEnter={expandBtn} onMouseLeave={collapseBtn}
          aria-label={brochureLabel} title={brochureLabel}>
          <Download size={20} style={{ flexShrink: 0 }} />
          <span className="btn-label" style={labelStyle}>{brochureLabel}</span>
        </button>

        {/* WhatsApp */}
        <button onClick={handleWhatsApp} style={{ ...sideBtn, backgroundColor: '#25D366' }}
          onMouseEnter={expandBtn} onMouseLeave={collapseBtn}
          aria-label="WhatsApp" title="WhatsApp">
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          <span className="btn-label" style={labelStyle}>WhatsApp</span>
        </button>

        {/* Phone */}
        <button onClick={handleCall} style={{ ...sideBtn, backgroundColor: brandColor }}
          onMouseEnter={expandBtn} onMouseLeave={collapseBtn}
          aria-label={`Call ${phoneNumber}`} title={phoneNumber}>
          <Phone size={20} style={{ flexShrink: 0 }} />
          <span className="btn-label" style={labelStyle}>{phoneNumber}</span>
        </button>

        {/* Email */}
        <button onClick={handleEmail} style={{ ...sideBtn, backgroundColor: brandColor }}
          onMouseEnter={expandBtn} onMouseLeave={collapseBtn}
          aria-label={`Email ${email}`} title={email}>
          <Mail size={20} style={{ flexShrink: 0 }} />
          <span className="btn-label" style={labelStyle}>{email}</span>
        </button>

        {/* Chat toggle */}
        <button
          onClick={() => setIsOpen(v => !v)}
          style={{ ...sideBtn, backgroundColor: brandColor,
            boxShadow: isOpen ? `0 4px 20px ${brandColor}66` : '0 4px 12px rgba(0,0,0,0.18)' }}
          onMouseEnter={expandBtn} onMouseLeave={collapseBtn}
          aria-label={isOpen ? 'Close chat' : 'Open chat'}>
          {isOpen ? (
            <><X size={20} style={{ flexShrink: 0 }} />
            <span className="btn-label" style={labelStyle}>Close Chat</span></>
          ) : (
            <><MessageCircle size={20} style={{ flexShrink: 0 }} />
            <span className="btn-label" style={labelStyle}>Chat with us</span></>
          )}
        </button>

      </div>

      {/* ── Chat window ───────────────────────────────────────────────────── */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Chat Assistant"
          aria-modal="true"
          style={{
            position        : 'fixed',
            top             : '50%',
            right           : '80px',
            transform       : 'translateY(-50%)',
            zIndex          : 9998,
            width           : '380px',
            maxWidth        : 'calc(100vw - 100px)',
            height          : '600px',
            maxHeight       : 'calc(100vh - 40px)',
            backgroundColor : 'white',
            borderRadius    : '16px',
            boxShadow       : '0 25px 60px rgba(0,0,0,0.2), 0 4px 16px rgba(0,0,0,0.08)',
            display         : 'flex',
            flexDirection   : 'column',
            overflow        : 'hidden',
            border          : '1px solid #e5e7eb',
            animation       : 'kavSlideIn 0.3s cubic-bezier(0.34,1.56,0.64,1)',
          }}
        >
          {/* Header */}
          <div style={{
            padding        : '14px 16px',
            background     : brandColor,
            color          : 'white',
            display        : 'flex',
            alignItems     : 'center',
            justifyContent : 'space-between',
            flexShrink     : 0,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <MessageCircle size={20} />
              </div>
              <div>
                <h3 style={{ fontWeight: 600, fontSize: '1rem', margin: 0, lineHeight: 1.2 }}>
                  {brandName}
                </h3>
                <p style={{ fontSize: '0.78rem', opacity: 0.9, margin: '2px 0 0',
                  display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ display: 'inline-block', width: '7px', height: '7px',
                    borderRadius: '50%', background: '#4ade80' }} />
                  Online now
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} aria-label="Close chat"
              style={{
                background: 'rgba(255,255,255,0.15)', border: 'none', color: 'white',
                cursor: 'pointer', width: '32px', height: '32px', borderRadius: '8px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.28)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}>
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div role="log" aria-live="polite" style={{
            flex: 1, overflowY: 'auto', padding: '14px',
            backgroundColor: '#f9fafb', display: 'flex',
            flexDirection: 'column', gap: '10px',
          }}>
            {messages.map(msg => (
              <div key={msg.id} style={{
                display: 'flex',
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                animation: 'kavFadeIn 0.2s ease',
              }}>
                <div style={{
                  maxWidth       : '78%',
                  borderRadius   : msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  padding        : '10px 14px',
                  backgroundColor: msg.role === 'user' ? brandColor : 'white',
                  color          : msg.role === 'user' ? 'white' : '#1f2937',
                  border         : msg.role === 'assistant' ? '1px solid #e5e7eb' : 'none',
                  boxShadow      : msg.role === 'assistant'
                    ? '0 2px 6px rgba(0,0,0,0.06)'
                    : `0 2px 8px ${brandColor}33`,
                }}>
                  <div style={{ fontSize: '0.9rem', lineHeight: 1.55, margin: 0, wordBreak: 'break-word' }}>
                    <RenderMessage content={msg.content} />
                  </div>
                  <span style={{
                    fontSize: '0.68rem', opacity: 0.6, marginTop: '4px',
                    display: 'block', textAlign: msg.role === 'user' ? 'right' : 'left',
                  }}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}

            {/* Typing dots */}
            {isLoading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start', animation: 'kavFadeIn 0.2s ease' }}>
                <div style={{
                  backgroundColor: 'white', border: '1px solid #e5e7eb',
                  borderRadius: '16px 16px 16px 4px', padding: '12px 16px',
                  display: 'flex', alignItems: 'center', gap: '4px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                }}>
                  {[0, 150, 300].map(delay => (
                    <span key={delay} style={{
                      width: '7px', height: '7px', borderRadius: '50%',
                      backgroundColor: brandColor, opacity: 0.7, display: 'inline-block',
                      animation: `kavBounce 1.1s ${delay}ms infinite`,
                    }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{
            padding: '12px 14px', backgroundColor: 'white',
            borderTop: '1px solid #f0f0f0', display: 'flex',
            gap: '8px', flexShrink: 0,
          }}>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              disabled={isLoading}
              aria-label="Type your message"
              style={{
                flex: 1, padding: '10px 14px',
                border: '1.5px solid #e5e7eb', borderRadius: '10px',
                fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit',
                transition: 'border-color 0.2s, box-shadow 0.2s',
                color: '#1f2937', background: '#fafafa',
              }}
              onFocus={e => {
                e.currentTarget.style.borderColor = brandColor;
                e.currentTarget.style.boxShadow   = `0 0 0 3px ${brandColor}22`;
              }}
              onBlur={e => {
                e.currentTarget.style.borderColor = '#e5e7eb';
                e.currentTarget.style.boxShadow   = 'none';
              }}
            />
            <button
              onClick={sendMessage}
              disabled={!inputValue.trim() || isLoading}
              aria-label="Send"
              style={{
                width: '42px', height: '42px', borderRadius: '10px',
                backgroundColor: !inputValue.trim() || isLoading ? '#cbd5e1' : brandColor,
                color: 'white', border: 'none',
                cursor: !inputValue.trim() || isLoading ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, transition: 'background-color 0.2s, transform 0.1s',
                boxShadow: !inputValue.trim() || isLoading ? 'none' : `0 2px 8px ${brandColor}44`,
              }}
              onMouseEnter={e => {
                if (!inputValue.trim() || isLoading) return;
                (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.08)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
              }}
            >
              {isLoading
                ? <Loader2 size={17} style={{ animation: 'kavSpin 0.8s linear infinite' }} />
                : <Send size={17} />
              }
            </button>
          </div>

          {/* Footer */}
          <div style={{
            textAlign: 'center', fontSize: '0.67rem', color: '#94a3b8',
            padding: '5px 0 8px', backgroundColor: 'white', flexShrink: 0,
          }}>
            Powered by {companyName} · Smart Assistant
          </div>

        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes kavSlideIn {
          from { opacity: 0; transform: translateY(calc(-50% + 20px)); }
          to   { opacity: 1; transform: translateY(-50%); }
        }
        @keyframes kavFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes kavBounce {
          0%, 60%, 100% { transform: translateY(0); }
          30%           { transform: translateY(-5px); }
        }
        @keyframes kavSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
