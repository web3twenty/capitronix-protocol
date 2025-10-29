// pages/terms-of-service.jsx
import Head from "next/head";

export default function TermsOfService() {
  return (
    <div className="p-4">
      <Head>
        <title>Terms of Service – 3Twenty Coin</title>
        <meta name="description" content="Terms of Service for 3Twenty Coin" />
      </Head>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-6">
          Terms of Service – 3Twenty Coin
        </h1>

        <p className="mb-6">
          Welcome to 3Twenty Coin (Web3Twenty) – a next-generation digital
          currency. By using our website
          <a
            href="https://3twentycoin.com"
            className="text-blue-600 hover:underline"
          >
            {" "}
            3twentycoin.com
          </a>
          and related services, you agree to these Terms of Service. Please read
          carefully before engaging with our platform.
        </p>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing our Site, Presale, Staking, Revenue Sharing, or
            Affiliate Programs, you confirm that:
          </p>
          <ul className="list-disc list-inside ml-4 mb-2">
            <li>You’ve read, understood, and accepted these Terms.</li>
            <li>
              You also agree to follow our Privacy Policy and any other related
              policies.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">2. Eligibility</h2>
          <ul className="list-disc list-inside ml-4">
            <li>
              You must be 18 years or older (or the legal age in your country).
            </li>
            <li>
              You cannot use our services if prohibited by your local laws.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">3. Use of Services</h2>
          <p>3Twenty Coin provides blockchain-based services including:</p>
          <ul className="list-disc list-inside ml-4 mb-2">
            <li>Token Presale Participation</li>
            <li>Staking & Rewards</li>
            <li>Revenue Sharing</li>
            <li>Affiliate/Referral Programs</li>
          </ul>
          <p>Your responsibilities:</p>
          <ul className="list-disc list-inside ml-4">
            <li>Follow all applicable crypto & financial regulations.</li>
            <li>Keep your wallets, private keys and account details safe.</li>
            <li>We are not liable for losses due to your negligence.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            4. Presale, Staking & Rewards
          </h2>
          <ul className="list-disc list-inside ml-4">
            <li>All crypto investments carry market risks.</li>
            <li>Token rewards may involve vesting periods or lock-ups.</li>
            <li>
              Revenue sharing is distributed per official guidelines, subject to
              updates.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            5. Intellectual Property
          </h2>
          <p>
            All content (logos, designs, software, documents, etc.) is owned by
            Web3Twenty. No copying, redistributing, or altering without
            permission.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            6. Disclaimers & Liability
          </h2>
          <ul className="list-disc list-inside ml-4">
            <li>Services are provided “as is” and “as available.”</li>
            <li>We do not guarantee uninterrupted or error-free service.</li>
            <li>We are not liable for indirect or incidental damages.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">7. Indemnification</h2>
          <p>
            You agree to protect and hold Web3Twenty harmless against claims,
            losses or expenses arising from your use of our services or
            violations of these Terms.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">8. Changes to Terms</h2>
          <ul className="list-disc list-inside ml-4">
            <li>We may update these Terms anytime.</li>
            <li>The “Last Updated” date will reflect changes.</li>
            <li>Continued use = Acceptance of new Terms.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">9. Governing Law</h2>
          <p>
            Governed by the laws of Bahrain. Disputes resolved via arbitration
            or competent courts.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">10. Contact Us</h2>
          <p>
            Questions about these Terms? <br />
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
