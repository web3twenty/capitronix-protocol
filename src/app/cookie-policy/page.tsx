// pages/cookie-policy.jsx
import Head from "next/head";

export default function CookiePolicy() {
  return (
    <div className="p-4">
      <Head>
        <title>Cookie Policy – 3Twenty Coin</title>
        <meta name="description" content="Cookie Policy for 3Twenty Coin" />
      </Head>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-6">
          Cookie Policy – 3Twenty Coin
        </h1>

        <p className="mb-6">
          At 3Twenty Coin (Web3Twenty), we use cookies to enhance your
          blockchain experience, making it smoother, faster, and more secure.
          This Cookie Policy addresses the most frequently asked questions about
          cookies on cryptocurrency websites.
        </p>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            What are cookies on a crypto website?
          </h2>
          <p>
            <strong>Cookies</strong> are small files stored on your device when
            you visit
            <a
              href="https://3twentycoin.com"
              className="text-blue-600 hover:underline"
            >
              {" "}
              3twentycoin.com
            </a>
            . They help us remember your preferences, secure wallet logins, and
            improve your experience with our presale, staking, and
            revenue-sharing services.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            Why does 3Twenty Coin use cookies?
          </h2>
          <ul className="list-disc list-inside ml-4">
            <li>
              <strong>Keep your account and wallet secure.</strong>
            </li>
            <li>
              <strong>Speed up transactions and site performance.</strong>
            </li>
            <li>
              <strong>
                Remember your preferred language, currency, and blockchain
                options.
              </strong>
            </li>
            <li>
              <strong>
                Track site usage to improve staking dashboards and presale
                pages.
              </strong>
            </li>
            <li>
              <strong>
                Deliver relevant updates about crypto rewards and affiliate
                programs.
              </strong>
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            What types of cookies does 3Twenty Coin use?
          </h2>
          <ul className="list-decimal list-inside ml-4">
            <li>
              <strong>Essential Cookies</strong> – Required for login, wallet
              access, and secure payments.
            </li>
            <li>
              <strong>Performance Cookies</strong> – Measure traffic and
              optimize high-demand events like token presales.
            </li>
            <li>
              <strong>Functional Cookies</strong> – Remember your settings
              (language, wallet preferences).
            </li>
            <li>
              <strong>Analytics & Marketing Cookies</strong> – Help us analyze
              user behavior and share relevant crypto updates.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            Can I disable cookies?
          </h2>
          <p>
            <strong>Yes</strong>, you can manage or disable cookies in your
            browser settings. However, note that turning them off may affect
            features like staking dashboards or login security.
          </p>
          <ul className="list-disc list-inside ml-4">
            <li>
              <strong>Chrome:</strong> Settings → Privacy & Security → Cookies
            </li>
            <li>
              <strong>Firefox:</strong> Options → Privacy → Cookies
            </li>
            <li>
              <strong>Safari:</strong> Preferences → Privacy
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            Do cookies store my personal crypto data?
          </h2>
          <p>
            <strong>No.</strong> Cookies do not store your private keys, seed
            phrases, or financial details. They only collect basic usage data to
            improve your experience. For more, see our{" "}
            <a href="/privacy-policy" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            How often is this Cookie Policy updated?
          </h2>
          <p>
            <strong>
              We review and update this policy whenever needed. The “Last
              Updated” date always reflects the latest version.
            </strong>
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
          <p>
            <strong>Email:</strong>{" "}
            <a
              href="mailto:3twentycoinofficial@gmail.com"
              className="text-blue-600 hover:underline"
            >
              3twentycoinofficial@gmail.com
            </a>
            <br />
            <strong>Address:</strong> 7MF2+36Q, Road 5549, Galali, Bahrain
          </p>
        </section>
      </main>
    </div>
  );
}
