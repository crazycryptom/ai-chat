import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="mt-4 text-2xl">Page Not Found</p>
      <Link
        href="/"
        className="mt-6 px-4 py-2 bg-secondary rounded-lg hover:bg-opacity-75 transition duration-200"
      >
        Go to Home
      </Link>
    </div>
  );
}
