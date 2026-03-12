"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import axios from "axios";

export default function PhoneModal() {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  // ✅ Phone validation
  const validatePhone = (value: string) => {
    if (value.length !== 10) return "Phone number must be exactly 10 digits";
    if (!/^[6-9]/.test(value))
      return "Indian mobile numbers must start with 6-9";
    return "";
  };

  const handleSendOtp = async () => {
    const validationError = validatePhone(phone);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      await axios.post("/api/send-otp", { phone });

      setStep(2); // 🔥 Move to OTP step
      setError("");
    } catch {
      setError("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      setError("Enter valid 6 digit OTP");
      return;
    }

    try {
      setLoading(true);

      await axios.post("/api/verify-otp", {
        phone,
        otp,
      });

      router.refresh();
      setOpen(false);
    } catch {
      setError("Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    router.push("/dashboard");
  };

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-xl rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl text-center">
            {step === 1 ? "Verify Your Phone Number" : "Enter OTP"}
          </DialogTitle>

          <DialogDescription className="text-center">
            {step === 1
              ? "Enter your Indian mobile number to receive OTP."
              : `OTP sent to +91 ${phone}`}
          </DialogDescription>

          <DialogClose asChild>
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
            >
              ✕
            </button>
          </DialogClose>
        </DialogHeader>

        <div className="space-y-4 flex flex-col w-full mt-4">
          {step === 1 && (
            <>
              {/* Phone Input */}
              <div className="flex items-center border rounded-xl px-3 h-14">
                <span className="mr-2">🇮🇳</span>
                <span className="mr-2 text-gray-500 font-medium">+91</span>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  className="flex-1 outline-none"
                  maxLength={10}
                />
              </div>

              <Button
                onClick={handleSendOtp}
                disabled={loading}
                className="w-full h-14 rounded-xl"
              >
                {loading ? "Sending..." : "Send OTP"}
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              {/* OTP Input (6 boxes style) */}
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                className="text-center tracking-[1em] text-2xl border rounded-xl h-14"
                placeholder="••••••"
              />

              <Button
                onClick={handleVerifyOtp}
                disabled={loading}
                className="w-full h-14 rounded-xl"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </Button>
            </>
          )}

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
        </div>
      </DialogContent>
    </Dialog>
  );
}
