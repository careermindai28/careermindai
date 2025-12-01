import type { Metadata } from 'next';
import DashboardSidebar from '@/components/common/DashboardSidebar';
import Breadcrumb from '@/components/common/Breadcrumb';
import ResumeAuditInteractive from './components/ResumeAuditInteractive';

export const metadata: Metadata = {
  title: 'Resume Audit Tool - CareerMindAI',
  description:
    'Get AI-powered analysis of your resume with ResumeMind Score, ATS compatibility check, and actionable improvement suggestions to optimize your job applications.',
};

export default function ResumeAuditToolPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />

      <main className="flex-1 lg:ml-72">
        <div className="sticky top-0 z-50 bg-surface border-b border-border px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Resume Audit Tool</h1>
              <Breadcrumb className="mt-2" />
            </div>
          </div>
        </div>

        <ResumeAuditInteractive />
      </main>
    </div>
  );
}