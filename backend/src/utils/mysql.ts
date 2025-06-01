import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  uri: process.env.MYSQL_URL || 'mysql://user:password@localhost:3306/alphaframe',
});

export async function storeRun(prompt: string, tool: string, response: string, tokens: number) {
  try {
    const connection = await pool.getConnection();
    await connection.execute(
      'INSERT INTO runs (timestamp, prompt, tool, tokens, response) VALUES (?, ?, ?, ?, ?)',
      [new Date(), prompt, tool, tokens, response]
    );
    connection.release();
  } catch (error) {
    console.error('Failed to store run:', error);
    throw new Error('Database storage failed');
  }
}