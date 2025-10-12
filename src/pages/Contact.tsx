import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  Mail, 
  Linkedin, 
  Calendar,
  MapPin,
  Phone,
  Clock,
  Send,
  CheckCircle
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thank you for your interest. I'll get back to you within 24 hours.",
      });
      setFormData({ name: "", email: "", company: "", service: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      description: "michael@mrtek.ai",
      action: "Send Email",
      href: "mailto:michael@mrtek.ai"
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      description: "Connect professionally",
      action: "View Profile",
      href: "https://www.linkedin.com/in/mrobinson2/"
    },
    {
      icon: Calendar,
      title: "Schedule a Call",
      description: "Book a 30-minute consultation",
      action: "Schedule Now",
      href: "#" // Would integrate with Calendly
    }
  ];

  const services = [
    "Cloud Consulting",
    "AI Advisory Services", 
    "Website & Automation",
    "Fractional CTO Services",
    "General Inquiry"
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Let's Discuss Your Technology Goals
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Ready to transform your business with cloud, AI, and smart automation? 
            I'm here to help you navigate the technology landscape with confidence.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <Card key={index} className="border border-border text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                    <method.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle>{method.title}</CardTitle>
                  <CardDescription>{method.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full">
                    <a href={method.href} target={method.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                      {method.action}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <Card className="border border-border">
              <CardHeader>
                <CardTitle className="text-2xl">Send a Message</CardTitle>
                <CardDescription>
                  Tell me about your project and I'll get back to you within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        required
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        required
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleChange("company", e.target.value)}
                      placeholder="Your company name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="service">Service Interest</Label>
                    <Select value={formData.service} onValueChange={(value) => handleChange("service", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service} value={service}>
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      required
                      placeholder="Tell me about your project, challenges, or questions..."
                      rows={5}
                    />
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        Send Message
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Why Work With MRTek.ai?
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground">Enterprise Experience</h3>
                      <p className="text-muted-foreground">30 years of IT experience and VP-level strategic thinking</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground">Small Business Focus</h3>
                      <p className="text-muted-foreground">Solutions designed specifically for small and medium business needs</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground">No Jargon Approach</h3>
                      <p className="text-muted-foreground">Clear communication and practical solutions you can understand</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground">Future-Ready Technology</h3>
                      <p className="text-muted-foreground">Stay current with AI/ML certification and cutting-edge practices</p>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="border border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Response Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    I typically respond to inquiries within 24 hours during business days. 
                    For urgent matters, please indicate that in your message.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Service Area
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Based in the United States, serving clients globally through remote consulting. 
                    Local meetings available for clients in the greater metropolitan area.
                  </p>
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
            Every successful technology project starts with a conversation. 
            Let's discuss how we can help your business grow and thrive.
          </p>
          <Button asChild size="lg" variant="secondary">
            <a href="mailto:michael@mrtek.ai">
              <Mail className="mr-2 h-5 w-5" />
              Send Email Directly
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Contact;