"use client";

import { useMemo, useState } from "react";
import { contact } from "@/data/content";
import Reveal from "./Reveal";
import HoverTip from "./HoverTip";

const field =
  "w-full rounded-[24px] bg-indigo-tint px-5 py-4 text-[16px] outline-none transition-shadow focus:shadow-[0_0_0_2px_var(--color-indigo)]";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("");
  const [details, setDetails] = useState("");

  const isValid =
    name.trim() !== "" && /\S+@\S+\.\S+/.test(email) && details.trim() !== "";

  /** No backend — the form composes a mail draft the visitor sends. */
  const mailtoHref = useMemo(() => {
    const subject = `New project inquiry from ${name || "website"}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      interest ? `Interested in: ${interest}` : null,
      "",
      details,
    ]
      .filter(Boolean)
      .join("\n");
    return `mailto:${contact.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  }, [name, email, interest, details]);

  const scheduleHref = `https://calendar.google.com/calendar/render?${new URLSearchParams(
    {
      action: "TEMPLATE",
      text: "Intro call with Anmol Rajput",
      details: "Book a time that works for you and I'll send the invite.",
      add: contact.email,
    },
  ).toString()}`;

  return (
    <section id="contact" className="section-y">
      <div className="container-x">
        <h2 className="section-title">Let&apos;s Work Together</h2>
        <p className="body-md mx-auto mt-4 max-w-[560px] text-center">
          Tell me what you&apos;re building. I reply to everything, usually
          within a day.
        </p>

        <Reveal>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
            <HoverTip label="Opens Google Calendar">
              <a
                href={scheduleHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
              >
                <span>Schedule a Meeting</span>
              </a>
            </HoverTip>
            <HoverTip label="Send Me an Email">
              <a
                href={`mailto:${contact.email}`}
                className="text-[15px] font-medium underline decoration-hair underline-offset-8 transition-colors hover:text-indigo"
              >
                {contact.email}
              </a>
            </HoverTip>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="panel mx-auto mt-10 max-w-[900px] 2xl:max-w-[1080px] p-[6px]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (isValid) window.location.href = mailtoHref;
              }}
              className="card px-6 py-8 md:px-10 md:py-10"
            >
              <p className="eyebrow">What can I help with?</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {contact.interests.map((item) => {
                  const on = interest === item;
                  return (
                    <button
                      key={item}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setInterest(on ? "" : item)}
                      className={`rounded-[96px] px-4 py-2 text-[14px] font-medium transition-colors duration-300 md:text-[15px] ${
                        on
                          ? "bg-indigo text-white"
                          : "bg-indigo-tint hover:bg-indigo-fill"
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>

              <div className="mt-10 grid gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <span className="eyebrow">Name*</span>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={field}
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="eyebrow">Email*</span>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={field}
                  />
                </label>
              </div>

              <label className="mt-4 flex flex-col gap-2">
                <span className="eyebrow">Project details*</span>
                <textarea
                  required
                  rows={5}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className={`${field} resize-y`}
                />
              </label>

              <button
                type="submit"
                disabled={!isValid}
                className="btn mt-8 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
