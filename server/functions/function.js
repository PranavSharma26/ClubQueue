export const isUsernameExist = async (username, db, table) => {
  const query = `SELECT * 
      FROM ${table} 
      WHERE username = ?`;
  const [rows] = await db.query(query, [username]);
  if (rows.length > 0) return true;
  else return false;
};

export const isEmailExist = async (email, db, table) => {
  const query = `SELECT * 
      FROM ${table}
      WHERE email = ?`;
  const [rows] = await db.query(query, [email]);
  if (rows.length > 0) return true;
  else return false;
};

export const isCredentialExist = async (credential, db, table) => {
  const query = `SELECT * 
        FROM ${table} 
        WHERE email = ? or username = ?`;
  const [rows] = await db.query(query, [credential, credential]);
  if (rows.length > 0) return rows;
};

export const insertUser = async (
  username,
  email,
  firstName,
  lastName,
  password,
  db
) => {
  try {
    const query = `INSERT INTO users (username,email,firstName,lastName,password) VALUES(?,?,?,?,?)`;
    await db.query(query, [username, email, firstName, lastName, password]);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const insertClub = async (username, email, bio, password, db) => {
  try {
    const query = `INSERT INTO clubs (username,email,description,password) VALUES(?,?,?,?)`;
    await db.query(query, [username, email, bio, password]);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const fetchUserData = async (id, db) => {
  const query = `
    SELECT id, username, email, firstName, lastName, createdAt 
    FROM users
    WHERE id = ?
    `;
  const [user] = await db.query(query, [id]);
  return user[0];
};

export const fetchClubData = async (id, db) => {
  const query = `
    SELECT id, username, email, description, logo, createdAt 
    FROM clubs
    WHERE id = ?
    `;
  const [club] = await db.query(query, [id]);
  return club[0];
};

export const isEventUnique = async (name, club, db) => {
  const query = `
    SELECT *
    FROM events
    WHERE name = ? and club = ?
  `;
  const [rows] = await db.query(query, [name, club]);
  if (rows.length > 0) return false;
  else return true;
};

export const insertEvent = async (
  name,
  description,
  imgPath,
  eventDate,
  maxParticipants,
  location,
  registrationLink,
  club,
  db
) => {
  try {
    const query = `
      INSERT INTO events (name,description,imgPath,eventDate,maxParticipants,location,registrationLink,club)
      VALUES (?,?,?,?,?,?,?,?)
    `;
    await db.query(query, [
      name,
      description,
      imgPath,
      eventDate,
      maxParticipants,
      location,
      registrationLink,
      club,
    ]);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const fetchClubEvent = async (db,club) => {
  const query = `
    SELECT * 
    FROM events
    WHERE club = ?
  `;
  const [data] = await db.query(query,[club]);
  return data
};

export const updateEvent = async (
  oldName,
  name,
  description,
  imgPath,
  eventDate,
  maxParticipants,
  location,
  registrationLink,
  club,
  db
) => {
  try {
    const query = `
      UPDATE events 
      SET name = ?, description = ?,imgPath = ?,eventDate = ?, maxParticipants = ?, location = ?, registrationLink = ?
      WHERE name = ? and club = ?
    `;
    await db.query(query, [
      name,
      description,
      imgPath,
      eventDate,
      maxParticipants,
      location,
      registrationLink,
      oldName,
      club,
    ]);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const deleteEvent = async (name, club, db) => {
  const query = `
    DELETE FROM events 
    WHERE name = ? and club = ? 
  `;
  await db.query(query, [name, club]);
};

export const deleteOldEvent = async (db) => {
  const query = `
    DELETE FROM events
    WHERE eventDate < NOW() - INTERVAL 1 HOUR
  `;
  await db.query(query);
};

export const deleteUser = async (db, userId) => {
  const query = `
    DELETE FROM users
    WHERE id = ?
  `;
  await db.query(query, [userId]);
};

export const deleteClub = async (db, clubId) => {
  const query = `
    DELETE FROM clubs
    WHERE id = ?
  `;
  await db.query(query, [clubId]);
};

export const updateClubLogo = async (db,url,club) => {
  const query = `
    UPDATE clubs 
    SET logo = ? 
    WHERE username = ?
  `
  await db.query(query,[url,club])
}

export const fetchEvents = async(db) => {
  const query=`
    SELECT *
    FROM events
    ORDER BY id desc
  `
  let [data] = await db.query(query)
  return data
}

export const fetchLikedEvents = async (db,user_id) => {
  const query = `
    SELECT * 
    FROM liked_events
    WHERE user_id = ?
  `
  const [rows] = await db.query(query,[user_id])
  return rows
}

export const likeEvent = async (db,user_id,event_id) => {
  const query = `
    INSERT IGNORE INTO liked_events (user_id, event_id) VALUES (?,?)
  `
  await db.query(query,[user_id, event_id])
}

export const unlikeEvent = async (db,user_id,event_id) => {
  const query = `
    DELETE FROM liked_events
    WHERE user_id = ? and event_id = ?
  `
  await db.query(query,[user_id, event_id])
}