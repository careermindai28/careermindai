'use client';

import { useState, useEffect } from 'react';
import FileUploadZone from './FileUploadZone';
import JobDescriptionInput from './JobDescriptionInput';
import AuditFormFields from './AuditFormFields';
import LoadingState from './LoadingState';
import AuditResults from './AuditResults';
import Icon from '@/components/ui/AppIcon';

interface FormErrors {
  file: string;
  jobDescription: string;
  targetRole: string;
  companyName: string;
}

interface Strength {
  title: string;
  description: string;
}

interface Improvement {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
}

interface ATSRecommendation {
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
}

interface AuditResultsData {
  resumeMindScore: number;
  strengths: Strength[];
  improvements: Improvement[];
  atsCompatibility: number;
  atsRecommendations: ATSRecommendation[];
}

const ResumeAuditInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [region, setRegion] = useState('india');
  const [jobType, setJobType] = useState('full-time');
  const [errors, setErrors] = useState<FormErrors>({
    file: '',
    jobDescription: '',
    targetRole: '',
    companyName: '',
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [auditResults, setAuditResults] = useState<AuditResultsData | null>(null);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      file: '',
      jobDescription: '',
      targetRole: '',
      companyName: '',
    };

    if (!selectedFile) {
      newErrors.file = 'Please upload your resume';
    }

    if (!jobDescription.trim()) {
      newErrors.jobDescription = 'Job description is required';
    } else if (jobDescription.trim().length < 100) {
      newErrors.jobDescription = 'Job description should be at least 100 characters';
    }

    if (!targetRole.trim()) {
      newErrors.targetRole = 'Target role is required';
    }

    if (!companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== '');
  };

  const generateMockResults = (): AuditResultsData => {
    const mockResults: AuditResultsData = {
      resumeMindScore: 78,
      strengths: [
        {
          title: 'Strong Technical Skills Section',
          description:
            'Your technical skills are well-organized and include relevant technologies for the target role. The categorization makes it easy for recruiters to scan.',
        },
        {
          title: 'Quantified Achievements',
          description:
            'You have effectively used metrics and numbers to demonstrate impact in previous roles, which helps showcase your value proposition.',
        },
        {
          title: 'Clear Professional Summary',
          description:
            'Your professional summary is concise and highlights key qualifications that align with the job requirements.',
        },
        {
          title: 'Relevant Work Experience',
          description:
            'Your work history demonstrates progressive responsibility and relevant experience for the target position.',
        },
      ],
      improvements: [
        {
          title: 'Add More Industry Keywords',
          description:
            'Include specific keywords from the job description such as "cloud architecture", "microservices", and "DevOps practices" to improve ATS matching.',
          priority: 'high',
        },
        {
          title: 'Optimize Section Headings',
          description:
            'Use standard section headings like "Professional Experience" instead of creative alternatives to ensure ATS compatibility.',
          priority: 'high',
        },
        {
          title: 'Expand Project Descriptions',
          description:
            'Provide more context about your projects, including technologies used, team size, and measurable outcomes.',
          priority: 'medium',
        },
        {
          title: 'Include Certifications Section',
          description:
            'Add a dedicated certifications section if you have relevant professional certifications for the role.',
          priority: 'medium',
        },
        {
          title: 'Improve Action Verb Variety',
          description:
            'Use a wider variety of strong action verbs to describe your accomplishments and avoid repetition.',
          priority: 'low',
        },
      ],
      atsCompatibility: 72,
      atsRecommendations: [
        {
          title: 'Use Standard Fonts',
          description:
            'Stick to ATS-friendly fonts like Arial, Calibri, or Times New Roman. Avoid decorative or custom fonts that may not parse correctly.',
          impact: 'high',
        },
        {
          title: 'Remove Tables and Text Boxes',
          description:
            'ATS systems often struggle with complex formatting. Replace tables and text boxes with simple bullet points and standard sections.',
          impact: 'high',
        },
        {
          title: 'Simplify Header/Footer',
          description:
            'Move contact information from header/footer to the main body of the resume to ensure ATS can extract it properly.',
          impact: 'medium',
        },
        {
          title: 'Add Skills Section Keywords',
          description:
            'Create a dedicated skills section with exact keyword matches from the job description to improve ATS ranking.',
          impact: 'high',
        },
        {
          title: 'Use Standard Date Format',
          description:
            'Format dates consistently as "MM/YYYY - MM/YYYY" or "Month YYYY - Month YYYY" for better ATS parsing.',
          impact: 'low',
        },
      ],
    };

    return mockResults;
  };

  const handleAnalyze = async () => {
    if (!validateForm()) {
      return;
    }

    setIsAnalyzing(true);

    await new Promise((resolve) => setTimeout(resolve, 7000));

    const results = generateMockResults();
    setAuditResults(results);
    setIsAnalyzing(false);
  };

  const handleExportPDF = () => {
    console.log('Exporting audit results as PDF...');
    alert('PDF export functionality will be implemented. Your audit report would be downloaded.');
  };

  const handleStartOver = () => {
    setSelectedFile(null);
    setJobDescription('');
    setTargetRole('');
    setCompanyName('');
    setRegion('india');
    setJobType('full-time');
    setErrors({
      file: '',
      jobDescription: '',
      targetRole: '',
      companyName: '',
    });
    setAuditResults(null);
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-64 bg-muted rounded"></div>
            <div className="h-48 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <LoadingState isVisible={isAnalyzing} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {!auditResults ? (
          <>
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-6 border border-primary/20">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Icon name="SparklesIcon" size={24} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-2">
                    Get Your ResumeMind Score<sup>TM</sup>
                  </h2>
                  <p className="text-sm text-text-secondary">
                    Upload your resume and job description to receive a comprehensive AI-powered
                    audit with actionable insights to beat ATS systems and land more interviews.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-surface rounded-xl border border-border p-6 space-y-6">
              <FileUploadZone
                onFileSelect={setSelectedFile}
                selectedFile={selectedFile}
                error={errors.file}
              />

              <JobDescriptionInput
                value={jobDescription}
                onChange={setJobDescription}
                error={errors.jobDescription}
              />

              <AuditFormFields
                targetRole={targetRole}
                companyName={companyName}
                region={region}
                jobType={jobType}
                onTargetRoleChange={setTargetRole}
                onCompanyNameChange={setCompanyName}
                onRegionChange={setRegion}
                onJobTypeChange={setJobType}
                errors={{
                  targetRole: errors.targetRole,
                  companyName: errors.companyName,
                }}
              />

              <div className="pt-4 border-t border-border">
                <button
                  onClick={handleAnalyze}
                  className="w-full sm:w-auto px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-150 shadow-card hover:shadow-elevation flex items-center justify-center space-x-2"
                >
                  <Icon name="DocumentMagnifyingGlassIcon" size={20} />
                  <span>Analyze Resume</span>
                </button>
              </div>
            </div>

            <div className="bg-accent/5 border border-accent/20 rounded-xl p-6">
              <div className="flex items-start space-x-3">
                <Icon name="InformationCircleIcon" size={24} className="text-accent flex-shrink-0 mt-1" />
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">What You'll Get</h3>
                  <ul className="space-y-1.5 text-sm text-text-secondary">
                    <li className="flex items-start space-x-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Comprehensive ResumeMind Score<sup>TM</sup> (0-100) based on industry standards</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Detailed ATS compatibility analysis with specific recommendations</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Identified strengths and areas for improvement with priority levels</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Actionable suggestions to optimize your resume for the target role</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        ) : (
          <AuditResults
            results={auditResults}
            onExportPDF={handleExportPDF}
            onStartOver={handleStartOver}
          />
        )}
      </div>
    </>
  );
};

export default ResumeAuditInteractive;