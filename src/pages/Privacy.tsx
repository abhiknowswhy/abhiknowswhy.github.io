import { motion } from 'framer-motion';
import { Shield, AlertCircle, Eye, Cookie } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-12"
      >
        {/* Header */}
        <div className="text-center">
          <Shield className="h-16 w-16 text-blue-500 mx-auto mb-4" />
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
            I value your privacy and want to be transparent about how I collect and use data.
          </p>
        </div>

        {/* Last Updated */}
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Last updated: September 1, 2023
          </p>
        </div>
        
        {/* Privacy Policy Content */}
        <div className="prose prose-blue dark:prose-invert mx-auto">
          <h2>Introduction</h2>
          <p>
            This Privacy Policy explains how I collect, use, and disclose information from visitors 
            of my personal portfolio website. I respect your privacy and am committed to protecting it.
          </p>
          
          <h2>Information Collection</h2>
          <div className="flex items-start space-x-3 mb-4">
            <Eye className="h-5 w-5 text-blue-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-medium">Information You Provide</h3>
              <p>
                When you contact me through the contact form, I collect your name, email address, and 
                any message content you provide. This information is used solely to respond to your inquiries.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 mb-4">
            <Cookie className="h-5 w-5 text-blue-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-medium">Cookies & Analytics</h3>
              <p>
                This website uses cookies to enhance your browsing experience and analyze site traffic. 
                I use Google Analytics to understand how visitors interact with my website. The analytics data 
                is anonymized and does not personally identify you.
              </p>
            </div>
          </div>
          
          <h2>How I Use Your Information</h2>
          <p>I use the information I collect to:</p>
          <ul>
            <li>Respond to your inquiries and messages</li>
            <li>Improve the website and user experience</li>
            <li>Analyze website traffic and usage patterns</li>
            <li>Protect against unauthorized access</li>
          </ul>
          
          <h2>Information Sharing</h2>
          <p>
            I do not sell, trade, or otherwise transfer your personally identifiable information to 
            third parties. This does not include trusted third parties who assist me in operating my 
            website or servicing you, as long as those parties agree to keep this information confidential.
          </p>
          
          <h2>Data Security</h2>
          <p>
            I implement appropriate security measures to protect your personal information. However, 
            no method of transmission over the Internet or electronic storage is 100% secure, and I 
            cannot guarantee absolute security.
          </p>
          
          <h2>Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access the personal information I hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt-out of cookies and analytics</li>
          </ul>
          
          <h2>Changes to This Policy</h2>
          <p>
            I may update this Privacy Policy from time to time. I will notify you of any changes by 
            posting the new Privacy Policy on this page and updating the "Last Updated" date.
          </p>
          
          <h2>Contact Me</h2>
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-1" />
            <div>
              <p>
                If you have any questions about this Privacy Policy, please contact me through the 
                Contact page or by email at: <a href="mailto:your.email@example.com" className="text-blue-600 dark:text-blue-400 hover:underline">your.email@example.com</a>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
