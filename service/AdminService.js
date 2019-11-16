//BUSINESS LGICE GOES HERE
const pool = require('../config');

class AdminService {
    static async createEmployee(newEmployee) {
        try {
            const createdon = new Date();

            const createUser = 'INSERT INTO users ("firstname", "lastname", "email", "password", "gender", "jobrole", "department", "address", createdon) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
            const values = [`${newEmployee.firstname}`, `${newEmployee.lastname}`, `${newEmployee.email}`, `${newEmployee.password}`, `${newEmployee.gender}`, `${newEmployee.jobrole}`, `${newEmployee.department}`, `${newEmployee.address}`, createdon];
            const result = await pool.query(createUser, values);
            return result;
        } catch (error) {
            throw error;
        }
    }
    static async employeeSignIn(getEmployee) {
        try {
            const queryUser = 'SELECT * FROM users WHERE email = $1';
            const values = [`${getEmployee}`];
            const result = await pool.query(queryUser, values);
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async getAdmin(getUser) {
        try {
            const getUserQuery = 'SELECT "id", "firstname", "lastname", "email", "password", "gender", "jobrole", "department", "address", "createdon"  FROM users WHERE "id" = $1';
            const values = [`${getUser}`];
            const result = await pool.query(getUserQuery, values);
            return result;
        } catch (error) {
            throw error;
        }
    }

}



module.exports = AdminService;
