import React, { useEffect, useState, useCallback } from "react";
import { DndContext, closestCenter, useDroppable, useDraggable, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import api from "../../api/api.jsx";
import { Building2, MapPin, Loader2, GripVertical, ChevronLeft, ChevronRight } from "lucide-react";

const columns = ["Applied", "Interview", "Offer", "Rejected"];

const columnColors = {
  Applied:   "bg-violet-500",
  Interview: "bg-amber-400",
  Offer:     "bg-emerald-500",
  Rejected:  "bg-red-400",
};

const columnBadgeColors = {
  Applied:   "bg-violet-50 text-violet-700 border-violet-200 ring-1 ring-violet-200",
  Interview: "bg-amber-50 text-amber-700 border-amber-200 ring-1 ring-amber-200",
  Offer:     "bg-emerald-50 text-emerald-700 border-emerald-200 ring-1 ring-emerald-200",
  Rejected:  "bg-red-50 text-red-600 border-red-200 ring-1 ring-red-200",
};

/* ── Desktop Droppable Column ──────────────────────────────── */
function DroppableColumn({ id, title, children, count }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`
        flex flex-col rounded-2xl border transition-all duration-300
        min-h-[500px] flex-1 shrink-0 overflow-hidden
        ${isOver
          ? "border-violet-300 bg-violet-50/40 shadow-[0_0_0_2px_rgba(139,92,246,0.15)]"
          : "border-slate-200/60 bg-slate-50/80"}
      `}
      style={{ boxShadow: isOver ? undefined : "inset 0 1px 0 rgba(255,255,255,0.8)" }}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white/70 backdrop-blur-sm border-b border-slate-200/60">
        <div className="flex items-center gap-2">
          <div className={`w-2.5 h-2.5 rounded-full ${columnColors[id]}`}></div>
          <h3 className="font-semibold text-slate-700 text-sm">{title}</h3>
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${columnBadgeColors[id]}`}>
            {count}
          </span>
        </div>
        <button className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 text-lg leading-none hover:border-violet-300 hover:text-violet-600 hover:shadow-[0_2px_6px_rgba(109,99,255,0.2)] transition-all duration-200">
          +
        </button>
      </div>

      {/* Cards */}
      <div className="flex-1 p-3 overflow-y-auto flex flex-col gap-3">
        {children}
      </div>
    </div>
  );
}

/* ── Desktop Draggable Job Card ────────────────────────────── */
const STATUS_ACCENT_KANBAN = {
  Applied:   "from-violet-500 to-indigo-600",
  Interview: "from-amber-400 to-orange-500",
  Offer:     "from-emerald-400 to-green-600",
  Rejected:  "from-red-400 to-rose-600",
};

function DraggableJobCard({ job }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: job._id,
  });

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`, opacity: isDragging ? 0.7 : 1, zIndex: isDragging ? 100 : 1 }
    : { cursor: "grab" };

  const initial = job.company ? job.company.charAt(0).toUpperCase() : "?";
  const accent = STATUS_ACCENT_KANBAN[job.status] || "from-slate-400 to-slate-500";

  return (
    <div
      ref={setNodeRef}
      style={{ ...style, boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.07)" }}
      {...listeners}
      {...attributes}
      className="relative overflow-hidden bg-white border border-slate-100 rounded-2xl group
                 hover:shadow-[0_8px_30px_rgba(108,99,255,0.12)] hover:-translate-y-1 hover:border-violet-200
                 transition-all duration-300"
    >
      {/* Left accent bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${accent} rounded-l-2xl`} />

      <div className="p-4 pl-4">
        {/* Top: logo + title + grip */}
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl border border-slate-100 bg-slate-50
                          flex items-center justify-center text-sm font-bold text-slate-500 flex-shrink-0">
            {initial}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="font-semibold text-slate-900 text-sm leading-snug truncate
                           group-hover:text-violet-700 transition-colors">
              {job.title}
            </h4>
            <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1 truncate">
              <Building2 size={11} className="shrink-0" />
              {job.company}
            </p>
          </div>
          <GripVertical
            size={15}
            className="text-slate-200 group-hover:text-slate-400 transition-colors shrink-0 cursor-grab"
          />
        </div>

        {/* Tags */}
        <div className="flex items-center flex-wrap gap-1.5 mt-3">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] font-medium bg-slate-50 text-slate-600 border border-slate-200">
            <MapPin size={9} /> {job.location || "Remote"}
          </span>
          {job.salary && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-lg text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
              {job.salary}
            </span>
          )}
        </div>

        {/* Footer */}
        {job.appliedDate && (
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-50">
            <span className="text-[11px] text-slate-400">
              {new Date(job.appliedDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Mobile Job Card (No drag, with column move) ────────────── */
function MobileJobCard({ job, onMoveColumn }) {
  const initial = job.company ? job.company.charAt(0).toUpperCase() : "?";

  return (
    <div className="bg-white border border-[#e8eaf2] rounded-xl p-4 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.06)]">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl border border-[#e8eaf2] bg-[#f8f9fc]
                        flex items-center justify-center text-sm font-bold text-[#6b7280] flex-shrink-0">
          {initial}
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="font-semibold text-[#0f0f14] text-sm leading-snug truncate">{job.title}</h4>
          <p className="text-xs text-[#6b7280] mt-0.5 flex items-center gap-1 truncate">
            <Building2 size={11} className="shrink-0" />
            {job.company}
          </p>
        </div>
      </div>

      <div className="flex items-center flex-wrap gap-1.5 mt-3">
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] font-medium bg-[#f8f9fc] text-[#6b7280] border border-[#e8eaf2]">
          <MapPin size={9} /> {job.location || "Remote"}
        </span>
        {job.salary && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-lg text-[11px] font-semibold bg-green-50 text-green-700 border border-green-100">
            {job.salary}
          </span>
        )}
      </div>

      {/* Move to column (mobile DnD replacement) */}
      <div className="mt-3 pt-3 border-t border-[#f1f3f9]">
        <select
          value={job.status}
          onChange={(e) => onMoveColumn(job._id, e.target.value)}
          className="w-full text-xs px-3 py-2 rounded-lg border border-[#e8eaf2] bg-[#f8f9fc]
                     text-[#6b7280] font-medium focus:outline-none focus:border-[#8580ff]
                     focus:ring-2 focus:ring-[#6C63FF]/10 transition-all"
        >
          {columns.map((col) => (
            <option key={col} value={col}>Move to: {col}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

/* ── Main Kanban Board ─────────────────────────────────────── */
function KanbanBoard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCol, setActiveCol] = useState(0);

  // Touch sensor with delay to prevent scroll conflict
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 250, tolerance: 8 },
    })
  );

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await api.get('/jobs/getAll', { params: { limit: 100 } });
      setJobs(response.data.data.jobs || []);
    } catch (error) {
      console.log('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusJobs = (status) => jobs.filter((job) => job.status === status);

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over) return;

    const newStatus = over.id;
    const jobId = active.id;
    const job = jobs.find((j) => j._id === jobId);
    if (!job || job.status === newStatus) return;

    setJobs(jobs.map((j) => (j._id === jobId ? { ...j, status: newStatus } : j)));

    try {
      await api.put(`/jobs/update/${jobId}`, { status: newStatus });
    } catch (error) {
      console.log(error);
      fetchJobs();
    }
  };

  const handleMoveColumn = async (jobId, newStatus) => {
    const job = jobs.find((j) => j._id === jobId);
    if (!job || job.status === newStatus) return;

    setJobs(jobs.map((j) => (j._id === jobId ? { ...j, status: newStatus } : j)));

    try {
      await api.put(`/jobs/update/${jobId}`, { status: newStatus });
    } catch (error) {
      console.log(error);
      fetchJobs();
    }
  };

  // Swipe gesture for mobile
  useEffect(() => {
    let startX = 0;
    const el = document.getElementById("kanban-mobile");

    const onTouchStart = (e) => { startX = e.touches[0].clientX; };
    const onTouchEnd = (e) => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) < 60) return;
      if (diff > 0) setActiveCol((c) => Math.min(c + 1, columns.length - 1));
      else          setActiveCol((c) => Math.max(c - 1, 0));
    };

    el?.addEventListener("touchstart", onTouchStart, { passive: true });
    el?.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      el?.removeEventListener("touchstart", onTouchStart);
      el?.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  const activeColJobs = getStatusJobs(columns[activeCol]);

  return (
    <div className="w-full flex flex-col gap-5 h-full pb-8">
      {/* Page Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-[#0f0f14]">Pipeline</h1>
      </div>

      {loading ? (
        <div className="flex-1 flex flex-col items-center justify-center text-[#6b7280] font-medium gap-3 h-[50vh]">
          <Loader2 className="animate-spin text-[#6C63FF]" size={24} />
          <span className="text-sm">Loading pipeline...</span>
        </div>
      ) : (
        <>
          {/* ── MOBILE: Tabbed Layout ── */}
          <div id="kanban-mobile" className="md:hidden flex flex-col gap-0">

            {/* Tab Bar */}
            <div className="flex overflow-x-auto gap-2 pb-3 scrollbar-hide -mx-4 px-4">
              {columns.map((col, i) => {
                const count = getStatusJobs(col).length;
                return (
                  <button
                    key={i}
                    onClick={() => setActiveCol(i)}
                    className={`
                      flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full
                      text-sm font-semibold transition-all duration-200
                      ${activeCol === i
                        ? "text-white shadow-[0_2px_8px_rgba(108,99,255,0.3)]"
                        : "bg-white text-[#6b7280] border border-[#e8eaf2]"}
                    `}
                    style={activeCol === i
                      ? { background: "linear-gradient(135deg, #6C63FF 0%, #4840c4 100%)" }
                      : {}}
                  >
                    {col}
                    <span className={`
                      text-xs font-bold px-1.5 py-0.5 rounded-full
                      ${activeCol === i ? "bg-white/25 text-white" : "bg-[#f1f3f9] text-[#6b7280]"}
                    `}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Column Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={`w-2.5 h-2.5 rounded-full ${columnColors[columns[activeCol]]}`}></div>
                <h2 className="font-semibold text-[#0f0f14] text-base">{columns[activeCol]}</h2>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${columnBadgeColors[columns[activeCol]]}`}>
                  {activeColJobs.length}
                </span>
              </div>

              {/* Arrow Nav (fallback) */}
              <div className="flex gap-1">
                <button
                  onClick={() => setActiveCol((c) => Math.max(c - 1, 0))}
                  disabled={activeCol === 0}
                  className="w-8 h-8 rounded-lg border border-[#e8eaf2] bg-white flex items-center
                             justify-center text-[#6b7280] hover:border-[#a8a5ff] disabled:opacity-30
                             disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => setActiveCol((c) => Math.min(c + 1, columns.length - 1))}
                  disabled={activeCol === columns.length - 1}
                  className="w-8 h-8 rounded-lg border border-[#e8eaf2] bg-white flex items-center
                             justify-center text-[#6b7280] hover:border-[#a8a5ff] disabled:opacity-30
                             disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="flex flex-col gap-3" style={{ animation: "fadeIn 0.3s ease both" }}>
              {activeColJobs.map((job) => (
                <MobileJobCard key={job._id} job={job} onMoveColumn={handleMoveColumn} />
              ))}
              {activeColJobs.length === 0 && (
                <div className="bg-white border border-[#e8eaf2] border-dashed rounded-[1.25rem] p-10 text-center">
                  <div className={`w-10 h-10 rounded-xl ${columnColors[columns[activeCol]]}/10 flex items-center
                                   justify-content-center mx-auto mb-3 flex items-center justify-center`}>
                    <div className={`w-4 h-4 rounded-full ${columnColors[columns[activeCol]]} opacity-40`}></div>
                  </div>
                  <p className="text-sm text-[#9ca3af] font-medium">No jobs in {columns[activeCol]}</p>
                </div>
              )}
            </div>
          </div>

          {/* ── DESKTOP: 4-Column Drag & Drop ── */}
          <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter} sensors={sensors}>
            <div className="hidden md:flex gap-4 overflow-x-auto pb-4 h-full scrollbar-hide">
              {columns.map((column) => {
                const columnJobs = getStatusJobs(column);
                return (
                  <DroppableColumn key={column} id={column} title={column} count={columnJobs.length}>
                    {columnJobs.map((job) => (
                      <DraggableJobCard key={job._id} job={job} />
                    ))}
                    {columnJobs.length === 0 && (
                      <div
                        key="empty"
                        className="flex-1 rounded-xl border-2 border-dashed border-[#e8eaf2]
                                   flex items-center justify-center text-xs font-medium text-[#9ca3af]
                                   min-h-[120px] transition-colors"
                      >
                        Drop jobs here
                      </div>
                    )}
                  </DroppableColumn>
                );
              })}
            </div>
          </DndContext>
        </>
      )}
    </div>
  );
}

export default KanbanBoard;