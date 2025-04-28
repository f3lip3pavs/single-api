import Express from 'express'
import { pool } from './config/connectionDB'
import userRoutes from './routes/user-routes'
import productsRoutes from './routes/product-routes'
import authRoutes from './routes/auth-route'
import adminRoutes from './routes/admin-routes';


const app = Express()
const port = Number(process.env.PORT) | 3000

pool.connect()
.then(() => {console.log('✅ Database is running!')})
.catch(e => {console.log('❌ database connection filed: ', e)})

app.use(Express.json());
app.use('/users', userRoutes);
app.use('/products', productsRoutes);
app.use('/login', authRoutes);
app.use('/admin', adminRoutes);
// app.use('payment', routes);

app.listen(port, ()=>{
    console.log('app start: listen on port:', port)
})
 