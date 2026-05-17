import { useState, useEffect } from "react";
import api from "../../api/api.jsx";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Briefcase, Building2, MapPin, DollarSign, FileText, Link as LinkIcon, Loader2, Save, ArrowLeft } from "lucide-react";

function CreateJob({ onJobCreated }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/userLogin"); 
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    title: "", company: "", status: "Applied", location: "", salary: "", notes: "", jobLink: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.company) {
      toast.error("Title and Company are required");
      return;
    }
    setLoading(true);
    try {
      const res = await api.post("/jobs/create", formData);
      toast.success("Job application tracked successfully!");
      if (typeof onJobCreated === "function") {
        onJobCreated(res.data.data);
      }
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto pb-12">
      <div className="mb-8">
        <button className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-4" onClick={() => navigate("/dashboard")}>
          <ArrowLeft size={16}/> Back to Dashboard
        </button>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Track New Application</h1>
        <p className="text-gray-500 text-[15px]">Add details about the job you are applying for.</p>
      </div>

      <motion.form initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} onSubmit={handleSubmit} className="glass-panel p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          
          <div className="input-group md:col-span-2">
            <label>Job Title <span className="text-red-500">*</span></label>
            <div className="relative flex items-center">
              <Briefcase size={16} className="absolute left-3 text-gray-400"/>
              <input type="text" name="title" value={formData.title} onChange={handleChange} className="input-modern pl-10" placeholder="e.g. Senior Frontend Engineer" required />
            </div>
          </div>

          <div className="input-group">
            <label>Company Name <span className="text-red-500">*</span></label>
            <div className="relative flex items-center">
              <Building2 size={16} className="absolute left-3 text-gray-400"/>
              <input type="text" name="company" value={formData.company} onChange={handleChange} className="input-modern pl-10" placeholder="e.g. Google" required />
            </div>
          </div>

          <div className="input-group">
            <label>Location</label>
            <div className="relative flex items-center">
              <MapPin size={16} className="absolute left-3 text-gray-400"/>
              <input type="text" name="location" value={formData.location} onChange={handleChange} className="input-modern pl-10" placeholder="e.g. Remote, NY" />
            </div>
          </div>

          <div className="input-group">
            <label>Application Status</label>
            <div className="relative flex items-center">
              <select name="status" value={formData.status} onChange={handleChange} className="input-modern appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_1rem_center] bg-[length:1.2em_1.2em] pr-10 cursor-pointer w-full">
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="input-group">
            <label>Expected Salary</label>
            <div className="relative flex items-center">
              <DollarSign size={16} className="absolute left-3 text-gray-400"/>
              <input type="text" name="salary" value={formData.salary} onChange={handleChange} className="input-modern pl-10" placeholder="e.g. $120,000" />
            </div>
          </div>

          <div className="input-group md:col-span-2">
            <label>Job Posting URL</label>
            <div className="relative flex items-center">
              <LinkIcon size={16} className="absolute left-3 text-gray-400"/>
              <input type="text" name="jobLink" value={formData.jobLink} onChange={handleChange} className="input-modern pl-10" placeholder="https://..." />
            </div>
          </div>

          <div className="input-group md:col-span-2">
            <label>Personal Notes</label>
            <div className="relative flex">
              <FileText size={16} className="absolute left-3 top-3 text-gray-400"/>
              <textarea name="notes" value={formData.notes} onChange={handleChange} className="input-modern pl-10 py-3 min-h-[100px]" rows="4" placeholder="Any specific details, requirements, or next steps..."></textarea>
            </div>
          </div>

        </div>

        <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-100">
          <button type="button" className="btn-secondary-modern" onClick={() => navigate("/dashboard")}>Cancel</button>
          <button type="submit" className="btn-primary-modern" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" size={18}/> : <Save size={18}/>} Track Application
          </button>
        </div>
      </motion.form>
    </div>
  );
}

export default CreateJob;