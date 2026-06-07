import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { BookOpen, Download, TrendingUp, Users, DollarSign } from 'lucide-react';

const formatCurrency = (val) => `₹${Number(val || 0).toLocaleString('en-IN')}`;

export default function Overview({ inquiries, applications, payments, courses = [], jobs = [], templates = [] }) {
  
  const coursePayments = useMemo(() => (payments || []).filter(p => p.type === 'COURSE' || !p.type), [payments]);
  const templatePayments = useMemo(() => (payments || []).filter(p => p.type === 'TEMPLATE'), [payments]);

  const totalRevenue = useMemo(() => (payments || []).reduce((s, p) => s + (parseFloat(p.amount) || 0), 0), [payments]);
  const courseRevenue = useMemo(() => coursePayments.reduce((s, p) => s + (parseFloat(p.amount) || 0), 0), [coursePayments]);
  const templateRevenue = useMemo(() => templatePayments.reduce((s, p) => s + (parseFloat(p.amount) || 0), 0), [templatePayments]);

  // Group course payments by course title for the chart
  const courseSalesData = useMemo(() => {
    const grouped = {};
    coursePayments.forEach(p => {
      const title = p.course?.title || p.itemTitle || 'Unknown Course';
      if (!grouped[title]) grouped[title] = { name: title, revenue: 0, count: 0 };
      grouped[title].revenue += parseFloat(p.amount) || 0;
      grouped[title].count += 1;
    });
    return Object.values(grouped).sort((a, b) => b.revenue - a.revenue).slice(0, 8);
  }, [coursePayments]);

  // Group template payments by template name for the chart
  const templateSalesData = useMemo(() => {
    const grouped = {};
    templatePayments.forEach(p => {
      const name = p.template?.name || p.itemTitle || p.templateName || 'Unknown Template';
      if (!grouped[name]) grouped[name] = { name, revenue: 0, count: 0 };
      grouped[name].revenue += parseFloat(p.amount) || 0;
      grouped[name].count += 1;
    });
    return Object.values(grouped).sort((a, b) => b.revenue - a.revenue).slice(0, 8);
  }, [templatePayments]);

  // Monthly transaction trend
  const monthlyTrend = useMemo(() => {
    const months = {};
    (payments || []).forEach(p => {
      const d = new Date(p.createdAt);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      if (!months[key]) months[key] = { month: key, amount: 0, count: 0 };
      months[key].amount += parseFloat(p.amount) || 0;
      months[key].count += 1;
    });
    return Object.values(months).sort((a, b) => a.month.localeCompare(b.month)).slice(-12);
  }, [payments]);

  const CHART_COLORS = ['#2395ee', '#68ef3f', '#f59e0b', '#9b59b6', '#e05c5c', '#1abc9c', '#3498db', '#e67e22'];

  return (
    <div>
      <h2 className="heading-lg" style={{ color: 'var(--color-white)', marginBottom: '24px' }}>ADMINISTRATIVE OVERVIEW</h2>
      
      {/* Stat Cards */}
      <div className="analytics-grid" style={{ marginBottom: '28px' }}>
        <div className="stat-card" style={{ borderLeft: '4px solid #2395ee' }}>
          <div className="stat-label">📩 Inquiries</div>
          <div className="stat-value">{inquiries.length}</div>
        </div>
        <div className="stat-card" style={{ borderLeft: '4px solid #f59e0b' }}>
          <div className="stat-label">👔 Job Applications</div>
          <div className="stat-value">{applications.length}</div>
        </div>
        <div className="stat-card" style={{ borderLeft: '4px solid #1abc9c' }}>
          <div className="stat-label">💳 Total Trxns</div>
          <div className="stat-value">{payments.length}</div>
        </div>
        <div className="stat-card" style={{ borderLeft: '4px solid #68ef3f' }}>
          <div className="stat-label">💰 Total Revenue</div>
          <div className="stat-value">{formatCurrency(totalRevenue)}</div>
        </div>
        <div className="stat-card" style={{ borderLeft: '4px solid #9b59b6' }}>
          <div className="stat-label">📚 Courses Published</div>
          <div className="stat-value">{courses.length}</div>
        </div>
        <div className="stat-card" style={{ borderLeft: '4px solid #3498db' }}>
          <div className="stat-label">📦 Templates</div>
          <div className="stat-value">{templates ? templates.length : 0}</div>
        </div>
        <div className="stat-card" style={{ borderLeft: '4px solid #e05c5c' }}>
          <div className="stat-label">💼 Job Postings</div>
          <div className="stat-value">{jobs.length}</div>
        </div>
        <div className="stat-card" style={{ borderLeft: '4px solid #1abc9c' }}>
          <div className="stat-label">📊 Avg Trxn Value</div>
          <div className="stat-value">{payments.length > 0 ? formatCurrency(Math.round(totalRevenue / payments.length)) : '₹0'}</div>
        </div>
      </div>

      {/* Revenue Summary Row */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '180px', background: 'linear-gradient(135deg, #2395ee, #1a6bb0)', borderRadius: '12px', padding: '16px 20px' }}>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Course Revenue</div>
          <div style={{ fontSize: '22px', fontWeight: 800, color: '#fff', marginTop: '4px' }}>{formatCurrency(courseRevenue)}</div>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginTop: '2px' }}>{coursePayments.length} transactions</div>
        </div>
        <div style={{ flex: 1, minWidth: '180px', background: 'linear-gradient(135deg, #68ef3f, #3cb823)', borderRadius: '12px', padding: '16px 20px' }}>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Template Revenue</div>
          <div style={{ fontSize: '22px', fontWeight: 800, color: '#fff', marginTop: '4px' }}>{formatCurrency(templateRevenue)}</div>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginTop: '2px' }}>{templatePayments.length} purchases</div>
        </div>
        <div style={{ flex: 1, minWidth: '180px', background: 'linear-gradient(135deg, #9b59b6, #6c3483)', borderRadius: '12px', padding: '16px 20px' }}>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Trainees</div>
          <div style={{ fontSize: '22px', fontWeight: 800, color: '#fff', marginTop: '4px' }}>{coursePayments.length}</div>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginTop: '2px' }}>Enrolled in courses</div>
        </div>
      </div>

      {/* Charts Row */}
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginBottom: '24px' }}>
        {/* Course Sales vs Trainees Chart */}
        <div style={{ flex: '1 1 380px', background: '#fff', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <div style={{ width: 10, height: 10, borderRadius: '2px', background: '#2395ee' }} />
            <div style={{ width: 10, height: 10, borderRadius: '2px', background: '#1abc9c' }} />
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#1a1a2e' }}>📚 Course Sales vs Trainees</h3>
          </div>
          <p style={{ fontSize: '11px', color: '#999', marginBottom: '12px' }}>Revenue (blue) vs Enrolled Trainees Count (teal)</p>
          {courseSalesData.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={courseSalesData} margin={{ top: 10, right: 20, left: 10, bottom: 50 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#666' }} angle={-25} textAnchor="end" interval={0} height={60} />
                <YAxis yAxisId="left" tick={{ fontSize: 11, fill: '#666' }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: '#666' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }}
                  formatter={(value, name) => [name === 'revenue' ? formatCurrency(value) : value, name === 'revenue' ? 'Revenue (₹)' : 'Trainees']}
                />
                <Legend formatter={(value) => <span style={{ fontSize: '12px' }}>{value === 'revenue' ? 'Revenue (₹)' : 'Trainees'}</span>} />
                <Bar yAxisId="left" dataKey="revenue" fill="#2395ee" radius={[6, 6, 0, 0]} name="revenue" />
                <Bar yAxisId="right" dataKey="count" fill="#1abc9c" radius={[6, 6, 0, 0]} name="count" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div style={{ height: 260, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#bbb', fontSize: '13px' }}>
              No course sales data yet
            </div>
          )}
        </div>

        {/* Template Sales vs Customers Chart */}
        <div style={{ flex: '1 1 380px', background: '#fff', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <div style={{ width: 10, height: 10, borderRadius: '2px', background: '#68ef3f' }} />
            <div style={{ width: 10, height: 10, borderRadius: '2px', background: '#9b59b6' }} />
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#1a1a2e' }}>📦 Template Sales vs Customers</h3>
          </div>
          <p style={{ fontSize: '11px', color: '#999', marginBottom: '12px' }}>Revenue (green) vs Customer Purchase Count (purple)</p>
          {templateSalesData.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={templateSalesData} margin={{ top: 10, right: 20, left: 10, bottom: 50 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#666' }} angle={-25} textAnchor="end" interval={0} height={60} />
                <YAxis yAxisId="left" tick={{ fontSize: 11, fill: '#666' }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: '#666' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }}
                  formatter={(value, name) => [name === 'revenue' ? formatCurrency(value) : value, name === 'revenue' ? 'Revenue (₹)' : 'Customers']}
                />
                <Legend formatter={(value) => <span style={{ fontSize: '12px' }}>{value === 'revenue' ? 'Revenue (₹)' : 'Customers'}</span>} />
                <Bar yAxisId="left" dataKey="revenue" fill="#68ef3f" radius={[6, 6, 0, 0]} name="revenue" />
                <Bar yAxisId="right" dataKey="count" fill="#9b59b6" radius={[6, 6, 0, 0]} name="count" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div style={{ height: 260, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#bbb', fontSize: '13px' }}>
              No template sales data yet
            </div>
          )}
        </div>
      </div>

      {/* Second Row: Monthly Trend + Pie */}
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginBottom: '24px' }}>
        {/* Monthly Transaction Trend */}
        <div style={{ flex: '1 1 400px', background: '#fff', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#1a1a2e', marginBottom: '12px' }}>📈 Monthly Transaction Trend</h3>
          {monthlyTrend.length > 0 ? (
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={monthlyTrend} margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#666' }} />
                <YAxis tick={{ fontSize: 11, fill: '#666' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }}
                  formatter={(value, name) => [name === 'amount' ? formatCurrency(value) : value, name === 'amount' ? 'Revenue' : 'Count']}
                />
                <Line type="monotone" dataKey="amount" stroke="#2395ee" strokeWidth={2} dot={{ fill: '#2395ee', r: 3 }} name="amount" />
                <Line type="monotone" dataKey="count" stroke="#68ef3f" strokeWidth={2} dot={{ fill: '#68ef3f', r: 3 }} name="count" />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div style={{ height: 240, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#bbb', fontSize: '13px' }}>
              No transaction data yet
            </div>
          )}
        </div>

        {/* Transaction Type Pie */}
        <div style={{ flex: '1 1 280px', background: '#fff', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#1a1a2e', marginBottom: '12px' }}>Transactions by Type</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={(() => {
                  const items = [];
                  if (coursePayments.length) items.push({ name: 'Course Payments', value: coursePayments.length, color: '#2395ee' });
                  if (templatePayments.length) items.push({ name: 'Template Purchases', value: templatePayments.length, color: '#68ef3f' });
                  return items.length ? items : [{ name: 'No Data', value: 1, color: '#e0e0e0' }];
                })()}
                cx="50%" cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={4}
                dataKey="value"
                label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {(coursePayments.length || templatePayments.length ? 
                  [...(coursePayments.length ? [{ color: '#2395ee' }] : []), ...(templatePayments.length ? [{ color: '#68ef3f' }] : [])] : 
                  [{ color: '#e0e0e0' }]).map((entry, idx) => (
                  <Cell key={idx} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '8px' }}>
            {coursePayments.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#666' }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#2395ee' }} />
                Courses ({coursePayments.length})
              </div>
            )}
            {templatePayments.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#666' }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#68ef3f' }} />
                Templates ({templatePayments.length})
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Transactions Table */}
      <div style={{ background: '#fff', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#1a1a2e', marginBottom: '16px' }}>
          Recent Transactions ({payments.length})
        </h3>
        {(payments || []).length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #f0f0f0' }}>
                  <th style={{ textAlign: 'left', padding: '10px 12px', color: '#888', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase' }}>Date</th>
                  <th style={{ textAlign: 'left', padding: '10px 12px', color: '#888', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase' }}>Customer</th>
                  <th style={{ textAlign: 'left', padding: '10px 12px', color: '#888', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase' }}>Item</th>
                  <th style={{ textAlign: 'left', padding: '10px 12px', color: '#888', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase' }}>Type</th>
                  <th style={{ textAlign: 'right', padding: '10px 12px', color: '#888', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase' }}>Amount</th>
                  <th style={{ textAlign: 'center', padding: '10px 12px', color: '#888', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {(payments || []).slice(0, 10).map((p, i) => (
                  <tr key={p.id || i} style={{ borderBottom: '1px solid #f5f5f5' }}>
                    <td style={{ padding: '10px 12px', color: '#666', fontSize: '12px' }}>
                      {new Date(p.createdAt).toLocaleDateString('en-IN')}
                    </td>
                    <td style={{ padding: '10px 12px', fontWeight: 600, color: '#1a1a2e' }}>
                      {p.name || p.customerName || p.email || '—'}
                    </td>
                    <td style={{ padding: '10px 12px', color: '#555' }}>
                      {p.course?.title || p.itemTitle || p.templateName || p.template?.name || '—'}
                    </td>
                    <td style={{ padding: '10px 12px' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600, background: p.type === 'TEMPLATE' ? 'rgba(104,239,63,0.12)' : 'rgba(35,149,238,0.12)', color: p.type === 'TEMPLATE' ? '#3cb823' : '#2395ee' }}>
                        {p.type === 'TEMPLATE' ? 'Template' : 'Course'}
                      </span>
                    </td>
                    <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 700, color: '#1a1a2e' }}>
                      {formatCurrency(p.amount)}
                    </td>
                    <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                      <span style={{ padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600, background: p.status === 'SUCCESS' ? 'rgba(104,239,63,0.12)' : 'rgba(245,158,11,0.12)', color: p.status === 'SUCCESS' ? '#3cb823' : '#b8860b' }}>
                        {p.status || 'SUCCESS'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#bbb', fontSize: '13px' }}>
            No transactions found in database yet. Transactions will appear here once users purchase courses or templates.
          </div>
        )}
      </div>

      {/* Trainees / Course Enrollments Section */}
      {coursePayments.length > 0 && (
        <div style={{ background: '#fff', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', marginTop: '20px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#1a1a2e', marginBottom: '16px' }}>
            👨‍🎓 Trainees / Course Enrollments ({coursePayments.length})
          </h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #f0f0f0' }}>
                  <th style={{ textAlign: 'left', padding: '10px 12px', color: '#888', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase' }}>Name</th>
                  <th style={{ textAlign: 'left', padding: '10px 12px', color: '#888', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase' }}>Email</th>
                  <th style={{ textAlign: 'left', padding: '10px 12px', color: '#888', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase' }}>Course</th>
                  <th style={{ textAlign: 'left', padding: '10px 12px', color: '#888', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase' }}>Date</th>
                  <th style={{ textAlign: 'right', padding: '10px 12px', color: '#888', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase' }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {coursePayments.slice(0, 15).map((p, i) => (
                  <tr key={p.id || i} style={{ borderBottom: '1px solid #f5f5f5' }}>
                    <td style={{ padding: '10px 12px', fontWeight: 600, color: '#1a1a2e' }}>{p.name || '—'}</td>
                    <td style={{ padding: '10px 12px', color: '#2395ee', fontSize: '12px' }}>{p.email || '—'}</td>
                    <td style={{ padding: '10px 12px', color: '#555' }}>{p.course?.title || p.itemTitle || '—'}</td>
                    <td style={{ padding: '10px 12px', color: '#666', fontSize: '12px' }}>{new Date(p.createdAt).toLocaleDateString('en-IN')}</td>
                    <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 700, color: '#1a1a2e' }}>{formatCurrency(p.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}