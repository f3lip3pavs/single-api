import Express from 'express'
import { pool } from './config/connectionDB'

const app = Express()
const port = Number(process.env.PORT) | 3000

pool.connect()
.then(() => {console.log('✅ Database is running!')})
.catch(e => {console.log('❌ database connection filed: ', e)})

app.listen(port, ()=>{
    console.log('app start: listen on port:', port)
})
 