"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ConsultationTypeData {
  id: string;
  slug: string;
  name: string;
  duration: number;
  price: number;
}

interface TimeSlot {
  start: string; // ISO string
  end: string;
  label: string;
}

function generateTimeSlots(date: string, duration: number): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const [y, m, d] = date.split("-").map(Number);
  // 9 AM to 5 PM, last slot ends at or before 5 PM
  const startHour = 9;
  const endHour = 17;

  for (let hour = startHour; hour + duration / 60 <= endHour; hour++) {
    const start = new Date(y, m - 1, d, hour, 0, 0);
    const end = new Date(start.getTime() + duration * 60 * 1000);
    const label = `${start.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    })} — ${end.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    })}`;

    slots.push({ start: start.toISOString(), end: end.toISOString(), label });
  }
  return slots;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
] as const;

export function BookingForm({
  consultationType,
  availableDates,
}: {
  consultationType: ConsultationTypeData;
  availableDates: string[];
}) {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0); // pagination for date list

  const datesPerPage = 14;
  const totalPages = Math.ceil(availableDates.length / datesPerPage);
  const visibleDates = availableDates.slice(
    page * datesPerPage,
    (page + 1) * datesPerPage
  );

  const timeSlots = useMemo(
    () =>
      selectedDate
        ? generateTimeSlots(selectedDate, consultationType.duration)
        : [],
    [selectedDate, consultationType.duration]
  );

  const handleBook = async () => {
    if (!selectedDate || !selectedSlot) return;
    setLoading(true);

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "CONSULTATION",
          consultationTypeId: consultationType.id,
          startTime: selectedSlot.start,
          endTime: selectedSlot.end,
          notes: notes || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        if (data.redirect) {
          router.push(data.redirect);
          return;
        }
        throw new Error(data.error || "Failed to create booking");
      }

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Booking error:", err);
      alert("Sorry, something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Date Selection */}
      <Card className="p-6">
        <h2 className="font-serif text-lg font-bold text-ink mb-4">
          Select a Date
        </h2>
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            size="sm"
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
            aria-label="Previous dates"
          >
            &larr;
          </Button>
          <span className="text-sm text-ink-muted">
            {MONTHS[new Date(visibleDates[0] + "T12:00:00").getMonth()]}{" "}
            {new Date(visibleDates[0] + "T12:00:00").getDate()} —{" "}
            {MONTHS[
              new Date(
                visibleDates[visibleDates.length - 1] + "T12:00:00"
              ).getMonth()
            ]}{" "}
            {new Date(
              visibleDates[visibleDates.length - 1] + "T12:00:00"
            ).getDate()}
          </span>
          <Button
            variant="ghost"
            size="sm"
            disabled={page >= totalPages - 1}
            onClick={() => setPage((p) => p + 1)}
            aria-label="Next dates"
          >
            &rarr;
          </Button>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {visibleDates.map((date) => {
            const isSelected = date === selectedDate;
            const d = new Date(date + "T12:00:00");
            const dayName = d.toLocaleDateString("en-US", {
              weekday: "short",
            });
            const dayNum = d.getDate();

            return (
              <button
                key={date}
                type="button"
                onClick={() => {
                  setSelectedDate(date);
                  setSelectedSlot(null);
                }}
                className={`flex flex-col items-center py-2 px-1 rounded-lg text-sm transition-colors ${
                  isSelected
                    ? "bg-vermilion text-white"
                    : "bg-paper hover:bg-vermilion/10 text-ink"
                }`}
              >
                <span className="text-xs opacity-80">{dayName}</span>
                <span className="font-bold">{dayNum}</span>
              </button>
            );
          })}
        </div>
      </Card>

      {/* Time Slot Selection */}
      {selectedDate && (
        <Card className="p-6">
          <h2 className="font-serif text-lg font-bold text-ink mb-2">
            Select a Time
          </h2>
          <p className="text-sm text-ink-muted mb-4">
            {formatDate(selectedDate)}
          </p>

          {timeSlots.length === 0 ? (
            <p className="text-sm text-ink-muted">No available time slots for this date.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {timeSlots.map((slot) => (
                <button
                  key={slot.start}
                  type="button"
                  onClick={() => setSelectedSlot(slot)}
                  className={`py-3 px-4 rounded-lg text-sm transition-colors border ${
                    selectedSlot?.start === slot.start
                      ? "border-vermilion bg-vermilion/10 text-vermilion font-semibold"
                      : "border-ink/10 hover:border-vermilion/30 text-ink"
                  }`}
                >
                  {slot.label}
                </button>
              ))}
            </div>
          )}
        </Card>
      )}

      {/* Notes & Confirm */}
      {selectedSlot && (
        <Card className="p-6">
          <h2 className="font-serif text-lg font-bold text-ink mb-4">
            Booking Summary
          </h2>
          <div className="space-y-2 mb-6 text-sm">
            <div className="flex justify-between">
              <span className="text-ink-muted">Service</span>
              <span className="font-medium">{consultationType.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-muted">Date</span>
              <span className="font-medium">{formatDate(selectedDate!)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-muted">Time</span>
              <span className="font-medium">{selectedSlot.label}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-muted">Duration</span>
              <span className="font-medium">{consultationType.duration} min</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-2 border-t">
              <span>Total</span>
              <span className="text-vermilion">
                ${(consultationType.price / 100).toFixed(0)}
              </span>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-ink mb-2"
            >
              Notes or questions (optional)
            </label>
            <textarea
              id="notes"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Anything you'd like the practitioner to know..."
              className="w-full rounded-lg border border-ink/15 px-4 py-3 text-sm bg-paper focus:outline-none focus:border-vermilion/50 resize-none"
            />
          </div>

          <Button
            variant="vermilion"
            className="w-full"
            onClick={handleBook}
            disabled={loading}
          >
            {loading ? "Processing..." : "Book Now"}
          </Button>
          <p className="text-xs text-ink-muted text-center mt-3">
            You will be redirected to Stripe for secure payment. No charge until you confirm.
          </p>
        </Card>
      )}
    </div>
  );
}
