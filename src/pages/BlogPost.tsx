import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowLeft, Mail } from "lucide-react";

const BlogPost = () => {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Button asChild variant="ghost" className="mb-8">
            <Link to="/blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
          </Button>
          
          <div className="max-w-4xl">
            <Badge className="mb-4">AI Strategy</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              The Small Business Guide to AI Implementation: Start Small, Think Big
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              How small and medium businesses can begin their AI journey without overwhelming complexity or massive budgets. Learn the practical first steps that deliver immediate value.
            </p>
            <div className="flex items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>December 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>15 min read</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
            
            {/* Executive Summary */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Executive Summary (TL;DR)</h2>
              <ul className="space-y-3">
                <li><strong>Pick one painful workflow</strong>, not a moonshot. Automate 1–2 hours/week per employee.</li>
                <li><strong>Use off‑the‑shelf tools first</strong> (no-code/low-code + SaaS AI). Prove value before custom builds.</li>
                <li><strong>Pilot for 30–60 days</strong> with clear success metrics (time saved, error rate, cycle time).</li>
                <li><strong>Govern lightly, document clearly</strong>: data handling, approval to deploy, and a rollback plan.</li>
                <li><strong>Scale what works</strong>—template it, train your team, and plug it into more processes.</li>
              </ul>
            </section>

            <Separator className="my-12" />

            {/* Why Start Small Works */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Why "Start Small, Think Big" Works</h2>
              <p className="mb-4">Big AI programs stall when they try to change everything at once. Small bets:</p>
              <ul className="space-y-2">
                <li>Reduce risk and cost</li>
                <li>Create internal success stories</li>
                <li>Build your team's confidence and literacy</li>
                <li>Generate data you can actually trust</li>
              </ul>
              <Card className="p-6 my-6 bg-primary/5 border-primary/20">
                <p className="text-lg italic mb-0">
                  <strong>Principle:</strong> Deliver value in weeks, not quarters. Let the wins fund the next wave.
                </p>
              </Card>
            </section>

            <Separator className="my-12" />

            {/* 90-Day Starter Plan */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">A 90‑Day Starter Plan</h2>
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4">Days 0–10: Frame the Problem</h3>
                <ol className="space-y-3">
                  <li><strong>List top 5 repetitive pains</strong> (billing, customer emails, quoting, scheduling, inventory notes…).</li>
                  <li>Estimate weekly time lost → pick <strong>one use case</strong> worth ≥ 4 hours/week across the team.</li>
                  <li>Draft a <strong>measure</strong>: baseline time/cost, error rates, turnaround time.</li>
                </ol>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4">Days 11–30: Try It the Easy Way</h3>
                <ol className="space-y-3">
                  <li>Assemble a tiny <strong>pilot team</strong> (1 process owner, 1 champion, 1 skeptic).</li>
                  <li>Implement with <strong>no‑code first</strong>: built‑in AI in productivity suites, form tools, or RPA-lite.</li>
                  <li>Write <strong>guardrails</strong>: data allowed/not allowed, human review steps, escalation path.</li>
                </ol>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4">Days 31–60: Prove Value</h3>
                <ol className="space-y-3">
                  <li>Run the pilot during normal business.</li>
                  <li>Log <strong>before/after</strong> metrics and 3 real examples of impact.</li>
                  <li>Decide: <strong>iterate, scale, or stop</strong>.</li>
                </ol>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4">Days 61–90: Scale the Win</h3>
                <ol className="space-y-3">
                  <li>Create a <strong>standard operating procedure (SOP)</strong> and a 10‑minute training.</li>
                  <li>Template the workflow; roll out to one more team/location.</li>
                  <li>Pitch the next use case using the same playbook.</li>
                </ol>
              </div>
            </section>

            <Separator className="my-12" />

            {/* Quick Win Use Cases */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Quick Win Use‑Case Menu (Pick One)</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-3">Sales & Service</h3>
                  <ul>
                    <li>Auto‑draft replies to common customer emails; human approves.</li>
                    <li>Summarize call notes and push to CRM.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3">Operations</h3>
                  <ul>
                    <li>Extract data from PDFs (invoices, POs) into your spreadsheet or system.</li>
                    <li>Generate stock descriptions, SKU attributes, or pick‑list notes.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3">Finance / Admin</h3>
                  <ul>
                    <li>Categorize expenses from receipts; flag anomalies.</li>
                    <li>Auto‑fill recurring forms; validate totals and dates.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3">HR / Training</h3>
                  <ul>
                    <li>Convert policy docs into a searchable Q&A.</li>
                    <li>Turn SOPs into step‑by‑step checklists with screenshots.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3">Marketing</h3>
                  <ul>
                    <li>Repurpose one article into email, social posts, and a product page—consistent voice, per channel.</li>
                  </ul>
                </div>
              </div>

              <Card className="p-6 my-6 bg-accent/5 border-accent/20">
                <p className="text-lg mb-0">
                  <strong>Rule of thumb:</strong> If the task is repetitive, text‑heavy, and has clear examples—AI can help.
                </p>
              </Card>
            </section>

            <Separator className="my-12" />

            {/* Tech Stack */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Minimal Tech Stack (Keep It Simple)</h2>
              <ul className="space-y-3">
                <li><strong>Document AI</strong>: PDF → structured data (receipts, invoices, IDs)</li>
                <li><strong>Chat/Assistant AI</strong>: drafting, summarizing, Q&A on your documents</li>
                <li><strong>Workflow</strong>: a no‑code automation tool (triggers, approvals, email/slack steps)</li>
                <li><strong>Data</strong>: cloud drive or database you already use</li>
                <li><strong>Integration</strong>: connectors to your CRM/accounting tool (Zap/Power‑Automate equivalents)</li>
              </ul>
              <p className="mt-4">You can add custom code later. Start with what your team already knows.</p>
            </section>

            <Separator className="my-12" />

            {/* Budget Guide */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Budget Guide (Ballpark)</h2>
              <ul className="space-y-3">
                <li><strong>Experiment:</strong> $0–$200/month → seat licenses + light automation</li>
                <li><strong>Small pilot:</strong> $200–$1,000/month → adds document AI + connectors</li>
                <li><strong>Scaling a few processes:</strong> $1k–$5k/month → more seats, higher usage, light dev support</li>
              </ul>
              <Card className="p-6 my-6 bg-primary/5 border-primary/20">
                <p className="text-lg mb-0">
                  <strong>Tip:</strong> Tie spend to <strong>time saved × wage rate × volume</strong>. Your pilot should pay for itself in 30–90 days.
                </p>
              </Card>
            </section>

            <Separator className="my-12" />

            {/* Metrics */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Metrics That Matter</h2>
              <ul className="space-y-2">
                <li><strong>Cycle time</strong> per task (before vs. after)</li>
                <li><strong>Hours saved</strong> per week</li>
                <li><strong>Error rate / rework rate</strong></li>
                <li><strong>Throughput</strong> (tasks per week)</li>
                <li><strong>Employee & customer satisfaction</strong> (simple 1–5 score)</li>
              </ul>
              <p className="mt-4">Document these in a one‑page pilot report with screenshots.</p>
            </section>

            <Separator className="my-12" />

            {/* Governance */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Light‑Touch Governance (Right‑Sized)</h2>
              <ol className="space-y-3">
                <li><strong>Data Handling</strong>: What data is allowed in AI tools? (green/yellow/red list)</li>
                <li><strong>Human‑in‑the‑Loop</strong>: Where is approval required? Who signs off?</li>
                <li><strong>Traceability</strong>: Keep prompts, versions, and example outputs for audits.</li>
                <li><strong>Security</strong>: Business accounts, SSO if available, least‑privilege access.</li>
                <li><strong>Change Control</strong>: Small version bumps, rollback plan, short release notes.</li>
              </ol>
              <p className="mt-4">Keep it to two pages. Policy shouldn't slow you down—it should keep you safe.</p>
            </section>

            <Separator className="my-12" />

            {/* The AI Ladder */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">The AI Ladder: Crawl → Walk → Run</h2>
              <ul className="space-y-3">
                <li><strong>Crawl (Weeks 1–4):</strong> SaaS AI features + simple automations</li>
                <li><strong>Walk (Months 2–4):</strong> Document AI, internal knowledge Q&A, custom prompts, small scripts</li>
                <li><strong>Run (Months 4+):</strong> Integrate with core systems; fine‑tune models or use private retrieval; dashboards</li>
              </ul>
              <p className="mt-4">Move up only when the lower rung is stable and valuable.</p>
            </section>

            <Separator className="my-12" />

            {/* Prompt Examples */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Prompt & Template Examples</h2>
              
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-3">Customer Email Draft</h3>
                <Card className="p-4 bg-muted">
                  <pre className="text-sm overflow-x-auto whitespace-pre-wrap">
{`You are a helpful service rep. Draft a polite reply using the bullet points below. Keep it to 120–160 words, include order number, and propose two next steps.
Context: <paste the customer email>
Order #: <12345>
Policies to respect: <return window, shipping>
Tone: friendly, concise, confident`}
                  </pre>
                </Card>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold mb-3">SOP Summarizer</h3>
                <Card className="p-4 bg-muted">
                  <pre className="text-sm overflow-x-auto whitespace-pre-wrap">
{`Turn the following procedure into a 7‑step checklist with bold step names, each ≤ 20 words. Flag any missing prerequisites.
<paste SOP>`}
                  </pre>
                </Card>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold mb-3">Invoice Extractor (JSON)</h3>
                <Card className="p-4 bg-muted">
                  <pre className="text-sm overflow-x-auto whitespace-pre-wrap">
{`Extract fields as JSON: {"invoice_no": "", "vendor": "", "date": "", "subtotal": "", "tax": "", "total": ""}
<attach or paste text>`}
                  </pre>
                </Card>
              </div>
            </section>

            <Separator className="my-12" />

            {/* Common Pitfalls */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Common Pitfalls (and Fixes)</h2>
              <ul className="space-y-3">
                <li><strong>Too vague</strong> → Write prompts like checklists; include examples.</li>
                <li><strong>No baseline</strong> → Measure current time/cost before piloting.</li>
                <li><strong>Scope creep</strong> → Freeze scope for 30 days; backlog new ideas.</li>
                <li><strong>Shadow tools</strong> → Centralize accounts; publish an approved tool list.</li>
                <li><strong>No owner</strong> → Every pilot needs a named process owner.</li>
              </ul>
            </section>

            <Separator className="my-12" />

            {/* One-Page Canvas */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">One‑Page Pilot Canvas (Copy/Paste)</h2>
              <Card className="p-6 bg-muted">
                <ul className="space-y-3">
                  <li><strong>Use Case:</strong> (e.g., auto‑reply to common support emails)</li>
                  <li><strong>Owner / Team:</strong></li>
                  <li><strong>Baseline Metrics:</strong> (cycle time, errors)</li>
                  <li><strong>Data Sources:</strong> (allowed/not allowed)</li>
                  <li><strong>Process Map (5 boxes):</strong> Trigger → Draft → Review → Approve → Send</li>
                  <li><strong>Success Criteria (30–60 days):</strong>
                    <ul className="ml-6 mt-2">
                      <li>40% faster replies</li>
                      <li>Error rate ≤ 1%</li>
                      <li>CSAT +0.5</li>
                    </ul>
                  </li>
                  <li><strong>Risks & Mitigations:</strong> (privacy, accuracy, fallback)</li>
                  <li><strong>Rollout Plan:</strong> train, template, monitor</li>
                </ul>
              </Card>
            </section>

            <Separator className="my-12" />

            {/* Custom Development */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">When to Consider Custom Development</h2>
              <ul className="space-y-2">
                <li>You hit the limits of no‑code integrations.</li>
                <li>You need to query private data securely and repeatedly.</li>
                <li>You want to standardize prompts into an internal app with roles, audit, and dashboards.</li>
              </ul>
              <p className="mt-4">Start from the working pilot. Don't rebuild the world—<strong>productize what already proved value.</strong></p>
            </section>

            <Separator className="my-12" />

            {/* FAQ */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">FAQ</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-2">Q: Will AI replace people on my team?</h3>
                  <p>A: It should remove drudgery first. Reinvest time into customer care, sales follow‑ups, and quality.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-2">Q: How do we keep our data safe?</h3>
                  <p>A: Use business plans, disable training on your prompts where possible, restrict sensitive data, and add human approval for external messages.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-2">Q: What if outputs are wrong?</h3>
                  <p>A: Keep a human in the loop. Start with low‑risk tasks and log fixes to improve prompts.</p>
                </div>
              </div>
            </section>

            <Separator className="my-12" />

            {/* Call to Action */}
            <section className="mb-12">
              <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
                <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                <p className="text-lg mb-6">
                  If you're ready to <strong>run a 60‑day pilot</strong> that pays for itself, MRTek.ai can help you:
                </p>
                <ul className="space-y-2 mb-6">
                  <li>✓ Pick and shape the right first use case</li>
                  <li>✓ Implement with minimal tools and maximum value</li>
                  <li>✓ Measure results and build the next wave</li>
                </ul>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg">
                    <Link to="/contact">Schedule a Consultation</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <a href="mailto:hello@mrteka.ai">
                      <Mail className="h-4 w-4 mr-2" />
                      hello@mrteka.ai
                    </a>
                  </Button>
                </div>
              </Card>
            </section>

          </div>
        </div>
      </article>

      {/* Related Articles */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Coming Soon</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border border-border">
              <div className="p-6">
                <Badge variant="outline" className="mb-3">Document AI</Badge>
                <h3 className="text-xl font-bold mb-2">From PDFs to Profit: Automating Invoices, POs, and Receipts</h3>
                <p className="text-muted-foreground">Reduce data entry by 50% or more with simple automation + guardrails.</p>
              </div>
            </Card>
            
            <Card className="border border-border">
              <div className="p-6">
                <Badge variant="outline" className="mb-3">AI Support</Badge>
                <h3 className="text-xl font-bold mb-2">Website FAQ to 24/7 Support: Build a Safe AI Assistant</h3>
                <p className="text-muted-foreground">Deflect 30–40% of repetitive questions while keeping a human in the loop.</p>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
