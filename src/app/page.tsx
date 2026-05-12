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
      <section id="home" className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent -z-10 blur-3xl opacity-50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-sm font-medium mb-8"
          >
            <SparklesIcon className="w-4 h-4" />
            <span>Next-Gen Web3 Protocol</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6"
          >
            Capitronix <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
              Launchpad Protocol
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-slate-400 max-w-2xl mx-auto mb-10"
          >
            The ultimate community growth engine connecting crypto startups with
            global investors through strategic promotion and scalable solutions.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href="/auth/login">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                Get Started Now
              </Button>
            </a>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Explore Ecosystem
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats/Highlight Section */}
      <section className="py-12 border-y border-white/5 bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "Network Reach", value: "Global" },
              { label: "Project Incubation", value: "100+" },
              { label: "Equity Reserved", value: "10%" },
              { label: "Activation Fee", value: "$30" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                {...fadeInUp}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-slate-500 text-sm uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Launchpad Section */}
      <Launchpad />

      {/* About Section */}
      <section id="about" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeInUp}>
              <Badge className="mb-4">Visionary Protocol</Badge>
              <h2 className="text-4xl font-bold text-white mb-6">
                What is Capitronix?
              </h2>
              <p className="text-lg text-slate-400 leading-relaxed mb-8">
                Capitronix Launchpad Protocol is a next-generation token
                marketing system that helps blockchain projects grow visibility,
                build strong communities, and expand in the Web3 ecosystem.
              </p>
              <div className="space-y-4">
                {[
                  "Strategic Global Promotion",
                  "Automated Community Growth",
                  "Built-in Liquidity Mechanisms",
                  "Scalable Blockchain Adoption",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="p-1 rounded-full bg-cyan-400/20">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    </div>
                    <span className="text-slate-300 font-medium">{item}</span>
                  </div>
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
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 blur-[100px] opacity-20 -z-10" />
              <img
                src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=2232&ixlib=rb-4.0.3"
                alt="Web3 Visualization"
                className="rounded-3xl border border-white/10 shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Strategic Advantages
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Our multifaceted approach ensures massive success for both
              developers and investors.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <Card key={i} className="group">
                <div className="mb-6 p-4 rounded-2xl bg-cyan-500/10 text-cyan-400 w-fit group-hover:bg-cyan-500 group-hover:text-white transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-400 line-clamp-3">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Activation Section */}
      <section id="ecosystem" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="relative overflow-hidden border-cyan-500/50 bg-gradient-to-br from-slate-900 to-slate-950">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[100px] -z-10" />
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="p-4 md:p-8">
                <Badge className="mb-4">Activation Rewards</Badge>
                <h2 className="text-4xl font-bold text-white mb-6">
                  Unlock Pure Potential Only for $30
                </h2>
                <p className="text-slate-400 mb-8 italic">
                  One-time fee for a lifetime of passive income.
                </p>

                <div className="grid sm:grid-cols-2 gap-6">
                  {[
                    {
                      icon: <Gem className="text-cyan-400" />,
                      title: "Digital Assets",
                      desc: "1,000 3Twenty Coins + NFT",
                    },
                    {
                      icon: <Award className="text-yellow-400" />,
                      title: "Rank Bonuses",
                      desc: "Up to $11,525 in pool",
                    },
                    {
                      icon: <PieChart className="text-blue-400" />,
                      title: "Profit Sharing",
                      desc: "10% Global Profit Fund",
                    },
                    {
                      icon: <TrendingUp className="text-green-400" />,
                      title: "Board Engine",
                      desc: "$195,000+ Potential",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="shrink-0">{item.icon}</div>
                      <div>
                        <h4 className="text-white font-bold text-sm">
                          {item.title}
                        </h4>
                        <p className="text-slate-500 text-xs">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="primary" className="mt-10">
                  Activate Your Account
                </Button>
              </div>
              <div className="relative p-4 md:p-12 bg-white/5 border-l border-white/5">
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white">
                    Affiliate Bonus
                  </h3>
                  <div className="bg-slate-800/50 rounded-2xl p-6 border border-white/5">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-slate-400">Total Reward Cap</span>
                      <span className="text-2xl font-bold text-cyan-400">
                        20%
                      </span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-white font-medium">
                          1st Level
                        </span>
                        <span className="text-cyan-400 font-bold">15%</span>
                      </div>
                      <div className="w-full bg-slate-700 h-2 rounded-full">
                        <div className="bg-cyan-500 h-full rounded-full w-[75%]" />
                      </div>
                      {[2, 3, 4, 5, 6].map((lvl) => (
                        <div
                          key={lvl}
                          className="flex justify-between text-xs text-slate-500 pt-1"
                        >
                          <span>
                            {lvl}
                            {lvl === 2 ? "nd" : lvl === 3 ? "rd" : "th"} Level
                          </span>
                          <span>1%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-500 text-sm italic">
                    The 6-level system is designed to drive viral community
                    growth.
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
        className="py-16 bg-slate-950 relative overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left side: Ambassador Info */}
            <motion.div {...fadeInUp}>
              <Badge className="mb-4">Exclusive Elite Group</Badge>
              <h2 className="text-4xl font-bold text-white mb-6">
                Become a Global <br />
                <span className="text-cyan-400">Ambassador</span>
              </h2>
              <p className="text-slate-400 mb-6 leading-relaxed">
                By achieving{" "}
                <span className="text-white font-bold">Rank 6</span>, you
                automatically ascend to the status of an Ambassador. Join an
                exclusive group of only{" "}
                <span className="text-white font-bold">
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
                    className="flex gap-4 p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0">
                      <Trophy className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold">{item.title}</h4>
                      <p className="text-slate-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card className="flex flex-col items-center text-center p-6 bg-slate-900/40">
                  <div className="text-3xl font-bold text-white mb-1">100</div>
                  <div className="text-slate-500 text-xs uppercase tracking-tighter">
                    Global Slots
                  </div>
                </Card>
                <Card className="flex flex-col items-center text-center p-6 bg-slate-900/40">
                  <div className="text-3xl font-bold text-cyan-400 mb-1">
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
              className="bg-slate-900/30 p-1 rounded-[32px] border border-white/10 overflow-hidden"
            >
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Award className="text-yellow-500" />
                  Rank and Reward Tiers
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/5">
                        <th className="pb-4 text-slate-500 text-xs uppercase font-bold tracking-widest">
                          Rank
                        </th>
                        <th className="pb-4 text-slate-500 text-xs uppercase font-bold tracking-widest">
                          Condition
                        </th>
                        <th className="pb-4 text-slate-500 text-xs uppercase font-bold tracking-widest">
                          Reward
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {rewardTiers.map((tier, i) => (
                        <tr
                          key={i}
                          className="group border-b border-white/5 last:border-0"
                        >
                          <td className="py-4 font-bold text-white">
                            <span
                              className={`inline-flex items-center justify-center w-6 h-6 rounded text-[10px] mr-2 ${
                                i === 5
                                  ? "bg-yellow-500 text-slate-900"
                                  : "bg-slate-800 text-slate-400"
                              }`}
                            >
                              {i + 1}
                            </span>
                            {tier.rank}
                          </td>
                          <td className="py-4 text-slate-400 text-sm">
                            {tier.condition}
                          </td>
                          <td className="py-4">
                            <span
                              className={`font-mono font-bold ${i === 5 ? "text-cyan-400" : "text-white"}`}
                            >
                              {tier.reward}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-8 pt-8 border-t border-white/5">
                  <p className="text-xs text-slate-500 italic text-center">
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
        className="py-16 bg-slate-900/40 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 px-4">
            <Badge className="mb-4">Strategic Milestones</Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Board Token <span className="text-cyan-400">Sales Engine</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base">
              Scale through our automated 1:5 filling mechanism across four
              strategic boards. Reaching the pinnacle unlocks life-changing
              rewards and guaranteed lifetime passive income.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            {/* Left side: CAR Achievements */}
            <motion.div {...fadeInUp} className="flex flex-col h-full">
              <div className="mb-6 px-2">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Luxury CAR Achievement
                </h3>
                <p className="text-slate-500 text-sm">
                  Ultimate goal for serious Capitronix entrepreneurs.
                </p>
              </div>

              <div className="relative group flex-grow">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <Card className="relative h-full p-8 md:p-10 bg-slate-900/80 border-cyan-500/30 flex flex-col justify-between">
                  <div className="flex items-center gap-6 mb-10">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                      <Car size={36} />
                    </div>
                    <div>
                      <h4 className="text-2xl md:text-3xl font-bold text-white mb-1">
                        $150,000 + Luxury Car
                      </h4>
                      <p className="text-slate-500 text-base">
                        Board 4 Completion Reward
                      </p>
                    </div>
                  </div>
                  <div className="space-y-8">
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-slate-400 text-base md:text-lg">
                          Cash Bonus Milestone
                        </span>
                        <span className="text-white font-bold text-lg md:text-xl">
                          $100,000
                        </span>
                      </div>
                      <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: "100%" }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className="bg-gradient-to-r from-cyan-500 to-blue-600 h-full"
                        />
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-8 border-t border-white/5">
                      <span className="text-slate-400 text-base md:text-lg whitespace-nowrap">
                        Achievement Potential
                      </span>
                      <span className="text-cyan-400 font-bold text-2xl md:text-3xl tracking-tight">
                        $195,000+
                      </span>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>

            {/* Right side: Board Income Chart */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col h-full"
            >
              <div className="mb-6 px-2">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Board Income Chart
                </h3>
                <p className="text-slate-500 text-sm">
                  Automated filling mechanism result tracking.
                </p>
              </div>

              <div className="flex-grow flex flex-col justify-between rounded-[32px] border border-white/10 bg-slate-950/40 p-1">
                <div className="p-4 md:p-6">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-900/50">
                        <th className="py-4 px-3 md:px-6 text-slate-300 font-bold border-b border-white/5 rounded-tl-2xl text-xs md:text-sm">
                          Board
                        </th>
                        <th className="py-4 px-3 md:px-6 text-slate-400 font-medium border-b border-white/5 whitespace-nowrap text-xs md:text-sm">
                          L-1 (5u)
                        </th>
                        <th className="py-4 px-3 md:px-6 text-slate-400 font-medium border-b border-white/5 whitespace-nowrap text-xs md:text-sm">
                          L-2 (25u)
                        </th>
                        <th className="py-4 px-3 md:px-6 text-slate-400 font-medium border-b border-white/5 whitespace-nowrap text-xs md:text-sm">
                          L-3 (125u)
                        </th>
                        <th className="py-4 px-3 md:px-6 text-cyan-400 font-bold border-b border-white/5 whitespace-nowrap rounded-tr-2xl text-xs md:text-sm">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {boardBenefits.map((board, i) => (
                        <tr
                          key={i}
                          className="hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                        >
                          <td className="py-4 px-3 md:px-6">
                            <div
                              className={`font-bold text-base md:text-lg ${i === 3 ? "text-yellow-500" : "text-white"}`}
                            >
                              {board.level.split(" ")[1]}
                            </div>
                          </td>
                          <td className="py-4 px-3 md:px-6 text-slate-400 text-xs md:text-sm">
                            {board.bonus1}
                          </td>
                          <td className="py-4 px-3 md:px-6 text-slate-400 text-xs md:text-sm">
                            {board.bonus2}
                          </td>
                          <td className="py-4 px-3 md:px-6 text-slate-400 text-xs md:text-sm">
                            {board.bonus3.split(" ")[0]}
                          </td>
                          <td className="py-4 px-3 md:px-6">
                            <span
                              className={`font-bold text-xs md:text-base ${i === 3 ? "text-cyan-400 text-lg" : "text-slate-300"}`}
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

                <div className="m-4 md:m-6 p-6 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-center">
                  <p className="text-cyan-400 font-bold uppercase tracking-widest text-sm">
                    TOTAL ECOSYSTEM POTENTIAL: OVER $195,000 USDT
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA: List Your Project */}
      <section
        id="list-project"
        className="py-24 border-t border-white/5 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-cyan-500/5 to-transparent -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeInUp}>
              <Badge className="mb-4">For Project Owners</Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Launch Your <br />
                <span className="text-cyan-400">Token or NFT Project?</span>
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
                    icon: <FileCode className="text-purple-400" />,
                    title: "Strategic Listing",
                    desc: "Showcase your project on our professional marketplace and launchpad protocal.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5"
                  >
                    <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center shrink-0">
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
              <div className="absolute -inset-4 bg-gradient-to-tr from-cyan-500/20 to-blue-600/20 rounded-[40px] blur-2xl -z-10" />
              <Card className="p-8 md:p-12 border-cyan-500/30 bg-slate-900/80 backdrop-blur-md">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-cyan-400/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Rocket className="text-cyan-400 w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
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
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50"
                    />
                    <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-slate-400 focus:outline-none focus:border-cyan-500/50">
                      <option>Token Launch</option>
                      <option>NFT Collection</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <input
                    type="email"
                    placeholder="Your Work Email"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50"
                  />
                  <textarea
                    placeholder="Tell us briefly about your project..."
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 resize-none"
                  ></textarea>
                  <Button className="w-full py-4 text-lg">
                    Submit Application
                  </Button>
                </form>

                <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <img
                        key={i}
                        src={`https://i.pravatar.cc/100?u=${i + 10}`}
                        className="w-8 h-8 rounded-full border-2 border-slate-900"
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
