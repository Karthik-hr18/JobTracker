import React from "react";
import { Link } from "react-router-dom";
import {
  Briefcase,
  Search,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Star,
} from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#fafafa] text-gray-900">

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-black text-white mt-2.3 flex items-center justify-center">
                <Briefcase size={20} />
              </div>

              <div>
                <h1 className="text-lg font-semibold mt-2.5 tracking-tight">
                  JobTracker
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/userLogin"
                className="btn-secondary-modern"
              >
                Login
              </Link>

              <Link
                to="/userRegister"
                className="btn-primary-modern"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-100/50 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32 relative">

          <div className="max-w-4xl mx-auto text-center">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white shadow-sm mb-8">
              <Star size={14} className="text-amber-500 fill-amber-500" />

              <span className="text-sm font-medium text-gray-700">
                Modern AI-powered Job Tracking Platform
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
              Organize Your
              <span className="block text-gray-400">
                Job Search Smarter
              </span>
            </h1>

            <p className="mt-8 text-lg md:text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto">
              Track applications, manage interviews, organize opportunities,
              and land your dream job with a clean modern dashboard built for productivity.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">

              <Link
                to="/userRegister"
                className="btn-primary-modern text-base px-6 py-3"
              >
                Start Tracking
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/userLogin"
                className="btn-secondary-modern text-base px-6 py-3"
              >
                View Dashboard
              </Link>
            </div>

            {/* Hero Preview */}
            <div className="mt-20">
              <div className="glass-panel shadow-2xl shadow-gray-200/40 border border-gray-200 overflow-hidden">

                {/* Dashboard Mock Navbar */}
                <div className="h-14 border-b border-gray-200 bg-white flex items-center justify-between px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>

                  <div className="w-52 h-10 rounded-lg bg-gray-100"></div>
                </div>

                {/* Dashboard Preview */}
                <div className="grid lg:grid-cols-4 min-h-[500px]">

                  {/* Sidebar */}
                  <div className="hidden lg:block border-r border-gray-200 bg-white p-5">
                    <div className="space-y-3">
                      {[1,2,3,4,5].map((item) => (
                        <div
                          key={item}
                          className={`h-11 rounded-xl ${
                            item === 1
                              ? "bg-black"
                              : "bg-gray-100"
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div>

                  {/* Main */}
                  <div className="lg:col-span-3 p-6 bg-[#fafafa]">

                    {/* Stats */}
                    <div className="grid md:grid-cols-4 gap-4">

                      {[
                        "Applications",
                        "Interviews",
                        "Offers",
                        "Rejected",
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="glass-panel p-5"
                        >
                          <div className="w-10 h-10 rounded-xl bg-gray-100 mb-4"></div>

                          <div className="h-6 w-16 bg-gray-200 rounded mb-2"></div>

                          <div className="h-4 w-24 bg-gray-100 rounded"></div>
                        </div>
                      ))}
                    </div>

                    {/* Job Cards */}
                    <div className="mt-6 space-y-4">
                      {[1,2,3].map((card) => (
                        <div
                          key={card}
                          className="glass-panel p-5 flex items-center justify-between"
                        >
                          <div className="flex items-center gap-4">

                            <div className="w-14 h-14 rounded-2xl bg-gray-100"></div>

                            <div>
                              <div className="h-5 w-48 bg-gray-200 rounded mb-2"></div>

                              <div className="h-4 w-32 bg-gray-100 rounded"></div>
                            </div>
                          </div>

                          <div className="hidden md:block h-8 w-24 rounded-full bg-gray-100"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold tracking-tight">
              Everything You Need
            </h2>

            <p className="mt-4 text-lg text-gray-500">
              Built for modern job seekers who want a clean and productive workflow.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-16">

            {[
              {
                icon: <Search size={22} />,
                title: "Smart Job Tracking",
                desc: "Track all applications with search, filters, and sorting.",
              },

              {
                icon: <BarChart3 size={22} />,
                title: "Analytics Dashboard",
                desc: "Visualize interview progress and application success.",
              },

              {
                icon: <CheckCircle2 size={22} />,
                title: "Profile Management",
                desc: "Manage resumes, skills, portfolio links, and more.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="glass-panel p-8 card-hover"
              >
                <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center">
                  {feature.icon}
                </div>

                <h3 className="mt-6 text-xl font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-3 text-gray-500 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">

          <div className="glass-panel p-10 md:p-16 text-center bg-black text-white border-black">

            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Start Managing Your Career Better
            </h2>

            <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
              Join the modern way of organizing job applications and interview pipelines.
            </p>

            <div className="mt-10">
              <Link
                to="/userRegister"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-medium hover:bg-gray-200 transition-all"
              >
                Create Free Account
                <ArrowRight size={18} />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-sm text-gray-500">
            © 2026 JobTracker. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Contact</a>
          </div>

        </div>
      </footer>

    </div>
  );
};

export default Home;