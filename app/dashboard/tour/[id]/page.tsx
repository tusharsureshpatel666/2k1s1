"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { User, Mail, Phone, MessageSquare } from "lucide-react";

import { getStoreById } from "@/lib/query/getstore";

const Tourpage = () => {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params?.id;

  const [data, setData] = useState<{ id: string; title: string } | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // Fetch store
  useEffect(() => {
    if (!id) return;

    const fetchStore = async () => {
      try {
        const res = await getStoreById(id);
        setData(res);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStore();
  }, [id]);

  // Validation
  const isValidName = name.trim().length >= 3;
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = /^\d{10}$/.test(phone);
  const isValidMessage = desc.trim().length > 0;

  const isFormValid =
    isValidName && isValidEmail && isValidPhone && isValidMessage;

  const handelSubmit = async () => {
    if (!isFormValid) return;

    try {
      setLoading(true);

      await axios.post("/api/tour", {
        name,
        email,
        phone,
        message: desc,
        id,
      });

      // Reset form
      setName("");
      setEmail("");
      setPhone("");
      setDesc("");

      setOpen(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRedirect = () => {
    setOpen(false);
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col justify-center w-full items-center px-4 py-10">
      <h1 className="text-xl md:text-2xl mb-6 font-semibold">
        Request a Tour {data?.title}
      </h1>

      <div className="rounded-2xl max-w-4xl w-full space-y-5">
        {/* Name */}
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            className="h-14 pl-12 pr-5 rounded-xl"
          />
          {!isValidName && name.length > 0 && (
            <p className="text-red-500 text-sm mt-1">
              Name must be at least 3 characters
            </p>
          )}
        </div>

        {/* Email & Phone */}
        <div className="flex md:flex-row flex-col gap-4">
          <div className="relative w-full">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="h-14 pl-12 pr-5 rounded-xl"
            />
            {!isValidEmail && email.length > 0 && (
              <p className="text-red-500 text-sm mt-1">
                Enter a valid email address
              </p>
            )}
          </div>

          <div className="relative w-full">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              placeholder="Phone Number"
              maxLength={10}
              className="h-14 pl-12 pr-5 rounded-xl"
            />
            {!isValidPhone && phone.length > 0 && (
              <p className="text-red-500 text-sm mt-1">
                Phone must be exactly 10 digits
              </p>
            )}
          </div>
        </div>

        {/* Message */}
        <div className="relative">
          <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-muted-foreground" />
          <Textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Message"
            className="h-32 pl-12 pr-5 py-4 rounded-xl"
          />
          {!isValidMessage && desc.length > 0 && (
            <p className="text-red-500 text-sm mt-1">Message is required</p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          className="w-full py-6 text-base rounded-xl"
          onClick={handelSubmit}
          disabled={!isFormValid || loading}
        >
          {loading ? "Sending..." : "Send Request"}
        </Button>
      </div>

      {/* Success Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-green-600 text-lg">
              🎉 Request Sent Successfully!
            </DialogTitle>
            <DialogDescription>
              Your tour request has been submitted. The store owner will contact
              you soon.
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-end mt-4">
            <Button onClick={handleRedirect}>Go to Dashboard</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Tourpage;
