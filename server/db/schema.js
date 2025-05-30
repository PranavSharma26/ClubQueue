export const createTables = async (db) => {
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(20) UNIQUE,
        email VARCHAR(50) UNIQUE,
        password VARCHAR(200),
        firstName VARCHAR(20),
        lastName VARCHAR(20),
        isVerified BOOLEAN DEFAULT false,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  
    await db.query(`
      CREATE TABLE IF NOT EXISTS clubs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(20) UNIQUE,
        email VARCHAR(50) UNIQUE,
        password VARCHAR(200),
        description TEXT,
        logo VARCHAR(255),
        isVerified BOOLEAN DEFAULT false,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  
    await db.query(`
      CREATE TABLE IF NOT EXISTS events (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50),
        description TEXT,
        imgPath VARCHAR(255),
        club VARCHAR(20),
        eventDate VARCHAR(20) NOT NULL,
        maxParticipants INT,
        location VARCHAR(100),
        registrationLink VARCHAR(200),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (club) REFERENCES clubs(username) ON DELETE CASCADE ON UPDATE CASCADE
      )
    `);
  };
  
export const deleteTables=async (db)=>{
  await db.query(`DROP TABLE IF EXISTS users`);
  await db.query(`DROP TABLE IF EXISTS clubs`);
  await db.query(`DROP TABLE IF EXISTS events`);
}