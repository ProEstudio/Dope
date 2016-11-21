// Dependencies =======================
import { Router } from 'express'
import userRoutes from './user.route'
const router = Router()

// GET /health-check - Check service ===

// routes at /users ====================
router.use('/users', userRoutes)

// routes at /auth =====================

// Router exports ======================
export default router