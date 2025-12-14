import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Database Configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  database: process.env.DB_NAME || 'dolce_villa',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Create MySQL connection pool
const pool = mysql.createPool(dbConfig);

// Initialize database and create table
async function initializeDatabase() {
  try {
    // Test connection
    const connection = await pool.getConnection();
    console.log('✅ MySQL database connected');
    connection.release();

    // Create table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS agency_contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        agency_name VARCHAR(255) NOT NULL,
        details TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Database table initialized');
  } catch (error) {
    console.error('❌ Database connection error:', error);
    console.error('Please check your MySQL configuration in .env file');
    process.exit(1);
  }
}

// Initialize database on startup
initializeDatabase();

// Routes

// Health check
app.get('/api/health', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT NOW() as server_time, DATABASE() as database_name');
    res.json({ 
      status: 'ok', 
      message: 'Server is running',
      database: 'MySQL',
      serverTime: rows[0].server_time,
      databaseName: rows[0].database_name
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Database connection failed',
      error: error.message
    });
  }
});

// Create agency contact
app.post('/api/agency-contacts', async (req, res) => {
  try {
    const { firstName, lastName, agencyName, details } = req.body;

    // Validation
    if (!firstName || !lastName || !agencyName) {
      return res.status(400).json({
        success: false,
        message: 'กรุณากรอกชื่อ นามสกุล และชื่อ Agency'
      });
    }

    // Insert into database
    const [result] = await pool.query(
      `INSERT INTO agency_contacts (first_name, last_name, agency_name, details)
       VALUES (?, ?, ?, ?)`,
      [firstName, lastName, agencyName, details || '']
    );

    res.json({
      success: true,
      message: 'บันทึกข้อมูลสำเร็จ',
      data: {
        id: result.insertId,
        firstName,
        lastName,
        agencyName,
        details: details || ''
      }
    });
  } catch (error) {
    console.error('Error creating agency contact:', error);
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล',
      error: error.message
    });
  }
});

// Get all agency contacts
app.get('/api/agency-contacts', async (req, res) => {
  try {
    const [contacts] = await pool.query(
      'SELECT * FROM agency_contacts ORDER BY created_at DESC'
    );
    res.json({
      success: true,
      data: contacts
    });
  } catch (error) {
    console.error('Error fetching agency contacts:', error);
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการดึงข้อมูล',
      error: error.message
    });
  }
});

// Get single agency contact by ID
app.get('/api/agency-contacts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(
      'SELECT * FROM agency_contacts WHERE id = ?',
      [id]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'ไม่พบข้อมูล'
      });
    }

    res.json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    console.error('Error fetching agency contact:', error);
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการดึงข้อมูล',
      error: error.message
    });
  }
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\nShutting down gracefully...');
  await pool.end();
  process.exit(0);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`MySQL Database: ${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`);
});
