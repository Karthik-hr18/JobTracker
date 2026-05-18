import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api.jsx";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Loader2, User, Eye, EyeOff, Briefcase } from "lucide-react";

const Login = ({ setIsLoggedIn }) => {
    const [user, setUser] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [forgotClicked, setForgotClicked] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const submitForm = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await api.post("/user/userLogin", user);
            localStorage.setItem("token", response.data.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.data.user));
            if (setIsLoggedIn) setIsLoggedIn(true);
            toast.success(response.data.message, { position: "top-right" });
            navigate("/dashboard");
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed", { position: "top-right" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex bg-[#fafafa]">
            <div className="hidden lg:flex w-1/2 bg-black text-white p-12 flex-col justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80')] opacity-20 bg-cover bg-center"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-black via-black/90 to-transparent"></div>
                <motion.div className="relative z-10 max-w-lg" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 text-white flex items-center justify-center shadow-[0_0_25px_rgba(124,58,237,0.5)]">
                            <Briefcase size={24} className="text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.35)]" />
                        </div>
                        <span className="font-bold text-sm tracking-wider text-violet-300 uppercase">JobTracker</span>
                    </div>
                    <h1 className="text-5xl font-extrabold mb-6 tracking-tight bg-gradient-to-r from-white via-slate-100 to-violet-300 bg-clip-text text-transparent" style={{ textShadow: "0 0 30px rgba(139,92,246,0.6)" }}>
                        JobTracker.
                    </h1>
                    <p className="text-xl text-gray-300 leading-relaxed">
                        The premium platform to manage your job applications, track interviews, and land your dream role.
                    </p>
                </motion.div>
            </div>
            
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 md:p-16">
                <motion.div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-gray-100" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                    <div className="mb-10 text-center sm:text-left">
                        <Link to="/" className="inline-flex items-center gap-1 text-[13px] font-semibold text-violet-600 hover:text-violet-700 mb-4 transition-colors">
                            ← Back to Home
                        </Link>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Welcome back</h2>
                        <p className="text-gray-500 text-[15px]">Enter your details to sign in to your account.</p>
                    </div>

                    {forgotClicked && (
                        <motion.div 
                            initial={{ opacity: 0, y: -15 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-800 text-sm flex flex-col gap-1.5 relative overflow-hidden"
                        >
                            <div className="font-bold flex items-center gap-1.5">
                                <span>Forgot already? 🤦‍♂️</span>
                            </div>
                            <p className="text-xs text-amber-700 leading-relaxed">
                                Seriously, we literally just started this project! 😭 Write it down on a sticky note next time! For now, try your best to guess it, or just register a new account—we won't tell anyone. 😉
                            </p>
                            <button 
                                type="button" 
                                onClick={() => setForgotClicked(false)} 
                                className="absolute top-3 right-3 text-amber-500 hover:text-amber-750 font-bold transition-colors text-sm"
                            >
                                ✕
                            </button>
                        </motion.div>
                    )}

                    <form onSubmit={submitForm} className="space-y-5">
                        <div>
                            <label className="block text-[14px] font-medium text-gray-900 mb-1.5">Username or Email</label>
                            <div className="relative">
                                <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input 
                                    type="text" 
                                    name="email" 
                                    value={user.email} 
                                    onChange={inputHandler} 
                                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-[15px] rounded-lg focus:ring-black focus:border-black block pl-10 p-2.5 transition-all outline-none" 
                                    placeholder="johndoe or john@example.com" 
                                    required 
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-1.5">
                                <label className="block text-[14px] font-medium text-gray-900">Password</label>
                                <button 
                                    type="button" 
                                    onClick={() => {
                                        setForgotClicked(true);
                                        toast("Forgot already? Seriously? 😂", {
                                            icon: '🤦‍♂️',
                                            duration: 4000,
                                            position: "top-center",
                                        });
                                    }} 
                                    className="text-sm font-medium text-gray-500 hover:text-black transition-colors cursor-pointer bg-transparent border-0 p-0 outline-none"
                                >
                                    Forgot password?
                                </button>
                            </div>
                            <div className="relative">
                                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    name="password" 
                                    value={user.password} 
                                    onChange={inputHandler} 
                                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-[15px] rounded-lg focus:ring-black focus:border-black block pl-10 pr-10 p-2.5 transition-all outline-none" 
                                    placeholder="••••••••" 
                                    required 
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors bg-transparent border-0 p-0 focus:outline-none"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="w-full text-white bg-black hover:bg-neutral-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-[15px] px-5 py-3 text-center flex items-center justify-center gap-2 transition-all mt-6 shadow-sm" disabled={loading}>
                            {loading ? <Loader2 className="animate-spin" size={20} /> : <>Sign in <ArrowRight size={18} /></>}
                        </button>
                    </form>

                    <p className="text-center mt-8 text-[14px] text-gray-500">
                        Don't have an account? <Link to="/userRegister" className="font-semibold text-black hover:underline">Sign up</Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;
