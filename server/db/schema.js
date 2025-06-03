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

  await db.query(`
        CREATE TABLE IF NOT EXISTS liked_events(
          id INT AUTO_INCREMENT PRIMARY KEY,
          user_id INT,
          event_id INT,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
          FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
          UNIQUE KEY unique_like (user_id,event_id)
        )
    `);
};
