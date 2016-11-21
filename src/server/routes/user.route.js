// Dependencies =======================
import { Router } from 'express'
import userCtrl from '../controllers/user.controller'
const userRoutes = Router()

// /api/user/ API Page =================
userRoutes.route('/')
    .get(userCtrl.findAll)
    .post(userCtrl.Create)

// /api/user/:Id API Page ==============    
userRoutes.route('/:id')
    .get(userCtrl.findOne)
    .delete(userCtrl.Delete)
    .put(userCtrl.Update)

// userRouter exports ======================
export default userRoutes