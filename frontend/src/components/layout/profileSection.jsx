import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Edit2, MapPin, Mail, Phone, Briefcase, GitBranch, ExternalLink, Link as LinkIcon, Award, FileText } from "lucide-react";

const ProfileSection = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  let userStr = localStorage.getItem("user");
  let localUserId = null;
  if(userStr) {
      try {
          const parsed = JSON.parse(userStr);
          localUserId = parsed.id || parsed._id;
      } catch (e) {}
  }
  if(!localUserId) {
      localUserId = localStorage.getItem("userId");
  }

  const handleEdit = () => {
    navigate(`/updateProfile/${localUserId}`);
  };

  const fetchProfile = async () => {
    if (!localUserId) {
        setLoading(false);
        return;
    }
    try {
      const response = await api.get(`/user/profile/${localUserId}`);
      setUser(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-gray-500 font-medium">Loading your profile...</div>;
  }

  if (!user) {
    return <div className="p-8 text-center text-gray-500 border-2 border-dashed border-gray-200 rounded-xl m-6">Unable to load profile data.</div>;
  }

  const fields = ['username', 'email', 'profilePhoto', 'role', 'bio', 'phone', 'location', 'skills', 'linkedin', 'github', 'portfolio', 'resume', 'experienceLevel'];
  let filledFields = 0;
  fields.forEach(f => {
      if (user[f] && (Array.isArray(user[f]) ? user[f].length > 0 : true)) filledFields++;
  });
  const completionPercentage = Math.round((filledFields / fields.length) * 100);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 pb-12">
      {/* Header Card */}
      <div className="glass-panel overflow-hidden">
        {/* Banner */}
        <div className="h-28 sm:h-40 bg-gradient-to-br from-indigo-100 via-white to-purple-100 border-b border-gray-200" />

        {/* Avatar + Info */}
        <div className="px-4 sm:px-8 pb-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-end -mt-12 sm:-mt-16">
          <div className="relative shrink-0">
            <div className="p-1 bg-white rounded-full shadow-md">
              <img
                src={user.profilePhoto || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}&background=000&color=fff&size=150`}
                alt="Profile"
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}&background=000&color=fff&size=150`;
                }}
              />
            </div>
          </div>

          <div className="flex-1 text-center sm:text-left pb-2 min-w-0">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-3">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 truncate">{user.username}</h1>
              <button className="btn-secondary-modern self-center sm:self-auto shrink-0" onClick={handleEdit}>
                <Edit2 size={16} /> Edit Profile
              </button>
            </div>
            <p className="inline-block bg-gray-100 px-3 py-1 mt-4 rounded-full text-sm font-semibold text-gray-700 border border-gray-200 mb-3">
              {user.role || "Job Seeker"}
            </p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-5 text-sm text-gray-500">
              {user.location && <span className="flex items-center gap-1.5"><MapPin size={14} /> {user.location}</span>}
              {user.email && <span className="flex items-center gap-1.5 min-w-0 truncate"><Mail size={14} /> {user.email}</span>}
              {user.phone && <span className="flex items-center gap-1.5"><Phone size={14} /> {user.phone}</span>}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="glass-panel p-6">
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
              <FileText size={20} className="text-gray-400"/> About Me
            </h2>
            <p className="text-gray-700 leading-relaxed text-[15px]">
              {user.bio || "No bio provided yet. Add a short description about yourself to stand out!"}
            </p>
          </motion.div>

          <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay: 0.1}} className="glass-panel p-6">
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
              <Award size={20} className="text-gray-400"/> Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {user.skills && user.skills.length > 0 ? (
                user.skills.map((skill, index) => (
                  <span key={index} className="bg-gray-100 border border-gray-200 text-gray-700 px-3 py-1.5 rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-gray-400 text-sm">No skills added yet.</p>
              )}
            </div>
          </motion.div>

          <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay: 0.2}} className="glass-panel p-6">
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
              <Briefcase size={20} className="text-gray-400"/> Experience Level
            </h2>
            <div className="inline-flex items-center justify-center bg-gray-50 text-gray-700 border border-gray-200 px-4 py-2 rounded-lg font-semibold">
              {user.experienceLevel || "Not specified"}
            </div>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="glass-panel p-6 text-center">
            <h2 className="text-lg font-semibold mb-6">Profile Completion</h2>
            <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden mb-4 border border-gray-200">
              <div 
                className="h-full bg-black rounded-full transition-all duration-1000 ease-out" 
                style={{width: `${completionPercentage}%`}}
              ></div>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-2">{completionPercentage}% Complete</p>
            {completionPercentage < 100 && (
              <p className="text-xs text-gray-500">Fill out all fields to increase your chances of getting noticed.</p>
            )}
          </motion.div>

          <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay: 0.1}} className="glass-panel p-6">
            <h2 className="text-lg font-semibold mb-4 pb-4 border-b border-gray-100">Social Links</h2>
            <div className="flex flex-col gap-3">
              {user.linkedin ? (
                <a href={user.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 font-medium hover:-translate-y-0.5 hover:shadow-sm hover:border-[#0a66c2] hover:text-[#0a66c2] transition-all">
                  <ExternalLink size={18}/> LinkedIn Profile
                </a>
              ) : <div className="flex items-center gap-3 p-3 rounded-lg border border-dashed border-gray-300 text-gray-400 text-sm"><ExternalLink size={18}/> No LinkedIn provided</div>}
              
              {user.github ? (
                <a href={user.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 font-medium hover:-translate-y-0.5 hover:shadow-sm hover:border-gray-900 hover:text-gray-900 transition-all">
                  <GitBranch size={18}/> GitHub Profile
                </a>
              ) : <div className="flex items-center gap-3 p-3 rounded-lg border border-dashed border-gray-300 text-gray-400 text-sm"><GitBranch size={18}/> No GitHub provided</div>}

              {user.portfolio ? (
                <a href={user.portfolio} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 font-medium hover:-translate-y-0.5 hover:shadow-sm hover:border-black hover:text-black transition-all">
                  <LinkIcon size={18}/> Personal Portfolio
                </a>
              ) : <div className="flex items-center gap-3 p-3 rounded-lg border border-dashed border-gray-300 text-gray-400 text-sm"><LinkIcon size={18}/> No Portfolio provided</div>}
            </div>
          </motion.div>

          {user.resume && (
            <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay: 0.2}} className="glass-panel p-6">
              <h2 className="text-lg font-semibold mb-4">Resume</h2>
              <a href={user.resume} target="_blank" rel="noreferrer" className="btn-secondary-modern w-full">
                View Resume
              </a>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;