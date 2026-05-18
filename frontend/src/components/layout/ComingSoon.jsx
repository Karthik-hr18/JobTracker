import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Rocket, Mail, Sparkles, Heart, Compass } from "lucide-react";
import toast from "react-hot-toast";

const ComingSoon = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const isLoggedIn = !!localStorage.getItem("token");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      toast.success(
        "Subscription successful! 🎉 You'll receive exactly 0 emails, since we haven't built a mailing server yet!",
        {
          duration: 6000,
          position: "top-center",
          style: {
            borderRadius: '16px',
            background: '#1e1b4b',
            color: '#fff',
          }
        }
      );
      setEmail("");
      setLoading(false);
    }, 800);
  };

  const excuses = [
    "The developers are currently negotiating with the CSS gods for perfect alignment.",
    "A cat fell asleep on the server's keyboard. We dare not wake it.",
    "We ran out of semicolons and had to order a fresh batch from GitHub.",
    "This page is currently undergoing a highly classified glow-up.",
    "We drank too much coffee and accidentally built a time machine instead."
  ];

  // We want a stable select on render but changing on click or load.
  // Using a state or simply let it pick on component mounting.
  const [randomExcuse] = useState(() => excuses[Math.floor(Math.random() * excuses.length)]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 md:p-12 relative overflow-hidden bg-[#fafafa]">
      {/* Dynamic Background Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-violet-200/40 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-200/40 blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-2xl bg-white border border-slate-100/80 rounded-3xl p-8 md:p-12 text-center z-10"
        style={{ boxShadow: "0 20px 50px rgba(108, 99, 255, 0.08)" }}
      >
        {/* Floating rocket icon */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="mx-auto w-16 h-16 rounded-2xl bg-violet-50 flex items-center justify-center text-violet-600 mb-8 border border-violet-100 shadow-[0_8px_30px_rgb(124,58,237,0.06)]"
        >
          <Rocket size={32} />
        </motion.div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-semibold mb-6">
          <Sparkles size={13} className="text-violet-500 animate-pulse" />
          <span>FUTURE EXPANSION</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
          Under Active
          <span className="block mt-1 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            Construction
          </span>
        </h1>

        <p className="text-slate-500 text-base md:text-lg max-w-lg mx-auto mb-8 leading-relaxed">
          You stumbled upon a placeholder! We are currently baking this feature in our secret oven. Here's a developer excuse for the delay:
        </p>

        {/* Excuse Box */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-50/80 border border-slate-100 rounded-2xl p-5 mb-10 text-slate-600 text-sm font-medium italic relative overflow-hidden text-left pl-7"
        >
          <div className="absolute top-0 left-0 w-1.5 h-full bg-violet-500" />
          "{randomExcuse}"
        </motion.div>

        {/* Subscription Form */}
        <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 mb-10">
          <div className="relative flex-1">
            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email to pretend to subscribe"
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 text-slate-800 placeholder:text-slate-400 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-violet-400 transition-all text-sm outline-none"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-slate-900 text-white rounded-2xl text-sm font-semibold hover:bg-slate-800 active:scale-[0.98] transition-all shadow-md shrink-0 flex items-center justify-center gap-2"
          >
            {loading ? "Adding to list..." : "Notify Me"}
          </button>
        </form>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 border-t border-slate-100 pt-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-900 bg-slate-50 border border-slate-200 rounded-xl transition-all active:scale-[0.98]"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>

          <Link
            to={isLoggedIn ? "/dashboard" : "/"}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-violet-600 hover:bg-violet-700 rounded-xl transition-all active:scale-[0.98] shadow-md shadow-violet-100"
          >
            <Compass size={16} />
            {isLoggedIn ? "Dashboard" : "Back to Home"}
          </Link>
        </div>
      </motion.div>

      {/* Footer */}
      <div className="mt-8 text-center text-xs text-slate-400 z-10 flex items-center gap-1.5">
        <span>Made with</span>
        <Heart size={12} className="text-red-500 fill-red-500 animate-pulse" />
        <span>From Karthik</span>
      </div>
    </div>
  );
};

export default ComingSoon;
