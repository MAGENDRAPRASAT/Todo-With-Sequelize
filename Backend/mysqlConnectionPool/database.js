const { createPool } = require('mysql2/promise');

const pool = createPool({
    host: '127.0.0.1', // Remove the port from the host and specify it separately
    port: 3306,
    user: 'root',
    password: '13apr2003',
    database: 'prismaschema',
})


const all = async () => {
    try {
        const rows = await pool.query(`CREATE TABLE IF NOT EXISTS Todos (
            id INT AUTO_INCREMENT PRIMARY KEY,
            todo VARCHAR(200) NOT NULL,
            completed VARCHAR(10)  NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )`)

        if (rows)
            console.log("table created");

    } catch (err) {
        console.error(err);
    }
}

const getAll = async () => {
    try {
        const [rows] = await pool.execute('Select * from Todos')
        return rows
    }
    catch (error) {
        return error
    }
}


const createTodo = async (todo) => {
    try {
        const [response] = await pool.execute('insert into Todos (todo,completed) values(?,?)', [todo, 'false'])

        return { "res": response.insertId }
    }
    catch (error) {
        return error
    }
}


const updateTodo = async (todo) => {
    try {
        
        if(todo.completed && todo.title){
         
            const [response] = await pool.execute('update Todos set todo=?,completed=? where id=?', [todo.title,todo.completed, todo.id])
            return response.affectedRows
        }
       else if (todo.completed!=null) {
       
            const [response] = await pool.execute('update Todos set completed=? where id=?', [todo.completed, todo.id])
            return  response.affectedRows
        }
        else {
            const [response] = await pool.execute('update Todos set todo=? where id=?', [todo.title, todo.id])
            return  response.affectedRows
        }
    }
    catch (error) {
        return error
    }

}


const deleteTodo= async(id)=>{
    try{
        const [response] = await pool.execute('Delete from Todos where id =?',[id])
        return response.affectedRows
    }
    catch(error){
        return error
    }
}


module.exports = { getAll, createTodo, updateTodo, deleteTodo }