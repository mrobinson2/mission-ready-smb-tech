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

  const skills = [
    "Cloud Architecture (Azure, AWS)",
    "Infrastructure as Code (Terraform)",
    "GenAI & Machine Learning",
    "Process Improvement",
    "IT Operations & Security",
    "Digital Transformation",
    "Team Leadership",
    "Customer-Centric Consulting"
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
              <p className="text-xl text-muted-foreground mb-8">
                With nearly 30 years of IT experience, I've seen technology evolve from mainframes 
                to cloud computing to AI. Now, I'm passionate about helping small and medium businesses 
                leverage these powerful technologies to grow, automate, and stay secure.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                <Badge variant="secondary">30+ Years Experience</Badge>
                <Badge variant="secondary">VP of Cloud Strategy</Badge>
                <Badge variant="secondary">AI/ML Student</Badge>
                <Badge variant="secondary">Small Business Advocate</Badge>
              </div>
              <Button asChild>
                <Link to="/contact">Let's Connect</Link>
              </Button>
            </div>
            <div className="lg:text-center">
              <div className="w-64 h-64 mx-auto bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center">
                <span className="text-6xl font-bold text-primary-foreground">MR</span>
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

      {/* Current Education */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap className="h-8 w-8 text-primary" />
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  Continuous Learning
                </h2>
              </div>
              <p className="text-xl text-muted-foreground mb-6">
                Currently pursuing a postgraduate certification in AI and Machine Learning 
                from the University of Texas at Austin to stay at the forefront of 
                emerging technologies.
              </p>
              <p className="text-muted-foreground">
                This commitment to learning ensures that MRTek.ai clients benefit from 
                the latest innovations in artificial intelligence and automation, 
                applied with the wisdom of decades of practical experience.
              </p>
            </div>
            <div>
              <Card className="border border-border">
                <CardHeader>
                  <CardTitle>Key Expertise Areas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {skills.map((skill, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm text-foreground">{skill}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
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

      {/* Personal Touch */}
      <section className="py-24 bg-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <Heart className="h-12 w-12 text-primary-foreground mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Why I Do This
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Having worked in large enterprise environments, I've seen firsthand how the right technology 
              can transform business operations. My mission is to bring that same level of strategic 
              technology thinking to small and medium businesses - without the enterprise complexity or cost.
            </p>
            <p className="text-lg text-primary-foreground/80">
              I believe every business deserves access to modern, secure, and scalable technology solutions 
              that help them compete and grow in today's digital landscape.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;