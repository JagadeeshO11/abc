require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { neon } = require('@neondatabase/serverless');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const sql = neon(process.env.DATABASE_URL);
const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

app.use(cors());
app.use(express.json());

// Auth Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Access denied' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

// --- AUTH ROUTES ---
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const [user] = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (!user || user.role !== 'admin' || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid admin credentials' });
    }
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET);
    res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// --- JOBS ROUTES ---
app.get('/api/jobs', async (req, res) => {
  try {
    const jobs = await sql`SELECT * FROM jobs ORDER BY created_at DESC`;
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/jobs', authenticateToken, async (req, res) => {
  try {
    const { title, department, location, type, salary, description, requirements } = req.body;
    const [job] = await sql`
      INSERT INTO jobs (title, department, location, type, salary, description, requirements)
      VALUES (${title}, ${department}, ${location}, ${type}, ${salary}, ${description}, ${requirements})
      RETURNING *
    `;
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- COURSES ROUTES ---
app.get('/api/courses', async (req, res) => {
  try {
    const courses = await sql`SELECT * FROM courses ORDER BY created_at DESC`;
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- APPLICATIONS ROUTES ---
app.post('/api/applications', async (req, res) => {
  try {
    const { job_title, name, email, phone } = req.body;
    const [app] = await sql`
      INSERT INTO applications (job_title, name, email, phone)
      VALUES (${job_title}, ${name}, ${email}, ${phone})
      RETURNING *
    `;
    res.json(app);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/applications', authenticateToken, async (req, res) => {
  try {
    const apps = await sql`SELECT * FROM applications ORDER BY date DESC`;
    res.json(apps);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- INQUIRIES ROUTES ---
app.post('/api/inquiries', async (req, res) => {
  try {
    const { name, email, company, message } = req.body;
    const [inq] = await sql`
      INSERT INTO inquiries (name, email, company, message)
      VALUES (${name}, ${email}, ${company}, ${message})
      RETURNING *
    `;
    res.json(inq);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/inquiries', authenticateToken, async (req, res) => {
  try {
    const inqs = await sql`SELECT * FROM inquiries ORDER BY date DESC`;
    res.json(inqs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- ENROLLMENTS ROUTES ---
app.post('/api/enrollments', async (req, res) => {
  try {
    const { course_title, student_name } = req.body;
    const [enr] = await sql`
      INSERT INTO enrollments (course_title, student_name)
      VALUES (${course_title}, ${student_name})
      RETURNING *
    `;
    res.json(enr);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/enrollments', authenticateToken, async (req, res) => {
  try {
    const enrs = await sql`SELECT * FROM enrollments ORDER BY date DESC`;
    res.json(enrs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- LOGS ROUTES ---
app.get('/api/logs', authenticateToken, async (req, res) => {
  try {
    const logs = await sql`SELECT * FROM logs ORDER BY time DESC`;
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/logs', async (req, res) => {
  try {
    const { type, message } = req.body;
    const [log] = await sql`
      INSERT INTO logs (type, message)
      VALUES (${type}, ${message})
      RETURNING *
    `;
    res.json(log);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Server Start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
