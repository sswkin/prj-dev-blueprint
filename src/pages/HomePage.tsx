'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  Code2, 
  Lightbulb, 
  FileText, 
  Download, 
  ArrowRight, 
  Check, 
  Star,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Zap,
  Target,
  Mail,
  Github,
  Twitter,
  Linkedin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isYearly, setIsYearly] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  const testimonials = [
    {
      quote: "DevBlueprint AI transformed how I approach new projects. What used to take days of planning now takes minutes.",
      author: "Sarah Chen",
      role: "Solo Developer",
      company: "TechStart"
    },
    {
      quote: "The AI-generated blueprints are incredibly detailed and save our team weeks of initial planning.",
      author: "Marcus Rodriguez",
      role: "CTO",
      company: "InnovateLabs"
    },
    {
      quote: "Finally, a tool that understands the complexity of turning ideas into actionable development plans.",
      author: "Emily Johnson",
      role: "Product Manager",
      company: "StartupXYZ"
    }
  ];

  const features = [
    {
      icon: Lightbulb,
      title: "AI Ideation",
      description: "Transform vague concepts into structured project ideas with intelligent suggestions and refinements."
    },
    {
      icon: Target,
      title: "Smart Planning",
      description: "Generate comprehensive project roadmaps with milestones, dependencies, and resource allocation."
    },
    {
      icon: Code2,
      title: "Code Prompts",
      description: "Get AI-generated prompts and templates for your specific tech stack and project requirements."
    },
    {
      icon: Download,
      title: "Export Blueprint",
      description: "Download detailed blueprints in multiple formats including PDF, Markdown, and JSON."
    }
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: { monthly: 0, yearly: 0 },
      description: "Perfect for getting started",
      features: [
        "1 blueprint per month",
        "Basic AI suggestions",
        "PDF export",
        "Community support"
      ],
      popular: false
    },
    {
      name: "Pro",
      price: { monthly: 29, yearly: 290 },
      description: "For serious developers",
      features: [
        "Unlimited blueprints",
        "Advanced AI planning",
        "All export formats",
        "Priority support",
        "Custom templates",
        "Team collaboration"
      ],
      popular: true
    },
    {
      name: "Team",
      price: { monthly: 99, yearly: 990 },
      description: "For growing teams",
      features: [
        "Everything in Pro",
        "Team management",
        "Advanced analytics",
        "Custom integrations",
        "Dedicated support",
        "SSO authentication"
      ],
      popular: false
    }
  ];

  const faqItems = [
    {
      question: "How does DevBlueprint AI work?",
      answer: "Our AI analyzes your project idea and generates a comprehensive blueprint including architecture diagrams, development roadmap, technology recommendations, and detailed implementation steps."
    },
    {
      question: "What programming languages and frameworks are supported?",
      answer: "We support all major programming languages and frameworks including React, Vue, Angular, Node.js, Python, Java, .NET, and many more. Our AI adapts to your specific tech stack preferences."
    },
    {
      question: "Can I collaborate with my team on blueprints?",
      answer: "Yes! Pro and Team plans include collaboration features where you can share blueprints, leave comments, and work together in real-time on project planning."
    },
    {
      question: "What formats can I export blueprints in?",
      answer: "You can export blueprints as PDF documents, Markdown files, JSON data, or interactive HTML reports. Pro users get access to all formats."
    },
    {
      question: "Is there a free trial available?",
      answer: "Yes! You can start with our free plan that includes 1 blueprint generation per month. No credit card required to get started."
    },
    {
      question: "How accurate are the AI-generated blueprints?",
      answer: "Our AI is trained on thousands of successful projects and best practices. While blueprints provide an excellent starting point, we recommend reviewing and customizing them based on your specific requirements."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <>
      <Helmet>
        <title>DevBlueprint AI - Go from idea to code blueprint in minutes</title>
        <meta name="description" content="AI-powered workflow for solo developers, startups & early adopters. Transform your ideas into detailed code blueprints with our intelligent platform." />
        <meta name="keywords" content="AI, code blueprint, development, startup, solo developer, planning, ideation" />
        
        <meta property="og:title" content="DevBlueprint AI - Go from idea to code blueprint in minutes" />
        <meta property="og:description" content="AI-powered workflow for solo developers, startups & early adopters" />
        <meta property="og:type" content="website" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="DevBlueprint AI - Go from idea to code blueprint in minutes" />
        <meta name="twitter:description" content="AI-powered workflow for solo developers, startups & early adopters" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Navigation */}
        <motion.nav 
          className="fixed top-0 w-full bg-background/80 backdrop-blur-lg border-b z-50"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-2">
                <Code2 className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold">DevBlueprint AI</span>
              </div>
              
              <div className="hidden md:flex items-center space-x-8">
                <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
                <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
                <a href="#demo" className="text-muted-foreground hover:text-foreground transition-colors">Demo</a>
                <Link to="/login" className="text-muted-foreground hover:text-foreground transition-colors">Login</Link>
                <Button asChild>
                  <Link to="/signup">Get Started</Link>
                </Button>
              </div>

              <button 
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className="md:hidden bg-background border-t"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="px-4 py-4 space-y-4">
                  <a href="#features" className="block text-muted-foreground hover:text-foreground">Features</a>
                  <a href="#pricing" className="block text-muted-foreground hover:text-foreground">Pricing</a>
                  <a href="#demo" className="block text-muted-foreground hover:text-foreground">Demo</a>
                  <Link to="/login" className="block text-muted-foreground hover:text-foreground">Login</Link>
                  <Button asChild className="w-full">
                    <Link to="/signup">Get Started</Link>
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  Go from idea to code blueprint in minutes
                </h1>
                <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                  AI-powered workflow for solo devs, startups & early adopters
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="text-lg px-8 py-6">
                    <Link to="/signup">
                      Try it free
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                    See a demo
                  </Button>
                </div>
              </motion.div>

              <motion.div
                className="mt-16 relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={{ y }}
              >
                <div className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-2xl p-8 backdrop-blur-sm border">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                    <div className="text-center">
                      <Lightbulb className="h-16 w-16 mx-auto mb-4 text-yellow-500" />
                      <h3 className="text-lg font-semibold">Idea</h3>
                      <p className="text-sm text-muted-foreground">Your concept</p>
                    </div>
                    <div className="flex justify-center">
                      <ArrowRight className="h-8 w-8 text-primary animate-pulse" />
                    </div>
                    <div className="text-center">
                      <FileText className="h-16 w-16 mx-auto mb-4 text-green-500" />
                      <h3 className="text-lg font-semibold">Blueprint</h3>
                      <p className="text-sm text-muted-foreground">Ready to code</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Problem/Solution Panel - Optimized for Desktop */}
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-muted/50">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 xl:gap-20 items-start lg:items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:pr-8 xl:pr-12"
              >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 lg:mb-10 text-red-600 leading-tight">
                  The Problem
                </h2>
                <div className="space-y-6 lg:space-y-8">
                  <div className="flex items-start space-x-4 lg:space-x-6">
                    <div className="w-2 h-2 lg:w-3 lg:h-3 bg-red-500 rounded-full mt-3 lg:mt-4 flex-shrink-0"></div>
                    <div className="flex-1">
                      <h3 className="text-xl lg:text-2xl font-semibold mb-2 lg:mb-3 text-foreground">
                        Weeks of Planning
                      </h3>
                      <p className="text-muted-foreground text-base lg:text-lg leading-relaxed">
                        Turning ideas into actionable development plans takes forever, delaying project starts and momentum
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 lg:space-x-6">
                    <div className="w-2 h-2 lg:w-3 lg:h-3 bg-red-500 rounded-full mt-3 lg:mt-4 flex-shrink-0"></div>
                    <div className="flex-1">
                      <h3 className="text-xl lg:text-2xl font-semibold mb-2 lg:mb-3 text-foreground">
                        Missed Requirements
                      </h3>
                      <p className="text-muted-foreground text-base lg:text-lg leading-relaxed">
                        Important details get overlooked in the rush to start coding, leading to costly revisions later
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 lg:space-x-6">
                    <div className="w-2 h-2 lg:w-3 lg:h-3 bg-red-500 rounded-full mt-3 lg:mt-4 flex-shrink-0"></div>
                    <div className="flex-1">
                      <h3 className="text-xl lg:text-2xl font-semibold mb-2 lg:mb-3 text-foreground">
                        Analysis Paralysis
                      </h3>
                      <p className="text-muted-foreground text-base lg:text-lg leading-relaxed">
                        Too many technology choices lead to decision fatigue and endless research without progress
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:pl-8 xl:pl-12"
              >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 lg:mb-10 text-green-600 leading-tight">
                  The Solution
                </h2>
                <div className="space-y-6 lg:space-y-8">
                  <div className="flex items-start space-x-4 lg:space-x-6">
                    <Check className="w-6 h-6 lg:w-7 lg:h-7 text-green-500 mt-2 lg:mt-3 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-xl lg:text-2xl font-semibold mb-2 lg:mb-3 text-foreground">
                        Minutes, Not Weeks
                      </h3>
                      <p className="text-muted-foreground text-base lg:text-lg leading-relaxed">
                        AI generates comprehensive blueprints in under 5 minutes, accelerating your development timeline
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 lg:space-x-6">
                    <Check className="w-6 h-6 lg:w-7 lg:h-7 text-green-500 mt-2 lg:mt-3 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-xl lg:text-2xl font-semibold mb-2 lg:mb-3 text-foreground">
                        Nothing Overlooked
                      </h3>
                      <p className="text-muted-foreground text-base lg:text-lg leading-relaxed">
                        Comprehensive analysis ensures all requirements are captured and documented systematically
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 lg:space-x-6">
                    <Check className="w-6 h-6 lg:w-7 lg:h-7 text-green-500 mt-2 lg:mt-3 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-xl lg:text-2xl font-semibold mb-2 lg:mb-3 text-foreground">
                        Smart Recommendations
                      </h3>
                      <p className="text-muted-foreground text-base lg:text-lg leading-relaxed">
                        AI suggests optimal tech stack based on your project needs, eliminating decision paralysis
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Powerful Features</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Everything you need to transform ideas into actionable development plans
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                    <CardHeader>
                      <motion.div 
                        className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4"
                        whileHover={{ rotate: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <feature.icon className="h-6 w-6 text-primary" />
                      </motion.div>
                      <CardTitle>{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Trusted by Developers</h2>
              <p className="text-xl text-muted-foreground">Join thousands of developers who've transformed their workflow</p>
            </motion.div>

            {/* Testimonial Carousel */}
            <div className="relative mb-16">
              <Card className="max-w-4xl mx-auto">
                <CardContent className="p-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentTestimonial}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                      className="text-center"
                    >
                      <div className="flex justify-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <blockquote className="text-xl mb-6 italic">
                        "{testimonials[currentTestimonial].quote}"
                      </blockquote>
                      <div>
                        <cite className="font-semibold">{testimonials[currentTestimonial].author}</cite>
                        <p className="text-muted-foreground">
                          {testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].company}
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </CardContent>
              </Card>

              <button
                onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background border shadow-md hover:shadow-lg transition-shadow"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background border shadow-md hover:shadow-lg transition-shadow"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Company Logos */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
              {['TechStart', 'InnovateLabs', 'StartupXYZ', 'DevCorp'].map((company, index) => (
                <motion.div
                  key={index}
                  className="text-center text-2xl font-bold text-muted-foreground"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.6 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {company}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Product Demo */}
        <section id="demo" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">See It In Action</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Watch how DevBlueprint AI transforms your idea into a comprehensive development plan
              </p>
            </motion.div>

            <div className="space-y-16">
              {[
                { step: 1, title: "Describe Your Idea", description: "Simply describe your project idea in natural language" },
                { step: 2, title: "AI Analysis", description: "Our AI analyzes your requirements and suggests improvements" },
                { step: 3, title: "Architecture Design", description: "Generate system architecture and database schemas" },
                { step: 4, title: "Development Roadmap", description: "Get a detailed timeline with milestones and tasks" },
                { step: 5, title: "Export Blueprint", description: "Download your complete blueprint in your preferred format" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <Badge className="mb-4">Step {item.step}</Badge>
                    <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                    <p className="text-lg text-muted-foreground mb-6">{item.description}</p>
                    <div className="w-full h-64 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-lg flex items-center justify-center border">
                      <p className="text-muted-foreground">Demo Screenshot {item.step}</p>
                    </div>
                  </div>
                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <div className="w-full h-64 bg-gradient-to-br from-blue-500/20 to-green-500/20 rounded-lg flex items-center justify-center border">
                      <p className="text-muted-foreground">Demo Visual {item.step}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Table */}
        <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
              <p className="text-xl text-muted-foreground mb-8">Choose the plan that fits your needs</p>
              
              <div className="flex items-center justify-center space-x-4">
                <span className={!isYearly ? "font-semibold" : "text-muted-foreground"}>Monthly</span>
                <Switch checked={isYearly} onCheckedChange={setIsYearly} />
                <span className={isYearly ? "font-semibold" : "text-muted-foreground"}>
                  Yearly <Badge variant="secondary" className="ml-2">Save 20%</Badge>
                </span>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className={`relative h-full ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
                    {plan.popular && (
                      <Badge className="absolute -top-2 left-1/2 -translate-x-1/2">Most Popular</Badge>
                    )}
                    <CardHeader>
                      <CardTitle className="text-2xl">{plan.name}</CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                      <div className="mt-4">
                        <span className="text-4xl font-bold">
                          ${isYearly ? plan.price.yearly : plan.price.monthly}
                        </span>
                        <span className="text-muted-foreground">
                          {plan.price.monthly === 0 ? '' : isYearly ? '/year' : '/month'}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="space-y-2">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center space-x-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button asChild className="w-full" variant={plan.popular ? "default" : "outline"}>
                        <Link to="/signup">
                          {plan.name === "Free" ? "Get Started" : "Start Free Trial"}
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-muted-foreground">Everything you need to know about DevBlueprint AI</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Accordion type="single" collapsible>
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50 border-t">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Code2 className="h-8 w-8 text-primary" />
                  <span className="text-xl font-bold">DevBlueprint AI</span>
                </div>
                <p className="text-muted-foreground mb-4">
                  Transform your ideas into actionable development plans with the power of AI.
                </p>
                <div className="flex space-x-4">
                  <Github className="h-5 w-5 text-muted-foreground hover:text-foreground cursor-pointer" />
                  <Twitter className="h-5 w-5 text-muted-foreground hover:text-foreground cursor-pointer" />
                  <Linkedin className="h-5 w-5 text-muted-foreground hover:text-foreground cursor-pointer" />
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Product</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li><a href="#" className="hover:text-foreground">Features</a></li>
                  <li><a href="#" className="hover:text-foreground">Pricing</a></li>
                  <li><a href="#" className="hover:text-foreground">Demo</a></li>
                  <li><a href="#" className="hover:text-foreground">API</a></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Company</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li><a href="#" className="hover:text-foreground">About</a></li>
                  <li><a href="#" className="hover:text-foreground">Blog</a></li>
                  <li><a href="#" className="hover:text-foreground">Careers</a></li>
                  <li><a href="#" className="hover:text-foreground">Contact</a></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Stay Updated</h3>
                <p className="text-muted-foreground mb-4">
                  Get the latest updates and tips for better development planning.
                </p>
                <div className="flex space-x-2">
                  <Input placeholder="Enter your email" className="flex-1" />
                  <Button>
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-muted-foreground">
                © 2025 DevBlueprint AI. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</a>
                <a href="#" className="text-muted-foreground hover:text-foreground">Terms of Service</a>
                <a href="#" className="text-muted-foreground hover:text-foreground">Cookie Policy</a>
              </div>
            </div>

            {/* Personal Footer Note */}
            <div className="border-t mt-8 pt-6 text-center">
              <p className="text-sm text-muted-foreground">
                From the mind of{' '}
                <a 
                  href="https://github.com/atssj" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  atssj
                </a>
                , with ❤️ ✨ — crafted using{' '}
                <a 
                  href="https://bolt.new" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  <Zap className="h-3 w-3" />
                  Bolt.new
                </a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}