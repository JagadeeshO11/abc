import { useState } from 'react';
import { X, BookOpen, Download, Filter } from 'lucide-react';
import { adminApi } from '../../utils/api.js';

const BASE_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

export default function ManageCourses({ courses, setCourses, payments = [], triggerToast }) {
  const [activeTab, setActiveTab] = useState('courses'); // 'courses' or 'trainees'
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Analytics');
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState('');
  const [duration, setDuration] = useState('6 weeks');
  const [hours, setHours] = useState(20);
  const [imageUploading, setImageUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [templateUrl, setTemplateUrl] = useState('');
  const [template, setTemplate] = useState('');
  const [templateName, setTemplateName] = useState('');

  const getTraineeId = (pay) => {
    const dateObj = new Date(pay.createdAt);
    const yy = String(dateObj.getFullYear()).slice(-2);
    const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
    const dd = String(dateObj.getDate()).padStart(2, '0');
    
    const sameDay = payments
      .filter(p => {
        const d = new Date(p.createdAt);
        return d.getDate() === dateObj.getDate() &&
               d.getMonth() === dateObj.getMonth() &&
               d.getFullYear() === dateObj.getFullYear();
      })
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      
    const seq = sameDay.findIndex(p => p.id === pay.id) + 1;
    return `ITBE${yy}${mm}${dd}${String(seq).padStart(2, '0')}`;
  };

  const [activeFilters, setActiveFilters] = useState({
    id: false,
    trainee: false,
    phone: false,
    course: false,
    date: false
  });
  const [filterValues, setFilterValues] = useState({
    id: '',
    trainee: '',
    phone: '',
    course: '',
    date: ''
  });

  const filteredPayments = payments.filter(pay => {
    if (filterValues.id) {
      const tId = getTraineeId(pay).toLowerCase();
      if (!tId.includes(filterValues.id.toLowerCase())) return false;
    }
    if (filterValues.trainee) {
      const val = filterValues.trainee.toLowerCase();
      const matchName = pay.name?.toLowerCase().includes(val);
      const matchEmail = pay.email?.toLowerCase().includes(val);
      if (!matchName && !matchEmail) return false;
    }
    if (filterValues.phone) {
      const val = filterValues.phone.toLowerCase();
      if (!pay.phone?.toLowerCase().includes(val)) return false;
    }
    if (filterValues.course) {
      const val = filterValues.course.toLowerCase();
      const matchTitle = pay.course?.title?.toLowerCase().includes(val);
      const matchCategory = pay.course?.category?.toLowerCase().includes(val);
      if (!matchTitle && !matchCategory) return false;
    }
    if (filterValues.date) {
      const val = filterValues.date.toLowerCase();
      const dateStr = new Date(pay.createdAt).toLocaleDateString('en-IN').toLowerCase();
      if (!dateStr.includes(val)) return false;
    }
    return true;
  });

  const renderFilterHeader = (key, label, placeholder) => {
    const isActive = activeFilters[key];
    const value = filterValues[key];

    return (
      <th style={{ verticalAlign: 'middle', minWidth: '135px' }}>
        {isActive ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
            <input
              type="text"
              placeholder={placeholder}
              value={value}
              onChange={e => setFilterValues(prev => ({ ...prev, [key]: e.target.value }))}
              style={{
                flex: 1,
                padding: '4px 8px',
                borderRadius: '6px',
                border: '1px solid rgba(35, 149, 238, 0.3)',
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#fff',
                fontSize: '12px',
                outline: 'none',
                width: '100%'
              }}
              autoFocus
            />
            <button
              onClick={() => {
                setActiveFilters(prev => ({ ...prev, [key]: false }));
                setFilterValues(prev => ({ ...prev, [key]: '' }));
              }}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-sky-blue)',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title="Close filter"
            >
              <Filter size={14} />
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
            <span>{label}</span>
            <button
              onClick={() => {
                setActiveFilters(prev => ({ ...prev, [key]: true }));
              }}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: value ? 'var(--color-sky-blue)' : 'rgba(255, 255, 255, 0.3)',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'color 0.2s'
              }}
              title="Filter column"
            >
              <Filter size={14} />
            </button>
          </div>
        )}
      </th>
    );
  };

  const handleSelect = (course) => {
    setEditingId(course.id);
    setTitle(course.title);
    setCategory(course.category);
    setPrice(String(course.price));
    setDesc(course.description);
    setImage(course.image || '');
    setDuration(course.duration || '6 weeks');
    setHours(course.hours || 20);
    // Use templateUrl from backend
    setTemplateUrl(course.templateUrl || '');
    setTemplate(course.templateUrl || '');
    setTemplateName(course.templateUrl ? 'Existing template' : '');
    setDrawerOpen(true);
  };

  const handleClear = () => {
    setEditingId(null);
    setTitle(''); setPrice(''); setDesc('');
    setImage(''); setDuration('6 weeks'); setHours(20);
    setTemplate(''); setTemplateUrl(''); setTemplateName('');
    setDrawerOpen(false);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageUploading(true);
    try {
      const fd = new FormData();
      fd.append('image', file);
      const { url } = await adminApi.uploadImage(fd);
      setImage(url);
    } catch (err) {
      alert('Image upload failed: ' + err.message);
    } finally {
      setImageUploading(false);
    }
  };

  // Template is provided via URL only (no file uploads)

  const resolveUploadUrl = (url) => {
    if (!url) return url;
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    if (url.startsWith('/')) return `${BASE_URL}${url}`;
    return `${BASE_URL}/${url}`;
  };

const normalizeTemplateUrl = (t) => {
  if (!t) return null;
  if (typeof t !== 'string') return null;
  let v = t.trim();

  // Convert common Google Drive share links to direct-download for files
  try {
    const driveShare = v.match(/(?:drive.google.com\/file\/d\/|drive.google.com\/open\?id=|drive.google.com\/.*?id=)([a-zA-Z0-9_-]{10,})/);
    if (driveShare && driveShare[1]) {
      v = `https://drive.google.com/uc?export=download&id=${driveShare[1]}`;
    }
  } catch (e) { }

  // Allow Google Drive folder URLs (no conversion)
  try {
    const folderMatch = v.match(/drive\.google\.com\/drive\/folders\/([a-zA-Z0-9_-]{10,})/);
    if (folderMatch && folderMatch[1]) {
      // Return the original folder URL
      return v;
    }
  } catch (e) { }

  // Basic URL validation
  try {
    const u = new URL(v);
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return null;
    return v;
  } catch (err) {
    return null;
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
      const resolvedTemplateUrl = normalizeTemplateUrl(templateUrl);
      if (templateUrl && !resolvedTemplateUrl) {
        const cont = window.confirm('The template URL looks invalid. Continue and save without a template?');
        if (!cont) { setIsSaving(false); return; }
      }

      const payload = {
        title,
        category,
        hours: parseInt(hours),
        duration,
        price: parseFloat(price),
        description: desc,
        image: image || null,
        rating: 'New',
        icon: '📚',
        templateUrl: resolvedTemplateUrl || null,
      };
    if (editingId) {
      try {
        const { data } = await adminApi.updateCourse(editingId, payload);
        setCourses(prev => prev.map(c => c.id === editingId ? data : c));
        triggerToast('Course updated successfully.');
        handleClear();
      } catch (err) { alert(err.message); }
      finally { setIsSaving(false); }
    } else {
      if (courses.find(c => c.title.trim().toLowerCase() === title.trim().toLowerCase())) {
        triggerToast(`⚠️ Course "${title}" already exists.`); return;
      }
      try {
        const { data } = await adminApi.createCourse(payload);
        setCourses(prev => [data, ...prev]);
        triggerToast('New training course published.');
        handleClear();
      } catch (err) { alert(err.message); }
      finally { setIsSaving(false); }
    }
  };

  const handleRemove = async (id) => {
    if (!window.confirm('Archive this course?')) return;
    try {
      await adminApi.deleteCourse(id);
      setCourses(prev => prev.filter(c => c.id !== id));
      triggerToast('Course archived successfully.');
    } catch (err) { alert(err.message); }
  };

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        {activeTab === 'courses' && (
          <button onClick={() => { handleClear(); setDrawerOpen(true); }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'var(--color-corporate-blue)', color: '#fff', border: 'none', borderRadius: '8px', padding: '9px 18px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>
            <span style={{ fontSize: '18px', lineHeight: 1 }}>›</span> Add Course
          </button>
        )}
        <h2 className="heading-lg" style={{ color: 'var(--color-white)', margin: 0 }}>
          {activeTab === 'courses' ? 'MANAGE COURSES' : 'COURSE TRAINEES'}
        </h2>
      </div>

      {/* Sub-tab toggle */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '4px', width: 'fit-content' }}>
        {[['courses', `Course Catalog (${courses.length})`], ['trainees', `Trainees (${payments.length})`]].map(([key, label]) => (
          <button key={key} onClick={() => setActiveTab(key)} style={{ padding: '7px 20px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '600', background: activeTab === key ? 'var(--color-corporate-blue)' : 'transparent', color: activeTab === key ? '#fff' : 'rgba(255,255,255,0.45)' }}>
            {label}
          </button>
        ))}
      </div>

      {/* Course Catalog Table */}
      {activeTab === 'courses' && (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead><tr><th>Image</th><th>Title</th><th>Category</th><th>Duration</th><th>Hours</th><th>Price</th><th>Added</th><th>Template</th><th>Action</th></tr></thead>
            <tbody>
              {courses.map(course => (
                <tr key={course.id} style={{ background: editingId === course.id ? 'rgba(35,149,238,0.08)' : undefined }}>
                  <td>
                    {course.image
                      ? <img src={course.image} alt={course.title} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '6px' }} onError={e => e.target.style.display = 'none'} />
                      : <div style={{ width: '40px', height: '40px', borderRadius: '6px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><BookOpen size={16} /></div>
                    }
                  </td>
                  <td><strong>{course.title}</strong><br /><span style={{ fontSize: '10px', color: '#aaa', fontFamily: 'monospace' }}>{course.id.slice(0, 8)}…</span></td>
                  <td><span className="badge-blue">{course.category}</span></td>
                  <td>{course.duration}</td>
                  <td>{course.hours}h</td>
                  <td style={{ fontWeight: '700', color: 'var(--color-sky-blue)' }}>₹{Number(course.price).toLocaleString('en-IN')}</td>
                  <td style={{ fontSize: '12px' }}>{new Date(course.createdAt).toLocaleDateString('en-IN')}</td>
                  <td>
                    {course.templateUrl
                      ? (
                        <a href={resolveUploadUrl(course.templateUrl)} target="_blank" rel="noreferrer"
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--color-sky-blue)', fontSize: '12px', textDecoration: 'none' }}
                          title="Download template">
                          📄 View
                        </a>
                      )
                      : <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '12px' }}>—</span>
                    }
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button className="btn-mini" style={{ color: 'var(--color-sky-blue)' }} onClick={() => handleSelect(course)}>Edit</button>
                      <button className="btn-mini" style={{ color: '#ff6b6b' }} onClick={() => handleRemove(course.id)}>Remove</button>
                    </div>
                  </td>
                </tr>
              ))}
              {courses.length === 0 && <tr><td colSpan="9" style={{ textAlign: 'center', padding: '40px', color: 'rgba(255,255,255,0.3)' }}>No courses yet. Click › Add Course to get started.</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      {/* Trainees Table */}
      {activeTab === 'trainees' && (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                {renderFilterHeader('id', 'ID', 'Filter ID...')}
                {renderFilterHeader('trainee', 'Trainee', 'Filter Trainee...')}
                {renderFilterHeader('phone', 'Phone', 'Filter Phone...')}
                {renderFilterHeader('course', 'Course', 'Filter Course...')}
                {renderFilterHeader('date', 'Date', 'Filter Date...')}
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map(pay => (
                <tr key={pay.id}>
                  <td style={{ fontFamily: 'monospace', fontWeight: 'bold', color: 'var(--color-sky-blue)' }}>
                    {getTraineeId(pay)}
                  </td>
                  <td>
                    <strong>{pay.name}</strong><br />
                    <span style={{ fontSize: '11px', color: '#aaa' }}>{pay.email}</span>
                  </td>
                  <td>{pay.phone}</td>
                  <td>
                    <strong>{pay.course?.title || 'Unknown Course'}</strong>
                    {pay.course?.category && (
                      <><br /><span className="badge-blue" style={{ marginTop: '4px', display: 'inline-block' }}>{pay.course.category}</span></>
                    )}
                  </td>
                  <td style={{ fontSize: '12px' }}>{new Date(pay.createdAt).toLocaleDateString('en-IN')}</td>
                </tr>
              ))}
              {filteredPayments.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: 'rgba(255,255,255,0.3)' }}>
                    No trainees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {drawerOpen && (
        <>
          <div onClick={handleClear} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 200 }} />
          <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '520px', maxHeight: '90vh', background: '#fff', borderRadius: '12px', boxShadow: '0 20px 60px rgba(0,0,0,0.4)', zIndex: 201, display: 'flex', flexDirection: 'column', animation: 'popIn 0.22s ease' }}>
            <style>{`@keyframes popIn { from { opacity:0; transform:translate(-50%,-48%) scale(0.97); } to { opacity:1; transform:translate(-50%,-50%) scale(1); } }`}</style>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 24px', background: 'var(--color-corporate-blue)', borderRadius: '12px 12px 0 0' }}>
              <div style={{ color: '#fff', fontWeight: '700', fontSize: '15px' }}>{editingId ? '✏️ Edit Course' : '› Add New Course'}</div>
              <button onClick={handleClear} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff', display: 'flex' }}><X size={20} /></button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '24px', background: 'var(--color-corporate-blue)' }}>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label" style={{ color: 'rgba(255,255,255,0.8)' }}>Course Title</label>
                  <input className="input-field" required value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label" style={{ color: 'rgba(255,255,255,0.8)' }}>Category</label>
                    <select className="input-field" value={category} onChange={e => setCategory(e.target.value)}>
                      {['Analytics','ERP','Cloud','Python','Power BI'].map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ color: 'rgba(255,255,255,0.8)' }}>Price (INR)</label>
                    <input type="number" className="input-field" required value={price} onChange={e => setPrice(e.target.value)} />
                  </div>
                </div>
                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label" style={{ color: 'rgba(255,255,255,0.8)' }}>Duration</label>
                    <input className="input-field" required placeholder="6 weeks" value={duration} onChange={e => setDuration(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ color: 'rgba(255,255,255,0.8)' }}>Hours</label>
                    <input type="number" className="input-field" required value={hours} onChange={e => setHours(e.target.value)} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label" style={{ color: 'rgba(255,255,255,0.8)' }}>Description</label>
                  <textarea className="input-field" rows="3" required value={desc} onChange={e => setDesc(e.target.value)} />
                </div>
                {/* Template URL only (no file uploads) */}
                <div className="form-group">
                  <label className="form-label" style={{ color: 'rgba(255,255,255,0.8)' }}>
                    Course Template URL
                    <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', fontWeight: 400, marginLeft: '8px' }}>(Paste a direct/download link)</span>
                  </label>
                  <div style={{ marginTop: 8 }}>
                    <input
                      type="text"
                      placeholder="Paste template URL (Google Drive / direct link)"
                      value={templateUrl}
                      onChange={e => {
                        const v = e.target.value;
                        setTemplateUrl(v);
                        setTemplate(v);
                        setTemplateName(v ? (v.split('/').pop() || 'Template URL') : '');
                      }}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.02)', color: '#fff' }}
                    />
                  </div>
                  {template && (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '6px', padding: '6px 10px', background: 'rgba(163,230,53,0.08)', borderRadius: '6px', border: '1px solid rgba(163,230,53,0.2)' }}>
                      <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '70%' }}>🔗 {templateName}</span>
                      <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                        <a href={resolveUploadUrl(template)} target="_blank" rel="noreferrer" style={{ fontSize: '11px', color: 'var(--color-sky-blue)', textDecoration: 'none' }}>Preview</a>
                        <button type="button" onClick={() => { setTemplate(''); setTemplateName(''); setTemplateUrl(''); }} style={{ background: 'none', border: 'none', color: '#ff6b6b', fontSize: '11px', cursor: 'pointer', padding: 0 }}>Remove</button>
                      </div>
                    </div>
                  )}
                </div>
                {/* Image Upload */}
                <div className="form-group">
                  <label className="form-label" style={{ color: 'rgba(255,255,255,0.8)' }}>Course Image <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', fontWeight: 400 }}>(optional, max 5MB)</span></label>
                  <input type="file" id="course-image-upload" hidden accept="image/*" onChange={handleImageChange} />
                  <label htmlFor="course-image-upload" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', border: '2px dashed rgba(255,255,255,0.25)', borderRadius: '8px', cursor: imageUploading ? 'wait' : 'pointer', background: 'rgba(255,255,255,0.05)' }}>
                    {imageUploading
                      ? <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>Uploading...</span>
                      : image
                        ? <><img src={image} alt="Preview" style={{ width: '36px', height: '36px', objectFit: 'cover', borderRadius: '4px' }} /><span style={{ fontSize: '13px', color: 'var(--color-ai-lime)' }}>Image uploaded ✓</span><span style={{ marginLeft: 'auto', fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>Click to change</span></>
                        : <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>Click to upload image</span>
                    }
                  </label>
                </div>
                <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                  <button type="submit" className="btn-primary" style={{ flex: 1 }} disabled={imageUploading || isSaving}>{isSaving ? 'Saving...' : (editingId ? 'Update Course' : 'Publish Course')}</button>
                  <button type="button" className="btn-secondary" style={{ flex: 1 }} onClick={handleClear}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
