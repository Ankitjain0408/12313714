
const allowedStacks = ["backend", "frontend"];
const allowedLevels = ["info", "warn", "error", "fatal"];
const allowedPackages = [
	"handler", "repository", "route", "service",
	"api", "component", "hook", "page", "state", "style",
	"auth", "config", "middleware", "utils"
];

function validateLog(req, res, next) {
	const { stack, level, package: pkg, message } = req.body;
	if (!stack || !level || !pkg || !message) {
		return res.status(400).json({ error: "Missing required fields: stack, level, package, message" });
	}
	if (!allowedStacks.includes(stack)) {
		return res.status(400).json({ error: `Invalid stack. Allowed: ${allowedStacks.join(", ")}` });
	}
	if (!allowedLevels.includes(level)) {
		return res.status(400).json({ error: `Invalid level. Allowed: ${allowedLevels.join(", ")}` });
	}
	if (!allowedPackages.includes(pkg)) {
		return res.status(400).json({ error: `Invalid package. Allowed: ${allowedPackages.join(", ")}` });
	}
	next();
}

module.exports = validateLog;
