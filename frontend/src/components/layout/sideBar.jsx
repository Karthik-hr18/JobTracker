import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, KanbanSquare, PlusCircle, User, LogOut, Menu, X } from "lucide-react";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: "Overview",  path: "/dashboard",  icon: <LayoutDashboard size={18} /> },
    { name: "Pipeline",  path: "/kanban",      icon: <KanbanSquare size={18} /> },
    { name: "Add Job",   path: "/createJob",   icon: <PlusCircle size={18} /> },
    { name: "Profile",   path: "/profile",     icon: <User size={18} /> },
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-white border border-slate-200 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] text-slate-600 hover:text-violet-600 hover:border-violet-200 transition-all flex items-center justify-center"
        onClick={() => setMobileOpen(true)}
      >
        <Menu size={18} />
      </button>

      {/* Backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Panel */}
      <motion.aside
        className={`fixed md:sticky top-0 left-0 h-screen flex flex-col z-50 transition-all duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          bg-white border-r border-slate-100`}
        style={{ boxShadow: "4px 0 20px rgba(0,0,0,0.06)" }}
        animate={{ width: collapsed ? 72 : 240 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-[64px] px-4 border-b border-slate-100">
          <div className="flex items-center gap-3 overflow-hidden">
            {/* Logo mark */}
            <div
              className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-[0_2px_8px_rgba(109,99,255,0.4)]"
              style={{ background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)" }}
            >
              J
            </div>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="font-bold text-[15px] tracking-tight whitespace-nowrap text-slate-900"
              >
                JobTracker
              </motion.span>
            )}
          </div>

          {/* Collapse toggle (desktop) */}
          <button
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors hidden md:flex items-center justify-center"
            onClick={() => setCollapsed(!collapsed)}
          >
            <Menu size={15} />
          </button>

          {/* Close (mobile) */}
          <button
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors md:hidden flex items-center justify-center"
            onClick={() => setMobileOpen(false)}
          >
            <X size={15} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-5 px-3 space-y-1">
          {!collapsed && (
            <div className="px-3 mb-3 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
              Menu
            </div>
          )}

          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                title={collapsed ? item.name : ""}
                className={`
                  relative flex items-center gap-3 px-3 py-2.5 rounded-xl
                  text-sm font-medium transition-all duration-200 no-underline
                  ${isActive
                    ? "bg-violet-50 text-violet-700 shadow-[inset_0_1px_3px_rgba(109,99,255,0.12)] border border-violet-100"
                    : "text-slate-500 hover:bg-slate-100/80 hover:text-slate-900"}
                `}
              >
                <span className={`flex-shrink-0 transition-colors ${isActive ? "text-violet-600" : "text-slate-400"}`}>
                  {item.icon}
                </span>
                {!collapsed && (
                  <span className="whitespace-nowrap">{item.name}</span>
                )}
                {/* Active dot when collapsed */}
                {isActive && collapsed && (
                  <motion.div
                    layoutId="active-dot"
                    className="absolute right-2 w-1.5 h-1.5 rounded-full bg-violet-500"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer — Logout */}
        <div className="p-3 border-t border-slate-100">
          <Link
            to="/"
            onClick={() => localStorage.removeItem("token")}
            title={collapsed ? "Logout" : ""}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500
                       hover:bg-red-50 hover:text-red-600 transition-all duration-200 no-underline group"
          >
            <span className="flex-shrink-0 text-slate-400 group-hover:text-red-500 transition-colors">
              <LogOut size={18} />
            </span>
            {!collapsed && <span className="text-sm font-medium whitespace-nowrap">Log out</span>}
          </Link>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;