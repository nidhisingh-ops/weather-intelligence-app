import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  Github,
  Cloud,
  FileCheck,
  HelpCircle,
  AlertTriangle,
} from 'lucide-react';

interface DeploymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeploymentModal: React.FC<DeploymentModalProps> = ({ isOpen, onClose }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div
      id="deployment-guide-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-sky-500 text-white shadow-sm">
              <Cloud className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Cloudflare Pages & GitHub Deployment Guide
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Step-by-step checklist for L2 Assignment completion and submission
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* Notice Banner */}
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 rounded-2xl p-4 flex items-start gap-3 text-amber-800 dark:text-amber-300 text-xs">
            <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Assignment Guardrail:</span> Do not use Google Cloud / Firebase / Gemini API keys or the AI Studio "Publish" button. This app uses the public Open-Meteo API and must be deployed through <strong>GitHub → Cloudflare Pages</strong>.
            </div>
          </div>

          {/* Step 1: Export to GitHub */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="h-6 w-6 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-bold flex items-center justify-center">
                1
              </span>
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Github className="h-4 w-4" /> Connect AI Studio to GitHub
              </h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 pl-8">
              In Google AI Studio, click on <strong>Settings / Export</strong> (or the GitHub icon in the top toolbar) to push this repository directly to your approved GitHub account.
            </p>
          </div>

          {/* Step 2: Configure Cloudflare Pages */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="h-6 w-6 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-bold flex items-center justify-center">
                2
              </span>
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Cloud className="h-4 w-4 text-orange-500" /> Cloudflare Pages Build Settings
              </h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 pl-8">
              Go to Cloudflare Dashboard → <strong>Workers & Pages</strong> → <strong>Create application</strong> → <strong>Pages</strong> → <strong>Connect to Git</strong>. Select your repository and set:
            </p>

            <div className="ml-8 bg-slate-50 dark:bg-slate-800/60 rounded-xl p-4 border border-slate-200 dark:border-slate-700 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400 font-sans">Framework preset:</span>
                <span className="font-bold text-slate-900 dark:text-white">Vite</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400 font-sans">Build command:</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sky-600 dark:text-sky-400">npm run build</span>
                  <button
                    onClick={() => copyToClipboard('npm run build', 'build-cmd')}
                    className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-slate-500"
                  >
                    {copiedKey === 'build-cmd' ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400 font-sans">Build output directory:</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sky-600 dark:text-sky-400">dist</span>
                  <button
                    onClick={() => copyToClipboard('dist', 'dist-dir')}
                    className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-slate-500"
                  >
                    {copiedKey === 'dist-dir' ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Test Requirements */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="h-6 w-6 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-bold flex items-center justify-center">
                3
              </span>
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Mandatory Testing Checklist
              </h4>
            </div>
            <ul className="text-xs text-slate-600 dark:text-slate-300 pl-8 space-y-1.5 list-disc list-inside">
              <li>
                <strong>Valid City 1:</strong> Search for e.g. <span className="font-mono bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">Tokyo</span> or <span className="font-mono bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">London</span> (capture screenshot).
              </li>
              <li>
                <strong>Valid City 2:</strong> Search for e.g. <span className="font-mono bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">New York</span> or <span className="font-mono bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">Paris</span> (capture screenshot).
              </li>
              <li>
                <strong>Invalid City Test:</strong> Type an invalid query like <span className="font-mono bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">NonExistentCityXYZ</span> to test error handling.
              </li>
              <li>
                <strong>Weather Intelligence:</strong> Confirm planning recommendations and outdoor score update correctly.
              </li>
            </ul>
          </div>

          {/* Step 4: Submission Bundle */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="h-6 w-6 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-bold flex items-center justify-center">
                4
              </span>
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileCheck className="h-4 w-4 text-purple-500" /> Deliverable Naming Convention
              </h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 pl-8">
              Compress all evidence screenshots and the filled <em>AI-Assisted App Building Evaluation Rubric - L2</em> into a ZIP file formatted as:
            </p>
            <div className="ml-8 bg-slate-100 dark:bg-slate-800 p-2.5 rounded-xl font-mono text-xs font-bold text-purple-600 dark:text-purple-400 flex items-center justify-between">
              <span>empid_emp_name_appbuilding_L2.zip</span>
              <button
                onClick={() => copyToClipboard('empid_emp_name_appbuilding_L2.zip', 'zip-name')}
                className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-slate-500"
              >
                {copiedKey === 'zip-name' ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 px-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 transition"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
