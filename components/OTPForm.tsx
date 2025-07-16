"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpSchema } from "@/lib/zodSchemas";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type OTPFormType = z.infer<typeof otpSchema>;

export default function OTPForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OTPFormType>({
    resolver: zodResolver(otpSchema),
  });

  const onSubmit = (data: OTPFormType) => {
    if (data.otp === "123456") {
      toast.success("OTP Verified!");
      setTimeout(() => {
        router.push("/chat");
      }, 1000);
    } else {
      toast.error("Invalid OTP. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        type="text"
        placeholder="Enter OTP"
        {...register("otp")}
        className="border p-2 w-full"
      />
      {errors.otp && (
        <p className="text-red-500 text-sm">{errors.otp.message}</p>
      )}

      <button
        type="submit"
        className="bg-green-600 text-white p-2 w-full rounded"
      >
        Verify OTP
      </button>
    </form>
  );
}
