"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import CountrySelector from "./CountrySelector";
import { phoneFormSchema } from "@/lib/zodSchemas";

type PhoneFormType = z.infer<typeof phoneFormSchema>;

export default function PhoneNumberForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PhoneFormType>({
    resolver: zodResolver(phoneFormSchema),
  });

  const onSubmit = (data: PhoneFormType) => {
    localStorage.setItem("phoneData", JSON.stringify(data));
    toast.success("OTP Sent!");
    setTimeout(() => {
      router.push("/verify");
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Country Code Selector */}
      <CountrySelector onChange={(val) => setValue("countryCode", val)} />
      {errors.countryCode && (
        <p className="text-red-500 text-sm">{errors.countryCode.message}</p>
      )}

      {/* Phone Number Input */}
      <input
        type="text"
        placeholder="Enter Phone Number"
        {...register("phone")}
        className="border p-2 w-full"
      />
      {errors.phone && (
        <p className="text-red-500 text-sm">{errors.phone.message}</p>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-600 text-white p-2 w-full rounded"
      >
        Send OTP
      </button>
    </form>
  );
}
