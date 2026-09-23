"use client";

import { type FormEvent, useCallback, useEffect, useRef, useState } from "react";
import Script from "next/script";
import {
  budgets,
  CONTACT_EMAIL,
  projectTypes,
  timelines,
  TURNSTILE_SITE_KEY,
} from "../content";
import { ArrowIcon } from "./Icons";

type Turnstile = {
  render: (
    container: HTMLElement,
    options: Record<string, unknown>,
  ) => string | undefined;
  reset: (widgetId?: string) => void;
  remove: (widgetId?: string) => void;
};

declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}

type ContactStatus = {
  tone: "idle" | "pending" | "success" | "error";
  message: string;
};

export default function ContactForm() {
  const widgetRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | undefined>(undefined);
  const [scriptReady, setScriptReady] = useState(false);
  const [token, setToken] = useState("");
  const [status, setStatus] = useState<ContactStatus>({
    tone: "idle",
    message: "",
  });

  useEffect(() => {
    const turnstile = window.turnstile;
    if (!scriptReady || !turnstile || !widgetRef.current || widgetId.current) {
      return;
    }

    widgetId.current = turnstile.render(widgetRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      theme: "light",
      "refresh-expired": "auto",
      callback: (value: string) => setToken(value),
      "expired-callback": () => setToken(""),
      "error-callback": () => {
        setToken("");
        setStatus({
          tone: "error",
          message:
            "The security check could not load. Refresh the page or email me directly.",
        });
      },
    });

    return () => {
      turnstile.remove(widgetId.current);
      widgetId.current = undefined;
    };
  }, [scriptReady]);

  const resetWidget = useCallback(() => {
    setToken("");
    window.turnstile?.reset(widgetId.current);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("cf-turnstile-response", token);

    setStatus({ tone: "pending", message: "Sending your project brief..." });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });
      const result = (await response.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!response.ok) {
        throw new Error(result.error || "Unable to send message.");
      }

      form.reset();
      setStatus({
        tone: "success",
        message: "Message sent. I'll reply with a practical next step.",
      });
    } catch (error) {
      setStatus({
        tone: "error",
        message: `${
          error instanceof Error ? error.message : "Something went wrong."
        } You can also email ${CONTACT_EMAIL} directly.`,
      });
    } finally {
      // Turnstile tokens are single-use, so every attempt needs a fresh one.
      resetWidget();
    }
  }

  const pending = status.tone === "pending";

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={() => setScriptReady(true)}
      />

      <div className="form-grid">
        <label>
          <span>Name</span>
          <input
            name="name"
            type="text"
            autoComplete="name"
            maxLength={120}
            required
          />
        </label>
        <label>
          <span>Email</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            maxLength={200}
            required
          />
        </label>
      </div>

      <label>
        <span>
          Company or brand <small>(optional)</small>
        </span>
        <input
          name="company"
          type="text"
          autoComplete="organization"
          maxLength={200}
        />
      </label>

      <div className="form-grid">
        <label>
          <span>Project type</span>
          <select name="projectType" defaultValue="" required>
            <option value="" disabled>
              Select one
            </option>
            {projectTypes.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label>
          <span>Timeline</span>
          <select name="timeline" defaultValue="" required>
            <option value="" disabled>
              Select one
            </option>
            {timelines.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
      </div>

      <label>
        <span>
          Budget range <small>(optional)</small>
        </span>
        <select name="budget" defaultValue="">
          <option value="">Select one</option>
          {budgets.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>

      <label>
        <span>Project details</span>
        <textarea
          name="message"
          rows={6}
          maxLength={4000}
          placeholder="What are you trying to build, improve or automate?"
          required
        />
      </label>

      <label className="form-trap" aria-hidden="true">
        <span>Leave this field empty</span>
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>

      <div className="turnstile-widget" ref={widgetRef} />

      <button
        className="button button-primary form-submit"
        disabled={pending || !token}
        type="submit"
      >
        {pending ? "Sending..." : "Send project brief"} <ArrowIcon />
      </button>

      {!token && !pending && (
        <p className="form-hint">
          Complete the security check above to enable sending.
        </p>
      )}

      <p className={`form-status ${status.tone}`} role="status" aria-live="polite">
        {status.message}
      </p>
    </form>
  );
}
