import { useState, useRef } from 'react';
import { Upload, Copy, Check, X, Image } from 'lucide-react';
import { adminApi } from '../../utils/api.js';

// Localhost-only guard
const IS_LOCAL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

export default function ImageToUrl() {
  const [uploads, setUploads] = useState([]); // { id, file, preview, url, status, error }
  const [dragging, setDragging] = useState(false);
  const [copied, setCopied] = useState(null);
  const inputRef = useRef();

  if (!IS_LOCAL) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', flexDirection: 'column', gap: '12px' }}>
        <X size={48} color="#ff6b6b" />
        <div style={{ color: 'var(--color-white)', fontSize: '18px', fontWeight: '700' }}>Local Only</div>
        <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px' }}>This tool is only available on localhost.</div>
      </div>
    );
  }

  const addFiles = (files) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
    Array.from(files).forEach(file => {
      if (!allowed.includes(file.type)) return;
      if (file.size > 5 * 1024 * 1024) return;
      const id = `${Date.now()}_${Math.random()}`;
      const preview = URL.createObjectURL(file);
      const entry = { id, file, preview, url: null, status: 'pending', error: null };
      setUploads(prev => [entry, ...prev]);
      uploadFile(id, file);
    });
  };

  const uploadFile = async (id, file) => {
    setUploads(prev => prev.map(u => u.id === id ? { ...u, status: 'uploading' } : u));
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await adminApi.uploadImage(formData);
      setUploads(prev => prev.map(u => u.id === id ? { ...u, status: 'done', url: res.url } : u));
    } catch (err) {
      setUploads(prev => prev.map(u => u.id === id ? { ...u, status: 'error', error: err.message } : u));
    }
  };

  const copyUrl = (id, url) => {
    navigator.clipboard.writeText(url);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const removeEntry = (id) => {
    setUploads(prev => {
      const entry = prev.find(u => u.id === id);
      if (entry?.preview) URL.revokeObjectURL(entry.preview);
      return prev.filter(u => u.id !== id);
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <Image size={20} color="var(--color-ai-lime)" />
        <h2 className="heading-lg" style={{ color: 'var(--color-white)', margin: 0 }}>IMAGE → URL</h2>
        <span style={{ fontSize: '11px', background: 'rgba(255,107,107,0.15)', color: '#ff6b6b', border: '1px solid rgba(255,107,107,0.3)', borderRadius: '20px', padding: '2px 10px', fontWeight: '700' }}>LOCALHOST ONLY</span>
      </div>

      {/* Drop Zone */}
      <div
        onClick={() => inputRef.current.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        style={{
          border: `2px dashed ${dragging ? 'var(--color-ai-lime)' : 'rgba(255,255,255,0.15)'}`,
          borderRadius: '12px',
          padding: '48px 24px',
          textAlign: 'center',
          cursor: 'pointer',
          background: dragging ? 'rgba(104,239,63,0.05)' : 'rgba(255,255,255,0.03)',
          transition: 'all 0.2s',
          marginBottom: '24px'
        }}
      >
        <input ref={inputRef} type="file" multiple accept="image/*" hidden onChange={e => addFiles(e.target.files)} />
        <Upload size={32} color={dragging ? 'var(--color-ai-lime)' : 'rgba(255,255,255,0.3)'} style={{ margin: '0 auto 12px' }} />
        <div style={{ color: 'var(--color-white)', fontWeight: '600', fontSize: '15px', marginBottom: '4px' }}>
          Drop images here or click to browse
        </div>
        <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px' }}>
          JPEG, PNG, WEBP, GIF, SVG — max 5MB each
        </div>
      </div>

      {/* Upload Cards */}
      {uploads.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {uploads.map(u => (
            <div key={u.id} style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '10px',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '14px'
            }}>
              {/* Thumbnail */}
              <img src={u.preview} alt="" style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '6px', flexShrink: 0 }} />

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '13px', color: 'var(--color-white)', fontWeight: '600', marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {u.file.name}
                </div>

                {u.status === 'uploading' && (
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>Uploading to Cloudinary…</div>
                )}
                {u.status === 'error' && (
                  <div style={{ fontSize: '12px', color: '#ff6b6b' }}>{u.error}</div>
                )}
                {u.status === 'done' && (
                  <div style={{
                    fontSize: '11px',
                    color: 'var(--color-ai-lime)',
                    background: 'rgba(104,239,63,0.08)',
                    border: '1px solid rgba(104,239,63,0.2)',
                    borderRadius: '6px',
                    padding: '6px 10px',
                    fontFamily: 'monospace',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer'
                  }} onClick={() => copyUrl(u.id, u.url)} title={u.url}>
                    {u.url}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                {u.status === 'done' && (
                  <button
                    onClick={() => copyUrl(u.id, u.url)}
                    style={{ background: copied === u.id ? 'rgba(104,239,63,0.15)' : 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '6px', padding: '6px 10px', cursor: 'pointer', color: copied === u.id ? 'var(--color-ai-lime)' : 'var(--color-white)', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', fontWeight: '600' }}
                  >
                    {copied === u.id ? <><Check size={13} /> Copied!</> : <><Copy size={13} /> Copy URL</>}
                  </button>
                )}
                {u.status === 'error' && (
                  <button
                    onClick={() => uploadFile(u.id, u.file)}
                    style={{ background: 'rgba(255,107,107,0.1)', border: '1px solid rgba(255,107,107,0.3)', borderRadius: '6px', padding: '6px 10px', cursor: 'pointer', color: '#ff6b6b', fontSize: '12px', fontWeight: '600' }}
                  >
                    Retry
                  </button>
                )}
                <button
                  onClick={() => removeEntry(u.id)}
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '6px', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', display: 'flex' }}
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {uploads.length === 0 && (
        <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.2)', fontSize: '13px', marginTop: '16px' }}>
          No images uploaded yet.
        </div>
      )}
    </div>
  );
}
