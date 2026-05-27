"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Lenis from "lenis";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Code, Download, Fingerprint, Lock, ShieldCheck, Cpu, Eye, LayoutTemplate } from "lucide-react";

export default function Home() {
  const prefersReducedMotion = useReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // cubic-bezier smooth ease-out
      smoothWheel: true,
      smoothTouch: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [prefersReducedMotion]);

  // Navbar Scroll Handler
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Standard Framer Motion Reveal Variants
  const fadeInUp = {
    initial: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  };

  const staggerChildren = {
    animate: { transition: { staggerChildren: 0.08 } }
  };

  return (
    <div className="font-body-md text-body-md selection:bg-primary selection:text-on-primary bg-background text-on-surface min-h-screen flex flex-col antialiased">
      {/* TopNavBar */}
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-surface/80 backdrop-blur-md border-b border-outline-variant/60 shadow-sm py-3" 
            : "bg-surface/90 border-b border-transparent py-4"
        }`}
      >
        <div className="flex justify-between items-center px-4 sm:px-8 md:px-12 lg:px-16 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-md md:gap-lg">
            <Link href="/" className="flex items-center gap-sm font-display text-headline-md tracking-tighter text-primary group select-none">
              <motion.img 
                src="/logo.png" 
                alt="SynthData Logo" 
                className="w-6 h-6 object-contain"
                whileHover={{ rotate: 10 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              />
              <span className="group-hover:text-neutral-700 transition-colors duration-150 text-[18px] md:text-headline-md">SynthData</span>
            </Link>
            <div className="hidden md:flex gap-md lg:gap-lg">
              <button
                onClick={() => handleScrollTo("features")}
                className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors duration-150 py-1 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                Features
              </button>
              <button
                onClick={() => handleScrollTo("templates")}
                className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors duration-150 py-1 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                Templates
              </button>
              <button
                onClick={() => handleScrollTo("privacy")}
                className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors duration-150 py-1 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                Privacy
              </button>
            </div>
          </div>
          <div className="flex items-center gap-sm md:gap-md">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex font-body-md text-body-md text-on-surface-variant hover:text-primary px-sm md:px-md py-sm transition-colors duration-150"
            >
              GitHub
            </a>
            <Link
              href="/dashboard"
              className="bg-primary text-on-primary font-body-md text-body-md px-md md:px-lg py-sm rounded-lg transition-all duration-150 hover:bg-zinc-800 flex items-center justify-center font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary text-sm md:text-base hover:translate-y-[-1px] active:translate-y-[1px] active:scale-[0.98]"
            >
              Launch App
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 md:pt-32 flex-grow overflow-x-hidden">
        {/* Asymmetric Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-lg lg:gap-xl mb-24 md:mb-32 items-center">
          <motion.div 
            className="lg:col-span-6 space-y-md md:space-y-lg text-center lg:text-left flex flex-col items-center lg:items-start"
            initial="initial"
            animate="animate"
            variants={staggerChildren}
          >
            <motion.span 
              variants={fadeInUp}
              className="font-label-caps text-label-caps text-on-secondary-container bg-secondary-container px-sm py-base inline-block font-semibold"
            >
              Beta v0.8
            </motion.span>
            <motion.h1 
              variants={fadeInUp}
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-display leading-tight text-on-background tracking-tighter"
            >
              Generate realistic synthetic datasets instantly.
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="font-body-lg text-base md:text-body-lg text-on-surface-variant max-w-xl"
            >
              Professional-grade data synthesis for engineers. Build schemas, generate millions of rows, and export without ever leaving your browser.
            </motion.p>
            <motion.div 
              variants={fadeInUp}
              className="flex flex-wrap gap-sm md:gap-md pt-md justify-center lg:justify-start w-full"
            >
              <motion.div
                whileHover={{ y: -1 }}
                whileTap={{ y: 1, scale: 0.98 }}
                className="w-full sm:w-auto"
              >
                <Link
                  href="/dashboard"
                  className="bg-primary text-on-primary px-xl py-md font-body-md text-body-md rounded-lg hover:bg-zinc-800 transition-colors duration-150 text-center block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary font-medium w-full sm:w-auto"
                >
                  Generate Dataset
                </Link>
              </motion.div>
              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ y: 1, scale: 0.98 }}
                onClick={() => handleScrollTo("templates")}
                className="border border-outline-variant text-primary px-xl py-md font-body-md text-body-md rounded-lg hover:bg-surface-container transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary w-full sm:w-auto"
              >
                Explore Templates
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div 
            className="lg:col-span-6 relative w-full"
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="bg-white border border-outline-variant shadow-sm overflow-hidden flex flex-col h-[400px] md:h-[500px] hover:shadow-md transition-shadow duration-300">
              {/* Toolbar Mockup */}
              <div className="h-10 border-b border-outline-variant flex items-center px-md justify-between bg-surface-container-low select-none">
                <div className="flex gap-sm">
                  <div className="w-3 h-3 rounded-full bg-outline-variant"></div>
                  <div className="w-3 h-3 rounded-full bg-outline-variant"></div>
                  <div className="w-3 h-3 rounded-full bg-outline-variant"></div>
                </div>
                <div className="font-mono-data text-mono-data opacity-50 text-[11px] md:text-[13px]">preview_customer_data_v1.json</div>
              </div>
              {/* Data & Code Split */}
              <div className="flex-grow grid grid-rows-2 overflow-hidden">
                {/* Table Preview */}
                <div className="overflow-auto border-b border-outline-variant custom-scrollbar">
                  <table className="w-full text-left border-collapse min-w-[500px] table-fixed">
                    <thead className="sticky top-0 bg-surface-container-low z-10">
                      <tr className="border-b border-outline-variant">
                        <th className="font-label-caps text-label-caps py-sm px-md border-r border-outline-variant w-1/4">UUID</th>
                        <th className="font-label-caps text-label-caps py-sm px-md border-r border-outline-variant w-1/4">NAME</th>
                        <th className="font-label-caps text-label-caps py-sm px-md border-r border-outline-variant w-1/4">EMAIL</th>
                        <th className="font-label-caps text-label-caps py-sm px-md border-r border-outline-variant w-1/8">PLAN</th>
                        <th className="font-label-caps text-label-caps py-sm px-md w-1/8">STATUS</th>
                      </tr>
                    </thead>
                    <tbody className="font-mono-data text-mono-data">
                      <tr className="border-b border-outline-variant bg-surface-container-lowest hover:bg-surface-container-low/50 transition-colors duration-150">
                        <td className="py-sm px-md border-r border-outline-variant overflow-hidden text-ellipsis whitespace-nowrap">8f1-a2...</td>
                        <td className="py-sm px-md border-r border-outline-variant overflow-hidden text-ellipsis whitespace-nowrap">Julian V.</td>
                        <td className="py-sm px-md border-r border-outline-variant overflow-hidden text-ellipsis whitespace-nowrap">j.v@domain.com</td>
                        <td className="py-sm px-md border-r border-outline-variant overflow-hidden text-ellipsis whitespace-nowrap">Enterprise</td>
                        <td className="py-sm px-md text-on-secondary-fixed-variant">Active</td>
                      </tr>
                      <tr className="border-b border-outline-variant bg-surface-container hover:bg-surface-container-low/50 transition-colors duration-150">
                        <td className="py-sm px-md border-r border-outline-variant overflow-hidden text-ellipsis whitespace-nowrap">3c4-e9...</td>
                        <td className="py-sm px-md border-r border-outline-variant overflow-hidden text-ellipsis whitespace-nowrap">Elena S.</td>
                        <td className="py-sm px-md border-r border-outline-variant overflow-hidden text-ellipsis whitespace-nowrap">elena@cloud.io</td>
                        <td className="py-sm px-md border-r border-outline-variant overflow-hidden text-ellipsis whitespace-nowrap">Pro</td>
                        <td className="py-sm px-md text-error">Expired</td>
                      </tr>
                      <tr className="border-b border-outline-variant bg-surface-container-lowest hover:bg-surface-container-low/50 transition-colors duration-150">
                        <td className="py-sm px-md border-r border-outline-variant overflow-hidden text-ellipsis whitespace-nowrap">5d2-b1...</td>
                        <td className="py-sm px-md border-r border-outline-variant overflow-hidden text-ellipsis whitespace-nowrap">Marcus K.</td>
                        <td className="py-sm px-md border-r border-outline-variant overflow-hidden text-ellipsis whitespace-nowrap">mk@dev.net</td>
                        <td className="py-sm px-md border-r border-outline-variant overflow-hidden text-ellipsis whitespace-nowrap">Basic</td>
                        <td className="py-sm px-md text-on-secondary-fixed-variant">Active</td>
                      </tr>
                      <tr className="border-b border-outline-variant bg-surface-container hover:bg-surface-container-low/50 transition-colors duration-150">
                        <td className="py-sm px-md border-r border-outline-variant overflow-hidden text-ellipsis whitespace-nowrap">9e8-f3...</td>
                        <td className="py-sm px-md border-r border-outline-variant overflow-hidden text-ellipsis whitespace-nowrap">Sarah L.</td>
                        <td className="py-sm px-md border-r border-outline-variant overflow-hidden text-ellipsis whitespace-nowrap">sl@web.com</td>
                        <td className="py-sm px-md border-r border-outline-variant overflow-hidden text-ellipsis whitespace-nowrap">Free</td>
                        <td className="py-sm px-md text-on-secondary-fixed-variant">Active</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* JSON Snippet */}
                <div className="bg-surface-container-low p-md font-mono-data text-mono-data overflow-auto relative custom-scrollbar">
                  <div className="absolute right-md top-md bg-white border border-outline-variant px-sm py-base text-[10px] uppercase font-label-caps select-none">
                    JSON OUTPUT
                  </div>
                  <pre className="text-on-surface-variant text-[12px] md:text-[13px]">{`{
  "dataset": "ecommerce_customers",
  "count": 10000,
  "schema": {
    "id": "uuid",
    "name": "full_name",
    "email": "internet.email",
    "signup_date": "date.past",
    "metadata": {
      "ip": "internet.ip",
      "user_agent": "internet.userAgent"
    }
  },
  "rows": [ ... ]
}`}</pre>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Visual Divider */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 mb-24">
          <div className="border-t border-outline-variant/50 w-full"></div>
        </div>

        {/* Features Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 mb-24 md:mb-32" id="features">
          <div className="mb-xl text-center sm:text-left">
            <h2 className="font-headline-lg text-2xl md:text-headline-lg text-on-background">Core Engine Features</h2>
            <div className="h-1 w-16 bg-primary mt-base mx-auto sm:mx-0"></div>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md lg:gap-lg"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerChildren}
          >
            {/* Feature 1 */}
            <motion.div 
              variants={fadeInUp}
              className="p-lg border border-outline-variant bg-surface-container-lowest rounded-lg hover:translate-y-[-2px] hover:border-outline hover:shadow-sm transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <Download className="text-primary mb-md w-8 h-8 group-hover:scale-105 transition-transform duration-300" />
                <h3 className="font-headline-md text-headline-md mb-sm text-on-background">CSV Export</h3>
                <p className="text-on-surface-variant">High-speed streaming export for large datasets up to 10k+ rows directly from browser memory.</p>
              </div>
            </motion.div>
            {/* Feature 2 */}
            <motion.div 
              variants={fadeInUp}
              className="p-lg border border-outline-variant bg-surface-container-lowest rounded-lg hover:translate-y-[-2px] hover:border-outline hover:shadow-sm transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <Code className="text-primary mb-md w-8 h-8 group-hover:scale-105 transition-transform duration-300" />
                <h3 className="font-headline-md text-headline-md mb-sm text-on-background">JSON Generation</h3>
                <p className="text-on-surface-variant">Standard schema structure supported out of the box with custom key-value mapping logic.</p>
              </div>
            </motion.div>
            {/* Feature 3 */}
            <motion.div 
              variants={fadeInUp}
              className="p-lg border border-outline-variant bg-surface-container-lowest rounded-lg hover:translate-y-[-2px] hover:border-outline hover:shadow-sm transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <LayoutTemplate className="text-primary mb-md w-8 h-8 group-hover:scale-105 transition-transform duration-300" />
                <h3 className="font-headline-md text-headline-md mb-sm text-on-background">Schema Configuration</h3>
                <p className="text-on-surface-variant">Define blueprints, reorder custom fields, and customize row count for consistent data synthesis.</p>
              </div>
            </motion.div>
            {/* Feature 4 */}
            <motion.div 
              variants={fadeInUp}
              className="p-lg border border-outline-variant bg-surface-container-lowest rounded-lg hover:translate-y-[-2px] hover:border-outline hover:shadow-sm transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <Cpu className="text-primary mb-md w-8 h-8 group-hover:scale-105 transition-transform duration-300" />
                <h3 className="font-headline-md text-headline-md mb-sm text-on-background">Local Processing</h3>
                <p className="text-on-surface-variant">Zero data leaves your machine. Synthesis happens entirely on the client side inside the browser runtime.</p>
              </div>
            </motion.div>
            {/* Feature 5 */}
            <motion.div 
              variants={fadeInUp}
              className="p-lg border border-outline-variant bg-surface-container-lowest rounded-lg hover:translate-y-[-2px] hover:border-outline hover:shadow-sm transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <Eye className="text-primary mb-md w-8 h-8 group-hover:scale-105 transition-transform duration-300" />
                <h3 className="font-headline-md text-headline-md mb-sm text-on-background">Instant Preview</h3>
                <p className="text-on-surface-variant">See your changes in real-time. The generator reflects schema tweaks on a live data subset.</p>
              </div>
            </motion.div>
            {/* Feature 6 */}
            <motion.div 
              variants={fadeInUp}
              className="p-lg border border-outline-variant bg-surface-container-lowest rounded-lg hover:translate-y-[-2px] hover:border-outline hover:shadow-sm transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <Fingerprint className="text-primary mb-md w-8 h-8 group-hover:scale-105 transition-transform duration-300" />
                <h3 className="font-headline-md text-headline-md mb-sm text-on-background">Realistic Fake Data</h3>
                <p className="text-on-surface-variant">Powered by hyper-realistic localization names, addresses, job titles, and business logic.</p>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Templates Section */}
        <section className="bg-surface-container py-24 md:py-32 border-t border-outline-variant/50" id="templates">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
            <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-xl gap-sm text-center sm:text-left">
              <div>
                <h2 className="font-headline-lg text-2xl md:text-headline-lg text-on-background">Industry Blueprints</h2>
                <p className="text-on-surface-variant mt-sm">Start faster with validated schemas for common use cases.</p>
              </div>
              <Link href="/dashboard" className="font-label-caps text-label-caps border-b border-primary pb-base uppercase tracking-widest hover:text-primary transition-colors mx-auto sm:mx-0 max-w-max focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary select-none font-semibold">
                Go to Workspace
              </Link>
            </div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md lg:gap-lg"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-80px" }}
              variants={staggerChildren}
            >
              {/* Template 1 */}
              <motion.div 
                variants={fadeInUp}
                className="bg-surface-container-lowest border border-outline-variant rounded-lg p-md flex flex-col justify-between hover:shadow-md transition-all duration-300 group"
              >
                <div>
                  <div className="w-full h-48 overflow-hidden mb-md border border-outline-variant/30 rounded-md">
                    <img
                      className="w-full h-full object-cover grayscale hover:grayscale-0 group-hover:scale-102 transition-all duration-500 rounded-md"
                      alt="E-commerce table blueprint"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBs3YfTe1_XC2ycdJrwrNg3xp75fvXZ_vtkGkAg_yb88of-kuuEMpyaP5UPRKYudWfZhQ3CBUsfzPo0HRCSEpM6OjQY62BK3S9CdLtDuwEXsYOT01SgRZa7ma4sfDc2Ax3EbfIjJRo8RZBqVM9NBN4ApOLYDjTFEysKHwouqT1ptf2i0AtB19v7QNfS0x9HumCdiXew1TkgHOm_S7N0eKHUfv4LHa5SqHkCfwBYL-meRgMLC4HVYJ4-cjCzGqCkLFMyA6tCYLELxQ"
                    />
                  </div>
                  <div className="flex gap-base mb-sm justify-start select-none">
                    <span className="text-[10px] font-label-caps bg-surface-container-high px-base py-[2px] rounded uppercase font-semibold">E-Commerce</span>
                    <span className="text-[10px] font-label-caps bg-surface-container-high px-base py-[2px] rounded uppercase font-semibold">Analytics</span>
                  </div>
                  <h4 className="font-headline-md text-headline-md mb-xs text-on-background text-left">Ecommerce Customers</h4>
                  <p className="text-on-surface-variant text-body-md mb-lg text-left">Rich customer profiles with purchase history, cart behavior, and geographic distribution data.</p>
                </div>
                <motion.div
                  whileHover={{ y: -1 }}
                  whileTap={{ y: 1, scale: 0.98 }}
                >
                  <Link
                    href="/dashboard?template=ecommerce"
                    className="border border-primary text-primary py-sm font-label-caps uppercase text-label-caps tracking-widest hover:bg-primary hover:text-on-primary rounded-lg transition-all duration-200 text-center block w-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary select-none font-semibold text-[11px] tracking-wider"
                  >
                    Use Template
                  </Link>
                </motion.div>
              </motion.div>
              
              {/* Template 2 */}
              <motion.div 
                variants={fadeInUp}
                className="bg-surface-container-lowest border border-outline-variant rounded-lg p-md flex flex-col justify-between hover:shadow-md transition-all duration-300 group"
              >
                <div>
                  <div className="w-full h-48 overflow-hidden mb-md border border-outline-variant/30 rounded-md">
                    <img
                      className="w-full h-full object-cover grayscale hover:grayscale-0 group-hover:scale-102 transition-all duration-500 rounded-md"
                      alt="HR records blueprint"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzDudUCcOScn7qJp7yE7HosYiza1gGqazBWc2ckIiozhuNki4Rhw06DB6U52HJ6GRJgz17qe0bfoEAtMUYJipKu9MajHrmRf-RqVEt870ezOjCPK_d8k52GdpZalxzIevl5gvvgLrZhWW09rQafCkXse3Ptlsg8L8cKfPMmqE3B8XofC6MlkYQ3LkVG6aLhagZGCat4KEIXHdCy_Hdc00MAE0NMd8rAIFlog7_938Vv5WEwrqn_CaD6S1vo-7ssw_QM6ipKeKaWA"
                    />
                  </div>
                  <div className="flex gap-base mb-sm justify-start select-none">
                    <span className="text-[10px] font-label-caps bg-surface-container-high px-base py-[2px] rounded uppercase font-semibold">HR</span>
                    <span className="text-[10px] font-label-caps bg-surface-container-high px-base py-[2px] rounded uppercase font-semibold">Internal</span>
                  </div>
                  <h4 className="font-headline-md text-headline-md mb-xs text-on-background text-left">Employee Records</h4>
                  <p className="text-on-surface-variant text-body-md mb-lg text-left">Complete HR dataset including roles, salary bands, start dates, and department structures.</p>
                </div>
                <motion.div
                  whileHover={{ y: -1 }}
                  whileTap={{ y: 1, scale: 0.98 }}
                >
                  <Link
                    href="/dashboard?template=employee"
                    className="border border-primary text-primary py-sm font-label-caps uppercase text-label-caps tracking-widest hover:bg-primary hover:text-on-primary rounded-lg transition-all duration-200 text-center block w-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary select-none font-semibold text-[11px] tracking-wider"
                  >
                    Use Template
                  </Link>
                </motion.div>
              </motion.div>
              
              {/* Template 3 */}
              <motion.div 
                variants={fadeInUp}
                className="bg-surface-container-lowest border border-outline-variant rounded-lg p-md flex flex-col justify-between hover:shadow-md transition-all duration-300 group"
              >
                <div>
                  <div className="w-full h-48 overflow-hidden mb-md border border-outline-variant/30 rounded-md">
                    <img
                      className="w-full h-full object-cover grayscale hover:grayscale-0 group-hover:scale-102 transition-all duration-500 rounded-md"
                      alt="SaaS events blueprint"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEJzcF_nGJhlaGn8Dux6Hy3dVevMaFks68aT61Cx7HeHmuEYOTfr3vNnCUJMeWHHFEnLfhL448c17I6Y5jVo2tDgS0GB9v8YIi-pUIbEERs84qgDqE7CyQu22Z6nOIkv0lCD5bA1sOUne-ZQ-dMQvuWh6Y60_FNffWjhVoT8xPrnqUOsHOVrFfDaTkKYY4KmWgX2AirUQtHlNvrE4w1vpx4kuaWw91lz67ACRUOAk-83kuXZFlAhzujm0lduYhInb6GAMYBWEmCg"
                    />
                  </div>
                  <div className="flex gap-base mb-sm justify-start select-none">
                    <span className="text-[10px] font-label-caps bg-surface-container-high px-base py-[2px] rounded uppercase font-semibold">SaaS</span>
                    <span className="text-[10px] font-label-caps bg-surface-container-high px-base py-[2px] rounded uppercase font-semibold">Events</span>
                  </div>
                  <h4 className="font-headline-md text-headline-md mb-xs text-on-background text-left">SaaS Analytics</h4>
                  <p className="text-on-surface-variant text-body-md mb-lg text-left">Event-based logs for user onboarding funnels, feature usage, and subscription lifecycle events.</p>
                </div>
                <motion.div
                  whileHover={{ y: -1 }}
                  whileTap={{ y: 1, scale: 0.98 }}
                >
                  <Link
                    href="/dashboard?template=saas"
                    className="border border-primary text-primary py-sm font-label-caps uppercase text-label-caps tracking-widest hover:bg-primary hover:text-on-primary rounded-lg transition-all duration-200 text-center block w-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary select-none font-semibold text-[11px] tracking-wider"
                  >
                    Use Template
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Visual Divider */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
          <div className="border-t border-outline-variant/50 w-full"></div>
        </div>

        {/* Privacy Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 py-24 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-xl" id="privacy">
          <motion.div 
            className="space-y-lg flex flex-col items-center lg:items-start text-center lg:text-left"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-headline-lg text-2xl md:text-headline-lg text-on-background">Privacy-First Architecture</h2>
            <p className="text-body-lg text-base md:text-body-lg text-on-surface-variant max-w-lg">
              We believe your data schemas and generated outputs should remain under your control. SynthData is built as a static application that runs entirely in your browser's runtime.
            </p>
            <div className="bg-surface-container-lowest p-lg border border-outline-variant rounded-lg relative overflow-hidden group hover:border-outline transition-colors duration-300 w-full text-left">
              <div className="data-grid-dots absolute inset-0 opacity-10"></div>
              <div className="relative z-10 flex gap-md items-start">
                <ShieldCheck className="text-primary w-8 h-8 flex-shrink-0 group-hover:scale-105 transition-transform duration-300" />
                <div>
                  <h4 className="font-headline-md text-headline-md mb-xs text-on-background">ISO 27001 Ready</h4>
                  <p className="text-on-surface-variant text-sm md:text-body-md">Since no data is ever transmitted to our servers, you can use SynthData for projects requiring the highest levels of security compliance.</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 gap-md"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerChildren}
          >
            <motion.div 
              variants={fadeInUp}
              className="p-md border border-outline-variant bg-surface-container-lowest rounded-lg hover:border-outline hover:shadow-sm transition-all duration-300"
            >
              <span className="font-label-caps text-label-caps text-on-secondary-container bg-secondary-container px-sm py-base uppercase mb-md inline-block select-none font-semibold">
                Security
              </span>
              <h5 className="font-body-md font-semibold text-primary mb-xs">No Login Required</h5>
              <p className="text-on-surface-variant text-body-md">Start generating immediately. We don't track your identity or capture your schemas.</p>
            </motion.div>
            <motion.div 
              variants={fadeInUp}
              className="p-md border border-outline-variant bg-surface-container-lowest rounded-lg hover:border-outline hover:shadow-sm transition-all duration-300"
            >
              <span className="font-label-caps text-label-caps text-on-secondary-container bg-secondary-container px-sm py-base uppercase mb-md inline-block select-none font-semibold">
                Infrastructure
              </span>
              <h5 className="font-body-md font-semibold text-primary mb-xs">No Cloud Storage</h5>
              <p className="text-on-surface-variant text-body-md">All data stays in temporary browser RAM. Once you close the tab, everything is purged.</p>
            </motion.div>
            <motion.div 
              variants={fadeInUp}
              className="p-md border border-outline-variant bg-surface-container-lowest sm:col-span-2 rounded-lg hover:border-outline hover:shadow-sm transition-all duration-300"
            >
              <span className="font-label-caps text-label-caps text-on-secondary-container bg-secondary-container px-sm py-base uppercase mb-md inline-block select-none font-semibold">
                Engine
              </span>
              <h5 className="font-body-md font-semibold text-primary mb-xs">Local Processing Only</h5>
              <p className="text-on-surface-variant text-body-md">Our generation engine utilizes your local CPU via browser-native logic, ensuring maximum performance without external network dependency.</p>
            </motion.div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface border-t border-outline-variant py-xl">
        <div className="flex flex-col md:flex-row justify-between items-center px-4 sm:px-8 md:px-12 lg:px-16 max-w-7xl mx-auto gap-lg w-full text-center md:text-left">
          <div className="flex flex-col items-center md:items-start gap-xs">
            <span className="flex items-center gap-sm font-display text-headline-md tracking-tighter text-primary select-none">
              <img src="/logo.png" alt="SynthData Logo" className="w-6 h-6 object-contain" />
              <span>SynthData</span>
            </span>
            <span className="font-body-md text-body-md text-on-surface-variant select-none">© 2024 SynthData. Built for precision.</span>
          </div>
          <div className="flex gap-lg justify-center">
            <button onClick={() => handleScrollTo("features")} className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors duration-150 cursor-pointer">Docs</button>
            <a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors duration-150" href="https://github.com">GitHub</a>
            <button onClick={() => handleScrollTo("privacy")} className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors duration-150 cursor-pointer underline">Privacy</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
