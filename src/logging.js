const LOG_ENDPOINT = 'http://20.244.56.144/evaluation-service/logs';
const VALID_STACKS = ['frontend'];
const VALID_LEVELS = ['debug', 'info', 'warn', 'error', 'fatal'];
const FRONTEND_PACKAGES = ['api'];

let authToken = '';

export function setAuthToken(token) {
  authToken = token;
}

export async function Log(stack, level, packageName, message) {
  if (!VALID_STACKS.includes(stack)) {
    console.error(`Log error: Invalid stack '${stack}'. Only 'frontend' is allowed.`);
    return;
  }
  if (!VALID_LEVELS.includes(level)) {
    console.error(`Log error: Invalid level '${level}'.`);
    return;
  }
  if (!FRONTEND_PACKAGES.includes(packageName)) {
    console.error(`Log error: Invalid frontend package '${packageName}'. Only 'api' is allowed.`);
    return;
  }
  if (typeof message !== 'string' || !message.trim()) {
    console.error('Log error: Message must be a non-empty string.');
    return;
  }
  if (!authToken) {
    console.error('Log error: Authentication token not set.');
    return;
  }

  const payload = {
    stack,
    level,
    package: packageName,
    message,
    timestamp: new Date().toISOString()
  };

  try {
    const response = await fetch(LOG_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(payload)
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Log API error: ${response.status} ${errorText}`);
    }
  } catch (err) {
    console.error('Logging network error:', err);
  }
}
