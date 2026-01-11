import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Cloud, 
  Brain, 
  Code, 
  Users, 
  Shield, 
  DollarSign,
  Zap,
  Settings,
  CheckCircle,
  ArrowRight,
  Bot,
  Mail,
  Phone,
  MessageSquare,
  Calendar
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Bot,
      title: "AI Digital Assistant",
      subtitle: "Your Always-On Office Helper",
      description: "Designed for small and medium businesses that can't afford to miss opportunities, our Digital Assistant handles routine customer communications so you can focus on what matters most.",
      features: [
        "Always accessible to customers 24/7—including nights, weekends, and holidays",
        "Answers calls and captures leads",
        "Provides immediate website responses via intelligent chatbot (based on your FAQs and guidance)",
        "Reads, prioritizes, and drafts responses to incoming emails (for your review and approval)",
        "Automatically schedules and confirms appointments",
        "Makes outbound calls for appointment confirmations and follow-ups",
        "Transcribes voice conversations into searchable notes"
      ],
      benefits: "The Digital Office Assistant will pay for itself several times over and will enable your team to focus on higher-priority tasks. Strong data security built in with human oversight for every key decision.",
      color: "bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200",
      iconColor: "text-purple-600"
    },
    {
      icon: Cloud,
      title: "Cloud Consulting",
      subtitle: "Secure, Scalable, Cost-Effective",
      description: "We help you set up secure cloud systems that grow with your business and cut costs without locking you into one provider.",
      features: [
        "Lower infrastructure expenses (often 30-50%)",
        "Better availability and uptime",
        "Stronger data security built-in",
        "Vendor-neutral recommendations",
        "Cloud is the preferred solution for most companies"
      ],
      benefits: "Reduce infrastructure costs by 30-50% while improving security and scalability—these advantages come built-in with cloud.",
      color: "bg-blue-50 border-blue-200",
      iconColor: "text-blue-600"
    },
    {
      icon: Brain,
      title: "AI Advisory",
      subtitle: "Responsible AI Implementation",
      description: "We guide you on using AI tools responsibly to automate simple tasks and make better decisions.",
      features: [
        "Analyze and prioritize jobs by profit per hour",
        "Focus automatically on quick, high-paying work first",
        "Simple 'best bang for your time' ranking method",
        "Assess your current setup",
        "Build custom workflows or analytics",
        "Set clear guidelines for safe use"
      ],
      benefits: "Free up time for your team and maximize profits without added risks or complexity.",
      color: "bg-purple-50 border-purple-200",
      iconColor: "text-purple-600"
    },
    {
      icon: Code,
      title: "Website & Automation",
      subtitle: "Simple, Effective, Automated",
      description: "We build clean, easy-to-use websites and connect them to simple automations that handle everyday processes like forms, updates, or CRM entries.",
      features: [
        "Modern, responsive web design",
        "Professional online presence",
        "Automated form handling",
        "CRM integration and updates",
        "Hours saved each week on routine work"
      ],
      benefits: "Get a professional online presence plus hours saved each week on routine work.",
      color: "bg-green-50 border-green-200",
      iconColor: "text-green-600"
    },
    {
      icon: Users,
      title: "Fractional CTO",
      subtitle: "Strategic Technology Leadership",
      description: "Get part-time tech leadership to align your tools with business goals. We develop roadmaps, evaluate vendors, and mentor your team for steady growth.",
      features: [
        "Technology roadmap development",
        "Vendor evaluation and management",
        "Team development and mentoring",
        "Align tools with business goals",
        "Strategic direction for steady growth"
      ],
      benefits: "Clear direction without the cost of a full-time executive.",
      color: "bg-orange-50 border-orange-200",
      iconColor: "text-orange-600"
    }
  ];

  const process = [
    {
      step: "01",
      title: "Discovery",
      description: "Understand the business, current tools, and goals."
    },
    {
      step: "02",
      title: "Strategy",
      description: "Design a pragmatic plan for cloud, AI, and automation use."
    },
    {
      step: "03",
      title: "Implementation",
      description: "Configure, integrate, and launch AI-powered workflows and assistants."
    },
    {
      step: "04",
      title: "Optimization",
      description: "Monitor, improve, and expand automations based on real usage and metrics."
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Technology Solutions That Save Time and Work Smarter
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            From cloud strategy to AI implementation, get enterprise-level expertise 
            tailored for small and medium business needs and budgets.
          </p>
          <Button asChild size="lg">
            <Link to="/contact">Schedule a Consultation</Link>
          </Button>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {services.map((service, index) => (
              <Card key={index} className={`border-2 ${service.color} overflow-hidden`}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <CardHeader className="space-y-6 lg:space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-sm">
                        <service.icon className={`h-8 w-8 ${service.iconColor}`} />
                      </div>
                      <div>
                        <CardTitle className="text-2xl md:text-3xl">{service.title}</CardTitle>
                        <Badge variant="secondary" className="mt-2">{service.subtitle}</Badge>
                      </div>
                    </div>
                    <CardDescription className="text-lg text-muted-foreground">
                      {service.description}
                    </CardDescription>
                    <div className="bg-white/50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-foreground">
                        <CheckCircle className="inline h-4 w-4 text-green-600 mr-2" />
                        {service.benefits}
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6 lg:pt-12">
                    <h4 className="font-semibold text-foreground mb-4">What's Included:</h4>
                    <ul className="space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Proven Process
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A structured approach that ensures successful outcomes and measurable results for your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
                {index < process.length - 1 && (
                  <ArrowRight className="h-6 w-6 text-muted-foreground mx-auto mt-6 hidden lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Philosophy */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <DollarSign className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Transparent, Value-Based Pricing
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              No surprises, no hidden fees. Every engagement starts with a clear scope, 
              timeline, and fixed pricing structure that fits your budget.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <Card className="border border-border">
                <CardHeader>
                  <Settings className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Project-Based</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Fixed-scope projects with clear deliverables and timelines. 
                    Perfect for specific initiatives like cloud migrations or website development.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="border border-border">
                <CardHeader>
                  <Zap className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Retainer Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Ongoing advisory and support services with predictable monthly costs. 
                    Ideal for fractional CTO services and continuous optimization.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="border border-border">
                <CardHeader>
                  <Users className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Consultation</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Strategic planning sessions and technology assessments. 
                    Great starting point for understanding your options and priorities.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
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
              <Link to="/contact">Schedule a Free Consultation</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Link to="/contact">Send Us a Message</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;