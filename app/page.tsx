export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white">
      <header className="flex items-center justify-between px-8 py-4 border-b">
        <h1 className="text-xl font-bold text-blue-600">Ledgerly</h1>

        <div className="space-x-4">
          <a href="/login" className="text-gray-700 hover:text-blue-600">
            Login
          </a>
          <a
            href="/register"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Get Started
          </a>
        </div>
      </header>

      <section className="flex flex-col items-center justify-center text-center px-6 py-24">
        <h2 className="text-4xl md:text-5xl font-bold leading-tight">
          Manage Your Finance <br />
          Smart & Simple
        </h2>

        <p className="mt-6 max-w-xl text-gray-600">
          Track income, expenses, invoices, and transactions in one powerful dashboard built for
          speed and clarity.
        </p>

        <div className="mt-8 flex gap-4">
          <a
            href="/register"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700"
          >
            Start Free
          </a>

          <a href="/login" className="border px-6 py-3 rounded-lg text-lg hover:bg-gray-50">
            Login
          </a>
        </div>
      </section>

      <section className="bg-gray-50 py-20 px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <Feature
            title="Track Transactions"
            desc="Record income and expenses with full history and filtering."
          />
          <Feature title="Manage Cards" desc="Monitor balances and link spending sources easily." />
          <Feature
            title="Invoices & Reports"
            desc="Generate financial reports and invoice summaries."
          />
        </div>
      </section>

      <footer className="text-center py-6 text-gray-500 text-sm border-t">
        © {new Date().getFullYear()} Ledgerly. All rights reserved.
      </footer>
    </main>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{desc}</p>
    </div>
  );
}
