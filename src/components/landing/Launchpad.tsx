import React, { useState } from "react";
import {
  Rocket,
  Timer,
  TrendingUp,
  ShieldCheck,
  Zap,
  Diamond,
  Users,
  X,
  Share2,
  Mail,
  CheckCircle2,
  Twitter,
  Facebook,
  Youtube,
  Send,
  Globe,
  ArrowRight,
} from "lucide-react";
import { Button, Card, Badge } from "./UI";
import { AnimatePresence, motion } from "motion/react";
import { LaunchItemProps } from "./types";
import { projects as allProjects } from "./projects";

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
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden bg-slate-900 border border-white/10 rounded-[32px] flex flex-col md:flex-row shadow-2xl"
      >
        {/* Left Aspect - Visual */}
        <div className="md:w-2/5 relative h-64 md:h-auto">
          <img
            src={item.image}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent md:bg-gradient-to-r" />
          <button
            onClick={onClose}
            className="absolute top-4 left-4 p-2 rounded-full bg-slate-900/50 backdrop-blur-md text-white hover:bg-slate-800 transition-colors md:hidden"
          >
            <X size={20} />
          </button>
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
                      ? "bg-green-500/10 text-green-400"
                      : "bg-amber-500/10 text-amber-400 font-bold"
                  }
                >
                  {item.status}
                </Badge>
              </div>
              <h2 className="text-3xl font-extrabold text-white uppercase tracking-tight">
                {item.title}
              </h2>
              {item.symbol && (
                <span className="text-cyan-400 font-mono text-sm">
                  {item.symbol}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="hidden md:block p-2 rounded-full hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 border-b border-white/5 mb-8">
            {["info", "tokenomics", "community"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative ${
                  activeTab === tab
                    ? "text-cyan-400"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                {tab === "community" ? "Join Community" : tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="tab-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400"
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
                <p className="text-slate-300 leading-relaxed mb-8 text-sm md:text-base">
                  {item.fullDescription}
                </p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <div className="text-[10px] md:text-xs text-slate-500 uppercase mb-1 whitespace-nowrap">
                      Launch Price
                    </div>
                    <div className="text-base md:text-lg font-bold text-white">
                      {item.price}
                    </div>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <div className="text-[10px] md:text-xs text-slate-500 uppercase mb-1 whitespace-nowrap">
                      Allocation
                    </div>
                    <div className="text-base md:text-lg font-bold text-white">
                      {item.totalRaised}
                    </div>
                  </div>
                </div>
                {item.websiteUrl && (
                  <Button
                    variant="outline"
                    className="w-full gap-2 py-3 text-sm md:text-base"
                    onClick={() => window.open(item.websiteUrl, "_blank")}
                  >
                    <Globe size={18} />
                    Visit Official Website
                  </Button>
                )}
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
                    className="flex justify-between items-center p-4 bg-white/5 rounded-2xl"
                  >
                    <span className="text-slate-400">{token.label}</span>
                    <span className="text-white font-bold">{token.value}</span>
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
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-5 bg-white/5 rounded-2xl border border-white/5 hover:bg-cyan-500/10 hover:border-cyan-500/30 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-cyan-400 transition-colors">
                      {getIcon(link.platform)}
                    </div>
                    <div>
                      <div className="text-white font-bold group-hover:text-cyan-400 transition-colors">
                        {link.platform}
                      </div>
                      <div className="text-xs text-slate-500">
                        Join our official channel
                      </div>
                    </div>
                  </a>
                ))}
              </motion.div>
            )}
          </div>

          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4">
            <Button className="flex-grow py-3 md:py-4 text-base md:text-lg">
              Invest Now
            </Button>
            <Button
              variant="outline"
              className="py-3 md:py-4 px-6 md:px-4 flex items-center justify-center gap-2 relative group"
              onClick={() => {
                const shareData = {
                  title: `Capitronix Launchpad: ${item.title}`,
                  text: `Check out ${item.title} (${item.symbol}) on the Capitronix Launchpad Protocol!`,
                  url: window.location.href,
                };

                if (navigator.share) {
                  navigator
                    .share(shareData)
                    .catch((err) => console.log("Error sharing", err));
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Project link copied to clipboard!");
                }
              }}
            >
              <Share2 size={20} />
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                Share Project
              </span>
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function WhitelistModal({
  projectTitle,
  onClose,
}: {
  projectTitle: string;
  onClose: () => void;
}) {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      // In a real app, you'd send this to your backend
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-slate-900 border border-cyan-500/30 p-8 rounded-[32px] max-w-md w-full shadow-2xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        {!isSubmitted ? (
          <>
            <div className="w-16 h-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-6">
              <Mail className="text-cyan-400 w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-tight">
              Join Whitelist
            </h3>
            <p className="text-slate-400 mb-6 text-sm">
              Be the first to know when{" "}
              <span className="text-cyan-400 font-bold">{projectTitle}</span>{" "}
              launches. Exclusive early-access for whitelisted members.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
              />
              <Button type="submit" className="w-full py-4 text-lg">
                Secure Early Access
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6 mx-auto">
              <CheckCircle2 className="text-green-500 w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              {`You're`} on the list!
            </h3>
            <p className="text-slate-400 mb-8">
              Success! {`We've`} added{" "}
              <span className="text-white font-medium">{email}</span> to the{" "}
              {projectTitle} whitelist. Check your inbox for confirmation.
            </p>
            <Button onClick={onClose} className="w-full">
              Awesome
            </Button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

function LaunchCard({
  item,
  onClick,
  onWhitelist,
}: {
  item: LaunchItemProps;
  onClick: () => void;
  onWhitelist: (e: React.MouseEvent) => void;
}) {
  const isActive = item.status === "Active";

  return (
    <Card
      onClick={onClick}
      className="relative overflow-hidden group border-white/5 hover:border-cyan-500/50 flex flex-col h-full cursor-pointer"
    >
      {/* Background Glow */}
      <div
        className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[80px] pointer-events-none transition-opacity duration-500 ${
          isActive
            ? "bg-cyan-500/20 opacity-100"
            : "bg-slate-500/10 opacity-50 group-hover:opacity-100"
        }`}
      />

      {/* Featured Image */}
      <div className="relative h-48 mb-6 rounded-2xl overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge
            className={
              isActive
                ? "bg-green-500/20 text-green-400 border-green-500/30"
                : "bg-amber-500/20 text-amber-400 border-amber-500/30"
            }
          >
            {item.status}
          </Badge>
          <Badge className="bg-slate-900/60 backdrop-blur-md border-white/10 uppercase tracking-tighter">
            {item.type}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors uppercase tracking-tight">
              {item.title}
            </h3>
            {item.symbol && (
              <span className="text-xs text-slate-500 font-mono">
                {item.symbol}
              </span>
            )}
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-500 uppercase font-medium">
              Price
            </div>
            <div className="text-cyan-400 font-bold">{item.price}</div>
          </div>
        </div>

        <div className="mt-6 flex-grow">
          {isActive ? (
            <div className="space-y-4">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">Launch Progress</span>
                <span className="text-cyan-400 font-bold">
                  {item.progress}%
                </span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden border border-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.progress}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-cyan-400 to-blue-600 shadow-[0_0_10px_rgba(34,211,238,0.3)]"
                />
              </div>
              {item.totalRaised && (
                <div className="flex justify-between items-center px-3 py-2 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-xs text-slate-500">
                    Total Allocation
                  </span>
                  <span className="text-sm font-bold text-white">
                    {item.totalRaised}
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-6 border-2 border-dashed border-white/5 rounded-2xl bg-white/5">
              <Timer className="w-6 h-6 text-amber-500 mb-2 animate-pulse" />
              <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">
                Starts In
              </div>
              <div className="text-lg font-mono text-white font-bold">
                {item.countdown || "TBA"}
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-white/5">
          <Button
            variant={isActive ? "primary" : "outline"}
            className="w-full gap-2 font-bold py-4"
            onClick={(e) => {
              if (!isActive) {
                e.stopPropagation();
                onWhitelist(e);
              }
            }}
          >
            {isActive ? (
              <>
                <Zap className="w-4 h-4 fill-current" />
                Join Launch Now
              </>
            ) : (
              "Get Whitelisted"
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}

export function Launchpad() {
  const [selectedProject, setSelectedProject] =
    useState<LaunchItemProps | null>(null);
  const [whitelistProject, setWhitelistProject] = useState<string | null>(null);

  // Only show Active and Upcoming projects in the Launchpad section, limited to 3 for home page
  const projects = allProjects
    .filter((p) => p.status !== "Finished")
    .slice(0, 3);

  return (
    <section id="launchpad" className="py-16 relative">
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            item={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
        {whitelistProject && (
          <WhitelistModal
            projectTitle={whitelistProject}
            onClose={() => setWhitelistProject(null)}
          />
        )}
      </AnimatePresence>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-10">
          <div className="max-w-xl">
            <Badge className="mb-4">Capitronix Launchpad</Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Active <span className="text-cyan-400">Opportunities</span>
            </h2>
            <p className="text-slate-400 text-base md:text-lg">
              Every account activation automatically initiates your journey into
              our curated Web3 assets. Real-time distribution powered by the
              Growth Engine.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-900 border border-white/5">
              <ShieldCheck className="w-5 h-5 text-green-500" />
              <span className="text-xs font-bold text-slate-300">
                Audited Assets
              </span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <LaunchCard
                item={project}
                onClick={() => setSelectedProject(project)}
                onWhitelist={() => setWhitelistProject(project.title)}
              />
            </motion.div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Button
            variant="outline"
            size="lg"
            className="px-8 border-cyan-500/30 text-white hover:bg-cyan-500/10 hover:border-cyan-500 group"
            onClick={() => (window.location.hash = "#marketplace")}
          >
            <span>Explore All Projects</span>
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <div className="mt-12 p-1 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent">
          <div className="bg-slate-950 p-8 text-center">
            <div className="flex justify-center gap-12 flex-wrap lg:flex-nowrap">
              {[
                {
                  icon: <TrendingUp />,
                  label: "Guaranteed Allocation",
                  value: "Rank 6 Leaders",
                },
                {
                  icon: <Users />,
                  label: "Active Holders",
                  value: "100% On-Chain",
                },
                {
                  icon: <Diamond />,
                  label: "Rarity System",
                  value: "Dynamic NFTs",
                },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="text-cyan-400 p-2 rounded-xl bg-cyan-400/5">
                    {stat.icon}
                  </div>
                  <div className="text-slate-500 text-xs uppercase tracking-widest">
                    {stat.label}
                  </div>
                  <div className="text-white font-bold">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
