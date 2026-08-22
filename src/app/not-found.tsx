import Link from 'next/link';

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-slate-900 font-sans">
        <div className="max-w-md w-full text-center space-y-4 bg-white p-8 rounded-2xl shadow-md border border-slate-200">
          <h1 className="text-4xl font-black text-blue-600">404</h1>
          <h2 className="text-xl font-bold">Page Not Found</h2>
          <p className="text-xs text-slate-500">
            The page you are looking for does not exist or has been moved.
          </p>
          <div className="pt-2">
            <Link
              href="/en/manage/events"
              className="inline-block px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs"
            >
              Go to Events
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
