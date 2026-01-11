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
  Mic
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Bot,
      title: "AI Digital Assistant",
      subtitle: "Your 24/7 Virtual Office Team",
      description: "Never miss another customer. Your AI-powered digital assistant handles emails, calls, and messages while you focus on running your business.",
      features: [
        "Email reading, prioritization, and draft responses",
        "Virtual receptionist for inbound calls",
        "Website chatbot for instant customer answers",
        "Voice transcription and meeting notes",
        "Outbound calls for confirmations and follow-ups"
      ],
      benefits: "Capture more leads, respond faster, and provide 24/7 coverage without hiring additional staff",
      color: "bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200",
      iconColor: "text-purple-600"
    },
    {
      icon: Cloud,
      title: "Cloud Consulting",
      subtitle: "Secure, Scalable, Cost-Effective",
      description: "Navigate the complexity of cloud adoption with expert guidance from someone who has architected enterprise-scale solutions.",
      features: [
        "Cloud security assessment and strategy",
        "Multi-cloud architecture design",
        "Migration planning and execution",
        "Cost optimization and vendor management",
        "Vendor-neutral recommendations"
      ],
      benefits: "Reduce infrastructure costs by 30-50% while improving security and scalability",
      color: "bg-blue-50 border-blue-200",
      iconColor: "text-blue-600"
    },
    {
      icon: Brain,
      title: "AI Advisory Services",
      subtitle: "Responsible AI Implementation",
      description: "Understand and implement GenAI tools and automation workflows that actually benefit your business operations.",
      features: [
        "AI readiness assessment",
        "Custom AI agent development",
        "GenAI tool integration and training",
        "Automation workflow design",
        "AI governance and ethics consulting"
      ],
      benefits: "Automate routine tasks and improve decision-making with AI that works for your business",
      color: "bg-purple-50 border-purple-200",
      iconColor: "text-purple-600"
    },
    {
      icon: Code,
      title: "Website & Automation",
      subtitle: "Simple, Effective, Automated",
      description: "Clean, professional websites paired with smart automation that streamlines your business processes.",
      features: [
        "Modern, responsive web design",
        "Low-code automation solutions",
        "Power Automate and Quickbase integration",
        "CRM and workflow optimization",
        "Digital process transformation"
      ],
      benefits: "Professional online presence with automated workflows that save hours each week",
      color: "bg-green-50 border-green-200",
      iconColor: "text-green-600"
    },
    {
      icon: Users,
      title: "Fractional CTO Services",
      subtitle: "Strategic Technology Leadership",
      description: "Access VP-level technology strategy and leadership without the full-time executive cost.",
      features: [
        "Technology roadmap development",
        "Digital transformation strategy",
        "Vendor evaluation and management",
        "Team development and mentoring",
        "Board-level technology reporting"
      ],
      benefits: "Strategic technology direction that aligns with business goals and growth plans",
      color: "bg-orange-50 border-orange-200",
      iconColor: "text-orange-600"
    }
  ];

  const process = [
    {
      step: "01",
      title: "Discovery",
      description: "We start with understanding your business goals, current challenges, and technology landscape."
    },
    {
      step: "02",
      title: "Strategy",
      description: "Develop a clear roadmap with prioritized recommendations and realistic timelines."
    },
    {
      step: "03",
      title: "Implementation",
      description: "Execute the plan with regular check-ins and adjustments based on your feedback."
    },
    {
      step: "04",
      title: "Optimization",
      description: "Continuous improvement and support to ensure long-term success and ROI."
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Technology Solutions That Scale With Your Business
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
                        <li key={featureIndex} className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
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
            Ready to Get Started?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Let's discuss your technology challenges and explore how we can help your business grow more efficiently.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/contact">Schedule a Free Consultation</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Link to="/about">Learn More About Our Approach</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;