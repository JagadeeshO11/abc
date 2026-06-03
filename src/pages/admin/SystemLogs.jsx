export default function SystemLogs({ logs }) {
  return (
    <div>
      <h2 className="heading-lg" style={{ color: 'var(--color-white)', marginBottom: '24px' }}>SYSTEM LOGS</h2>
      <div style={{ backgroundColor: '#16171d', padding: '24px', borderRadius: '12px', border: '1px solid rgba(35,149,238,0.15)' }}>
        <div style={{ height: '500px', overflowY: 'auto', fontFamily: 'monospace', fontSize: '12px', color: '#a3be8c' }}>
          {logs.length === 0
            ? <div style={{ color: 'rgba(255,255,255,0.3)', textAlign: 'center', paddingTop: '40px' }}>No logs available.</div>
            : logs.map(log => (
              <div key={log.id} style={{ marginBottom: '8px' }}>
                <span style={{ color: '#88c0d0' }}>[{log.time}]</span> {log.message}
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}
