import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";

const Blog = () => {
  const featuredPost = {
    title: "The Small Business Guide to AI Implementation: Start Small, Think Big",
    excerpt: "How small and medium businesses can begin their AI journey without overwhelming complexity or massive budgets. Learn the practical first steps that deliver immediate value.",
    category: "AI Strategy",
    readTime: "15 min read",
    date: "December 2024",
    slug: "small-business-ai-guide",
    featured: true
  };

  const upcomingPosts = [
    {
      title: "From PDFs to Profit: Automating Invoices, POs, and Receipts",
      excerpt: "Document AI for small biz finance ops (no-code first). Reduce data entry by 50% or more with simple automation + guardrails.",
      category: "Document AI",
      readTime: "10 min read",
      date: "Coming Soon"
    },
    {
      title: "Website FAQ to 24/7 Support: Build a Safe AI Assistant on Your Content",
      excerpt: "Convert policies/FAQ/SOPs into a private Q&A bot. Deflect 30–40% of repetitive questions while keeping a human in the loop.",
      category: "AI Support",
      readTime: "12 min read",
      date: "Coming Soon"
    },
    {
      title: "Marketing, But Sustainable: One Article → Five Channels in Your Brand Voice",
      excerpt: "Repurpose content with style guides, prompts, and approvals. A weekly 2-hour ritual that fills your content calendar for 7–10 days.",
      category: "Marketing Automation",
      readTime: "8 min read",
      date: "Coming Soon"
    },
    {
      title: "AI for Field Teams: Checklists, Photos, and 'Done Right' Documentation",
      excerpt: "Mobile-first workflows: job checklists, photo evidence, and customer summaries. Faster jobs, fewer callbacks, clean records customers appreciate.",
      category: "Field Operations",
      readTime: "11 min read",
      date: "Coming Soon"
    }
  ];

  const categories = [
    "All Posts",
    "AI Strategy", 
    "Cloud Strategy",
    "Automation",
    "Security",
    "Digital Transformation"
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BookOpen className="h-16 w-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Technology Insights for Small Business
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Practical advice, case studies, and strategic insights to help your business 
            leverage technology for growth, efficiency, and competitive advantage.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-background border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category, index) => (
              <Badge 
                key={index} 
                variant={index === 0 ? "default" : "secondary"}
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Badge className="mb-4">Featured Article</Badge>
            <h2 className="text-2xl font-bold text-foreground">Editor's Pick</h2>
          </div>
          
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <Badge variant="secondary">{featuredPost.category}</Badge>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{featuredPost.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>
              </div>
              <CardTitle className="text-2xl md:text-3xl mb-4">{featuredPost.title}</CardTitle>
              <CardDescription className="text-lg">{featuredPost.excerpt}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link to="/blog/small-business-ai-guide">
                  Read Article <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Upcoming Posts */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Coming Soon
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              In-depth articles covering practical technology strategies, implementation guides, 
              and real-world case studies for small and medium businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingPosts.map((post, index) => (
              <Card key={index} className="border border-border hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline">{post.category}</Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl leading-tight">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">{post.excerpt}</CardDescription>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{post.date}</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground opacity-50" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-24 bg-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Stay Updated
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Be the first to read new articles and get exclusive insights delivered directly to your inbox. 
            No spam, just valuable content for business technology leaders.
          </p>
          <div className="max-w-md mx-auto">
            <p className="text-primary-foreground/80 mb-4">
              Newsletter signup coming soon!
            </p>
            <Button asChild variant="secondary" size="lg">
              <Link to="/contact">Get Notified When We Launch</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Need Immediate Help?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Don't wait for the next blog post. Let's discuss your specific technology challenges 
            and develop a solution that works for your business today.
          </p>
          <Button asChild size="lg">
            <Link to="/contact">Schedule a Consultation</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Blog;