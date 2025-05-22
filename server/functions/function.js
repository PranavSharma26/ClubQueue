export const isUsernameExist = async (username, db,table) => {
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
export const insertClub = async (
  username,
  email,
  bio,
  password,
  db
) => {
  try {
    const query = `INSERT INTO clubs (username,email,description,password) VALUES(?,?,?,?)`;
    await db.query(query, [username, email,bio,password]);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
