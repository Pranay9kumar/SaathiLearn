const catchAsync = require('../utils/catchAsync');
const syncService = require('../services/sync.service');

/**
 * POST /api/sync
 */
const syncOfflineData = catchAsync(async (req, res) => {
  const { submissions } = req.body;

  const result = await syncService.syncOfflineData(req.user.id, submissions);

  res.status(200).json({
    success: true,
    message: `Sync complete: ${result.synced} synced, ${result.skipped} skipped, ${result.errors} errors.`,
    data: result,
  });
});

module.exports = { syncOfflineData };
