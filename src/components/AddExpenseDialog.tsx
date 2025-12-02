import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, DollarSign, IndianRupee } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

type Currency = "INR" | "USD";

interface AddExpenseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddExpense: (expense: {
    amount: number;
    currency: Currency;
    category: string;
    description: string;
    date: Date;
  }) => void;
}

export function AddExpenseDialog({ open, onOpenChange, onAddExpense }: AddExpenseDialogProps) {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState<Currency>("INR");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date>(new Date());

  const categories = [
    "Food & Dining",
    "Transportation",
    "Shopping",
    "Utilities",
    "Entertainment",
    "Healthcare",
    "Education",
    "Others"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !category || !description) {
      return;
    }

    onAddExpense({
      amount: parseFloat(amount),
      currency,
      category,
      description,
      date
    });

    // Reset form
    setAmount("");
    setCategory("");
    setDescription("");
    setDate(new Date());
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Expense</DialogTitle>
          <DialogDescription>
            Record your expense with all the details
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          {/* Amount & Currency */}
          <div className="space-y-2">
            <Label>Amount</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-8"
                  required
                />
                {currency === "INR" ? (
                  <IndianRupee className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                ) : (
                  <DollarSign className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                )}
              </div>
              <Select value={currency} onValueChange={(value: Currency) => setCurrency(value)}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="INR">
                    <div className="flex items-center gap-2">
                      <IndianRupee className="w-4 h-4" />
                      INR
                    </div>
                  </SelectItem>
                  <SelectItem value="USD">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      USD
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>Description</Label>
            <Input
              placeholder="What was this expense for?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => newDate && setDate(newDate)}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="hero"
              className="flex-1"
            >
              Add Expense
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
