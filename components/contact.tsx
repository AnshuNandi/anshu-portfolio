'use client'

import { useState } from 'react'
import { Check, Copy, Mail, Phone, Send, Loader2 } from 'lucide-react'
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
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status === 'loading') return
    
    setStatus('loading')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      setStatus('success')
      setForm({ name: '', email: '', message: '' })
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000)
    } catch (error) {
      console.error(error)
      setStatus('error')
      // Reset error state after a few seconds
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  const field =
    'w-full border-[3px] border-ink bg-background px-3 py-2.5 font-sans text-sm outline-none placeholder:text-muted-foreground focus:bg-goog-yellow/25 focus:ring-0'

  return (
    <Section id="contact" className="relative border-b-[3px] border-ink bg-muted overflow-hidden">
      {/* backdrop */}
      <div aria-hidden="true" className="grid-paper absolute inset-0 z-0" />
      
      {/* Google I/O Authentic Graphics - Edge Anchored (Responsive) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Faint green glow anchoring the bottom of the contact form */}
        <div className="absolute -bottom-[100px] md:-bottom-[200px] left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-[150px] md:h-[300px] rounded-full bg-[var(--goog-green)] opacity-[0.12] blur-3xl" />
        
        {/* Blue plus grid tucked into the top left */}
        <div className="absolute top-[5%] left-[2%] w-[100px] md:w-[200px] h-[100px] md:h-[200px] opacity-[0.20] bg-[length:24px_24px] md:bg-[length:40px_40px]"
             style={{ 
               backgroundImage: `url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cpath d='M18 10v20h4V10zM10 18v4h20v-4z' fill='%234285f4' /%3E%3C/svg%3E")`
             }} />
             
        {/* Yellow quarter circle top right */}
        <div className="absolute -top-[25px] md:-top-[50px] -right-[25px] md:-right-[50px] w-[100px] md:w-[200px] h-[100px] md:h-[200px] rounded-bl-full bg-[var(--goog-yellow)] opacity-[0.25]" />
      </div>

      <div className="relative z-10 flex flex-col gap-10">
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
            <div className="brut brut-hover bg-ink p-5 text-paper dark:bg-zinc-800 dark:text-zinc-50">
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
                className="brut brut-hover brut-press flex items-center gap-3 bg-card p-4"
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
                className="brut brut-hover brut-press flex items-center gap-3 bg-card p-4"
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
          <form onSubmit={onSubmit} className="brut brut-hover flex flex-col gap-4 bg-card p-5 sm:p-6">
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
              disabled={status === 'loading' || status === 'success'}
              className="brut brut-hover brut-press inline-flex items-center justify-center gap-2 bg-goog-blue px-5 py-3 font-display text-sm uppercase tracking-wide text-primary-foreground disabled:opacity-50 disabled:pointer-events-none"
            >
              {status === 'loading' ? (
                <>
                  Sending...
                  <Loader2 className="size-4 animate-spin" strokeWidth={3} />
                </>
              ) : status === 'success' ? (
                <>
                  Sent!
                  <Check className="size-4" strokeWidth={3} />
                </>
              ) : status === 'error' ? (
                <>
                  Failed! Try again
                  <Send className="size-4" strokeWidth={3} />
                </>
              ) : (
                <>
                  Send Message
                  <Send className="size-4" strokeWidth={3} />
                </>
              )}
            </button>
            <p className="font-mono text-[11px] leading-relaxed text-muted-foreground text-center">
              Your message will be sent directly to my inbox.
            </p>
          </form>
        </div>
      </div>
    </Section>
  )
}
