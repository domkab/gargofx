// app/terms/page.tsx
import { FiMail, FiExternalLink } from 'react-icons/fi';
import { DOMAIN_NAME, SITE_NAME, SITE_TITLE } from '@/lib/constants';

export const metadata = {
  title: `Terms & Conditions | ${SITE_TITLE}`,
  description: `Terms of service for ${SITE_TITLE}`,
};

const TermsAndConditions = () => {
  return (
    <main className="terms_wrapper">
      <div className="terms mt-14 md:mx-auto max-w-4xl p-6 sm:p-12">
        <h1 className="flex items-center justify-center text-3xl font-bold mb-6 gap-2 text-gray-300">
          Terms&nbsp;&amp;&nbsp;Conditions
        </h1>

        <div className="text-sm text-gray-500 dark:text-gray-400 mb-8 text-center">
          Last updated:&nbsp;3&nbsp;August&nbsp;2025
        </div>

        <div className="max-w-none">

          {/* Section 0 – Intro */}
          <section className="mb-10 prose dark:prose-invert">
            <p>
              These Terms&nbsp;&amp;&nbsp;Conditions (“<strong>Terms</strong>”) govern your access to and use
              of <strong>{SITE_TITLE}</strong> (<em>“Site”</em>), operated by&nbsp;
              <strong>[Company Name]</strong> (<em>“we”</em>, <em>“us”</em>, <em>“our”</em>). By continuing to use
              {` www.${DOMAIN_NAME}`} you agree to these Terms and to our&nbsp;
              <a href="/privacy-policy" className="text-teal-600 dark:text-teal-400 hover:underline">
                Privacy&nbsp;&amp;&nbsp;Cookie Policy
              </a>. If you do not agree, you must refrain from using the Site.
            </p>
          </section>

          {/* 1 Changes */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-teal-600 dark:text-teal-400">1. Changes to the Terms</h2>
            <p>
              We may revise these Terms at any time. The new version will appear on this page with an updated
              “Last updated” date. Your continued use of the Site after changes take effect constitutes acceptance.
            </p>
          </section>

          {/* 2 IP */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-teal-600 dark:text-teal-400">2. Intellectual Property</h2>
            <p>
              All articles, graphics, code, logos and other content are protected by copyright, trademark and
              other laws. You may view and share public pages for personal, non-commercial purposes if you keep
              all proprietary notices intact. Any other use (reproduction, modification, commercial exploitation)
              requires our prior written permission.
            </p>
          </section>

          {/* 3 Acceptable Use */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-teal-600 dark:text-teal-400">
              3. Acceptable Use
            </h2>
            <p className="mt-4">
              You may use this website for lawful purposes only. You may not misuse the website, attempt to gain unauthorized access, or interfere with its functionality.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-teal-600 dark:text-teal-400">
              4. Client Work and Portfolio
            </h2>
            <p>
              The showcased work represents projects completed by Gargofx and its collaborators. Such work may include projects created under client contracts. Display of client work does not grant permission for its reuse.
            </p>
          </section>

          {/* 5. Limitation of Liability */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-teal-600 dark:text-teal-400">
              5. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by law, Gargofx and Laurynas Gargasas shall not be liable for any damages, losses, or claims arising out of or related to your use of the website.

            </p>
          </section>

          {/* 6 Third-Party Links */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-teal-600 dark:text-teal-400">
              6. Third-Party Links &amp; Services
            </h2>
            <p>
              We may link to or embed third-party sites (e.g.&nbsp;YouTube). We are not responsible for their
              content or policies; you access them at your own risk.
            </p>
          </section>

          {/* 7 International Use */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-teal-600 dark:text-teal-400">
              7. International Use
            </h2>
            <p>
              We make no representation that this website or its content is appropriate or available for use outside Lithuania. Accessing the website from territories where its content is unlawful is prohibited. If you access the website from outside Lithuania, you do so at your own risk and responsibility.
            </p>
          </section>

          {/* 8 Disclaimer */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-teal-600 dark:text-teal-400">8. Disclaimer of Warranties</h2>
            <p>
              The Site and its content are provided “as is” and “as available” without warranties of any kind,
              express or implied (including merchantability, fitness for a particular purpose or non-infringement).
            </p>
          </section>



          {/* 8 Liability */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-teal-600 dark:text-teal-400">
              9. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by law, we are not liable for indirect, incidental, special,
              consequential or punitive damages, or loss of profits/revenues, arising from your use of the Site.
            </p>
          </section>

          {/* 9 Indemnity */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-teal-600 dark:text-teal-400">
              10. Indemnification
            </h2>
            <p>
              You agree to indemnify and hold us harmless from any claims, losses or expenses (including reasonable
              attorneys’ fees) arising out of your violation of these Terms or misuse of the Site.
            </p>
          </section>

          {/* 10 Law */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-teal-600 dark:text-teal-400">
              11. Governing Law&nbsp;&amp; Jurisdiction
            </h2>
            <p>
              These Terms are governed by the laws of Lithuania and, where applicable, EU consumer-protection law.
              Disputes shall be submitted to the courts of Vilnius, Lithuania, unless mandatory rules let you sue
              in your country of residence.
            </p>
          </section>

          {/* 11 Contact */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-teal-600 dark:text-teal-400">
              12. Contact
            </h2>
            <ul className="space-y-2">

              <li className="flex items-center">
                Laurynas Gargasas
              </li>
              <li className="flex items-center">
                <FiMail className="mr-2" />
                E-mail:&nbsp;
                <a
                  href={`mailto:contact@${SITE_NAME}.com`}
                  className="text-teal-600 dark:text-teal-400 hover:underline"
                >
                  contact@{SITE_NAME}.com
                </a>
              </li>
            </ul>
          </section>

          <div className="border-t dark:border-gray-600 pt-6 mt-10">
            <p className="italic">
              By continuing to use this Site, you acknowledge that you have read, understood and agree to these
              Terms&nbsp;&amp;&nbsp;Conditions.
            </p>
          </div>
        </div>
      </div>

      <div className="privacy-policy md:mx-auto max-w-4xl p-6 sm:p-12">
        <h1 className="flex items-center justify-center text-3xl font-bold mb-6 gap-2 text-gray-300 dark:text-gray-300">
          Privacy & Cookie Policy
        </h1>

        <div className="text-sm text-gray-500 dark:text-gray-400 mb-8 text-center">
          Last updated: 3 October 2025
        </div>

        <div className=" max-w-none">
          {/* Section 2 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-teal-600 dark:text-teal-400">1. The Data We Collect</h2>

            <figure className="rounded-lg border border-gray-200 dark:border-gray-600 mb-4">
              <div className="overflow-x-auto">
                <table className="min-w-[600px] text-sm w-full">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="py-2 px-4 border-b dark:border-gray-600 text-left">Category</th>
                      <th className="py-2 px-4 border-b dark:border-gray-600 text-left">Examples</th>
                      <th className="py-2 px-4 border-b dark:border-gray-600 text-left">Collected via</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2 px-4 border-b dark:border-gray-600">Contact Data</td>
                      <td className="py-2 px-4 border-b dark:border-gray-600">Name, e-mail address, message content</td>
                      <td className="py-2 px-4 border-b dark:border-gray-600">Contact-us form, direct e-mail</td>
                    </tr>

                    <tr>
                      <td className="py-2 px-4 border-b dark:border-gray-600">Usage Data</td>
                      <td className="py-2 px-4 border-b dark:border-gray-600">Pages viewed, clicks, referring URL, time on page</td>
                      <td className="py-2 px-4 border-b dark:border-gray-600">Google Analytics cookies</td>
                    </tr>

                    <tr>
                      <td className="py-2 px-4 border-b dark:border-gray-600">Device Data</td>
                      <td className="py-2 px-4 border-b dark:border-gray-600">IP address, browser type, OS, screen resolution</td>
                      <td className="py-2 px-4 border-b dark:border-gray-600">Google Analytics cookies</td>
                    </tr>

                    <tr>
                      <td className="py-2 px-4 border-b dark:border-gray-600">Advertising Data</td>
                      <td className="py-2 px-4 border-b dark:border-gray-600">
                        Ad impressions, ad clicks, coarse location <br />(country/region), device identifiers
                      </td>
                      <td className="py-2 px-4 border-b dark:border-gray-600">
                        Google AdSense cookies &amp; tags, Meta Pixel
                      </td>
                    </tr>

                  </tbody>
                </table>
              </div>
            </figure>



            <p className="italic">
              We do not intentionally collect sensitive personal data (e.g., health, race, political opinions).
              Please refrain from submitting such information.
            </p>
          </section>

          {/* Section 3 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-teal-600 dark:text-teal-400">2. How & Why We Collect It</h2>

            <figure className="rounded-lg border border-gray-200 dark:border-gray-600 mb-4">
              <div className="overflow-x-auto">
                <table className="min-w-[600px] text-sm w-full">
                  <thead className="bg-gray-700 dark:bg-gray-700">
                    <tr>
                      <th className="py-2 px-4 border-b dark:border-gray-600 text-left">Purpose</th>
                      <th className="py-2 px-4 border-b dark:border-gray-600 text-left">Legal Basis*</th>
                      <th className="py-2 px-4 border-b dark:border-gray-600 text-left">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2 px-4 border-b dark:border-gray-600">Analytics & performance</td>
                      <td className="py-2 px-4 border-b dark:border-gray-600">Consent (EU/UK) / Legitimate interest (elsewhere)</td>
                      <td className="py-2 px-4 border-b dark:border-gray-600">Understand traffic, improve content & UX</td>
                    </tr>
                    <tr>
                    </tr>

                    <tr>
                      <td className="py-2 px-4 border-b dark:border-gray-600">Affiliate link tracking</td>
                      <td className="py-2 px-4 border-b dark:border-gray-600">Legitimate interest / Consent</td>
                      <td className="py-2 px-4 border-b dark:border-gray-600">Track clicks & attribute commissions</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b dark:border-gray-600">Security & fraud prevention</td>
                      <td className="py-2 px-4 border-b dark:border-gray-600">Legitimate interest</td>
                      <td className="py-2 px-4 border-b dark:border-gray-600">Ensure the integrity of our systems</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </figure>
          </section>

          {/* Section 4 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-teal-600 dark:text-teal-400">3. Where & How We Store Your Data</h2>

            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li>
                <span className="font-semibold">MongoDB Atlas (EU cluster)</span> – Stores post/content records & contact messages.
              </li>
              <li>
                <span className="font-semibold">Firebase (Cloud Storage & Auth, EU multiregion)</span> – Stores images and manages newsletter login tokens.
              </li>
              <li>
                <span className="font-semibold">Mail Service Provider (e.g., MailerSend)</span> – Handles e-mail campaigns.
              </li>
            </ul>

            <p className="mb-4">
              All providers implement encryption in transit (TLS) and at rest (AES-256), role-based access controls,
              and independent security certifications (ISO 27001, SOC 2). We keep contact and newsletter data until
              you delete your account / unsubscribe or for as long as necessary to fulfil the purposes above.
            </p>
          </section>

          {/* Section 5 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-teal-600 dark:text-teal-400">4. Third-Party Services</h2>

            <figure className="rounded-lg border border-gray-200 dark:border-gray-600 mb-4">
              <div className="overflow-x-auto">
                <table className="min-w-[600px] text-sm w-full">
                  <thead className="bg-gray-700 dark:bg-gray-700">
                    <tr>
                      <th className="py-2 px-4 border-b dark:border-gray-600 text-left">Service</th>
                      <th className="py-2 px-4 border-b dark:border-gray-600 text-left">Purpose</th>
                      <th className="py-2 px-4 border-b dark:border-gray-600 text-left">Link to their Policy</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2 px-4 border-b dark:border-gray-600">Google Analytics 4</td>
                      <td className="py-2 px-4 border-b dark:border-gray-600">Traffic & performance stats</td>
                      <td className="py-2 px-4 border-b dark:border-gray-600">
                        <a
                          href="https://policies.google.com/privacy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-teal-600 dark:text-teal-400 hover:underline flex items-center"
                        >
                          View <FiExternalLink className="ml-1" size={14} />
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b dark:border-gray-600">Google AdSense</td>
                      <td className="py-2 px-4 border-b dark:border-gray-600">Ad serving &amp; reporting</td>
                      <td className="py-2 px-4 border-b dark:border-gray-600">
                        <a
                          href="https://policies.google.com/technologies/ads"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-teal-600 dark:text-teal-400 hover:underline flex items-center"
                        >
                          View <FiExternalLink className="ml-1" size={14} />
                        </a>
                      </td>
                    </tr>

                    <tr>
                      <td className="py-2 px-4 border-b dark:border-gray-600">Firebase by Google</td>
                      <td className="py-2 px-4 border-b dark:border-gray-600">Image storage, e-mail auth</td>
                      <td className="py-2 px-4 border-b dark:border-gray-600">
                        <a
                          href="https://firebase.google.com/support/privacy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-teal-600 dark:text-teal-400 hover:underline flex items-center"
                        >
                          View <FiExternalLink className="ml-1" size={14} />
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b dark:border-gray-600">MongoDB Atlas</td>
                      <td className="py-2 px-4 border-b dark:border-gray-600">Managed database</td>
                      <td className="py-2 px-4 border-b dark:border-gray-600">
                        <a
                          href="https://www.mongodb.com/legal/privacy-policy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-teal-600 dark:text-teal-400 hover:underline flex items-center"
                        >
                          View <FiExternalLink className="ml-1" size={14} />
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </figure>
          </section>

          {/* Section 6 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-teal-600 dark:text-teal-400">5. Cookies & Similar Technologies</h2>

            <p className="mb-4">
              <span className="font-semibold">What are cookies?</span> Cookies are small text files stored on your device when you visit a website. We use:
            </p>

            <figure className="rounded-lg border border-gray-200 dark:border-gray-600 mb-4">
              <div className="overflow-x-auto">
                <table className="min-w-[600px] text-sm w-full">
                  <thead className="bg-gray-700 dark:bg-gray-700">
                    <tr>
                      <th className="py-2 px-4 border-b dark:border-gray-600 text-left">Type</th>
                      <th className="py-2 px-4 border-b dark:border-gray-600 text-left">Purpose</th>
                      <th className="py-2 px-4 border-b dark:border-gray-600 text-left">Lifespan</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2 px-4 border-b dark:border-gray-600">Strictly Necessary</td>
                      <td className="py-2 px-4 border-b dark:border-gray-600">Remember cookie-consent choice, load-balancing</td>
                      <td className="py-2 px-4 border-b dark:border-gray-600">up to 12 months</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b dark:border-gray-600">Analytics</td>
                      <td className="py-2 px-4 border-b dark:border-gray-600">Measure traffic & user behaviour (Google Analytics)</td>
                      <td className="py-2 px-4 border-b dark:border-gray-600">up to 14 months</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b dark:border-gray-600">Functional</td>
                      <td className="py-2 px-4 border-b dark:border-gray-600">Persist theme (dark/light) preference</td>
                      <td className="py-2 px-4 border-b dark:border-gray-600">up to 12 months</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b dark:border-gray-600">Advertising / AdSense</td>
                      <td className="py-2 px-4 border-b dark:border-gray-600">
                        Deliver personalised or non-personalised ads, limit ad frequency
                      </td>
                      <td className="py-2 px-4 border-b dark:border-gray-600">up to 13 months</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </figure>
          </section>

          {/* Section 7 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-teal-600 dark:text-teal-400">6. Your Rights (GDPR & similar laws)</h2>

            <p className="mb-4">
              You may, at any time:
            </p>

            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li>
                <span className="font-semibold">Access</span> – Ask for a copy of personal data we hold about you.
              </li>
              <li>
                <span className="font-semibold">Rectify</span> – Request correction of inaccurate or incomplete data.
              </li>
              <li>
                <span className="font-semibold">Erase (&quot;Right to be forgotten&quot;)</span> – Ask us to delete your data where no legal reason to keep it exists.
              </li>
              <li>
                <span className="font-semibold">Restrict processing</span> – Ask us to pause processing while a dispute is resolved.
              </li>
              <li>
                <span className="font-semibold">Data portability</span> – Receive your data in a machine-readable format.
              </li>
              <li>
                <span className="font-semibold">Object</span> – Object to processing based on legitimate interests or direct marketing.
              </li>
              <li>
                <span className="font-semibold">Withdraw consent</span> – Where processing is based on consent, you may withdraw it at any time (e.g., unsubscribe link).
              </li>
              <li>
                <span className="font-semibold">Lodge a complaint</span> – Contact your local data-protection authority (e.g., Lithuanian DPA or EU supervisory authority).
              </li>
            </ul>

            <h3 className="text-xl font-semibold mb-2 mt-6">How to exercise these rights</h3>
            <p>
              Send an e-mail to <a href={`mailto:privacy@${SITE_NAME}.com`} className="text-teal-600 dark:text-teal-400 hover:underline">privacy@{SITE_NAME}.com</a> or use the &quot;Privacy Request&quot; form. We will respond within 30 days.
            </p>
          </section>

          {/* Section 8 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-teal-600 dark:text-teal-400">7. International Transfers</h2>
            <p>
              Your data may be processed in countries outside the EEA/UK (e.g., US). We rely on EU–US Data Privacy Framework or Standard Contractual Clauses to protect it.
            </p>
          </section>

          {/* Section 9 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-teal-600 dark:text-teal-400">8. Changes to This Policy</h2>
            <p>
              We may update this Policy periodically. We will post the new version and, if changes are significant, notify subscribers by e-mail. Check &quot;Last updated&quot; date for current version.
            </p>
          </section>

          {/* Section 10 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-teal-600 dark:text-teal-400">9. Contact Us</h2>
            <p className="mb-4">
              For privacy-related inquiries, please contact:
            </p>
            <ul className="space-y-2">

              <li className="flex items-center">
                Laurynas Gargasas
              </li>

              <li className="flex items-center">
                <FiMail className="mr-2" />
                E-mail:
                <a href={`mailto:contact@${SITE_NAME}.com`}
                  className="text-teal-600 dark:text-teal-400 hover:underline ml-1">contact@{SITE_NAME}.com
                </a>
              </li>
            </ul>
          </section>

          <div className="border-t dark:border-gray-600 pt-6 mt-10">
            <p className="italic">
              By continuing to use this Site, you acknowledge that you have read and understood this Privacy & Cookie Policy.
            </p>
          </div>
        </div>
      </div>
    </main>

  );
};

export default TermsAndConditions;