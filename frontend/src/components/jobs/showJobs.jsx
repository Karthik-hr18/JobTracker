import { useState, useEffect } from "react";
import api from "../../api/api.jsx";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, MapPin, Building2, DollarSign, Calendar,
  Edit2, Trash2, Briefcase, Plus, Filter, ArrowUpRight, Loader2
} from "lucide-react";

/* Status accent colours for the left bar on each job card */
const STATUS_ACCENT = {
  Applied:   "from-violet-500 to-indigo-600",
  Interview: "from-amber-400 to-orange-500",
  Offer:     "from-emerald-400 to-green-600",
  Rejected:  "from-red-400 to-rose-600",
  Saved:     "from-slate-400 to-slate-500",
};

/* Status badge component */
const StatusBadge = ({ status }) => {
  const s = status?.toLowerCase();
  const dot = {
    applied:   "bg-violet-500",
    interview: "bg-amber-500",
    offer:     "bg-emerald-500",
    rejected:  "bg-red-500",
    saved:     "bg-slate-400",
  };
  return (
    <span className={`status-badge status-${s}`}>
      <span className={`w-1.5 h-1.5 rounded-full inline-block ${dot[s] || "bg-slate-400"}`} />
      {status}
    </span>
  );
};

function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [debouncedLocationFilter, setDebouncedLocationFilter] = useState("");
  const [sortType, setSortType] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const [stats, setStats] = useState({ applied: 0, interview: 0, rejected: 0, offer: 0 });

  const limit = 10;
  const navigate = useNavigate();

  // Debounce search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Debounce location query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedLocationFilter(locationFilter);
    }, 300);
    return () => clearTimeout(handler);
  }, [locationFilter]);

  // Reset to page 1 whenever any search or filter criteria changes
  useEffect(() => {
    setPage(1);
  }, [debouncedSearchQuery, statusFilter, debouncedLocationFilter, sortType]);

  // Fetch jobs whenever page or any filter criteria changes
  useEffect(() => {
    fetchjobs(page);
  }, [page, debouncedSearchQuery, statusFilter, debouncedLocationFilter, sortType]);

  const fetchjobs = async (currentPage) => {
    setLoading(true);
    try {
      const response = await api.get('/jobs/getAll', {
        params: {
          page: currentPage,
          limit,
          search: debouncedSearchQuery,
          status: statusFilter,
          location: debouncedLocationFilter,
          sort: sortType
        }
      });
      setJobs(response.data.data.jobs);
      setTotalPages(response.data.data.totalPages);
      setTotalJobs(response.data.data.totaljobs);

      const s = { applied: 0, interview: 0, rejected: 0, offer: 0 };
      response.data.data.jobs.forEach(j => {
        if (j.status === "Applied")   s.applied++;
        else if (j.status === "Interview") s.interview++;
        else if (j.status === "Rejected")  s.rejected++;
        else if (j.status === "Offer")     s.offer++;
      });
      setStats(s);
    } catch (error) {
      console.log('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
  };
  const handlePageChange = (newPage) => { if (newPage >= 1 && newPage <= totalPages) setPage(newPage); };

  const deleteJob = async (jobId) => {
    if (!window.confirm("Delete this job?")) return;
    try {
      await api.delete(`/jobs/delete/${jobId}`);
      setJobs(prev => prev.filter(job => job._id !== jobId));
      setTotalJobs(prev => prev - 1);
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  /* ── KPI card data ── */
  const kpiCards = [
    {
      label: "Total Applications",
      value: totalJobs,
      icon: <Briefcase size={20} />,
      iconBg: "bg-violet-50 text-violet-600 border-violet-100",
      gradient: "from-violet-500 via-indigo-500 to-purple-600",
      delay: 0.1,
    },
    {
      label: "Interviews",
      value: stats.interview,
      icon: <Calendar size={20} />,
      iconBg: "bg-amber-50 text-amber-600 border-amber-100",
      gradient: "from-amber-400 via-orange-400 to-orange-500",
      delay: 0.2,
    },
    {
      label: "Offers",
      value: stats.offer,
      icon: <ArrowUpRight size={20} />,
      iconBg: "bg-emerald-50 text-emerald-600 border-emerald-100",
      gradient: "from-emerald-400 via-green-400 to-green-500",
      delay: 0.3,
    },
    {
      label: "Rejections",
      value: stats.rejected,
      icon: <Trash2 size={20} />,
      iconBg: "bg-red-50 text-red-500 border-red-100",
      gradient: "from-red-400 via-rose-400 to-rose-500",
      delay: 0.4,
    },
  ];

  return (
    <div className="w-full flex flex-col gap-8 pb-12">

      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-violet-600 mb-1.5">
            Job Tracker
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight"
              style={{ background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Your Applications
          </h1>
          <p className="text-slate-500 text-sm mt-1">Track and manage your job applications.</p>
        </div>

        <button
          className="inline-flex items-center gap-2.5 px-5 py-2.5 text-white text-sm font-semibold rounded-xl whitespace-nowrap transition-all duration-200 active:scale-[0.97] focus-visible:outline-none"
          style={{ background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)", boxShadow: "0 2px 8px rgba(109,99,255,0.35)" }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(109,99,255,0.45)"; e.currentTarget.style.transform = "scale(1.03)"; }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 2px 8px rgba(109,99,255,0.35)"; e.currentTarget.style.transform = "scale(1)"; }}
          onClick={() => navigate("/createJob")}
        >
          <span className="text-white/90 text-base leading-none">+</span>
          Add Application
        </button>
      </div>

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {kpiCards.map((card) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: card.delay }}
            className="relative overflow-hidden bg-white rounded-2xl border border-slate-100/80 p-5 flex flex-col gap-4 transition-all duration-300"
            style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.07)" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.10)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.07)"; }}
          >
            {/* Top gradient strip */}
            <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${card.gradient}`} />

            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${card.iconBg}`}>
              {card.icon}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900">{card.value}</h3>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mt-0.5">{card.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Toolbar ── */}
      <div className="bg-white rounded-2xl border border-slate-100/80 p-4 flex flex-col lg:flex-row gap-4 items-center justify-between"
           style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 8px 24px rgba(0,0,0,0.07)" }}>
        <form className="relative w-full lg:w-1/3" onSubmit={handleSearch}>
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by title or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-modern pl-10 w-full"
          />
        </form>

        <div className="flex flex-wrap lg:flex-nowrap gap-3 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-40">
            <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input-modern pl-9 pr-8 appearance-none cursor-pointer bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_0.5rem_center] bg-[length:1em_1em]"
            >
              <option value="">All Status</option>
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Rejected">Rejected</option>
              <option value="Offer">Offer</option>
            </select>
          </div>

          <div className="relative flex-1 lg:w-40">
            <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Location..."
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="input-modern pl-9"
            />
          </div>

          <div className="relative flex-1 lg:w-40">
            <select
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              className="input-modern pr-8 appearance-none cursor-pointer bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_0.5rem_center] bg-[length:1em_1em]"
            >
              <option value="">Sort By</option>
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
              <option value="salary">Salary Low to High</option>
              <option value="salary-desc">Salary High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* ── Job Cards ── */}
      {loading ? (
        <div className="py-16 flex items-center justify-center text-slate-500 font-medium gap-2">
          <Loader2 className="animate-spin text-violet-500" size={20} />
          Loading your applications...
        </div>
      ) : jobs.length === 0 ? (
        (!searchQuery && !locationFilter && !statusFilter) ? (
          /* Empty state - No applications whatsoever in database */
          <div className="flex flex-col items-center justify-center py-16 px-6 rounded-2xl border-2 border-dashed border-slate-200 bg-gradient-to-b from-slate-50 to-white">
            <div className="w-14 h-14 rounded-2xl bg-violet-50 border border-violet-100 flex items-center justify-center text-2xl mb-4"
                 style={{ boxShadow: "0 2px 8px rgba(109,99,255,0.15)" }}>
              📋
            </div>
            <h3 className="font-semibold text-slate-800 text-base mb-1">No applications yet</h3>
            <p className="text-slate-500 text-sm text-center max-w-xs mb-5">
              Start tracking your job search by adding your first application
            </p>
            <button
              onClick={() => navigate("/createJob")}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 text-white text-sm font-semibold rounded-xl transition-all duration-200"
              style={{ background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)", boxShadow: "0 2px 8px rgba(109,99,255,0.35)" }}
            >
              <span>+</span> Add First Application
            </button>
          </div>
        ) : (
          /* Empty state - Has applications but filter/search returned zero matches */
          <div className="flex flex-col items-center justify-center py-16 px-6 rounded-2xl border-2 border-dashed border-slate-200 bg-gradient-to-b from-slate-50 to-white">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-2xl mb-4"
                 style={{ boxShadow: "0 2px 8px rgba(245,158,11,0.15)" }}>
              🔍
            </div>
            <h3 className="font-semibold text-slate-800 text-base mb-1">No matches found</h3>
            <p className="text-slate-500 text-sm text-center max-w-md mb-5">
              We couldn't find any applications matching
              {searchQuery && <span className="font-semibold text-slate-700"> "{searchQuery}"</span>}
              {locationFilter && (
                <>
                  {searchQuery && " in"}
                  <span className="font-semibold text-slate-700"> location "{locationFilter}"</span>
                </>
              )}
              {statusFilter && (
                <>
                  {(searchQuery || locationFilter) && " with status"}
                  <span className="font-semibold text-slate-700"> "{statusFilter}"</span>
                </>
              )}
              {!searchQuery && !locationFilter && !statusFilter && " your current filter selections"}.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setLocationFilter("");
                setStatusFilter("");
                setSortType("");
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-all duration-150"
            >
              Clear Search & Filters
            </button>
          </div>
        )
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          <AnimatePresence>
            {jobs.map((job, index) => {
              const accent = STATUS_ACCENT[job.status] || STATUS_ACCENT.Saved;
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2, delay: index * 0.04 }}
                  key={job._id}
                  className="relative overflow-hidden bg-white rounded-2xl border border-slate-100/80
                             cursor-pointer group transition-all duration-300"
                  style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.07)" }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 8px 30px rgba(108,99,255,0.12)";
                    e.currentTarget.style.borderColor = "#e0e0ff";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.07)";
                    e.currentTarget.style.borderColor = "rgba(241,245,249,0.8)";
                  }}
                >
                  {/* Colored left accent bar */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${accent} rounded-l-2xl`} />

                  <div className="p-5 pl-5">
                    {/* Header: logo + title + actions */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex gap-3 items-center">
                        <div
                          className="w-10 h-10 rounded-xl text-white flex items-center justify-center font-bold text-base flex-shrink-0"
                          style={{ background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)", boxShadow: "0 2px 6px rgba(109,99,255,0.3)" }}
                        >
                          {job.company.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 text-sm leading-tight line-clamp-1
                                         group-hover:text-violet-700 transition-colors">
                            {job.title}
                          </h4>
                          <span className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                            <Building2 size={11} /> {job.company}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          className="p-1.5 text-slate-400 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-all duration-150"
                          onClick={() => navigate(`/updateJob/${job._id}`)}
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-150"
                          onClick={() => deleteJob(job._id)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium text-slate-600">
                        <MapPin size={11} /> {job.location || "Remote"}
                      </div>
                      {job.salary && (
                        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-700">
                          <DollarSign size={11} /> {job.salary}
                        </div>
                      )}
                      <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium text-slate-500">
                        <Calendar size={11} /> {new Date(job.createdAt).toLocaleDateString()}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <StatusBadge status={job.status} />
                      {job.jobLink && (
                        <a
                          href={job.jobLink}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs font-medium text-slate-500 hover:text-violet-600 flex items-center gap-1 transition-colors"
                        >
                          View Posting <ArrowUpRight size={13} />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div className="bg-white rounded-2xl border border-slate-100/80 py-3 px-6 flex items-center justify-between mt-2"
             style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          <button
            className="btn-secondary-modern text-xs px-3 py-2 disabled:opacity-40 disabled:cursor-not-allowed"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            ← Previous
          </button>
          <span className="text-sm font-medium text-slate-500">
            Page <strong className="text-slate-800">{page}</strong> of <strong className="text-slate-800">{totalPages}</strong>
          </span>
          <button
            className="btn-secondary-modern text-xs px-3 py-2 disabled:opacity-40 disabled:cursor-not-allowed"
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}

export default Dashboard;