const express = require('express');
const cors = require('cors');
const {Pool} = require('pg');

const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const port = 3001;

app.get('/',(req, res) => {
    const pool = openDb()

    pool.query('SELECT * FROM task', (error, result) => {
        if (error) {
            res.status(500).json({ error: error.message });
        }
        res.status(200).json(result.rows)
    })
})

app.post('/', (req, res) => {   
    const pool = openDb()

    pool.query('insert into task (discription) values ($1) returning *',)
    [req.body.discription],
    (error, result) => {
        if (error) {
            res.status(500).json({error: error.message});
        } else {
            res.status(200).json({id : result.rows[0].id});
        }
    }
})

const openDb = () => {
    const pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'TODO',
        password: '106369',
        port: 5432,
    })
    return pool;
}

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

app.delete('/delete/:id', async(req, res) => {
    const pool = openDb()
    const id = parseInt(req.params.id)
    pool.query('DELETE FROM task WHERE id = $1', 
    [id], 
    (error, result) => {
        if (error) {
            res.status(500).json({error: error.message});
        } else {
            res.status(200).json({id: id});
        }
    })
})