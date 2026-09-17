'use client'

import { useState } from 'react'
import { Check, Copy, Mail, Phone, Send } from 'lucide-react'
import { profile } from '@/lib/data'
import { DiscordIcon, GithubIcon, LeetcodeIcon, LinkedinIcon } from './brand-icons'
import { Section, SectionHeading } from './brutal'
import { cn } from '@/lib/utils'

const socials = [
  {
    label: 'GitHub',
    href: profile.github,
    icon: GithubIcon,
    color: 'bg-goog-blue text-primary-foreground',
  },
  {
    label: 'LinkedIn',
    href: profile.linkedin,
    icon: LinkedinIcon,
    color: 'bg-goog-green text-primary-foreground',
  },
  { label: 'LeetCode', href: profile.leetcode, icon: LeetcodeIcon, color: 'bg-goog-yellow text-ink-static' },
  {
    label: 'Discord',
    href: profile.discord,
    icon: DiscordIcon,
    color: 'bg-goog-red text-primary-foreground',
  },
]

export function Contact() {
  const [copied, setCopied] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name || 'someone'}`)
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name}\nReply to: ${form.email}`,
    )
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  const field =
    'w-full border-[3px] border-ink bg-background px-3 py-2.5 font-sans text-sm outline-none placeholder:text-muted-foreground focus:bg-goog-yellow/25 focus:ring-0'

  return (
    <Section id="contact" className="relative border-b-[3px] border-ink bg-muted">
      <div aria-hidden="true" className="dots pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative flex flex-col gap-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading index="06" kicker="Say hello" title="Let's build something" color="green" />
          <p className="max-w-sm text-pretty leading-relaxed text-muted-foreground">
            Internships, freelance builds, hackathon teams or just a chat about agent
            architectures — my inbox is open.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          {/* details */}
          <div className="flex flex-col gap-4">
            <div className="brut bg-ink p-5 text-paper dark:bg-zinc-800 dark:text-zinc-50">
              <p className="font-mono text-[11px] font-bold tracking-widest uppercase text-goog-yellow">
                Email
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="font-display text-base break-all uppercase underline decoration-goog-yellow decoration-[3px] underline-offset-4 sm:text-xl"
                >
                  {profile.email}
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label={copied ? 'Email address copied' : 'Copy email address'}
                  className="brut-sm brut-press inline-flex items-center gap-1.5 bg-goog-yellow px-2.5 py-1.5 font-mono text-[11px] font-bold uppercase text-ink-static"
                >
                  {copied ? (
                    <>
                      <Check className="size-3" strokeWidth={3} aria-hidden="true" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="size-3" strokeWidth={3} aria-hidden="true" /> Copy
                    </>
                  )}
                </button>
                <span aria-live="polite" className="sr-only">
                  {copied ? 'Email address copied to clipboard' : ''}
                </span>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href={`tel:${profile.phone.replace(/\s/g, '')}`}
                className="brut brut-hover flex items-center gap-3 bg-card p-4"
              >
                <span className="brut-sm grid size-10 shrink-0 place-items-center bg-goog-blue text-primary-foreground">
                  <Phone className="size-4" strokeWidth={2.75} />
                </span>
                <span>
                  <span className="block font-mono text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
                    Phone
                  </span>
                  <span className="font-display text-sm uppercase">{profile.phone}</span>
                </span>
              </a>
              <a
                href={`mailto:${profile.altEmail}`}
                className="brut brut-hover flex items-center gap-3 bg-card p-4"
              >
                <span className="brut-sm grid size-10 shrink-0 place-items-center bg-goog-red text-primary-foreground">
                  <Mail className="size-4" strokeWidth={2.75} />
                </span>
                <span className="min-w-0">
                  <span className="block font-mono text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
                    Alt email
                  </span>
                  <span className="block truncate font-display text-sm uppercase">
                    {profile.altEmail}
                  </span>
                </span>
              </a>
            </div>

            <ul className="grid grid-cols-2 gap-4">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={cn(
                      'brut brut-hover brut-press flex items-center justify-between gap-2 px-4 py-3 font-display text-sm uppercase',
                      s.color,
                    )}
                  >
                    {s.label}
                    <s.icon className="size-4 shrink-0" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* form */}
          <form onSubmit={onSubmit} className="brut flex flex-col gap-4 bg-card p-5 sm:p-6">
            <h3 className="font-display text-xl uppercase leading-none">Drop a message</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5">
                <span className="font-mono text-[11px] font-bold tracking-widest uppercase">
                  Your name
                </span>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="John Doe"
                  className={field}
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="font-mono text-[11px] font-bold tracking-widest uppercase">
                  Your email
                </span>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="john@example.com"
                  className={field}
                />
              </label>
            </div>
            <label className="flex flex-col gap-1.5">
              <span className="font-mono text-[11px] font-bold tracking-widest uppercase">
                Message
              </span>
              <textarea
                required
                rows={6}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Your message here..."
                className={cn(field, 'resize-y')}
              />
            </label>
            <button
              type="submit"
              className="brut brut-hover brut-press inline-flex items-center justify-center gap-2 bg-goog-blue px-5 py-3 font-display text-sm uppercase tracking-wide text-primary-foreground"
            >
              Send via email
              <Send className="size-4" strokeWidth={3} />
            </button>
            <p className="font-mono text-[11px] leading-relaxed text-muted-foreground">
              This opens your mail client with the message pre-filled — no data is stored.
            </p>
          </form>
        </div>
      </div>
    </Section>
  )
}
