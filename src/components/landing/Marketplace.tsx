"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  Filter,
  Rocket,
  Timer,
  Archive,
  ArrowLeft,
  Globe,
  Facebook,
  Twitter,
  Youtube,
  Send,
  X,
  Share2,
  Mail,
  CheckCircle2,
  Zap,
} from "lucide-react";
import { Button, Card, Badge } from "./UI";
import { projects } from "./projects";
import { LaunchItemProps } from "./types";

function ProjectModal({
  item,
  onClose,
}: {
  item: LaunchItemProps;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<
    "info" | "tokenomics" | "community"
  >("info");

  const getIcon = (platform: string) => {
    switch (platform) {
      case "Telegram":
        return <Send size={20} />;
      case "Facebook":
        return <Facebook size={20} />;
      case "Twitter":
        return <Twitter size={20} />;
      case "YouTube":
        return <Youtube size={20} />;
      default:
        return <Globe size={20} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-100/80 backdrop-blur-md"
    >
      <div className="absolute inset-0" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden bg-white border border-slate-200 rounded-[32px] flex flex-col md:flex-row shadow-2xl"
      >
        {/* Left Aspect - Visual */}
        <div className="md:w-2/5 relative h-64 md:h-auto">
          <img
            src={item.image}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent md:bg-gradient-to-r" />
        </div>

        {/* Right Aspect - Details */}
        <div className="md:w-3/5 p-6 md:p-10 overflow-y-auto flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge>{item.type}</Badge>
                <Badge
                  className={
                    item.status === "Active"
                      ? "bg-green-500/10 text-green-600"
                      : item.status === "Upcoming"
                        ? "bg-amber-500/10 text-amber-600 font-bold"
                        : "bg-slate-500/10 text-slate-500"
                  }
                >
                  {item.status}
                </Badge>
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 uppercase tracking-tight">
                {item.title}
              </h2>
              {item.symbol && (
                <span className="text-cyan-600 font-mono text-sm">
                  {item.symbol}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 border-b border-slate-100 mb-8">
            {["info", "tokenomics", "community"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative ${
                  activeTab === tab
                    ? "text-cyan-600"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {tab === "community" ? "Join Community" : tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="tab-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-600"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="flex-grow">
            {activeTab === "info" && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <p className="text-slate-600 leading-relaxed mb-8 text-sm md:text-base">
                  {item.fullDescription}
                </p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <div className="text-[10px] md:text-xs text-slate-500 uppercase mb-1">
                      Launch Price
                    </div>
                    <div className="text-base md:text-lg font-bold text-slate-900">
                      {item.price}
                    </div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <div className="text-[10px] md:text-xs text-slate-500 uppercase mb-1">
                      Allocation / Supply
                    </div>
                    <div className="text-base md:text-lg font-bold text-slate-900">
                      {item.totalRaised}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "tokenomics" && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                {item.tokenomics?.map((token, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100"
                  >
                    <span className="text-slate-600">{token.label}</span>
                    <span className="text-slate-900 font-bold">
                      {token.value}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === "community" && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {item.communityLinks?.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    className="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-cyan-50 hover:border-cyan-200 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-cyan-600 transition-colors">
                      {getIcon(link.platform)}
                    </div>
                    <div>
                      <div className="text-slate-900 font-bold group-hover:text-cyan-600 transition-colors">
                        {link.platform}
                      </div>
                      <div className="text-xs text-slate-500">
                        Official Channel
                      </div>
                    </div>
                  </a>
                ))}
              </motion.div>
            )}
          </div>

          <div className="mt-8 flex gap-4">
            <Button className="flex-grow py-3">
              {item.status === "Finished" ? "View Details" : "Invest Now"}
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Marketplace({ onBack }: { onBack: () => void }) {
  const [filter, setFilter] = useState<
    "All" | "Active" | "Upcoming" | "Finished"
  >("All");
  const [search, setSearch] = useState("");
  const [selectedProject, setSelectedProject] =
    useState<LaunchItemProps | null>(null);

  const filteredProjects = projects.filter((p) => {
    const matchesFilter = filter === "All" || p.status === filter;
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      (p.symbol && p.symbol.toLowerCase().includes(search.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-slate-200 to-transparent -z-10" />
      <div className="absolute top-[10%] -right-20 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute top-[30%] -left-20 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-8 text-slate-500 hover:text-slate-900 group"
          >
            <ArrowLeft
              className="mr-2 group-hover:-translate-x-1 transition-transform"
              size={20}
            />
            Back to Dashboard
          </Button>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-xl">
              <Badge className="mb-6">Ecosystem Hub</Badge>
              <h1 className="text-5xl md:text-7xl font-black text-slate-950 mb-8 tracking-tight">
                Project <span className="text-cyan-600">Marketplace</span>
              </h1>
              <p className="text-slate-600 text-lg leading-relaxed">
                Explore the full Capitronix ecosystem. From completed milestones
                to high-potential upcoming launches.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <div className="relative group flex-grow sm:flex-grow-0">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-600 transition-colors"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full sm:w-64 bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-3 text-slate-900 focus:outline-none focus:border-cyan-500 transition-all h-full shadow-sm"
                />
              </div>
              <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm">
                {(["All", "Active", "Upcoming", "Finished"] as const).map(
                  (f) => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                        filter === f
                          ? "bg-cyan-600 text-white shadow-lg shadow-cyan-500/20"
                          : "text-slate-500 hover:text-slate-900"
                      }`}
                    >
                      {f}
                    </button>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <Card
                  onClick={() => setSelectedProject(project)}
                  className="h-full relative overflow-hidden group border-slate-200 hover:border-cyan-500 flex flex-col cursor-pointer bg-white shadow-sm hover:shadow-lg transition-all"
                >
                  <div className="relative h-48 mb-6 rounded-2xl overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <Badge
                        className={
                          project.status === "Active"
                            ? "bg-green-500/20 text-green-700 border-green-500/30"
                            : project.status === "Upcoming"
                              ? "bg-amber-500/20 text-amber-700 border-amber-500/30"
                              : "bg-slate-500/20 text-slate-600 border-slate-200"
                        }
                      >
                        {project.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-cyan-600 transition-colors uppercase">
                          {project.title}
                        </h3>
                        <span className="text-xs text-slate-500 font-mono uppercase">
                          {project.symbol || project.type}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] text-slate-500 uppercase">
                          Valuation
                        </div>
                        <div className="text-cyan-600 font-bold">
                          {project.price}
                        </div>
                      </div>
                    </div>

                    {project.status === "Active" && (
                      <div className="space-y-4">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-500">
                            Launch Progress
                          </span>
                          <span className="text-cyan-600 font-bold">
                            {project.progress}%
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-cyan-600"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {project.status === "Upcoming" && (
                      <div className="flex items-center gap-2 text-amber-600">
                        <Timer size={14} />
                        <span className="text-xs font-bold uppercase tracking-widest">
                          {project.countdown || "TBA"}
                        </span>
                      </div>
                    )}

                    {project.status === "Finished" && (
                      <div className="flex items-center gap-2 text-slate-500">
                        <Archive size={14} />
                        <span className="text-xs font-bold uppercase tracking-widest">
                          Completed
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-100 flex gap-2">
                    <Button
                      variant="ghost"
                      className="flex-grow p-0 h-10 text-slate-400 hover:text-cyan-600 text-sm"
                    >
                      View Archive
                    </Button>
                    <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-cyan-600 transition-colors shadow-sm">
                      <Rocket size={18} />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-24">
            <p className="text-slate-600 text-lg">
              No projects found matching your criteria.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setFilter("All");
                setSearch("");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            item={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
