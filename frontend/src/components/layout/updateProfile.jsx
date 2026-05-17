import { useState, useEffect } from "react";
import api from "../../api/api.jsx";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { User, Mail, Image, Briefcase, FileText, Phone, MapPin, Award, ExternalLink, GitBranch, Link as LinkIcon, Loader2, Save, ArrowLeft } from "lucide-react";

function UpdateUser() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/userLogin"); 
    }
  }, [navigate]);

  let userStr = localStorage.getItem("user");
  let userId = null;
  if(userStr) {
      try {
          const parsed = JSON.parse(userStr);
          userId = parsed.id || parsed._id;
      } catch (e) {}
  }
  if(!userId) {
      userId = localStorage.getItem("userId");
  }

  const [formData, setFormData] = useState({
    username: "", email: "", profilePhoto: "", role: "", bio: "",
    phone: "", location: "", skills: "", linkedin: "", github: "",
    portfolio: "", resume: "", experienceLevel: "",
  });

  const [photoPreview, setPhotoPreview] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Photo must be under 2MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target.result;
      setPhotoPreview(dataUrl);
      setFormData((prev) => ({ ...prev, profilePhoto: dataUrl }));
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (userId) loadUserData(userId);
  }, [userId]);

  const loadUserData = async () => {
    try {
      const response = await api.get(`/user/profile/${userId}`);
      const userData = response.data.data;
      setPhotoPreview(userData.profilePhoto || "");
      setFormData({
        username: userData.username || "",
        email: userData.email || "",
        profilePhoto: userData.profilePhoto || "",
        role: userData.role || "",
        bio: userData.bio || "",
        phone: userData.phone || "",
        location: userData.location || "",
        skills: userData.skills?.join(", ") || "",
        linkedin: userData.linkedin || "",
        github: userData.github || "",
        portfolio: userData.portfolio || "",
        resume: userData.resume || "",
        experienceLevel: userData.experienceLevel || "",
      });
    } catch (error) {
      toast.error("Failed to load profile data");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const updatedData = {
      ...formData,
      skills: formData.skills ? formData.skills.split(",").map((skill) => skill.trim()).filter(Boolean) : [],
    };

    try {
      await api.put(`user/update/profile/${userId}`, updatedData);
      toast.success("Profile updated successfully!");
      navigate("/profile");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto pb-12">
      <div className="mb-8">
        <button className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-4" onClick={() => navigate("/profile")}>
          <ArrowLeft size={16}/> Back to Profile
        </button>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Edit Profile</h1>
        <p className="text-gray-500 text-[15px]">Update your personal and professional details.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="glass-panel p-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-100">General Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="input-group">
              <label>Full Name</label>
              <div className="relative flex items-center">
                <User size={16} className="absolute left-3 text-gray-400"/>
                <input type="text" name="username" value={formData.username} onChange={handleChange} className="input-modern pl-10" placeholder="John Doe" />
              </div>
            </div>
            <div className="input-group">
              <label>Email Address</label>
              <div className="relative flex items-center">
                <Mail size={16} className="absolute left-3 text-gray-400"/>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="input-modern pl-10" placeholder="john@example.com" />
              </div>
            </div>
            <div className="input-group md:col-span-2">
              <label>Profile Photo</label>
              <div className="flex items-center gap-4 mt-1">
                <div className="relative shrink-0">
                  <img
                    src={photoPreview || formData.profilePhoto || `https://ui-avatars.com/api/?name=${formData.username || 'U'}&background=000&color=fff&size=80`}
                    alt="Avatar preview"
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 shadow-sm"
                  />
                  <label htmlFor="photo-upload" className="absolute -bottom-1 -right-1 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-neutral-800 transition-colors shadow">
                    <Image size={12} />
                  </label>
                </div>
                <div className="flex-1 min-w-0">
                  <label htmlFor="photo-upload" className="btn-secondary-modern cursor-pointer text-xs !h-auto whitespace-normal">
                    Upload from device
                  </label>
                  <input id="photo-upload" type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                  <p className="input-hint mt-2">Or paste a URL below (max 2MB for uploads)</p>
                  <div className="relative flex items-center mt-2">
                    <LinkIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                    <input type="text" name="profilePhoto" value={formData.profilePhoto.startsWith('data:') ? '' : formData.profilePhoto} onChange={handleChange} className="input-modern pl-9 text-sm" placeholder="https://example.com/photo.jpg" />
                  </div>
                </div>
              </div>
            </div>
            <div className="input-group">
              <label>Professional Role</label>
              <div className="relative flex items-center">
                <Briefcase size={16} className="absolute left-3 text-gray-400"/>
                <input type="text" name="role" value={formData.role} onChange={handleChange} className="input-modern pl-10" placeholder="Frontend Developer" />
              </div>
            </div>
            <div className="input-group md:col-span-2">
              <label>Bio</label>
              <div className="relative flex">
                <FileText size={16} className="absolute left-3 top-3 text-gray-400"/>
                <textarea name="bio" value={formData.bio} onChange={handleChange} className="input-modern pl-10 py-3 min-h-[100px]" placeholder="Tell us about yourself..."></textarea>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.1}} className="glass-panel p-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-100">Contact & Location</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="input-group">
              <label>Phone Number</label>
              <div className="relative flex items-center">
                <Phone size={16} className="absolute left-3 text-gray-400"/>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="input-modern pl-10" placeholder="+1 (555) 000-0000" />
              </div>
            </div>
            <div className="input-group">
              <label>Location</label>
              <div className="relative flex items-center">
                <MapPin size={16} className="absolute left-3 text-gray-400"/>
                <input type="text" name="location" value={formData.location} onChange={handleChange} className="input-modern pl-10" placeholder="New York, USA" />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.2}} className="glass-panel p-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-100">Experience & Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="input-group">
              <label>Experience Level</label>
              <div className="relative flex items-center">
                <select name="experienceLevel" value={formData.experienceLevel} onChange={handleChange} className="input-modern appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_1rem_center] bg-[length:1.2em_1.2em] pr-10 cursor-pointer w-full">
                  <option value="">Select Level</option>
                  <option value="Fresher">Fresher</option>
                  <option value="Junior">Junior</option>
                  <option value="Mid-Level">Mid-Level</option>
                  <option value="Senior">Senior</option>
                </select>
              </div>
            </div>
            <div className="input-group">
              <label>Skills</label>
              <div className="relative flex items-center">
                <Award size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                <input type="text" name="skills" value={formData.skills} onChange={handleChange} className="input-modern pl-10" placeholder="React, Node.js, Design" />
              </div>
              <p className="input-hint">Separate each skill with a comma</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.3}} className="glass-panel p-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-100">Links & Socials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="input-group">
              <label>LinkedIn</label>
              <div className="relative flex items-center">
                <ExternalLink size={16} className="absolute left-3 text-gray-400"/>
                <input type="text" name="linkedin" value={formData.linkedin} onChange={handleChange} className="input-modern pl-10" placeholder="linkedin.com/in/username" />
              </div>
            </div>
            <div className="input-group">
              <label>GitHub</label>
              <div className="relative flex items-center">
                <GitBranch size={16} className="absolute left-3 text-gray-400"/>
                <input type="text" name="github" value={formData.github} onChange={handleChange} className="input-modern pl-10" placeholder="github.com/username" />
              </div>
            </div>
            <div className="input-group">
              <label>Portfolio Website</label>
              <div className="relative flex items-center">
                <LinkIcon size={16} className="absolute left-3 text-gray-400"/>
                <input type="text" name="portfolio" value={formData.portfolio} onChange={handleChange} className="input-modern pl-10" placeholder="yourwebsite.com" />
              </div>
            </div>
            <div className="input-group">
              <label>Resume Link (PDF)</label>
              <div className="relative flex items-center">
                <FileText size={16} className="absolute left-3 text-gray-400"/>
                <input type="text" name="resume" value={formData.resume} onChange={handleChange} className="input-modern pl-10" placeholder="Drive or Dropbox link" />
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
          <button type="button" className="btn-secondary-modern" onClick={() => navigate("/profile")}>Cancel</button>
          <button type="submit" className="btn-primary-modern" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" size={18}/> : <Save size={18}/>} Save Changes
          </button>
        </div>

      </form>
    </div>
  );
}

export default UpdateUser;