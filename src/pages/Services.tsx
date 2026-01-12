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
  BarChart3
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Bot,
      title: "AI Digital Assistant",
      subtitle: "Your Always-On Office Helper",
      description: "Handle customer communications without missing jobs or hiring more office staff.",
      features: [
        "Answer calls, texts, emails, and website inquiries 24/7",
        "Capture leads and schedule or confirm appointments",
        "Draft responses for review and approval",
        "Transcribe calls into searchable notes",
        "Handle follow-ups and confirmations automatically"
      ],
      whyItMatters: "Fewer missed opportunities. Faster responses. Less time stuck behind a desk.",
      color: "bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200",
      iconColor: "text-purple-600"
    },
    {
      icon: Settings,
      title: "Workflow & Business Automation",
      subtitle: "Less Paperwork. Fewer Manual Steps. Smoother Days.",
      description: "Automate the repetitive tasks that slow your team down every day.",
      features: [
        "Job forms flowing directly into your systems",
        "Follow-ups triggered automatically after jobs",
        "CRM updates without double entry",
        "Calendar syncing across teams",
        "Internal notifications when action is needed"
      ],
      whyItMatters: "Hours saved each week. Fewer mistakes. Less rework.",
      color: "bg-blue-50 border-blue-200",
      iconColor: "text-blue-600"
    },
    {
      icon: Code,
      title: "Website & Lead Automation",
      subtitle: "Your Website Should Do More Than Look Good",
      description: "Turn your website into a lead-capturing, workflow-connected tool.",
      features: [
        "Capture and route leads automatically",
        "Track where inquiries come from",
        "Connect forms, chat, and calls into your workflows",
        "Highlight activity by service or location",
        "Feed real data into scheduling and follow-ups"
      ],
      whyItMatters: "You see what's working—and stop guessing.",
      color: "bg-green-50 border-green-200",
      iconColor: "text-green-600"
    },
    {
      icon: Brain,
      title: "AI Advisory & Business Insight",
      subtitle: "Turn Activity Into Clarity",
      description: "Use your data to make smarter decisions without complex dashboards.",
      features: [
        "Which jobs and customers generate the most profit",
        "Which areas or services are growing fastest",
        "Which marketing spend actually produces new work",
        "How to prioritize high-value jobs first"
      ],
      whyItMatters: "Better decisions without complex dashboards or risky tools.",
      color: "bg-purple-50 border-purple-200",
      iconColor: "text-purple-600"
    },
    {
      icon: Cloud,
      title: "Cloud, Security & Fractional CTO Services",
      subtitle: "A Strong Foundation for Growth",
      description: "Build the infrastructure and leadership you need to scale with confidence.",
      features: [
        "Secure, scalable cloud systems",
        "Vendor-neutral recommendations",
        "Cost control and reliability planning",
        "Technology roadmaps",
        "Ongoing fractional CTO leadership"
      ],
      whyItMatters: "You scale with intention, not guesswork.",
      color: "bg-orange-50 border-orange-200",
      iconColor: "text-orange-600"
    }
  ];

  const process = [
    {
      step: "01",
      title: "Discovery",
      description: "Understand your business, tools, and bottlenecks."
    },
    {
      step: "02",
      title: "Strategy",
      description: "Identify the highest-impact improvements first."
    },
    {
      step: "03",
      title: "Implementation",
      description: "Configure and launch with minimal disruption."
    },
    {
      step: "04",
      title: "Optimization",
      description: "Improve and expand based on real usage."
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Technology That Grows With Your Business — In Stages
          </h1>
          <p className="text-xl text-muted-foreground mb-4 max-w-3xl mx-auto">
            Most field service businesses don't need everything at once. 
            They need the right tools at the right time—without creating new complexity.
          </p>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
            MRTek helps you start simple, then layer in automation, insight, and strategy as your business grows.
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
                      <p className="text-sm font-semibold text-foreground mb-1">Why it matters:</p>
                      <p className="text-sm text-muted-foreground">
                        {service.whyItMatters}
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6 lg:pt-12">
                    <h4 className="font-semibold text-foreground mb-4">What this looks like:</h4>
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
              Simple. Practical. Proven.
            </h2>
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
              Clear Scope. Predictable Costs. No Surprises.
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              Every engagement starts with a clear plan and realistic expectations.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border border-border">
                <CardHeader>
                  <Settings className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Project-Based</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Defined improvements with clear deliverables and timelines.
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
                    Ongoing support and leadership with predictable monthly costs.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="border border-border">
                <CardHeader>
                  <Users className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Consultations</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Strategic sessions to help you prioritize next steps.
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
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Let's talk through what's slowing you down today—and what could help tomorrow. 
            No pressure. No jargon. Just a straightforward conversation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/contact">Schedule a Free Consultation</Link>
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

export default Services;
