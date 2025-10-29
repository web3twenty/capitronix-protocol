// pages/privacy-policy.jsx
import Head from "next/head";

export default function PrivacyPolicy() {
  return (
    <div className="p-4">
      <Head>
        <title>Privacy Policy – 3Twenty Coin</title>
        <meta name="description" content="Privacy Policy for 3Twenty Coin" />
      </Head>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-6">
          Privacy Policy – 3Twenty Coin
        </h1>

        <p className="mb-6">
          We value your trust. This Privacy Policy explains how 3Twenty Coin
          (Web3Twenty) collects, uses, and protects your information.
        </p>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            1. Information We Collect
          </h2>
          <p className="font-semibold">a. You Provide Directly:</p>
          <ul className="list-disc list-inside ml-4 mb-2">
            <li>Name, email, wallet address.</li>
            <li>Presale & staking details.</li>
            <li>Support inquiries & feedback.</li>
          </ul>
          <p className="font-semibold">b. Collected Automatically:</p>
          <ul className="list-disc list-inside ml-4">
            <li>IP address, browser, device info.</li>
            <li>Website usage & analytics.</li>
            <li>Cookies & tracking data.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            2. How We Use Your Data
          </h2>
          <ul className="list-disc list-inside ml-4">
            <li>Enable transactions, staking, and revenue sharing.</li>
            <li>Provide secure, optimized services.</li>
            <li>Send updates, alerts, and newsletters.</li>
            <li>Prevent fraud & comply with laws.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            3. Sharing & Disclosure
          </h2>
          <ul className="list-disc list-inside ml-4">
            <li>Service providers (hosting, analytics, payment).</li>
            <li>Authorities (if legally required).</li>
            <li>Affiliates/Partners (under strict safeguards).</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">4. Data Retention</h2>
          <p>
            We keep data only as long as needed. Once unnecessary, it will be
            deleted or anonymized.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">5. Security Measures</h2>
          <ul className="list-disc list-inside ml-4">
            <li>Encryption, firewalls and access controls.</li>
            <li>
              No system is 100% secure → You must also protect your wallet keys.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">6. Cookies & Tracking</h2>
          <ul className="list-disc list-inside ml-4">
            <li>Used for analytics, personalization and functionality.</li>
            <li>
              You may disable cookies, but some features may not work properly.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            7. International Data Transfers
          </h2>
          <p>
            If outside our jurisdiction, your data may be processed elsewhere
            but with legal safeguards.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">8. Your Rights</h2>
          <p>Depending on your country, you may request:</p>
          <ul className="list-disc list-inside ml-4">
            <li>Data access</li>
            <li>Corrections/updates</li>
            <li>Data deletion</li>
            <li>Restriction or objection to processing</li>
            <li>Withdraw consent anytime</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">9. Policy Updates</h2>
          <p>
            We may update this Privacy Policy. Continued use = Acceptance of
            changes.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">10. Contact Us</h2>
          <p>
            For privacy concerns: <br />
            Email:{" "}
            <a
              href="mailto:3twentycoinofficial@gmail.com"
              className="text-blue-600 hover:underline"
            >
              3twentycoinofficial@gmail.com
            </a>
            <br />
            Address: 7MF2+36Q, Road 5549, Galali, Bahrain
          </p>
        </section>
      </main>
    </div>
  );
}
