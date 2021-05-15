<template>
  <div class="tw-break-words">
    <UnsignedNavigation v-if="! $store.getters.isLoggedIn" class="tw-pb-6">
      <div class="tw-text-center tw-text-white tw-uppercase tw-font-medium tw-text-2xl lg:tw-text-3xl tw-tracking-wider">
        Privacy
      </div>
      <div class="tw-text-center tw-text-white tw-text-sm tw-tracking-wider">
        Last updated June 11, 2020
      </div>
    </UnsignedNavigation>

    <div v-else class="tw-text-center lg:tw-text-left tw-font-medium tw-text-2xl lg:tw-text-3xl tw-tracking-wider tw-mb-6">
      <span class="tw-uppercase">
        Privacy
      </span>

      <div class="tw-text-sm tw-tracking-wider">
        Last updated June 11, 2020
      </div>
    </div>

    <div :class="{ 'tw-container tw-mx-auto tw-my-6 tw-px-4' : ! $store.getters.isLoggedIn }">
      <div class="tw-mb-6">
        <div class="tw-mb-3 tw-text-sm">
          Thank you for choosing to be part of our community at GemEarn (“company”, “we”, “us”, or “our”). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information.
        </div>

        <div class="tw-mb-3 tw-text-sm">
          When you visit our website https://gemearn.com, and use our services, you trust us with your personal information. We take your privacy very seriously. In this privacy notice, we describe our privacy policy. We seek to explain to you in the clearest way possible what information we collect, how we use it and what rights you have in relation to it. We hope you take some time to read through it carefully, as it is important. If there are any terms in this privacy policy that you do not agree with, please discontinue use of our Sites and our services.
        </div>

        <div class="tw-mb-3 tw-text-sm">
          This privacy policy applies to all information collected through our website (such as https://gemearn.com), and/or any related services, sales, marketing or events (we refer to them collectively in this privacy policy as the "Sites").
        </div>

        <div class="tw-mb-3 tw-font-medium tw-text-sm">
          Please read this privacy policy carefully as it will help you make informed decisions about sharing your personal information with us.
        </div>
      </div>

      <div class="tw-mb-6">
        <div class="tw-font-medium tw-text-lg lg:tw-text-xl tw-tracking-wider tw-uppercase tw-mb-3">
          WHAT INFORMATION DO WE COLLECT?
        </div>

        <div class="tw-font-medium lg:tw-text-lg tw-tracking-wider tw-mb-3">
          Information automatically collected
        </div>

        <div class="tw-mb-3 tw-text-sm">
          In Short: Some information – such as IP address and/or browser and device characteristics – is collected automatically when you visit our Sites.
        </div>

        <div class="tw-mb-3 tw-text-sm">
          We automatically collect certain information when you visit, use or navigate the Sites. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Sites and other technical information. This information is primarily needed to maintain the security and operation of our Sites, and for our internal analytics and reporting purposes.
        </div>

        <div class="tw-mb-3 tw-text-sm">
          Like many businesses, we also collect information through cookies and similar technologies.
        </div>

        <div class="tw-font-medium lg:tw-text-lg tw-tracking-wider tw-mb-3">
          Information collected from other sources
        </div>

        <div class="tw-mb-3 tw-text-sm">
          In Short: We may collect limited data from public databases, marketing partners, and other outside sources.
        </div>

        <div class="tw-mb-3 tw-text-sm">
          We may obtain information about you from other sources, such as public databases, joint marketing partners, as well as from other third parties. Examples of the information we receive from other sources include: social media profile information; marketing leads and search results and links, including paid listings (such as sponsored links).
        </div>
      </div>

      <div class="tw-mb-6">
        <div class="tw-font-medium tw-text-lg lg:tw-text-xl tw-tracking-wider tw-uppercase tw-mb-3">
          HOW DO WE USE YOUR INFORMATION?
        </div>

        <div class="tw-mb-3 tw-text-sm">
          In Short: We process your information for purposes based on legitimate business interests, the fulfillment of our contract with you, compliance with our legal obligations, and/or your consent.
        </div>

        <div class="tw-mb-3 tw-text-sm">
          We use personal information collected via our Sites for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests ("Business Purposes"), in order to enter into or perform a contract with you ("Contractual"), with your consent ("Consent"), and/or for compliance with our legal obligations ("Legal Reasons"). We indicate the specific processing grounds we rely on next to each purpose listed below.
        </div>

        <div class="tw-mb-3 tw-text-sm">
          We use the information we collect or receive:
        </div>

        <ul class="tw-list-disc tw-pl-8 tw-mb-3 tw-text-sm">
          <li>
            To facilitate account creation and logon process. If you choose to link your account with us to a third party account *(such as your Google or Facebook account), we use the information you allowed us to collect from those third parties to facilitate account creation and logon process.
          </li>
          <li>
            Administer prize draws and competitions. We may use your information to administer prize draws and competitions when you elect to participate in competitions.
          </li>
          <li>
            To protect our Sites. We may use your information as part of our efforts to keep our Sites safe and secure (for example, for fraud monitoring and prevention).
          </li>
          <li>
            To enforce our terms, conditions and policies.
          </li>
          <li>
            To respond to legal requests and prevent harm. If we receive a subpoena or other legal request, we may need to inspect the data we hold to determine how to respond.
          </li>
          <li>
            For other Business Purposes. We may use your information for other Business Purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our Sites, products, services, marketing and your experience.
          </li>
        </ul>
      </div>

      <div class="tw-mb-6">
        <div class="tw-font-medium tw-text-lg lg:tw-text-xl tw-tracking-wider tw-uppercase tw-mb-3">
          WILL YOUR INFORMATION BE SHARED WITH ANYONE?
        </div>

        <div class="tw-mb-3 tw-text-sm">
          In Short: We only share information with your consent, to comply with laws, to protect your rights, or to fulfill business obligations.
        </div>

        <div class="tw-mb-3 tw-text-sm">
          We may process or share data based on the following legal basis:
        </div>

        <ul class="tw-list-disc tw-pl-8 tw-mb-3 tw-text-sm">
          <li>
            Consent: We may process your data if you have given us specific consent to use your personal information in a specific purpose.
          </li>
          <li>
            Legitimate Interests: We may process your data when it is reasonably necessary to achieve our legitimate business interests.
          </li>
          <li>
            Performance of a Contract: Where we have entered into a contract with you, we may process your personal information to fulfill the terms of our contract.
          </li>
          <li>
            Legal Obligations: We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process, such as in response to a court order or a subpoena (including in response to public authorities to meet national security or law enforcement requirements).
          </li>
          <li>
            Vital Interests: We may disclose your information where we believe it is necessary to investigate, prevent, or take action regarding potential violations of our policies, suspected fraud, situations involving potential threats to the safety of any person and illegal activities, or as evidence in litigation in which we are involved.
          </li>
        </ul>

        <div class="tw-mb-3 tw-text-sm">
          More specifically, we may need to process your data or share your personal information in the following situations:
        </div>

        <ul class="tw-list-disc tw-pl-8 tw-mb-3 tw-text-sm">
          <li>
            Vendors, Consultants and Other Third-Party Service Providers. We may share your data with third party vendors, service providers, contractors or agents who perform services for us or on our behalf and require access to such information to do that work. Examples include: payment processing, data analysis, email delivery, hosting services, customer service and marketing efforts. We may allow selected third parties to use tracking technology on the Sites, which will enable them to collect data about how you interact with the Sites over time. This information may be used to, among other things, analyze and track data, determine the popularity of certain content and better understand online activity. Unless described in this Policy, we do not share, sell, rent or trade any of your information with third parties for their promotional purposes.
          </li>
          <li>
            Business Transfers. We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.
          </li>
          <li>
            Third-Party Advertisers. We may use third-party advertising companies to serve ads when you visit the Sites. These companies may use information about your visits to our Website(s) and other websites that are contained in web cookies and other tracking technologies in order to provide advertisements about goods and services of interest to you.
          </li>
          <li>
            Affiliates. We may share your information with our affiliates, in which case we will require those affiliates to honor this privacy policy. Affiliates include our parent company and any subsidiaries, joint venture partners or other companies that we control or that are under common control with us.
          </li>
        </ul>
      </div>

      <div class="tw-mb-6">
        <div class="tw-font-medium tw-text-lg lg:tw-text-xl tw-tracking-wider tw-uppercase tw-mb-3">
          WHO WILL YOUR INFORMATION BE SHARED WITH?        </div>

        <div class="tw-mb-3 tw-text-sm">
          In Short:  We only share information with the following third parties.
        </div>

        <div class="tw-mb-3 tw-text-sm">
          We only share and disclose your information with the following third parties. We have categorized each party so that you may be easily understand the purpose of our data collection and processing practices. If we have processed your data based on your consent and you wish to revoke your consent, please contact us.
        </div>

        <ul class="tw-list-disc tw-pl-8 tw-mb-3 tw-text-sm">
          <li>
            <b>Content Optimisation</b>
            <br>
            Google Fonts
          </li>
          <li>
            <b>Content Optimisation</b>
            <br>
            Google Fonts
          </li>
          <li>
            <b>Web and Mobile Analytics</b>
            <br>
            Google Analytics and OneSignal
          </li>
          <li>
            <b>Website Testing</b>
            <br>
            Cloudflare
          </li>
        </ul>
      </div>

      <div class="tw-mb-6">
        <div class="tw-font-medium tw-text-lg lg:tw-text-xl tw-tracking-wider tw-uppercase tw-mb-3">
          DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
        </div>

        <div class="tw-mb-3 tw-text-sm">
          In Short: We may use cookies and other tracking technologies to collect and store your information.
        </div>

        <div class="tw-mb-3 tw-text-sm">
          We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Policy.
        </div>
      </div>

      <div class="tw-mb-6">
        <div class="tw-font-medium tw-text-lg lg:tw-text-xl tw-tracking-wider tw-uppercase tw-mb-3">
          WHAT IS OUR STANCE ON THIRD-PARTY WEBSITES?
        </div>

        <div class="tw-mb-3 tw-text-sm">
          In Short: We are not responsible for the safety of any information that you share with third-party providers who advertise, but are not affiliated with, our websites.
        </div>

        <div class="tw-mb-3 tw-text-sm">
          The Sites may contain advertisements from third parties that are not affiliated with us and which may link to other websites, online services or mobile applications. We cannot guarantee the safety and privacy of data you provide to any third parties. Any data collected by third parties is not covered by this privacy policy. We are not responsible for the content or privacy and security practices and policies of any third parties, including other websites, services or applications that may be linked to or from the Sites. You should review the policies of such third parties and contact them directly to respond to your questions.
        </div>
      </div>

      <div class="tw-mb-6">
        <div class="tw-font-medium tw-text-lg lg:tw-text-xl tw-tracking-wider tw-uppercase tw-mb-3">
          HOW LONG DO WE KEEP YOUR INFORMATION?
        </div>

        <div class="tw-mb-3 tw-text-sm">
          In Short: We keep your information for as long as necessary to fulfill the purposes outlined in this privacy policy unless otherwise required by law.
        </div>

        <div class="tw-mb-3 tw-text-sm">
          We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy policy, unless a longer retention period is required or permitted by law (such as tax, accounting or other legal requirements). No purpose in this policy will require us keeping your personal information for longer than the period of time in which users have an account with us.
        </div>

        <div class="tw-mb-3 tw-text-sm">
          When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize it, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.
        </div>
      </div>

      <div class="tw-mb-6">
        <div class="tw-font-medium tw-text-lg lg:tw-text-xl tw-tracking-wider tw-uppercase tw-mb-3">
          HOW DO WE KEEP YOUR INFORMATION SAFE?
        </div>

        <div class="tw-mb-3 tw-text-sm">
          In Short: We aim to protect your personal information through a system of organisational and technical security measures.
        </div>

        <div class="tw-mb-3 tw-text-sm">
          We have implemented appropriate technical and organisational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure. Although we will do our best to protect your personal information, transmission of personal information to and from our Sites is at your own risk. You should only access the services within a secure environment.
        </div>
      </div>

      <div class="tw-mb-6">
        <div class="tw-font-medium tw-text-lg lg:tw-text-xl tw-tracking-wider tw-uppercase tw-mb-3">
          DO WE COLLECT INFORMATION FROM MINORS?
        </div>

        <div class="tw-mb-3 tw-text-sm">
          In Short: We do not knowingly collect data from or market to children under 18 years of age.
        </div>

        <div class="tw-mb-3 tw-text-sm">
          We do not knowingly solicit data from or market to children under 18 years of age. By using the Sites, you represent that you are at least 18 or that you are the parent or guardian of such a minor and consent to such minor dependent’s use of the Sites. If we learn that personal information from users less than 18 years of age has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records. If you become aware of any data we have collected from children under age 18.
        </div>
      </div>

      <div class="tw-mb-6">
        <div class="tw-font-medium tw-text-lg lg:tw-text-xl tw-tracking-wider tw-uppercase tw-mb-3">
          WHAT ARE YOUR PRIVACY RIGHTS?
        </div>

        <div class="tw-mb-3 tw-text-sm">
          In Short: In some regions, such as the European Economic Area, you have rights that allow you greater access to and control over your personal information. You may review, change, or terminate your account at any time.
        </div>

        <div class="tw-mb-3 tw-text-sm">
          In some regions (like the European Economic Area), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; and (iv) if applicable, to data portability. In certain circumstances, you may also have the right to object to the processing of your personal information. To make such a request, please use the contact details provided below. We will consider and act upon any request in accordance with applicable data protection laws.
        </div>

        <div class="tw-mb-3 tw-text-sm">
          If we are relying on your consent to process your personal information, you have the right to withdraw your consent at any time. Please note however that this will not affect the lawfulness of the processing before its withdrawal.
        </div>

        <div class="tw-mb-3 tw-text-sm">
          If you are resident in the European Economic Area and you believe we are unlawfully processing your personal information, you also have the right to complain to your local data protection supervisory authority. You can find their contact details here: http://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm
        </div>
      </div>

      <div class="tw-mb-6">
        <div class="tw-font-medium tw-text-lg lg:tw-text-xl tw-tracking-wider tw-uppercase tw-mb-3">
          Account Information
        </div>

        <div class="tw-mb-3 tw-text-sm">
          If you would at any time like to review or change the information in your account or terminate your account, you can contact us using the contact information provided.
        </div>

        <div class="tw-mb-3 tw-text-sm">
          Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, some information may be retained in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our Terms of Use and/or comply with legal requirements.
        </div>

        <div class="tw-mb-3 tw-text-sm">
          Cookies and similar technologies:  Most Web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove cookies and to reject cookies. If you choose to remove cookies or reject cookies, this could affect certain features or services of our Sites. To opt-out of interest-based advertising by advertisers on our Sites visit http://www.aboutads.info/choices/.
        </div>

        <div class="tw-mb-3 tw-text-sm">
          Opting out of email marketing: You can unsubscribe from our marketing email list at any time by clicking on the unsubscribe link in the emails that we send or by contacting us using the details provided below. You will then be removed from the marketing email list – however, we will still need to send you service-related emails that are necessary for the administration and use of your account. To otherwise opt-out, you may contact us using the contact information provided.
        </div>
      </div>

      <div class="tw-mb-6">
        <div class="tw-font-medium tw-text-lg lg:tw-text-xl tw-tracking-wider tw-uppercase tw-mb-3">
          DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
        </div>

        <div class="tw-mb-3 tw-text-sm">
          In Short: Yes, if you are a resident of California, you are granted specific rights regarding access to your personal information.
        </div>

        <div class="tw-mb-3 tw-text-sm">
          California Civil Code Section 1798.83, also known as the “Shine The Light” law, permits our users who are California residents to request and obtain from us, once a year and free of charge, information about categories of personal information (if any) we disclosed to third parties for direct marketing purposes and the names and addresses of all third parties with which we shared personal information in the immediately preceding calendar year. If you are a California resident and would like to make such a request, please submit your request in writing to us using the contact information provided below.
        </div>

        <div class="tw-mb-3 tw-text-sm">
          If you are under 18 years of age, reside in California, and have a registered account with the Sites, you have the right to request removal of unwanted data that you publicly post on the Sites. To request removal of such data, please contact us using the contact information provided below, and include the email address associated with your account and a statement that you reside in California. We will make sure the data is not publicly displayed on the Sites, but please be aware that the data may not be completely or comprehensively removed from our systems.
        </div>
      </div>

      <div class="tw-mb-6">
        <div class="tw-font-medium tw-text-lg lg:tw-text-xl tw-tracking-wider tw-uppercase tw-mb-3">
          DO WE MAKE UPDATES TO THIS POLICY?
        </div>

        <div class="tw-mb-3 tw-text-sm">
          In Short: Yes, we will update this policy as necessary to stay compliant with relevant laws.
        </div>

        <div class="tw-mb-3 tw-text-sm">
          We may update this privacy policy from time to time. The updated version will be indicated by an updated “Revised” date and the updated version will be effective as soon as it is accessible. If we make material changes to this privacy policy, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this privacy policy frequently to be informed of how we are protecting your information.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UnsignedNavigation from "@/components/UnsignedNavigation";

export default {
  name: 'Privacy',
  title: 'Privacy',
  components: {
    UnsignedNavigation,
  }
}
</script>