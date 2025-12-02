import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Wallet, 
  Plus, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  IndianRupee,
  Utensils,
  Car,
  ShoppingBag,
  Home,
  Film,
  MoreHorizontal,
  ArrowLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AddExpenseDialog } from "@/components/AddExpenseDialog";
import { Progress } from "@/components/ui/progress";

type Currency = "INR" | "USD";

interface Expense {
  id: string;
  amount: number;
  currency: Currency;
  category: string;
  description: string;
  date: Date;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [currency, setCurrency] = useState<Currency>("INR");
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: "1",
      amount: 1250,
      currency: "INR",
      category: "Food & Dining",
      description: "Lunch at restaurant",
      date: new Date("2024-12-02")
    },
    {
      id: "2",
      amount: 45,
      currency: "USD",
      category: "Transportation",
      description: "Uber ride",
      date: new Date("2024-12-01")
    },
    {
      id: "3",
      amount: 3500,
      currency: "INR",
      category: "Shopping",
      description: "Clothing",
      date: new Date("2024-11-30")
    }
  ]);

  const exchangeRate = 83.5; // USD to INR

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, any> = {
      "Food & Dining": Utensils,
      "Transportation": Car,
      "Shopping": ShoppingBag,
      "Utilities": Home,
      "Entertainment": Film,
      "Others": MoreHorizontal
    };
    const Icon = icons[category] || MoreHorizontal;
    return <Icon className="w-4 h-4" />;
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Food & Dining": "bg-orange-500/10 text-orange-700 border-orange-500/20",
      "Transportation": "bg-blue-500/10 text-blue-700 border-blue-500/20",
      "Shopping": "bg-pink-500/10 text-pink-700 border-pink-500/20",
      "Utilities": "bg-green-500/10 text-green-700 border-green-500/20",
      "Entertainment": "bg-purple-500/10 text-purple-700 border-purple-500/20",
      "Others": "bg-gray-500/10 text-gray-700 border-gray-500/20"
    };
    return colors[category] || colors["Others"];
  };

  const convertAmount = (amount: number, from: Currency, to: Currency) => {
    if (from === to) return amount;
    if (from === "USD" && to === "INR") return amount * exchangeRate;
    if (from === "INR" && to === "USD") return amount / exchangeRate;
    return amount;
  };

  const totalExpenses = expenses.reduce((sum, expense) => {
    return sum + convertAmount(expense.amount, expense.currency, currency);
  }, 0);

  const thisMonthBudget = currency === "INR" ? 50000 : 600;
  const budgetProgress = (totalExpenses / thisMonthBudget) * 100;

  const handleAddExpense = (expense: Omit<Expense, "id">) => {
    setExpenses([
      {
        ...expense,
        id: Date.now().toString(),
      },
      ...expenses,
    ]);
    setShowAddExpense(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/')}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-2">
                <Wallet className="w-6 h-6 text-primary" />
                <span className="font-bold text-xl">ExpenseTracker</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Currency Toggle */}
              <div className="flex items-center gap-2 p-1 bg-muted rounded-lg">
                <button
                  onClick={() => setCurrency("INR")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    currency === "INR"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <IndianRupee className="w-4 h-4 inline mr-1" />
                  INR
                </button>
                <button
                  onClick={() => setCurrency("USD")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    currency === "USD"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <DollarSign className="w-4 h-4 inline mr-1" />
                  USD
                </button>
              </div>
              
              <Button 
                variant="hero"
                onClick={() => setShowAddExpense(true)}
              >
                <Plus className="w-4 h-4" />
                Add Expense
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Overview Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-border hover:shadow-medium transition-shadow animate-slide-up">
            <CardHeader className="pb-3">
              <CardDescription>Total Expenses</CardDescription>
              <CardTitle className="text-3xl">
                {currency === "INR" ? "₹" : "$"}
                {totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-muted-foreground">
                <TrendingUp className="w-4 h-4 text-primary mr-2" />
                This month
              </div>
            </CardContent>
          </Card>

          <Card className="border-border hover:shadow-medium transition-shadow animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <CardHeader className="pb-3">
              <CardDescription>Monthly Budget</CardDescription>
              <CardTitle className="text-3xl">
                {currency === "INR" ? "₹" : "$"}
                {thisMonthBudget.toLocaleString()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Progress value={Math.min(budgetProgress, 100)} className="h-2" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {budgetProgress.toFixed(0)}% used
                  </span>
                  <span className={budgetProgress > 100 ? "text-destructive" : "text-muted-foreground"}>
                    {currency === "INR" ? "₹" : "$"}
                    {Math.max(0, thisMonthBudget - totalExpenses).toLocaleString(undefined, { maximumFractionDigits: 0 })} left
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border hover:shadow-medium transition-shadow animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <CardHeader className="pb-3">
              <CardDescription>Exchange Rate</CardDescription>
              <CardTitle className="text-3xl">₹{exchangeRate}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-muted-foreground">
                <DollarSign className="w-4 h-4 mr-2" />
                per USD
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Expenses */}
        <Card className="border-border animate-fade-in">
          <CardHeader>
            <CardTitle>Recent Expenses</CardTitle>
            <CardDescription>Your latest transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {expenses.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Wallet className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No expenses yet. Add your first expense to get started!</p>
                </div>
              ) : (
                expenses.map((expense) => (
                  <div
                    key={expense.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full ${getCategoryColor(expense.category)} flex items-center justify-center`}>
                        {getCategoryIcon(expense.category)}
                      </div>
                      <div>
                        <p className="font-medium">{expense.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className={getCategoryColor(expense.category)}>
                            {expense.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {expense.date.toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-lg">
                        {expense.currency === "INR" ? "₹" : "$"}
                        {expense.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </p>
                      {expense.currency !== currency && (
                        <p className="text-xs text-muted-foreground">
                          ≈ {currency === "INR" ? "₹" : "$"}
                          {convertAmount(expense.amount, expense.currency, currency).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </p>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <AddExpenseDialog 
        open={showAddExpense}
        onOpenChange={setShowAddExpense}
        onAddExpense={handleAddExpense}
      />
    </div>
  );
};

export default Dashboard;
