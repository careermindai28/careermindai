import type { Metadata } from 'next';
import PublicHeader from '@/components/common/PublicHeader';
import FooterSection from '../landing-page/components/FooterSection';
import PolicyContent from './components/PolicyContent';
import PolicyNavigation from './components/PolicyNavigation';

export const metadata: Metadata = {
  title: 'CareerMindAI Privacy Policy',
  description:
    'Learn how CareerMindAI collects, uses, and protects your personal data. We prioritize your privacy and never store government identity numbers.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      <main className="py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Last updated: December 2, 2025
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <PolicyNavigation />
            </div>
            <div className="lg:col-span-3">
              <PolicyContent />
            </div>
          </div>
        </div>
      </main>
      <FooterSection />
    </div>
  );
}