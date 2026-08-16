const CONTACT_EMAIL = "support@deventro.site";
const FROM_EMAIL = "DevEntro Website <website@deventro.site>";
const RESEND_ENDPOINT = "https://api.resend.com/emails";
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX = 5;
const recentSubmissions = new Map();

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

export async function onRequestPost({ request, env }) {
  if (!env.RESEND_API_KEY) {
    return json({ error: "Resend API key is not configured." }, 503);
  }

  if (isRateLimited(request)) {
    return json({ error: "Too many requests. Please try again shortly." }, 429);
  }

  const formData = await request.formData();

  if (clean(formData.get("website"))) {
    return json({ ok: true });
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

  const resendResponse = await fetch(RESEND_ENDPOINT, {
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
    console.error("Resend contact email failed", details);
    return json({ error: "Unable to send message." }, 502);
  }

  return json({ ok: true });
}

export function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      allow: "POST, OPTIONS",
    },
  });
}
