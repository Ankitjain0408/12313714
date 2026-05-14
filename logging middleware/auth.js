
// Authentication middleware for Express
// Checks for Bearer token in Authorization header
module.exports = function auth(req, res, next) {
	const authHeader = req.headers['authorization'];
	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return res.status(401).json({ error: 'Missing or invalid Authorization header' });
	}
	// Optionally, validate the token value here
	req.token = authHeader.split(' ')[1];
	next();
}
