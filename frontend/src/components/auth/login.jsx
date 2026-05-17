import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api.jsx";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";

const Login = ({ setIsLoggedIn }) => {
    const [user, setUser] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
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
                    <h1 className="text-5xl font-bold mb-6 tracking-tight">JobTracker.</h1>
                    <p className="text-xl text-gray-300 leading-relaxed">
                        The premium platform to manage your job applications, track interviews, and land your dream role.
                    </p>
                </motion.div>
            </div>
            
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 md:p-16">
                <motion.div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-gray-100" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                    <div className="mb-10 text-center sm:text-left">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Welcome back</h2>
                        <p className="text-gray-500 text-[15px]">Enter your details to sign in to your account.</p>
                    </div>

                    <form onSubmit={submitForm} className="space-y-5">
                        <div>
                            <label className="block text-[14px] font-medium text-gray-900 mb-1.5">Email</label>
                            <div className="relative">
                                <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input type="email" name="email" value={user.email} onChange={inputHandler} className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-[15px] rounded-lg focus:ring-black focus:border-black block pl-10 p-2.5 transition-all outline-none" placeholder="name@company.com" required />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-1.5">
                                <label className="block text-[14px] font-medium text-gray-900">Password</label>
                                <a href="#" className="text-sm font-medium text-gray-500 hover:text-black transition-colors">Forgot password?</a>
                            </div>
                            <div className="relative">
                                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input type="password" name="password" value={user.password} onChange={inputHandler} className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-[15px] rounded-lg focus:ring-black focus:border-black block pl-10 p-2.5 transition-all outline-none" placeholder="••••••••" required />
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
