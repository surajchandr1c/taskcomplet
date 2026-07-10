"use client";

import React, { useEffect, useState } from "react";
import PageHeader from "@/app/components/PageHeader";

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "features", label: "Key Features" },
  { id: "mission", label: "Our Mission" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact Us" },
];

export default function AboutPage(): React.ReactElement {
  const [activeSection, setActiveSection] = useState("overview");
  const [faqOpen, setFaqOpen] = useState<{ [key: number]: boolean }>({
    0: true, // open the first FAQ by default
  });

  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  // Scroll spy logic to highlight current section in navigation
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => {
      SECTIONS.forEach((section) => {
        const el = document.getElementById(section.id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
  };

  const toggleFaq = (index: number) => {
    setFaqOpen((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 5000);
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto text-white">
      <PageHeader title="About TaskComplet" className="mb-8" />

      {/* Main Container */}
      <div className="flex flex-col lg:flex-row gap-8 relative items-start">
        
        {/* LOCAL SIDEBAR NAVIGATION */}
        {/* Desktop Sidebar (Sticky) */}
        <aside className="hidden lg:block w-64 sticky top-24 shrink-0 bg-zinc-950/40 backdrop-blur-md border border-zinc-800/80 rounded-xl p-5 shadow-xl">
          <div className="text-xs uppercase tracking-wider text-zinc-500 font-bold mb-4 px-2">
            Navigation
          </div>
          <nav className="space-y-1">
            {SECTIONS.map((section) => {
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => handleScrollToSection(section.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 text-left ${
                    isActive
                      ? "bg-blue-600/10 text-blue-400 border-l-2 border-blue-500 pl-2.5"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-900/60 border-l-2 border-transparent"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full transition-all duration-200 ${
                      isActive ? "bg-blue-400 scale-125" : "bg-zinc-600"
                    }`}
                  />
                  {section.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Mobile Sub-Navigation Bar (Sticky at Top of Screen under NavBar) */}
        <nav className="lg:hidden w-full sticky top-16 z-20 flex gap-2 overflow-x-auto py-3 px-1 -mx-1 bg-black/90 backdrop-blur-md border-b border-zinc-900 scrollbar-none">
          {SECTIONS.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => handleScrollToSection(section.id)}
                className={`shrink-0 px-4 py-2 text-xs font-semibold rounded-full transition-colors whitespace-nowrap ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                }`}
              >
                {section.label}
              </button>
            );
          })}
        </nav>

        {/* CONTENT AREA */}
        <div className="flex-1 space-y-16 w-full lg:max-w-4xl">
          
          {/* SECTION 1: OVERVIEW */}
          <section id="overview" className="scroll-mt-24 space-y-6">
            <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/40 p-8 shadow-xl">
              <div className="absolute top-0 right-0 -mt-8 -mr-8 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
              <div className="text-xs uppercase tracking-widest text-blue-400 font-bold mb-2">
                Welcome to TaskComplet
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Streamline Your Productivity
              </h2>
              <p className="text-zinc-400 mt-4 text-sm sm:text-base leading-relaxed">
                TaskComplet is a next-generation local-first planner designed for builders, creators, and professionals who demand speed, privacy, and visual elegance. By storing your data locally and backing it up automatically, we ensure you have full ownership and lightning-fast access to your schedule at all times.
              </p>
              
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="p-4 rounded-xl border border-zinc-900 bg-zinc-900/30">
                  <div className="text-blue-400 text-lg font-semibold">⚡ Blazing Fast</div>
                  <p className="text-xs text-zinc-500 mt-1">Zero network latency. Everything loads and renders instantly.</p>
                </div>
                <div className="p-4 rounded-xl border border-zinc-900 bg-zinc-900/30">
                  <div className="text-emerald-400 text-lg font-semibold">🔒 Local-First</div>
                  <p className="text-xs text-zinc-500 mt-1">Your schedules reside in your browser, keeping you secure.</p>
                </div>
                <div className="p-4 rounded-xl border border-zinc-900 bg-zinc-900/30">
                  <div className="text-purple-400 text-lg font-semibold">🔄 Auto-Sync</div>
                  <p className="text-xs text-zinc-500 mt-1">Syncs seamlessly with secure databases when authenticated.</p>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 2: FEATURES */}
          <section id="features" className="scroll-mt-24 space-y-6">
            <div className="border-b border-zinc-800 pb-3">
              <h2 className="text-xl sm:text-2xl font-bold">Key Features</h2>
              <p className="text-zinc-500 text-xs sm:text-sm mt-1">Everything you need to plan and succeed.</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              
              {/* Feature 1 */}
              <div className="group relative rounded-xl border border-zinc-800 bg-zinc-950/40 p-6 hover:border-zinc-700 transition-all duration-300">
                <div className="h-10 w-10 rounded-lg bg-blue-600/10 text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white">Dynamic Calendar</h3>
                <p className="text-sm text-zinc-400 mt-2">
                  Visualize your tasks on a fully interactive calendar grid. Toggle statuses and track daily completions with responsive state updates.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="group relative rounded-xl border border-zinc-800 bg-zinc-950/40 p-6 hover:border-zinc-700 transition-all duration-300">
                <div className="h-10 w-10 rounded-lg bg-emerald-600/10 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white">Task Management</h3>
                <p className="text-sm text-zinc-400 mt-2">
                  Create, complete, and organize lists. Simple drag-like logic combined with persistent local memory keeps you organized.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="group relative rounded-xl border border-zinc-800 bg-zinc-950/40 p-6 hover:border-zinc-700 transition-all duration-300">
                <div className="h-10 w-10 rounded-lg bg-purple-600/10 text-purple-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h10a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l2 2 4-4M7.5 12h.008v.008H7.5V12Zm0 3h.008v.008H7.5V15Zm0 3h.008v.008H7.5V18Z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white">Structured Roadmaps</h3>
                <p className="text-sm text-zinc-400 mt-2">
                  Group your larger projects into structured roadmaps. Track steps, progress weights, and milestones directly in a single flow.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="group relative rounded-xl border border-zinc-800 bg-zinc-950/40 p-6 hover:border-zinc-700 transition-all duration-300">
                <div className="h-10 w-10 rounded-lg bg-amber-600/10 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white">Cloud Database Sync</h3>
                <p className="text-sm text-zinc-400 mt-2">
                  Never lose your data. Log in to synchronize your local records with our secure cloud servers, making your workspace portable across devices.
                </p>
              </div>

            </div>
          </section>

          {/* SECTION 3: OUR MISSION */}
          <section id="mission" className="scroll-mt-24 space-y-6">
            <div className="border-b border-zinc-800 pb-3">
              <h2 className="text-xl sm:text-2xl font-bold">Our Mission</h2>
              <p className="text-zinc-500 text-xs sm:text-sm mt-1">Our core values and architecture philosophy.</p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-6 space-y-4">
              <p className="text-zinc-300 text-sm leading-relaxed">
                We believe that productivity software should serve the user first, not corporate trackers. Traditional cloud-first planners are slow, leak user data, and fail when you go offline.
              </p>
              <p className="text-zinc-300 text-sm leading-relaxed">
                By making **TaskComplet local-first**, we create software that is fast, resilient, and keeps your private life private. You are in control of when your data leaves your device.
              </p>

              <div className="pt-4 border-t border-zinc-900 grid sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-white text-sm font-semibold mb-1">Our Philosophy</h4>
                  <p className="text-xs text-zinc-500">Ownership, speed, elegant simplicity, and no-compromise performance.</p>
                </div>
                <div>
                  <h4 className="text-white text-sm font-semibold mb-1">Future Roadmap</h4>
                  <p className="text-xs text-zinc-500">Encrypted shared workspaces, custom analytics dashboards, and mobile apps.</p>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 4: FAQ */}
          <section id="faq" className="scroll-mt-24 space-y-6">
            <div className="border-b border-zinc-800 pb-3">
              <h2 className="text-xl sm:text-2xl font-bold">Frequently Asked Questions</h2>
              <p className="text-zinc-500 text-xs sm:text-sm mt-1">Common queries and answers.</p>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: "Is my data stored securely?",
                  a: "Absolutely! Your data is stored directly in your browser's LocalStorage. This means your lists and calendar files never touch our servers unless you create an account and explicitly log in to activate database sync.",
                },
                {
                  q: "Can I use TaskComplet offline?",
                  a: "Yes, fully! Because of our local-first engineering, all calendar entries, roadmap items, and tasks work without any internet connection. The app synchronizes in the background once you get back online.",
                },
                {
                  q: "What database does TaskComplet use?",
                  a: "We use a robust combination of local WebStorage APIs for local operations, and a MongoDB backend for secure cloud synchronization when you register and log in.",
                },
                {
                  q: "Is TaskComplet free?",
                  a: "TaskComplet is fully open-source and free for personal local use. We will always maintain a powerful local version free of charge.",
                },
              ].map((faq, index) => {
                const isOpen = faqOpen[index];
                return (
                  <div
                    key={index}
                    className="rounded-xl border border-zinc-800 bg-zinc-950/40 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full flex items-center justify-between p-5 text-left text-sm sm:text-base font-semibold text-white hover:bg-zinc-900/30 transition-colors"
                    >
                      <span>{faq.q}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.8}
                        stroke="currentColor"
                        className={`w-5 h-5 text-zinc-400 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                      </svg>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 border-t border-zinc-900 text-zinc-400 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* SECTION 5: CONTACT US */}
          <section id="contact" className="scroll-mt-24 space-y-6">
            <div className="border-b border-zinc-800 pb-3">
              <h2 className="text-xl sm:text-2xl font-bold">Contact Us</h2>
              <p className="text-zinc-500 text-xs sm:text-sm mt-1">Get in touch with the development team.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-[1fr_1.5fr]">
              {/* Contact Info */}
              <div className="space-y-4">
                <div className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-5 space-y-4">
                  <h3 className="text-base font-semibold text-white">Support & Feedback</h3>
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                    Have questions, bug reports, or feature requests? Drop us a message or contact our community support.
                  </p>
                  
                  <div className="space-y-3 pt-2 text-xs sm:text-sm">
                    <div className="flex items-center gap-3 text-zinc-400">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5 text-blue-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                      </svg>
                      <span>support@taskcomplet.io</span>
                    </div>
                    <div className="flex items-center gap-3 text-zinc-400">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5 text-emerald-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25g" />
                      </svg>
                      <span>San Francisco, CA</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-6">
                {contactSubmitted ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                    <div className="h-12 w-12 rounded-full bg-emerald-600/10 text-emerald-400 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-white">Thank you!</h3>
                    <p className="text-zinc-400 text-xs sm:text-sm">Your message has been logged. We will get back to you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2.5 text-sm text-white placeholder-zinc-600 transition-colors focus:border-zinc-700 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2.5 text-sm text-white placeholder-zinc-600 transition-colors focus:border-zinc-700 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us what you think..."
                        className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2.5 text-sm text-white placeholder-zinc-600 transition-colors focus:border-zinc-700 focus:outline-none resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-500 cursor-pointer"
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
