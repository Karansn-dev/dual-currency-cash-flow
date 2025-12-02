import { Button } from "@/components/ui/button";
import { ArrowRight, DollarSign, PieChart, Lock, TrendingUp, Wallet, ShoppingBag, Home, Car, Utensils, Film } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-bg.jpg";

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: DollarSign,
      title: "Dual Currency Support",
      description: "Seamlessly track expenses in both INR and USD with real-time conversion rates"
    },
    {
      icon: PieChart,
      title: "Visual Analytics",
      description: "Understand your spending patterns with beautiful charts and detailed insights"
    },
    {
      icon: TrendingUp,
      title: "Smart Categorization",
      description: "Automatically organize expenses into categories for better financial clarity"
    },
    {
      icon: Lock,
      title: "Secure & Private",
      description: "Your financial data is encrypted and stored securely with enterprise-grade protection"
    }
  ];

  const categories = [
    { icon: Utensils, name: "Food & Dining", color: "text-orange-500" },
    { icon: Car, name: "Transportation", color: "text-blue-500" },
    { icon: ShoppingBag, name: "Shopping", color: "text-pink-500" },
    { icon: Home, name: "Utilities", color: "text-green-500" },
    { icon: Film, name: "Entertainment", color: "text-purple-500" },
    { icon: Wallet, name: "Others", color: "text-gray-500" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <div className="inline-block">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <TrendingUp className="w-4 h-4" />
                Take Control of Your Finances
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Track Every Expense,
              <span className="gradient-hero bg-clip-text text-transparent"> Master Your Money</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              The smart way to manage expenses across currencies. Get insights, stay organized, and achieve your financial goals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button 
                variant="hero" 
                size="lg" 
                className="text-lg px-8 py-6 h-auto"
                onClick={() => navigate('/dashboard')}
              >
                Start Tracking Free
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg px-8 py-6 h-auto"
              >
                View Demo
              </Button>
            </div>
            
            <div className="flex items-center justify-center gap-8 pt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Free forever
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Everything You Need to
              <span className="text-primary"> Stay on Track</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to make expense tracking effortless and insightful
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-large animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Smart <span className="text-primary">Categorization</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Automatically organize your expenses into intuitive categories
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-5xl mx-auto">
            {categories.map((category, index) => (
              <div 
                key={index}
                className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all hover:scale-105 cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-full bg-muted flex items-center justify-center ${category.color}`}>
                  <category.icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium text-center">{category.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold">
              Ready to Take Control?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of users who have transformed their financial habits with our expense tracker
            </p>
            <Button 
              variant="hero" 
              size="lg"
              className="text-lg px-10 py-6 h-auto"
              onClick={() => navigate('/dashboard')}
            >
              Get Started Now
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Wallet className="w-6 h-6 text-primary" />
              <span className="font-bold text-xl">ExpenseTracker</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 ExpenseTracker. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
