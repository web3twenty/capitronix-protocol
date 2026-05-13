/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Rocket,
  Shield,
  Users,
  TrendingUp,
  Layers,
  Globe,
  ArrowRight,
  Zap,
  Award,
  Gem,
  Trophy,
  PieChart,
  Repeat,
  CheckCircle2,
  Car,
  Briefcase,
  FileCode,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { Layout } from "@/components/landing/Layout";
import { Button, Card, Badge } from "@/components/landing/UI";
import { Launchpad } from "@/components/landing/Launchpad";
import { Marketplace } from "@/components/landing/Marketplace";

export default function App() {
  const [view, setView] = useState<"home" | "marketplace">("home");

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#marketplace") {
        setView("marketplace");
      } else {
        setView("home");
      }
      window.scrollTo(0, 0);
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange(); // Initial check

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  };

  const features = [
    {
      title: "Multifaceted Sales Platform",
      description:
        "Built as a versatile Launchpad, allowing for the strategic sale and distribution of any new blockchain project.",
      icon: <Layers className="w-6 h-6" />,
    },
    {
      title: "Instant Global Exposure",
      description:
        "Immediate visibility across a vast global network marketing community, ensuring a ready audience from day one.",
      icon: <Globe className="w-6 h-6" />,
    },
    {
      title: "Built-in Liquidity Solutions",
      description:
        "Mechanisms to rapidly increase liquidity and the number of active holders through an automated marketing engine.",
      icon: <TrendingUp className="w-6 h-6" />,
    },
    {
      title: "Integrated Community Growth",
      description:
        "Platform acts as a community growth engine that drives member acquisition automatically.",
      icon: <Users className="w-6 h-6" />,
    },
    {
      title: "Unified Digital Hub",
      description:
        "Intersection of technical infrastructure and marketing intelligence create a self-sustaining environment.",
      icon: <Rocket className="w-6 h-6" />,
    },
    {
      title: "Global Market Penetration",
      description:
        "Specifically designed to handle project incubation, making it easier to penetrate international markets.",
      icon: <ArrowRight className="w-6 h-6" />,
    },
  ];

  const rewardTiers = [
    { rank: "Rank 1", condition: "5 Direct Active Refer", reward: "25 USDT" },
    { rank: "Rank 2", condition: "5 Direct Rank One", reward: "50 USDT" },
    { rank: "Rank 3", condition: "5 Direct Rank Two", reward: "150 USDT" },
    { rank: "Rank 4", condition: "5 Direct Rank Three", reward: "800 USDT" },
    { rank: "Rank 5", condition: "5 Direct Rank Four", reward: "2000 USDT" },
    { rank: "Rank 6", condition: "5 Direct Rank Five", reward: "8000 USDT" },
  ];

  const boardBenefits = [
    {
      level: "Board 1",
      entry: "$30",
      bonus1: "$30",
      bonus2: "$100",
      bonus3: "$500",
      total: "$630",
    },
    {
      level: "Board 2",
      entry: "$300",
      bonus1: "$200",
      bonus2: "$1,000",
      bonus3: "$5,000",
      total: "$6,200",
    },
    {
      level: "Board 3",
      entry: "$3,000",
      bonus1: "$2,000",
      bonus2: "$7,000",
      bonus3: "$30,000",
      total: "$39,000",
    },
    {
      level: "Board 4",
      entry: "$15,000",
      bonus1: "$10,000",
      bonus2: "$40,000",
      bonus3: "$100,000 + Car",
      total: "$150,000 + Car",
    },
  ];

  if (view === "marketplace") {
    return (
      <Layout>
        <Marketplace
          onBack={() => {
            window.location.hash = "#home";
          }}
        />
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section
        id="home"
        className="relative pt-24 pb-0 lg:pt-32 lg:pb-0 overflow-hidden bg-gradient-to-b from-slate-100 to-slate-50"
      >
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden text-cyan-500/10 [mask-image:linear-gradient(to_bottom,black,transparent)]">
          <svg
            className="absolute inset-0 h-full w-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="hero-pattern"
                width="60"
                height="60"
                patternUnits="userSpaceOnUse"
              >
                <path d="M.5 60V.5H60" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-pattern)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-12 xl:col-span-6 text-left relative z-20 pb-8 lg:pb-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-cyan-600 text-[10px] font-black uppercase tracking-[0.2em] mb-10 shadow-sm"
              >
                <SparklesIcon className="w-3.5 h-3.5" />
                <span>Next-Gen Web3 Protocol</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-6xl md:text-8xl font-black tracking-tight text-slate-950 mb-10 leading-[0.85]"
              >
                Capitronix <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600">
                  Launchpad
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-xl text-slate-700 max-w-lg mb-14 leading-relaxed"
              >
                {`Capitronix Launchpad Protocol is a next-generation token marketing system engineered to solve the "Visibility Gap" in Web3.`}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center gap-5"
              >
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto h-16 px-12 text-lg font-bold group shadow-xl shadow-cyan-600/20"
                  onClick={() => (location.href = "/auth/login")}
                >
                  Join Protocol
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto h-16 px-12 text-lg font-bold border-slate-200 bg-white/50 backdrop-blur-sm"
                >
                  Explore Hub
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-16 flex items-center gap-8"
              >
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <img
                      key={i}
                      src={`https://i.pravatar.cc/100?u=${i + 60}`}
                      className="w-12 h-12 rounded-full border-2 border-white shadow-md"
                      alt="User"
                    />
                  ))}
                  <div className="w-12 h-12 rounded-full bg-slate-900 border-2 border-white flex items-center justify-center text-[10px] font-black text-white shadow-md">
                    50K+
                  </div>
                </div>
                <div className="h-10 w-px bg-slate-200" />
                <div className="text-sm">
                  <div className="font-black text-slate-950 uppercase tracking-wider text-[10px] mb-1">
                    Ecosystem Status
                  </div>
                  <div className="text-slate-600 font-medium">
                    Growth: <span className="text-green-600">+145.8%</span>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-12 xl:col-span-6 relative hidden lg:block h-[650px] lg:-mr-20 xl:mr-0">
              {/* Refined, Larger, High-Fidelity Visual */}
              <motion.div
                initial={{ opacity: 0, x: 60, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="relative z-10 w-full h-full flex items-center justify-end"
              >
                <div className="absolute -inset-20 bg-gradient-to-tr from-cyan-400/20 to-indigo-500/10 rounded-full blur-[120px] opacity-60" />

                <div className="relative w-[110%] xl:w-full h-[540px] rounded-[48px] border border-white bg-white/40 backdrop-blur-xl shadow-[0_32px_64px_-12px_rgba(0,163,255,0.15)] p-5 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1642104704074-907c0698cbd9?auto=format&fit=crop&q=80&w=2232"
                    alt="Capitronix Ecosystem"
                    className="w-full h-full object-cover rounded-[36px] shadow-sm contrast-[1.05]"
                  />

                  {/* Performance Badge */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute top-12 left-12 bg-white/90 backdrop-blur-md px-5 py-3 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center text-white">
                      <TrendingUp size={16} />
                    </div>
                    <div>
                      <div className="text-[9px] text-slate-500 font-black uppercase tracking-wider">
                        Daily ROI
                      </div>
                      <div className="text-sm font-black text-slate-900">
                        +12.4%
                      </div>
                    </div>
                  </motion.div>

                  {/* Asset Card Overlay */}
                  <motion.div
                    animate={{ x: [0, 10, 0] }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5,
                    }}
                    className="absolute bottom-12 right-12 w-48 bg-slate-950 p-5 rounded-2xl shadow-2xl border border-white/10"
                  >
                    <div className="text-[8px] text-slate-400 font-bold uppercase tracking-[0.2em] mb-2">
                      Liquidity Score
                    </div>
                    <div className="flex items-end justify-between">
                      <div className="text-xl font-black text-white">98.2</div>
                      <div className="text-[10px] text-cyan-400 font-bold mb-1">
                        OPTIMIZED
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Ultra-Thin, Minimal Gap */}
      <section className="py-2 bg-slate-50/80 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
            {[
              {
                label: "Network Reach",
                value: "Global",
                icon: <Globe className="w-4 h-4" />,
                color: "bg-blue-100/50 text-blue-600",
              },
              {
                label: "Market Projects",
                value: "120+",
                icon: <Rocket className="w-4 h-4" />,
                color: "bg-cyan-100/50 text-cyan-600",
              },
              {
                label: "Holders",
                value: "50K+",
                icon: <Users className="w-4 h-4" />,
                color: "bg-indigo-100/50 text-indigo-600",
              },
              {
                label: "Platform Fee",
                value: "$30",
                icon: <Zap className="w-4 h-4" />,
                color: "bg-amber-100/50 text-amber-600",
              },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group"
              >
                <div className="bg-white px-4 py-4 rounded-[20px] border border-slate-200 group-hover:border-cyan-300 group-hover:shadow-[0_15px_30px_-10px_rgba(0,163,255,0.1)] transition-all duration-300 flex items-center justify-between">
                  <div className="text-left">
                    <div className="text-[7px] text-slate-500 font-black uppercase tracking-[0.2em] mb-0.5 group-hover:text-cyan-600 transition-colors">
                      {stat.label}
                    </div>
                    <div className="text-xl font-black text-slate-950 tracking-tighter">
                      {stat.value}
                    </div>
                  </div>
                  <div
                    className={`w-7 h-7 rounded-lg ${stat.color} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}
                  >
                    {stat.icon}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Launchpad Section */}
      <div className=" relative z-30">
        <Launchpad />
      </div>

      {/* About Section - Subtly Textured with Animation */}
      <section
        id="about"
        className="py-24 bg-slate-50 relative overflow-hidden"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-cyan-300 rounded-full blur-[120px]"
          />
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, -45, 0],
              opacity: [0.03, 0.07, 0.03],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-blue-300 rounded-full blur-[100px]"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeInUp}>
              <Badge className="mb-6">Visionary Protocol</Badge>
              <h2 className="text-4xl md:text-6xl font-black text-slate-950 mb-8 tracking-tight">
                What is{" "}
                <span className="text-cyan-600 font-black">Capitronix?</span>
              </h2>
              <p className="text-xl text-slate-700 leading-relaxed mb-10">
                {`Capitronix Launchpad Protocol is a next-generation token
            marketing system engineered to solve the "Visibility Gap" in
            Web3. We help high-potential blockchain projects cultivate
            strong communities and achieve sustainable on-chain growth.`}
              </p>

              <div className="space-y-5">
                {[
                  "Strategic Global Promotion",
                  "Automated Community Growth",
                  "Built-in Liquidity Mechanisms",
                  "Scalable Blockchain Adoption",
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="p-3 rounded-2xl bg-cyan-50 border border-cyan-100 group-hover:bg-cyan-600 transition-colors">
                      <CheckCircle2 className="w-5 h-5 text-cyan-600 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-slate-800 font-bold text-lg">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-tr from-cyan-500/20 to-blue-600/20 blur-[80px] opacity-20 -z-10" />
              <div className="relative p-2 bg-white rounded-[40px] shadow-2xl border border-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=2232&ixlib=rb-4.0.3"
                  alt="Web3 Visualization"
                  className="rounded-[32px] shadow-sm"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-24 bg-slate-100/50 relative border-y border-slate-200"
      >
        <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
              Strategic Advantages
            </h2>
            <p className="text-slate-700 max-w-2xl mx-auto text-lg leading-relaxed">
              Our multifaceted approach ensures massive success for both
              developers and investors.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <Card
                key={i}
                className="group shadow-sm hover:shadow-xl border-slate-200 bg-white group transition-all duration-300"
              >
                <div className="mb-6 p-4 rounded-2xl bg-slate-50 text-cyan-600 w-fit group-hover:bg-cyan-600 group-hover:text-white transition-all duration-300 shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-700 line-clamp-3 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Activation Section - Dark Theme Transition */}
      <section
        id="ecosystem"
        className="py-24 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.1),transparent_50%)]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="relative overflow-hidden border-white/5 bg-white/5 backdrop-blur-md shadow-2xl p-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[120px] -z-10" />
            <div className="grid lg:grid-cols-2 gap-0 items-stretch">
              <div className="p-2 md:p-6 lg:p-10">
                <Badge className="mb-6 bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                  Activation Rewards
                </Badge>
                <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tight">
                  Unlock Pure Potential <br />
                  Only for <span className="text-cyan-500">$30</span>
                </h2>
                <p className="text-slate-400 mb-10 text-lg">
                  One-time fee for a lifetime of passive income.
                </p>

                <div className="grid sm:grid-cols-2 gap-8">
                  {[
                    {
                      icon: <Gem className="text-cyan-400 w-6 h-6" />,
                      title: "Digital Assets",
                      desc: "1,000 3Twenty Coins + NFT",
                    },
                    {
                      icon: <Award className="text-amber-400 w-6 h-6" />,
                      title: "Rank Bonuses",
                      desc: "Up to $11,525 in pool",
                    },
                    {
                      icon: <PieChart className="text-blue-400 w-6 h-6" />,
                      title: "Profit Sharing",
                      desc: "10% Global Profit Fund",
                    },
                    {
                      icon: <TrendingUp className="text-green-400 w-6 h-6" />,
                      title: "Board Engine",
                      desc: "$195,000+ Potential",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 group">
                      <div className="shrink-0 p-3 rounded-xl bg-white/5 border border-white/10 group-hover:bg-cyan-500/10 transition-colors">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-sm mb-1">
                          {item.title}
                        </h4>
                        <p className="text-slate-500 text-xs leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  variant="primary"
                  size="lg"
                  className="mt-12 h-14 px-10"
                  onClick={() => (location.href = "/auth/login")}
                >
                  Activate Your Account
                </Button>
              </div>
              <div className="relative p-3 md:p-6 lg:p-10 bg-white/5 border-l border-white/10 flex flex-col justify-center">
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-1 bg-cyan-500 rounded-full" />
                    <h3 className="text-2xl font-black uppercase tracking-tighter italic">
                      Affiliate Bonus
                    </h3>
                  </div>
                  <div className="bg-slate-950 rounded-[32px] p-4 border border-white/5 shadow-2xl">
                    <div className="flex justify-between items-center mb-8">
                      <span className="text-slate-400 text-xs font-black uppercase tracking-widest">
                        Total Reward Cap
                      </span>
                      <span className="text-3xl font-black text-cyan-400 tracking-tighter">
                        20%
                      </span>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-white font-bold">1st Level</span>
                        <span className="text-cyan-400 font-bold">15%</span>
                      </div>
                      <div className="w-full bg-white/5 h-3 rounded-full overflow-hidden p-0.5 border border-white/5">
                        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 h-full rounded-full w-[100%]" />
                      </div>
                      <div className="grid grid-cols-5 gap-2 pt-4">
                        {[2, 3, 4, 5, 6].map((lvl) => (
                          <div key={lvl} className="flex flex-col items-center">
                            <div className="text-[10px] text-slate-500 font-bold mb-2">
                              L{lvl}
                            </div>
                            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                              <div className="bg-cyan-500/40 h-full w-full" />
                            </div>
                            <div className="text-[10px] text-cyan-400/60 font-black mt-2">
                              1%
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-500 text-sm italic leading-relaxed text-center">
                    The 6-level high-velocity system is engineered to drive
                    viral community growth automatically.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Ambassador & Rewards Section */}
      <section
        id="rewards"
        className="py-24 bg-slate-50 relative overflow-hidden border-b border-slate-200"
      >
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,rgba(6,182,212,0.1),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left side: Ambassador Info */}
            <motion.div {...fadeInUp}>
              <Badge className="mb-4">Exclusive Elite Group</Badge>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Become a Global <br />
                <span className="text-cyan-600">Ambassador</span>
              </h2>
              <p className="text-slate-700 mb-6 leading-relaxed">
                By achieving{" "}
                <span className="text-slate-900 font-bold">Rank 6</span>, you
                automatically ascend to the status of an Ambassador. Join an
                exclusive group of only{" "}
                <span className="text-slate-900 font-bold">
                  100 Ambassadors globally
                </span>
                .
              </p>

              <div className="space-y-3 mb-6">
                {[
                  {
                    title: "10% Collective Ownership",
                    desc: "Ambassadors hold a combined 10% ownership of 100 exclusively developed projects.",
                  },
                  {
                    title: "Guaranteed Token Allocation",
                    desc: "Every project has a 21 Million supply. Ambassadors get guaranteed portions of every launch.",
                  },
                  {
                    title: "Founder-Level Access",
                    desc: "Gain direct access to the Capitronix core development team and inner circle.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex gap-4 p-3 rounded-2xl bg-white border border-slate-200 hover:border-cyan-400 transition-colors shadow-sm"
                  >
                    <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center shrink-0">
                      <Trophy className="w-5 h-5 text-cyan-600" />
                    </div>
                    <div>
                      <h4 className="text-slate-900 font-bold">{item.title}</h4>
                      <p className="text-slate-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card className="flex flex-col items-center text-center p-6 bg-white border-slate-200 shadow-sm">
                  <div className="text-3xl font-bold text-slate-900 mb-1">
                    100
                  </div>
                  <div className="text-slate-500 text-xs uppercase tracking-tighter">
                    Global Slots
                  </div>
                </Card>
                <Card className="flex flex-col items-center text-center p-6 bg-white border-slate-200 shadow-sm">
                  <div className="text-3xl font-bold text-cyan-600 mb-1">
                    10%
                  </div>
                  <div className="text-slate-500 text-xs uppercase tracking-tighter">
                    Equity Stake
                  </div>
                </Card>
              </div>
            </motion.div>

            {/* Right side: Tiers Table */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-1 rounded-[32px] border border-slate-200 shadow-xl overflow-hidden"
            >
              <div className="p-4 sm:p-6 md:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                  <Award className="text-amber-500 w-5 h-5 sm:w-6 sm:h-6" />
                  Rank and Reward Tiers
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[500px] text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100">
                        <th className="pb-3 sm:pb-4 text-slate-500 text-[10px] sm:text-xs uppercase font-bold tracking-widest">
                          Rank
                        </th>
                        <th className="pb-3 sm:pb-4 text-slate-500 text-[10px] sm:text-xs uppercase font-bold tracking-widest">
                          Condition
                        </th>
                        <th className="pb-3 sm:pb-4 text-slate-500 text-[10px] sm:text-xs uppercase font-bold tracking-widest">
                          Reward
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {rewardTiers.map((tier, i) => (
                        <tr
                          key={i}
                          className="group border-b border-slate-50 last:border-0"
                        >
                          <td className="py-3 sm:py-4 font-bold text-slate-900 text-sm sm:text-base whitespace-nowrap">
                            <span
                              className={`inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded text-[9px] sm:text-[10px] mr-2 ${
                                i === 5
                                  ? "bg-amber-500 text-white"
                                  : "bg-slate-100 text-slate-500"
                              }`}
                            >
                              {i + 1}
                            </span>
                            {tier.rank}
                          </td>

                          <td className="py-3 sm:py-4 text-slate-600 text-xs sm:text-sm">
                            {tier.condition}
                          </td>

                          <td className="py-3 sm:py-4">
                            <span
                              className={`font-mono font-bold text-xs sm:text-sm ${
                                i === 5 ? "text-cyan-600" : "text-slate-900"
                              }`}
                            >
                              {tier.reward}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-slate-100">
                  <p className="text-[10px] sm:text-xs text-slate-400 italic text-center px-2">
                    * Achievers of Rank 6 earn exclusive Ambassador status
                    automatically.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Board Token Sales Engine */}
      <section
        id="boards"
        className="py-24 bg-slate-50 relative overflow-hidden border-y border-slate-200"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,rgba(6,182,212,0.1),transparent_40%)]" />
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_100%,rgba(59,130,246,0.1),transparent_40%)]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-cyan-100 text-cyan-600 border-cyan-200">
              Growth Protocol
            </Badge>
            <h2 className="text-4xl md:text-6xl font-black text-slate-950 mb-8 tracking-tight">
              Board Token{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">
                Sales Engine
              </span>
            </h2>
            <p className="text-slate-600 max-w-3xl mx-auto text-lg leading-relaxed">
              Scale through our proprietary{" "}
              <span className="text-slate-950 font-bold">
                1:5 automated filling mechanism
              </span>{" "}
              across four strategic tiers. Each board completion unlocks
              substantial capital and premium ecosystem status.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
            {/* ================= LEFT: PINNACLE ================= */}
            <motion.div {...fadeInUp} className="flex flex-col">
              {/* Header */}
              <div className="mb-6 flex items-center gap-3">
                <div className="w-8 sm:w-12 h-1 bg-cyan-600 rounded-full" />
                <h3 className="text-lg sm:text-2xl font-black text-slate-950 uppercase italic">
                  The Pinnacle Reward
                </h3>
              </div>

              <div className="relative group">
                <Card className="bg-white border-slate-200 rounded-2xl sm:rounded-[32px] overflow-hidden shadow-md">
                  {/* MOBILE */}
                  <div className="block sm:hidden p-5 space-y-5">
                    <div className="flex justify-between items-center">
                      <Badge className="bg-amber-100 text-amber-600 text-xs">
                        Tier 4 Completion
                      </Badge>
                      <Car size={20} className="text-cyan-600" />
                    </div>

                    <div>
                      <h4 className="text-2xl font-black text-slate-900">
                        $150,000
                      </h4>
                      <p className="text-slate-500 text-sm">+ Car reward</p>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-slate-500">Cash Bonus</span>
                        <span className="text-cyan-600 font-semibold">
                          $100,000
                        </span>
                      </div>
                      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: "100%" }}
                          className="h-full bg-cyan-500"
                        />
                      </div>
                    </div>

                    <div className="flex justify-between items-center bg-slate-100 p-4 rounded-xl">
                      <span className="text-sm text-slate-600">Total</span>
                      <span className="text-slate-900 font-bold">$195K+</span>
                    </div>
                  </div>

                  {/* DESKTOP */}
                  <div className="hidden sm:flex flex-col p-8 md:p-12">
                    <div className="mb-8">
                      <Badge className="mb-4 bg-amber-100 text-amber-600">
                        Tier 4 Completion
                      </Badge>

                      <h4 className="text-4xl md:text-5xl font-black text-slate-900">
                        $150,000{" "}
                        <span className="text-slate-500 text-2xl">+ Car</span>
                      </h4>

                      <p className="text-slate-500 mt-2">
                        The ultimate milestone.
                      </p>
                    </div>

                    <div className="mb-6">
                      <div className="flex justify-between mb-2">
                        <span className="text-slate-500">Cash Bonus</span>
                        <span className="text-cyan-600 font-bold">
                          $100,000
                        </span>
                      </div>

                      <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: "100%" }}
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-600"
                        />
                      </div>
                    </div>

                    <div className="bg-slate-100 p-6 rounded-2xl flex justify-between">
                      <span className="text-slate-600">
                        Total Potential Reward
                      </span>
                      <span className="text-slate-900 text-2xl font-black">
                        $195,000+
                      </span>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>

            {/* ================= RIGHT: EARNINGS ================= */}
            <motion.div className="flex flex-col">
              {/* Header */}
              <div className="mb-6 flex items-center gap-3">
                <div className="w-8 sm:w-12 h-1 bg-slate-300 rounded-full" />
                <h3 className="text-lg sm:text-2xl font-black text-slate-950 uppercase">
                  Earnings Breakdown
                </h3>
              </div>

              <div className="bg-white rounded-2xl sm:rounded-[32px] border border-slate-200 shadow-xl overflow-hidden flex flex-col">
                {/* ================= MOBILE (UNCHANGED) ================= */}
                <div className="block md:hidden p-4 space-y-4">
                  {boardBenefits.map((board, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl border border-slate-100 bg-slate-50"
                    >
                      <div className="flex justify-between mb-2">
                        <span className="font-bold text-slate-900">
                          Level {i + 1}
                        </span>
                        <span className="text-cyan-600 font-bold">
                          {board.total}
                        </span>
                      </div>

                      <div className="text-xs text-slate-500 space-y-1">
                        <div>L1: {board.bonus1}</div>
                        <div>L2: {board.bonus2}</div>
                        <div>L3: {board.bonus3}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* ================= DESKTOP (YOUR ORIGINAL PREMIUM TABLE) ================= */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100">
                        <th className="py-6 px-6 text-slate-900 font-black uppercase text-[10px] tracking-widest">
                          Board Level
                        </th>
                        <th className="py-6 px-4 text-slate-500 font-bold text-[10px] tracking-widest uppercase">
                          L-1 (5u)
                        </th>
                        <th className="py-6 px-4 text-slate-500 font-bold text-[10px] tracking-widest uppercase">
                          L-2 (25u)
                        </th>
                        <th className="py-6 px-4 text-slate-500 font-bold text-[10px] tracking-widest uppercase">
                          L-3 (125u)
                        </th>
                        <th className="py-6 px-6 text-cyan-600 font-black text-[10px] tracking-widest uppercase text-right">
                          Yield
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-50">
                      {boardBenefits.map((board, i) => (
                        <tr
                          key={i}
                          className="hover:bg-slate-50/80 transition-colors group"
                        >
                          <td className="py-5 px-6">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs ${
                                  i === 3
                                    ? "bg-amber-100 text-amber-600"
                                    : "bg-slate-100 text-slate-600 group-hover:bg-cyan-100 group-hover:text-cyan-600"
                                }`}
                              >
                                {i + 1}
                              </div>
                              <span
                                className={`font-black text-base md:text-lg ${
                                  i === 3 ? "text-amber-500" : "text-slate-900"
                                }`}
                              >
                                {board.level.split(" ")[1]}
                              </span>
                            </div>
                          </td>

                          <td className="py-5 px-4 text-slate-500 font-bold text-sm">
                            {board.bonus1}
                          </td>
                          <td className="py-5 px-4 text-slate-500 font-bold text-sm">
                            {board.bonus2}
                          </td>
                          <td className="py-5 px-4 text-slate-500 font-bold text-sm">
                            {board.bonus3.split(" ")[0]}
                          </td>

                          <td className="py-5 px-6 text-right">
                            <span
                              className={`font-black text-base md:text-xl ${
                                i === 3 ? "text-cyan-600" : "text-slate-900"
                              }`}
                            >
                              {board.total.includes("+")
                                ? board.total.split(" ")[0]
                                : board.total}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Footer */}
                <div className="mt-auto p-6 sm:p-8 bg-slate-50/50 border-t border-slate-100">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-cyan-500 animate-pulse" />
                      <span className="text-slate-600 text-xs sm:text-sm font-bold uppercase tracking-widest">
                        Active Pool Status
                      </span>
                    </div>

                    <div className="text-center md:text-right">
                      <div className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">
                        Total System Liquidity
                      </div>
                      <div className="text-xl sm:text-2xl font-black text-slate-950 tracking-tighter bg-cyan-100 px-4 py-1 rounded-xl">
                        $195,000 USDT
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA: List Your Project */}
      <section
        id="list-project"
        className="py-24 relative overflow-hidden bg-gradient-to-bl from-slate-900 to-slate-950 text-white"
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-cyan-500/5 via-transparent to-blue-600/5 -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeInUp}>
              <Badge className="mb-4 bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                For Project Owners
              </Badge>
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
                Ready to Launch Your <br />
                <span className="text-cyan-500">Token or NFT Project?</span>
              </h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Connect with a global network of dedicated investors and
                leverage our automated marketing engine. We provide the
                infrastructure, you provide the innovation.
              </p>

              <div className="space-y-6 mb-10">
                {[
                  {
                    icon: <Briefcase className="text-cyan-400" />,
                    title: "Full Launch Support",
                    desc: "From whitepaper audit to technical implementation and smart contract deployment.",
                  },
                  {
                    icon: <Users className="text-blue-400" />,
                    title: "Instant Community",
                    desc: "Gain immediate access to over 50,000+ active users globally within our ecosystem.",
                  },
                  {
                    icon: <FileCode className="text-indigo-400" />,
                    title: "Strategic Listing",
                    desc: "Showcase your project on our professional marketplace and launchpad protocal.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 shadow-sm backdrop-blur-sm group hover:border-cyan-500/30 transition-all"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0 shadow-sm border border-white/10 group-hover:bg-cyan-500/10 transition-colors">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-bold">{item.title}</h4>
                      <p className="text-slate-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-tr from-cyan-500/10 to-blue-600/10 rounded-[40px] blur-2xl -z-10" />
              <Card className="p-8 md:p-12 border-slate-200 bg-white shadow-2xl">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-cyan-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-cyan-100">
                    <Rocket className="text-cyan-600 w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    Apply for Listing
                  </h3>
                  <p className="text-slate-500">
                    Our team will review your project within 48 hours.
                  </p>
                </div>

                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Project Name"
                      className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-cyan-500 transition-all"
                    />
                    <select className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-600 focus:outline-none focus:border-cyan-500 transition-all">
                      <option>Token Launch</option>
                      <option>NFT Collection</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <input
                    type="email"
                    placeholder="Your Work Email"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-cyan-500 transition-all"
                  />
                  <textarea
                    placeholder="Tell us briefly about your project..."
                    rows={3}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-cyan-500 transition-all resize-none"
                  ></textarea>
                  <Button className="w-full py-4 text-lg">
                    Submit Application
                  </Button>
                </form>

                <div className="mt-8 pt-8 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <img
                        key={i}
                        src={`https://i.pravatar.cc/100?u=${i + 10}`}
                        className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                        alt="Founder"
                      />
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 font-medium">
                    Joined by 120+ Founders
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}
