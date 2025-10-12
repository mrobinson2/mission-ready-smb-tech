import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  GraduationCap, 
  Building2, 
  Cloud, 
  Shield, 
  Cog, 
  Brain,
  Users,
  Target,
  Heart,
  Lightbulb
} from "lucide-react";
import profilePhoto from "@/assets/mrobinson-profile-photo.jpg";

const About = () => {
  const experience = [
    {
      role: "VP of Cloud Strategy and Enablement",
      company: "Fortune 500 Financial Services",
      period: "Current",
      description: "Leading cloud transformation initiatives and strategic technology enablement across enterprise environments."
    },
    {
      role: "Senior Cloud Infrastructure Specialist",
      company: "Enterprise IT Operations",
      period: "2020-Present",
      description: "Deep expertise in Azure, AWS, infrastructure as code (Terraform), and IT operations at scale."
    },
    {
      role: "Technology Leadership",
      company: "Various Organizations",
      period: "1995-Present",
      description: "Nearly 30 years of progressive IT experience, from hands-on technical roles to strategic leadership positions."
    }
  ];

  const certifications = [
    {
      title: "Post-Graduate AI for Leaders",
      institution: "University of Texas at Austin",
      status: "Completed"
    },
    {
      title: "Software Engineering with Generative AI Agents",
      institution: "Vanderbilt University",
      status: "Certified"
    },
    {
      title: "Microsoft AI Fundamentals (AI-900)",
      institution: "Microsoft",
      status: "Certified"
    },
    {
      title: "Certified Cloud Security Professional (CCSP)",
      institution: "ISC²",
      status: "Certified"
    }
  ];

  const skills = [
    "Cloud Architecture (Azure, AWS)",
    "Infrastructure as Code (Terraform)",
    "GenAI & Machine Learning",
    "Cybersecurity & Zero Trust",
    "IT GRC & Compliance",
    "Enterprise Architecture",
    "Digital Transformation",
    "Strategic Leadership"
  ];

  const values = [
    {
      icon: Users,
      title: "Empowerment",
      description: "Helping businesses unlock their potential through technology"
    },
    {
      icon: Shield,
      title: "Trust",
      description: "Building secure, reliable solutions you can depend on"
    },
    {
      icon: Target,
      title: "Simplicity",
      description: "Complex problems, simple solutions - no unnecessary jargon"
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Staying ahead of technology trends to benefit your business"
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Meet Michael Robinson
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                I live at the intersection of cloud, AI, and security - where innovation meets ironclad protection. 
                I'm inspired to help businesses of all sizes take advantage of tomorrow's technologies today, 
                without compromising safety, trust, or compliance.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                I'm a servant leader, strategist, and builder with 30 years of experience in cloud strategy, 
                infrastructure, and enterprise transformation. I lead with empathy, clarity, and a bias for 
                action—because real leadership isn't about control, it's about creating the conditions for 
                others to thrive.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                <Badge variant="secondary">30+ Years Experience</Badge>
                <Badge variant="secondary">VP of Cloud Strategy</Badge>
                <Badge variant="secondary">CCSP Certified</Badge>
                <Badge variant="secondary">AI & Security Leader</Badge>
              </div>
              <Button asChild>
                <Link to="/contact">Let's Connect</Link>
              </Button>
            </div>
            <div className="lg:text-center">
              <div className="w-64 h-64 mx-auto rounded-full overflow-hidden shadow-lg">
                <img 
                  src={profilePhoto} 
                  alt="Michael Robinson - VP of Cloud Strategy and Enablement" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Background */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Professional Journey
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From enterprise-scale infrastructure to small business solutions, 
              my experience spans the full spectrum of technology challenges.
            </p>
          </div>

          <div className="space-y-8">
            {experience.map((exp, index) => (
              <Card key={index} className="border border-border">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{exp.role}</CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{exp.company}</span>
                        <Badge variant="outline">{exp.period}</Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{exp.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Expertise */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <GraduationCap className="h-8 w-8 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Certifications & Continuous Learning
              </h2>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Staying at the forefront of cloud, AI, and security through continuous education and certification
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {certifications.map((cert, index) => (
              <Card key={index} className="border border-border">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{cert.status}</Badge>
                  </div>
                  <CardTitle className="text-lg">{cert.title}</CardTitle>
                  <CardDescription>{cert.institution}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <Card className="border border-border">
            <CardHeader>
              <CardTitle>Core Expertise Areas</CardTitle>
              <CardDescription>
                Three decades of experience building secure, scalable cloud solutions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {skills.map((skill, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                    <span className="text-sm text-foreground">{skill}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Values & Mission */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Mission & Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              MRTek.ai is built on the belief that powerful technology should be accessible 
              to businesses of all sizes, not just Fortune 500 companies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border border-border text-center">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle>{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Philosophy */}
      <section className="py-24 bg-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Heart className="h-12 w-12 text-primary-foreground mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-8 text-center">
              Leadership Philosophy
            </h2>
            
            <div className="space-y-6 text-primary-foreground/90">
              <p className="text-xl">
                My leadership isn't flashy - it's framework-driven. I bring calm to chaos, shield my team from 
                noise, and build platforms that empower others to succeed.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 my-8">
                <Card className="bg-primary-foreground/10 border-primary-foreground/20">
                  <CardHeader>
                    <CardTitle className="text-primary-foreground">What Drives Me</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-primary-foreground/90">
                    <p>• Building secure cloud foundations that scale with business ambition</p>
                    <p>• Baking cybersecurity into every layer so innovation can thrive risk-free</p>
                    <p>• Demystifying AI – bridging boardroom strategy with technical execution</p>
                    <p>• Modernizing legacy platforms into agile powerhouses</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-primary-foreground/10 border-primary-foreground/20">
                  <CardHeader>
                    <CardTitle className="text-primary-foreground">My Approach</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-primary-foreground/90">
                    <p>• Lead with empathy, clarity, and bias for action</p>
                    <p>• Create psychological safety while driving results</p>
                    <p>• Translate between tech teams and C-suites</p>
                    <p>• Own mistakes publicly, give credit generously</p>
                  </CardContent>
                </Card>
              </div>

              <p className="text-lg text-center italic">
                Your team doesn't need a superhero. They need someone who listens, protects, 
                empowers—and gets out of the way. If you're looking for lasting impact, strategic 
                clarity, and human-first leadership - let's talk.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;