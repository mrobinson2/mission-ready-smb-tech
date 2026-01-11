import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Cloud, Brain, Code, Users, ChevronRight, Shield, Zap, Target, Bot, Mail, Phone, MessageSquare, Mic, CheckCircle, Calendar } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

const Home = () => {
  const services = [
    {
      icon: Cloud,
      title: "Cloud Consulting",
      description: "Secure cloud systems that grow with your business and cut costs without vendor lock-in. Expect 30-50% lower infrastructure expenses.",
      color: "text-blue-600"
    },
    {
      icon: Brain,
      title: "AI Advisory",
      description: "Responsible AI guidance to automate simple tasks and make better decisions. Prioritize jobs by profit per hour for maximum efficiency.",
      color: "text-purple-600"
    },
    {
      icon: Code,
      title: "Website & Automation",
      description: "Clean, easy-to-use websites connected to simple automations that handle forms, updates, and CRM entries.",
      color: "text-green-600"
    },
    {
      icon: Users,
      title: "Fractional CTO",
      description: "Part-time tech leadership to align your tools with business goals. Clear direction without full-time executive costs.",
      color: "text-orange-600"
    }
  ];

  const values = [
    {
      icon: Shield,
      title: "Enterprise Experience",
      description: "30 years of real-world IT experience adapted for small business needs"
    },
    {
      icon: Zap,
      title: "Practical AI",
      description: "Responsible AI with human oversight, clear guidelines, and strong data security"
    },
    {
      icon: Target,
      title: "Measurable Results",
      description: "Faster customer responses, fewer missed leads, and smoother daily operations"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${heroImage})` }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Helping Small and Medium Businesses Use Technology to{" "}
            <span className="text-blue-400">Save Time and Work Smarter</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto text-gray-200">
            We help you handle customer communications better, reduce routine manual work, and avoid missed opportunities. 
            With 30 years of hands-on enterprise experience, we deliver straightforward cloud, AI, and automation tools 
            that fit your budget and grow with your business.
          </p>
          <p className="text-lg mb-8 text-gray-300 max-w-2xl mx-auto">
            Call today to find out how your business can save time and money while improving customer service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link to="/contact">Get Started Today</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-white/10 border-white text-white hover:bg-white/20">
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* AI Digital Assistant - Featured Section */}
      <section className="py-24 bg-gradient-to-br from-purple-50 via-background to-blue-50 dark:from-purple-950/20 dark:via-background dark:to-blue-950/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
                Core Offering
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Your Always-On Office Helper
              </h2>
              <p className="text-xl text-muted-foreground mb-6">
                Designed for small and medium businesses that can't afford to miss opportunities, 
                our Digital Assistant handles routine customer communications so you can focus on what matters most.
              </p>
              <p className="text-muted-foreground mb-8">
                We keep your team aware of and fully engaged in all customer communications, with strong data security 
                built in and human oversight for every key decision. The Digital Office Assistant will pay for itself 
                several times over and will enable your team to focus on higher-priority tasks.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-purple-600" />
                  </div>
                  <span className="text-foreground">Email Management</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-foreground">Call Handling</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="text-foreground">Intelligent Chatbot</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-orange-600" />
                  </div>
                  <span className="text-foreground">Appointment Scheduling</span>
                </div>
              </div>

              <Button asChild size="lg">
                <Link to="/services">Learn More About Digital Assistants</Link>
              </Button>
            </div>

            <div className="bg-white dark:bg-card rounded-2xl p-8 shadow-xl border border-border">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                  <Bot className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">AI Digital Assistant</h3>
                  <p className="text-muted-foreground">24/7 availability including nights, weekends, and holidays</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground">Answers calls and captures leads around the clock</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground">Provides immediate website responses via intelligent chatbot (based on your FAQs and guidance)</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground">Reads, prioritizes, and drafts responses to incoming emails (for your review and approval)</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground">Automatically schedules and confirms appointments</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground">Makes outbound calls for appointment confirmations and follow-ups</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground">Transcribes voice conversations into searchable notes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Additional Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From cloud strategy to AI implementation, we provide the expertise 
              your business needs to stay competitive and secure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="border border-border hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-4`}>
                    <service.icon className={`h-6 w-6 ${service.color}`} />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link to="/services">
                View All Services <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose MRTek.ai Section */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose MRTek.ai?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We Bring Enterprise Know-How to Small and Medium Businesses
            </p>
          </div>

          <div className="max-w-4xl mx-auto text-center mb-12">
            <p className="text-lg text-muted-foreground">
              Our 30 years of real-world IT experience means we understand what actually works at scale—and we adapt it 
              so it fits your operations, budget, and team. We approach AI carefully: practical uses only, with human oversight, 
              clear guidelines, and strong data security to keep things safe and reliable. Customers typically see faster customer 
              responses, fewer missed leads, and smoother daily work—real, measurable improvements without overpromising or 
              unnecessary complexity. We're here to help your business run better and grow steadily, one practical step at a time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Ready to See How This Fits Your Business?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-4 max-w-2xl mx-auto">
            Call today to find out how this could save your business time and money while improving customer service. 
            No pressure—just a straightforward conversation.
          </p>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Have questions? Send us a quick note, and we'll reply within 24 hours to discuss what might work best for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/contact">Schedule a Consultation</Link>
            </Button>
            <Button asChild size="lg" className="bg-foreground text-background hover:bg-foreground/90">
              <Link to="/contact">Send Us a Message</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;