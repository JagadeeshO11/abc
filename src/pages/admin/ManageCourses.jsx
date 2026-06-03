import { useState } from 'react';
import { X, BookOpen } from 'lucide-react';
import { adminApi } from '../../utils/api.js';

export default function ManageCourses({ courses, setCourses, triggerToast }) {
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

  const handleSelect = (course) => {
    setEditingId(course.id);
    setTitle(course.title); setCategory(course.category);
    setPrice(String(course.price)); setDesc(course.description);
    setImage(course.image || ''); setDuration(course.duration || '6 weeks');
    setHours(course.hours || 20);
    setDrawerOpen(true);
  };

  const handleClear = () => {
    setEditingId(null);
    setTitle(''); setPrice(''); setDesc('');
    setImage(''); setDuration('6 weeks'); setHours(20);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const payload = {
      title, category, hours: parseInt(hours), duration,
      price: parseFloat(price), description: desc,
      image: image || null, rating: 'New', icon: '📚'
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
        <button onClick={() => { handleClear(); setDrawerOpen(true); }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'var(--color-corporate-blue)', color: '#fff', border: 'none', borderRadius: '8px', padding: '9px 18px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>
          <span style={{ fontSize: '18px', lineHeight: 1 }}>›</span> Add Course
        </button>
        <h2 className="heading-lg" style={{ color: 'var(--color-white)', margin: 0 }}>MANAGE COURSES</h2>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead><tr><th>Image</th><th>Title</th><th>Category</th><th>Duration</th><th>Hours</th><th>Price</th><th>Added</th><th>Action</th></tr></thead>
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
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button className="btn-mini" style={{ color: 'var(--color-sky-blue)' }} onClick={() => handleSelect(course)}>Edit</button>
                    <button className="btn-mini" style={{ color: '#ff6b6b' }} onClick={() => handleRemove(course.id)}>Remove</button>
                  </div>
                </td>
              </tr>
            ))}
            {courses.length === 0 && <tr><td colSpan="8" style={{ textAlign: 'center', padding: '40px', color: 'rgba(255,255,255,0.3)' }}>No courses yet. Click › Add Course to get started.</td></tr>}
          </tbody>
        </table>
      </div>

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
