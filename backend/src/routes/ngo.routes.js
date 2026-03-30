const { Router } = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const ngoController = require('../controllers/ngo.controller');

const router = Router();

// All NGO routes require authentication + ADMIN role
router.use(authenticate, authorize('ADMIN'));

/**
 * GET /api/ngo/metrics
 * Get aggregate engagement metrics
 */
router.get('/metrics', ngoController.getMetrics);

/**
 * GET /api/ngo/at-risk
 * Get at-risk students list
 */
router.get('/at-risk', ngoController.getAtRiskStudents);

/**
 * GET /api/ngo/overview
 * Get high-level platform stats
 */
router.get('/overview', ngoController.getOverview);

module.exports = router;
