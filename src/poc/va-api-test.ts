/**
 * POC: VA Veteran Service History and Eligibility API
 * Authorization Code Grant Flow
 *
 * Run: npm run poc:va
 * Then open the URL in browser, login, get redirected with code
 */

import { createServer } from 'http';
import { URL } from 'url';

const VA_AUTH_URL = 'https://sandbox-api.va.gov/oauth2/veteran-verification/v1/authorization';
const VA_TOKEN_URL = 'https://sandbox-api.va.gov/oauth2/veteran-verification/v1/token';
const VA_API_BASE = 'https://sandbox-api.va.gov/services/veteran_verification/v2';

const CLIENT_ID = process.env.VA_CLIENT_ID!;
const CLIENT_SECRET = process.env.VA_CLIENT_SECRET!;
const REDIRECT_URI = process.env.VA_REDIRECT_URI || 'http://127.0.0.1:8080/oauth/callback';
const PORT = 8080;

const SCOPES = [
  'profile',
  'openid',
  'offline_access',
  'service_history.read',
  'veteran_status.read',
  'disability_rating.read'
].join(' ');

/**
 * Build the authorization URL for user to login
 */
function buildAuthUrl(): string {
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: 'code',
    scope: SCOPES,
    state: 'poc-test-' + Date.now(),
  });

  return `${VA_AUTH_URL}?${params.toString()}`;
}

/**
 * Exchange authorization code for access token
 */
async function exchangeCodeForToken(code: string): Promise<any> {
  const credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

  const response = await fetch(VA_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${credentials}`,
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Token exchange failed: ${response.status} - ${error}`);
  }

  return response.json();
}

/**
 * Get veteran status
 */
async function getVeteranStatus(token: string): Promise<any> {
  const response = await fetch(`${VA_API_BASE}/status`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Status API failed: ${response.status} - ${error}`);
  }

  return response.json();
}

/**
 * Get service history
 */
async function getServiceHistory(token: string): Promise<any> {
  const response = await fetch(`${VA_API_BASE}/service_history`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Service History API failed: ${response.status} - ${error}`);
  }

  return response.json();
}

/**
 * Get disability rating
 */
async function getDisabilityRating(token: string): Promise<any> {
  const response = await fetch(`${VA_API_BASE}/disability_rating`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Disability Rating API failed: ${response.status} - ${error}`);
  }

  return response.json();
}

/**
 * Start local server to handle OAuth callback
 */
async function startCallbackServer(): Promise<string> {
  return new Promise((resolve, reject) => {
    const server = createServer(async (req, res) => {
      console.log('Incoming request:', req.url);
      const url = new URL(req.url!, `http://localhost:${PORT}`);

      if (url.pathname.startsWith('/oauth/callback')) {
        const code = url.searchParams.get('code');
        const error = url.searchParams.get('error');

        if (error) {
          res.writeHead(400, { 'Content-Type': 'text/html' });
          res.end(`<h1>Error</h1><p>${error}</p>`);
          server.close();
          reject(new Error(error));
          return;
        }

        if (code) {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(`
            <h1>Authorization successful!</h1>
            <p>You can close this window. Check the terminal for results.</p>
          `);
          server.close();
          resolve(code);
        }
      }
    });

    server.listen(PORT, () => {
      console.log(`Callback server listening on port ${PORT}`);
    });

    // Timeout after 5 minutes
    setTimeout(() => {
      server.close();
      reject(new Error('Timeout waiting for OAuth callback'));
    }, 5 * 60 * 1000);
  });
}

/**
 * Main POC flow
 */
async function main() {
  console.log('=== VA API POC - Authorization Code Flow ===\n');

  if (!CLIENT_ID || !CLIENT_SECRET) {
    console.error('Missing VA_CLIENT_ID or VA_CLIENT_SECRET');
    process.exit(1);
  }

  // Step 1: Show auth URL
  const authUrl = buildAuthUrl();
  console.log('1. Open this URL in your browser to login:\n');
  console.log(authUrl);
  console.log('\n   Use test credentials from:');
  console.log('   https://developer.va.gov/explore/api/veteran-service-history-and-eligibility/test-users/5583/fc3f474120f676f5fad6f4b76339d7e006c165c3c81f0719b91de658177b72a8\n');

  // Step 2: Wait for callback
  console.log('2. Waiting for OAuth callback...\n');
  const code = await startCallbackServer();
  console.log('   ✓ Received authorization code\n');

  // Step 3: Exchange code for token
  console.log('3. Exchanging code for access token...');
  const tokenData = await exchangeCodeForToken(code);
  console.log('   ✓ Got access token (expires in', tokenData.expires_in, 'seconds)\n');

  // Step 4: Make API calls
  const token = tokenData.access_token;

  console.log('4. Fetching veteran data...\n');

  try {
    console.log('--- Veteran Status ---');
    const status = await getVeteranStatus(token);
    console.log(JSON.stringify(status, null, 2));
  } catch (e: any) {
    console.log('Status error:', e.message);
  }

  try {
    console.log('\n--- Service History ---');
    const history = await getServiceHistory(token);
    console.log(JSON.stringify(history, null, 2));
  } catch (e: any) {
    console.log('Service history error:', e.message);
  }

  try {
    console.log('\n--- Disability Rating ---');
    const rating = await getDisabilityRating(token);
    console.log(JSON.stringify(rating, null, 2));
  } catch (e: any) {
    console.log('Disability rating error:', e.message);
  }

  console.log('\n✓ POC Complete');
}

main().catch(console.error);
