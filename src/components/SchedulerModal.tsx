import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface SchedulerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM"
];

export const SchedulerModal = ({ open, onOpenChange }: SchedulerModalProps) => {
  const [date, setDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !selectedTime) {
      toast({
        title: "Missing Information",
        description: "Please select both a date and time slot.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke('send-booking-email', {
        body: {
          name: formData.name,
          email: formData.email,
          date: format(date, 'MMMM d, yyyy'),
          time: selectedTime,
          message: formData.message
        }
      });

      if (error) throw error;

      toast({
        title: "Meeting Scheduled!",
        description: "You'll receive a confirmation email shortly.",
      });

      // Reset form
      setFormData({ name: "", email: "", message: "" });
      setDate(undefined);
      setSelectedTime("");
      onOpenChange(false);
    } catch (error) {
      console.error("Error scheduling meeting:", error);
      toast({
        title: "Error",
        description: "Failed to schedule meeting. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Schedule a 30-Minute Consultation</DialogTitle>
          <DialogDescription>
            Select a date and time that works best for you. I'll send you a confirmation email.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Calendar Section */}
            <div className="space-y-4">
              <Label>Select Date</Label>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                className="rounded-md border"
              />
            </div>

            {/* Time Slots Section */}
            <div className="space-y-4">
              <Label>Select Time</Label>
              <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto p-2 border rounded-md">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    type="button"
                    variant={selectedTime === time ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTime(time)}
                    className="w-full"
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="scheduler-name">Name *</Label>
                <Input
                  id="scheduler-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  placeholder="Your full name"
                />
              </div>
              <div>
                <Label htmlFor="scheduler-email">Email *</Label>
                <Input
                  id="scheduler-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="scheduler-message">Additional Notes (Optional)</Label>
              <Textarea
                id="scheduler-message"
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Any specific topics you'd like to discuss?"
                rows={3}
              />
            </div>
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Scheduling..." : "Schedule Meeting"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
