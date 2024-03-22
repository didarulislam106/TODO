require('dotenv').config();
const express = require('express');
const cors = require('cors');
//const {Pool} = require('pg');
// const { query } = require('./helpers/db.js');
const {todoRouter} = require('./routes/todo.js');

// const query = (aql,values = []) => {
//     return new Promise(async(resolve, reject) => {
//         try {
//             const pool = openDb()
//             const result = await pool.query(sql, values)
//             resolve(result)
//         } catch (error) {
//             reject(error.message)
//         }
//    })
// }

const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/todo', todoRouter)

const port = process.env.PORT

app.listen(port)

app.get('/',(req, res) => {
    const pool = openDb()

    pool.query('SELECT * FROM task', (error, result) => {
        if (error) {
            res.status(500).json({ error: error.message });
        }
        res.status(200).json(result.rows)
    })
})

app.post('/new',async(req, res) => {   
    try{
    const result = await query('insert into task (discription) values ($1) returning *',
    [req.body.discription])
    res.status(200).json(id,result.rows[0],id)
    } catch (error){
        console.log(error)
            res.statusMessage = error
            res.status(500).json({error: error})
    }
})



const openDb = () => {
    const pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
    })
    return pool;
}

module.exports = {query}

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

app.delete('/new', async(req, res) => {
    const id = Number(req.params.id)
    try {
    const result = await query('DELETE FROM task WHERE id = $1', 
    [id]) 
    res.status(200).json({id: id})
    } catch (error) {
        console.log(error)
        res.statusMessage = error
        res.status(500).json({error: error})
    }
})