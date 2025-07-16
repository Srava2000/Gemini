import PhoneNumberForm from "@/components/PhoneNumberForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-xl font-semibold mb-4 text-center text-gray-900 dark:text-white">
          Login with OTP
        </h1>
        <PhoneNumberForm />
      </div>
    </main>
  );
}
