const CONTACT_EMAIL = "support@deventro.site";
const FROM_EMAIL = "DevEntro Website <website@deventro.site>";
const RESEND_ENDPOINT = "https://api.resend.com/emails";
const TURNSTILE_ENDPOINT =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const DEFAULT_HOSTNAMES = ["dev.deventro.site"];
// Turnstile tokens can be up to 2048 characters; never truncate them.
const TURNSTILE_TOKEN_MAX_LENGTH = 2048;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX = 5;
// Best effort only: this map lives in a single Worker isolate, so limits are
// not shared across isolates or regions. Pair it with a Cloudflare WAF rate
// limiting rule on /api/contact for a real limit.
const recentSubmissions = new Map();

function allowedHostnames(env) {
  const configured = String(env.TURNSTILE_HOSTNAMES || "")
    .split(",")
    .map((hostname) => hostname.trim())
    .filter(Boolean);

  return configured.length ? configured : DEFAULT_HOSTNAMES;
}

function turnstileErrorMessage(codes = []) {
  if (codes.includes("timeout-or-duplicate")) {
    return "The security check expired. Please complete it again and resend.";
  }

  return "Security verification failed. Please try again.";
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
  });
}

function clean(value) {
  return String(value || "").trim().slice(0, 4000);
}

function cleanLine(value) {
  return clean(value).replace(/[\r\n]+/g, " ").slice(0, 300);
}

function escapeHtml(value) {
  return clean(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getClientIp(request) {
  return (
    request.headers.get("CF-Connecting-IP") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

function isRateLimited(request) {
  const ip = getClientIp(request);
  const now = Date.now();
  const current = recentSubmissions.get(ip) || [];
  const fresh = current.filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
  );

  if (fresh.length >= RATE_LIMIT_MAX) {
    recentSubmissions.set(ip, fresh);
    return true;
  }

  fresh.push(now);
  recentSubmissions.set(ip, fresh);
  return false;
}

async function verifyTurnstile({ request, env, token }) {
  if (!env.TURNSTILE_SECRET_KEY) {
    return {
      ok: false,
      error: json({ error: "Turnstile is not configured." }, 503),
    };
  }

  if (!token) {
    return {
      ok: false,
      error: json({ error: "Please complete the security check." }, 400),
    };
  }

  const verificationData = new FormData();
  verificationData.append("secret", env.TURNSTILE_SECRET_KEY);
  verificationData.append("response", token);
  verificationData.append("remoteip", getClientIp(request));

  const verificationResponse = await fetch(TURNSTILE_ENDPOINT, {
    method: "POST",
    body: verificationData,
  });

  if (!verificationResponse.ok) {
    return {
      ok: false,
      error: json({ error: "Unable to verify security check." }, 502),
    };
  }

  const verification = await verificationResponse.json();

  if (!verification.success) {
    console.warn("Turnstile rejected token", verification["error-codes"]);
    return {
      ok: false,
      error: json(
        { error: turnstileErrorMessage(verification["error-codes"]) },
        403,
      ),
    };
  }

  if (!allowedHostnames(env).includes(verification.hostname)) {
    console.warn("Turnstile hostname not allowed", verification.hostname);
    return {
      ok: false,
      error: json(
        { error: "Security verification failed. Please try again." },
        403,
      ),
    };
  }

  return {
    ok: true,
  };
}

async function handleContact({ request, env }) {
  if (!env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not configured");
    return json({ error: "The contact form is temporarily unavailable." }, 503);
  }

  if (isRateLimited(request)) {
    return json({ error: "Too many requests. Please try again shortly." }, 429);
  }

  let formData;

  try {
    formData = await request.formData();
  } catch {
    return json({ error: "Invalid form submission." }, 400);
  }

  if (clean(formData.get("website"))) {
    return json({ ok: true });
  }

  const turnstileToken = String(
    formData.get("cf-turnstile-response") || "",
  ).trim();

  if (turnstileToken.length > TURNSTILE_TOKEN_MAX_LENGTH) {
    return json({ error: "Invalid security check token." }, 400);
  }
  const turnstile = await verifyTurnstile({
    request,
    env,
    token: turnstileToken,
  });

  if (!turnstile.ok) {
    return turnstile.error;
  }

  const name = cleanLine(formData.get("name"));
  const email = cleanLine(formData.get("email"));
  const company = cleanLine(formData.get("company"));
  const projectType = cleanLine(formData.get("projectType"));
  const budget = cleanLine(formData.get("budget"));
  const timeline = cleanLine(formData.get("timeline"));
  const message = clean(formData.get("message"));

  if (!name || !email || !projectType || !timeline || !message) {
    return json({ error: "Missing required fields." }, 400);
  }

  if (!isEmail(email)) {
    return json({ error: "Invalid email address." }, 400);
  }

  const subject = `New project inquiry from ${name}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company || "Not provided"}`,
    `Project type: ${projectType}`,
    `Budget: ${budget || "Not selected"}`,
    `Timeline: ${timeline}`,
    "",
    "Project details:",
    message,
  ].join("\n");

  const html = `
    <h2>New project inquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Company:</strong> ${escapeHtml(company || "Not provided")}</p>
    <p><strong>Project type:</strong> ${escapeHtml(projectType)}</p>
    <p><strong>Budget:</strong> ${escapeHtml(budget || "Not selected")}</p>
    <p><strong>Timeline:</strong> ${escapeHtml(timeline)}</p>
    <p><strong>Project details:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
  `;

  const resendResponse = await fetch(env.RESEND_ENDPOINT || RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [CONTACT_EMAIL],
      reply_to: email,
      subject,
      text,
      html,
    }),
  });

  if (!resendResponse.ok) {
    const details = await resendResponse.text();
    console.error("Resend contact email failed", resendResponse.status, details);
    return json({ error: "Your message could not be delivered." }, 502);
  }

  return json({ ok: true });
}

export async function onRequestPost(context) {
  try {
    return await handleContact(context);
  } catch (error) {
    console.error("Contact form failed", error);
    return json({ error: "Something went wrong on our side." }, 500);
  }
}

export function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      allow: "POST, OPTIONS",
    },
  });
}
