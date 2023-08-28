// Create Operation - Insert a Project
async function createProject(projectData) {
    const connection = await pool.getConnection();
    try {
      const query = `
        INSERT INTO projects 
        (title, description, goal_amount, current_amount, is_approved, start_date, end_date, comment, users_account_iduser, admin_account_idadmin) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      await connection.query(query, [
        projectData.title,
        projectData.description,
        projectData.goal_amount,
        projectData.current_amount,
        projectData.is_approved,
        projectData.start_date,
        projectData.end_date,
        projectData.comment,
        projectData.users_account_iduser,
        projectData.admin_account_idadmin
      ]);
    } finally {
      connection.release();
    }
  }
  
  // Read Operation - Retrieve All Projects
  async function getAllProjects() {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query('SELECT * FROM projects');
      return rows;
    } finally {
      connection.release();
    }
  }
  
  // Update Operation - Update Project Information
  async function updateProject(projectId, newData) {
    const connection = await pool.getConnection();
    try {
      const query = `
        UPDATE projects 
        SET title = ?, description = ?, goal_amount = ?, current_amount = ?, 
        is_approved = ?, start_date = ?, end_date = ?, comment = ?, 
        users_account_iduser = ?, admin_account_idadmin = ? 
        WHERE idprojects = ?
      `;
      await connection.query(query, [
        newData.title,
        newData.description,
        newData.goal_amount,
        newData.current_amount,
        newData.is_approved,
        newData.start_date,
        newData.end_date,
        newData.comment,
        newData.users_account_iduser,
        newData.admin_account_idadmin,
        projectId
      ]);
    } finally {
      connection.release();
    }
  }
  
  // Delete Operation - Delete a Project
  async function deleteProject(projectId) {
    const connection = await pool.getConnection();
    try {
      await connection.query('DELETE FROM projects WHERE idprojects = ?', [projectId]);
    } finally {
      connection.release();
    }
  }
  
