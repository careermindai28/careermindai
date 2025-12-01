import type { Metadata } from 'next';
import DashboardSidebar from '@/components/common/DashboardSidebar';
import Breadcrumb from '@/components/common/Breadcrumb';
import ResumeBuilderInteractive from './components/ResumeBuilderInteractive';

export const metadata: Metadata = {
  title: 'AI Resume Builder - CareerMindAI',
  description: 'Create ATS-optimized resumes with AI-powered content suggestions, professional templates, and real-time preview to enhance your job application success.',
};

export default function AIResumeBuilderPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      
      <main className="flex-1 lg:ml-72">
        <div className="sticky top-0 z-50 bg-surface border-b border-border px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb />
        </div>
        
        <ResumeBuilderInteractive />
      </main>
    </div>
  );
}