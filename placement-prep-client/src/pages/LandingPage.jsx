import React, { useState, useEffect } from "react";
import {
    Github,
    FileText,
    Zap,
    Users,
    CheckCircle,
    Sparkles,
    Target,
    Briefcase,
    GraduationCap,
    Menu
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

function LandingPage() {
    const plans = [
        {
            name: "Single Resume",
            price: 25,
            description: "Perfect for one-time needs",
            features: [
                "One professional resume",
                "ATS-friendly format",
                "Download as PDF",
                "Email support",
            ],
            button: "Get Started",
            buttonStyle: "border border-teal-600 text-teal-600",
        },
        {
            name: "Pack of 3",
            price: 60,
            description: "Ideal for applying to multiple jobs",
            features: [
                "Three unique resumes",
                "All features of Single plan",
                "Multiple templates",
                "Priority support",
            ],
            button: "Get Started",
            buttonStyle: "bg-teal-600 hover:bg-teal-700 text-white",
            badge: "Recommended",
        },
        {
            name: "Pack of 5",
            price: 100,
            description: "Best for professionals and career switchers",
            features: [
                "Five personalized resumes",
                "All features of Pack of 3",
                "Unlimited edits",
                "Dedicated support",
            ],
            button: "Contact Sales",
            buttonStyle: "border border-teal-600 text-teal-600",
        },
    ];

    const [selected, setSelected] = useState(1);
    const [open, setOpen] = useState(false);

    const navTabs = [
        { label: "Features", href: "#features" },
        { label: "Templates", href: "#templates" },
        { label: "Pricing", href: "#pricing" },
        { label: "About", href: "#about" },
    ];

    const navigate = useNavigate();

    const onHandleClick = () => {

    }


    const [activeTab, setActiveTab] = useState(navTabs[0].label);

    const handleTabClick = (label) => {
        setActiveTab(label);
        setOpen(false);
    };

    useEffect(() => {
        AOS.init({
            duration: 900,
            easing: "ease-in-out",
            once: true,
        });
    }, []);

    return (
        <main className="min-h-screen bg-white">
            {/* Navigation */}
            <nav
                className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50"
                data-aos="fade-down"
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex items-center space-x-2">
                            <FileText className="h-8 w-8 text-teal-600" />
                            <span className="text-xl font-bold text-gray-900">
                                ResumeBuilder
                            </span>
                        </div>

                        {/* Desktop Tabs */}
                        <div className="hidden md:flex items-center space-x-8">
                            {navTabs.map((tab) => (
                                <button
                                    key={tab.label}
                                    onClick={() => handleTabClick(tab.label)}
                                    className={`transition-colors px-1 pb-1 border-b-2 ${activeTab === tab.label
                                        ? "text-teal-600 border-teal-600 font-semibold"
                                        : "text-gray-600 border-transparent hover:text-teal-600"
                                        }`}
                                    style={{ background: "none", outline: "none" }}
                                >
                                    <a href={tab.href}>{tab.label}</a>
                                </button>
                            ))}
                        </div>

                        {/* Desktop Auth Buttons */}
                        <div className="hidden md:flex items-center space-x-4">
                            <button className="flex items-center px-4 py-2 bg-transparent text-gray-600 hover:text-teal-600 rounded transition-colors">
                                <Github className="h-4 w-4 mr-2" />
                                Sign In
                            </button>
                            <button className="flex items-center px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded transition-colors">
                                <Github className="h-4 w-4 mr-2" />
                                Sign Up
                            </button>
                        </div>

                        {/* Hamburger Button */}
                        <button
                            className="md:hidden flex items-center text-gray-600 hover:text-teal-600 p-2 rounded"
                            onClick={() => setOpen((prev) => !prev)}
                            aria-label="Open main menu"
                        >
                            <Menu className="h-7 w-7" />
                        </button>
                    </div>

                    {/* Mobile Nav with framer-motion and tabs */}
                    <AnimatePresence>
                        {open && (
                            <motion.div
                                key="mobile-menu"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="md:hidden overflow-hidden"
                            >
                                <div className="pt-2 pb-4 space-y-1 flex flex-col">
                                    {navTabs.map((tab) => (
                                        <button
                                            key={tab.label}
                                            onClick={() => handleTabClick(tab.label)}
                                            className={`block px-3 py-2 text-left transition-colors rounded ${activeTab === tab.label
                                                ? "text-teal-600 bg-teal-50 font-semibold"
                                                : "text-gray-700 hover:text-teal-600"
                                                }`}
                                        >
                                            <a href={tab.href}>{tab.label}</a>
                                        </button>
                                    ))}
                                    <button
                                        className="flex items-center px-3 py-2 mt-2 bg-transparent text-gray-700 hover:text-teal-600 rounded transition-colors"
                                        onClick={() => setOpen(false)}
                                    >
                                        <Github className="h-4 w-4 mr-2" />
                                        Sign In
                                    </button>
                                    <button
                                        className="flex items-center px-3 py-2 mt-1 bg-teal-600 hover:bg-teal-700 text-white rounded transition-colors"
                                        onClick={() => setOpen(false)}
                                    >
                                        <Github className="h-4 w-4 mr-2" />
                                        Sign Up
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </nav>

            {/* Hero Section */}
            <section
                className="relative bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50 py-20 lg:py-32"
                data-aos="fade-up"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-teal-600/10 to-emerald-600/10"></div>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="text-center max-w-4xl mx-auto">
                        <span className="inline-flex items-center mb-6 px-3 py-1 rounded bg-teal-100 text-teal-800 text-sm font-medium hover:bg-teal-200 transition-colors">
                            <Sparkles className="h-3 w-3 mr-1" />
                            AI-Powered Resume Builder
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                            Build Your Perfect Resume with{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">
                                AI Precision
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                            Create industry-specific resumes at unbeatable prices. Our
                            AI-powered platform offers professional templates for graduates,
                            undergraduates, and seasoned professionals.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="flex items-center justify-center px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded text-lg transition-colors">
                                <Github className="h-5 w-5 mr-2" />
                                Get Started with GitHub
                            </button>
                            <button onClick={() => navigate('/resumeusinggithub')} className="cursor-pointer flex items-center justify-center px-8 py-3 border border-teal-600 text-teal-600 hover:bg-teal-50 bg-transparent rounded text-lg transition-colors">
                                View Templates
                            </button>
                        </div>
                        <div className="mt-12 flex items-center justify-center space-x-8 text-sm text-gray-500">
                            <div className="flex items-center">
                                <CheckCircle className="h-4 w-4 text-teal-600 mr-2" />
                                No Credit Card Required
                            </div>
                            <div className="flex items-center">
                                <CheckCircle className="h-4 w-4 text-teal-600 mr-2" />
                                Free Templates Available
                            </div>
                            <div className="flex items-center">
                                <CheckCircle className="h-4 w-4 text-teal-600 mr-2" />
                                AI-Powered Optimization
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section
                id="features"
                className="py-20 bg-white"
                data-aos="fade-up"
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Why Choose ResumeBuilder?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Everything you need to create a standout resume that gets you
                            hired
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Feature Card 1 */}
                        <div
                            className="rounded-lg border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-teal-500 to-teal-600 text-white p-6"
                            data-aos="zoom-in"
                            data-aos-delay="100"
                        >
                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                                    <span className="text-2xl font-bold">$</span>
                                </div>
                                <span className="text-lg font-semibold mb-2">
                                    Affordable Pricing
                                </span>
                                <p className="text-teal-100 text-center">
                                    Professional resumes at unbeatable rates. Quality doesn't have
                                    to be expensive.
                                </p>
                            </div>
                        </div>
                        {/* Feature Card 2 */}
                        <div
                            className="rounded-lg border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-emerald-500 to-emerald-600 text-white p-6"
                            data-aos="zoom-in"
                            data-aos-delay="200"
                        >
                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                                    <Sparkles className="h-6 w-6" />
                                </div>
                                <span className="text-lg font-semibold mb-2">AI-Powered</span>
                                <p className="text-emerald-100 text-center">
                                    Smart AI curates your resume content for maximum impact and
                                    ATS optimization.
                                </p>
                            </div>
                        </div>
                        {/* Feature Card 3 */}
                        <div
                            className="rounded-lg border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-cyan-500 to-cyan-600 text-white p-6"
                            data-aos="zoom-in"
                            data-aos-delay="300"
                        >
                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                                    <Target className="h-6 w-6" />
                                </div>
                                <span className="text-lg font-semibold mb-2">
                                    Industry Focused
                                </span>
                                <p className="text-cyan-100 text-center">
                                    Specialized templates designed for different industries and
                                    career levels.
                                </p>
                            </div>
                        </div>
                        {/* Feature Card 4 */}
                        <div
                            className="rounded-lg border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-teal-500 to-cyan-500 text-white p-6"
                            data-aos="zoom-in"
                            data-aos-delay="400"
                        >
                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                                    <Zap className="h-6 w-6" />
                                </div>
                                <span className="text-lg font-semibold mb-2">
                                    Lightning Fast
                                </span>
                                <p className="text-teal-100 text-center">
                                    Create and customize your resume in minutes, not hours. Quick
                                    and efficient.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Templates Section */}
            <section
                id="templates"
                className="py-20 bg-gray-50"
                data-aos="fade-up"
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Templates for Every Career Stage
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Choose from our curated collection of industry-specific templates
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Student/Graduate Card */}
                        <div
                            className="rounded-lg bg-white hover:shadow-lg transition-shadow p-6"
                            data-aos="fade-up"
                            data-aos-delay="100"
                        >
                            <div className="text-center">
                                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                                    <GraduationCap className="h-8 w-8 text-blue-600" />
                                </div>
                                <span className="text-xl font-semibold">
                                    For Students & Graduates
                                </span>
                                <div className="text-gray-500 mb-4">
                                    Perfect for entry-level positions and internships
                                </div>
                                <ul className="space-y-2 text-sm text-gray-600 text-left mb-6">
                                    <li className="flex items-center">
                                        <CheckCircle className="h-4 w-4 text-teal-600 mr-2" />
                                        Clean, modern designs
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="h-4 w-4 text-teal-600 mr-2" />
                                        Emphasis on education & projects
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="h-4 w-4 text-teal-600 mr-2" />
                                        ATS-friendly formatting
                                    </li>
                                </ul>
                                <button className="w-full mt-2 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors">
                                    View Student Templates
                                </button>
                            </div>
                        </div>
                        {/* Professional Card */}
                        <div
                            className="rounded-lg bg-white border-2 border-teal-200 hover:shadow-lg transition-shadow p-6"
                            data-aos="fade-up"
                            data-aos-delay="200"
                        >
                            <div className="text-center">
                                <div className="mx-auto w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                                    <Users className="h-8 w-8 text-teal-600" />
                                </div>
                                <span className="text-xl font-semibold">For Professionals</span>
                                <div className="text-gray-500 mb-4">
                                    Showcase your experience and achievements
                                </div>
                                <ul className="space-y-2 text-sm text-gray-600 text-left mb-6">
                                    <li className="flex items-center">
                                        <CheckCircle className="h-4 w-4 text-teal-600 mr-2" />
                                        Executive-level designs
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="h-4 w-4 text-teal-600 mr-2" />
                                        Focus on achievements
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="h-4 w-4 text-teal-600 mr-2" />
                                        Industry-specific layouts
                                    </li>
                                </ul>
                                <button className="w-full mt-2 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded transition-colors">
                                    View Professional Templates
                                </button>
                            </div>
                        </div>
                        {/* Career Changer Card */}
                        <div
                            className="rounded-lg bg-white hover:shadow-lg transition-shadow p-6"
                            data-aos="fade-up"
                            data-aos-delay="300"
                        >
                            <div className="text-center">
                                <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                                    <Briefcase className="h-8 w-8 text-purple-600" />
                                </div>
                                <span className="text-xl font-semibold">
                                    For Career Changers
                                </span>
                                <div className="text-gray-500 mb-4">
                                    Highlight transferable skills and potential
                                </div>
                                <ul className="space-y-2 text-sm text-gray-600 text-left mb-6">
                                    <li className="flex items-center">
                                        <CheckCircle className="h-4 w-4 text-teal-600 mr-2" />
                                        Skills-focused layouts
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="h-4 w-4 text-teal-600 mr-2" />
                                        Flexible formatting
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="h-4 w-4 text-teal-600 mr-2" />
                                        Story-driven approach
                                    </li>
                                </ul>
                                <button className="w-full mt-2 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded transition-colors">
                                    View Career Change Templates
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-20 bg-white" data-aos="fade-up">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Simple, Transparent Pricing
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Professional resumes at prices that won't break the bank
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {plans.map((plan, idx) => {
                            const isSelected = selected === idx;
                            return (
                                <div
                                    key={plan.name}
                                    className={`relative flex flex-col h-full rounded-lg bg-white transition-shadow p-6 border border-gray-200 hover:shadow-xl cursor-pointer ${isSelected
                                        ? "scale-105 ring-4 ring-teal-300 z-10"
                                        : "hover:scale-105"
                                        }`}
                                    onClick={() => setSelected(idx)}
                                    tabIndex={0}
                                    role="button"
                                    aria-pressed={isSelected}
                                    data-aos="zoom-in"
                                    data-aos-delay={100 * (idx + 1)}
                                >
                                    {plan.badge && (
                                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                            <span className="inline-block bg-teal-600 text-white px-3 py-1 rounded text-sm font-medium">
                                                {plan.badge}
                                            </span>
                                        </div>
                                    )}
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div className="text-center">
                                            <span className="text-2xl font-bold">{plan.name}</span>
                                            <div className="mt-4 flex items-baseline justify-center">
                                                <span className="text-4xl font-bold">
                                                    ₹{plan.price}
                                                </span>
                                                <span className="text-gray-600 ml-1">/pack</span>
                                            </div>
                                            <div className="mt-2 text-gray-500">
                                                {plan.description}
                                            </div>
                                            <ul className="space-y-3 text-left mt-6 text-gray-700">
                                                {plan.features.map((feature) => (
                                                    <li key={feature} className="flex items-center">
                                                        <CheckCircle className="h-5 w-5 text-teal-600 mr-3" />
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <button
                                            className={`w-full mt-8 py-2 rounded transition-colors font-medium ${isSelected
                                                ? "text-teal-600 bg-white shadow-lg"
                                                : plan.buttonStyle
                                                }`}
                                        >
                                            {plan.button}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section
                className="py-20 bg-gradient-to-r from-teal-600 to-emerald-600"
                data-aos="fade-up"
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Ready to Build Your Perfect Resume?
                    </h2>
                    <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
                        Join thousands of professionals who have landed their dream jobs with
                        our AI-powered resume builder.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="flex items-center justify-center px-8 py-3 bg-white text-teal-600 hover:bg-gray-100 rounded text-lg transition-colors">
                            <Github className="h-5 w-5 mr-2" />
                            Sign Up with GitHub
                        </button>
                        <button className="flex items-center justify-center px-8 py-3 border border-white text-white hover:bg-white/10 bg-transparent rounded text-lg transition-colors">
                            View Sample Resumes
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12" data-aos="fade-up">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <FileText className="h-8 w-8 text-teal-400" />
                                <span className="text-xl font-bold">ResumeBuilder</span>
                            </div>
                            <p className="text-gray-400">
                                Build professional resumes with AI-powered optimization at
                                unbeatable prices.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Product</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li>
                                    <a href="#" className="hover:text-white transition-colors">
                                        Templates
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition-colors">
                                        AI Features
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition-colors">
                                        Pricing
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition-colors">
                                        Examples
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Support</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li>
                                    <a href="#" className="hover:text-white transition-colors">
                                        Help Center
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition-colors">
                                        Contact Us
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition-colors">
                                        FAQ
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition-colors">
                                        Blog
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Company</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li>
                                    <a href="#" className="hover:text-white transition-colors">
                                        About
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition-colors">
                                        Careers
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition-colors">
                                        Privacy
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition-colors">
                                        Terms
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2024 ResumeBuilder. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </main>
    );
}

export default LandingPage;
