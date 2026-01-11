import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Cloud, Brain, Code, Users, ChevronRight, Shield, Zap, Target, Bot, Mail, Phone, MessageSquare, Mic, CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

const Home = () => {
  const services = [
    {
      icon: Cloud,
      title: "Cloud Consulting",
      description: "Cloud security, architecture, migration planning, and cost optimization with vendor-neutral strategies.",
      color: "text-blue-600"
    },
    {
      icon: Brain,
      title: "AI Advisory",
      description: "Help small and medium businesses understand and responsibly adopt GenAI tools, AI agents, and automation workflows.",
      color: "text-purple-600"
    },
    {
      icon: Code,
      title: "Website & Automation",
      description: "Simple, clean web design paired with automation of business processes using low-code tools.",
      color: "text-green-600"
    },
    {
      icon: Users,
      title: "Fractional CTO",
      description: "Technology leadership, digital transformation guidance, and scalable strategy for growing companies.",
      color: "text-orange-600"
    }
  ];

  const values = [
    {
      icon: Shield,
      title: "Trust",
      description: "Built on 30 years of enterprise IT experience"
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Cutting-edge AI and cloud solutions"
    },
    {
      icon: Target,
      title: "Results",
      description: "Focused on your business growth and success"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroImage})` }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Empowering Small & Medium Businesses with{" "}
            <span className="text-blue-400">Cloud, AI, and Smart Technology</span> Solutions
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-200">
            No jargon, just scalable solutions that grow with your business. 
            30 years of enterprise experience, now focused on helping small and medium businesses thrive.
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
                Featured Service
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                AI Digital Assistant
              </h2>
              <p className="text-xl text-muted-foreground mb-6">
                Never miss another customer. Your AI-powered virtual assistant handles emails, 
                calls, and messages while you focus on running your business.
              </p>
              <p className="text-muted-foreground mb-8">
                Designed for small businesses who can't afford to miss opportunities. Our Digital Assistant 
                reads and responds to emails, takes notes from voice conversations, acts as a virtual receptionist, 
                answers customer questions, and even makes outbound calls—all while keeping a human in the loop.
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
                  <span className="text-foreground">Virtual Receptionist</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="text-foreground">Website Chatbot</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center">
                    <Mic className="h-5 w-5 text-orange-600" />
                  </div>
                  <span className="text-foreground">Voice Transcription</span>
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
                  <h3 className="text-xl font-semibold text-foreground">Your Digital Office Assistant</h3>
                  <p className="text-muted-foreground">Always on. Always professional.</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground">Reads, prioritizes, and drafts responses to incoming emails</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground">Answers calls and captures leads 24/7—nights, weekends, holidays</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground">Provides instant answers on your website via intelligent chatbot</p>
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

              <div className="mt-8 p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground italic">
                  "If this system helps capture just one additional job per month, it more than pays for itself."
                </p>
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
              Mission Ready Technology Solutions
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

      {/* Values Section */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose MRTek.ai?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built on a foundation of enterprise experience with a focus on small business success.
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
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Let's discuss how cloud, AI, and smart automation can help your business grow more efficiently and securely.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/contact">Schedule a Consultation</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;