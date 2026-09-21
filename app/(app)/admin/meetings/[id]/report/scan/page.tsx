'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useRef } from 'react';
import { ArrowLeft, Upload, ScanLine, AlertCircle, CheckCircle, ChevronRight, X, Edit } from 'lucide-react';

type ScanStep = 'upload' | 'analyzing' | 'classified' | 'review' | 'confirmed';

interface ExtractedField {
  label: string;
  value: string;
  confidence: 'high' | 'medium' | 'low';
}

const MOCK_EXTRACTED: ExtractedField[] = [
  { label: 'Document Type',    value: 'Grammarian Report',   confidence: 'high' },
  { label: 'Meeting Date',     value: '18 September 2026',   confidence: 'high' },
  { label: 'Grammarian Name',  value: 'Hafeez',              confidence: 'high' },
  { label: 'Speaker 1',        value: 'Zaid',                confidence: 'high' },
  { label: 'Mistake 1',        value: 'womens rights',        confidence: 'high' },
  { label: 'Correction 1',     value: "women's rights",       confidence: 'high' },
  { label: 'Speaker 2',        value: 'Hashir',              confidence: 'high' },
  { label: 'Mistake 2',        value: 'it were a great city', confidence: 'medium' },
  { label: 'Correction 2',     value: 'it was a great city',  confidence: 'medium' },
  { label: 'Speaker 3',        value: 'Nafih',               confidence: 'high' },
  { label: 'Mistake 3',        value: 'he lead the party',    confidence: 'medium' },
  { label: 'Correction 3',     value: 'he led the party',     confidence: 'low',  },
  { label: 'Overall Remarks',  value: 'Good grammar overall. Watch tense and apostrophes.', confidence: 'medium' },
];

const CONFIDENCE_STYLES = {
  high:   { badge: 'bg-green-50 text-green-700 border-green-200',  label: 'High confidence',    icon: <CheckCircle className="w-3.5 h-3.5 text-green-500" /> },
  medium: { badge: 'bg-amber-50 text-amber-700 border-amber-200',  label: 'Please review',       icon: <AlertCircle className="w-3.5 h-3.5 text-amber-500" /> },
  low:    { badge: 'bg-red-50 text-red-600 border-red-200',        label: 'Verify carefully',    icon: <AlertCircle className="w-3.5 h-3.5 text-red-500" /> },
};

export default function ScanReportPage() {
  const params = useParams();
  const meetingId = params.id as string;
  const [step, setStep] = useState<ScanStep>('upload');
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [fields, setFields] = useState<ExtractedField[]>(MOCK_EXTRACTED);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file.name);
    }
  };

  const handleAnalyze = () => {
    setStep('analyzing');
    setTimeout(() => setStep('classified'), 2000);
  };

  const handleProceed = () => setStep('review');
  const handleConfirm = () => setStep('confirmed');

  const lowConfidenceCount = fields.filter(f => f.confidence !== 'high').length;

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-5">
      <Link href={`/admin/meetings/${meetingId}/enter-report`} className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-indigo-600">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Report Entry
      </Link>

      <div>
        <h1 className="text-xl font-bold text-slate-900">Scan Handwritten Report</h1>
        <p className="text-sm text-slate-500 mt-0.5">Upload a photo of a handwritten report for AI-assisted extraction</p>
      </div>

      {/* Progress steps */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {(['upload','analyzing','classified','review','confirmed'] as ScanStep[]).map((s, i) => {
          const labels = ['Upload', 'Analyzing', 'Classified', 'Review', 'Confirmed'];
          const done = ['upload','analyzing','classified','review','confirmed'].indexOf(step) > i;
          const active = step === s;
          return (
            <div key={s} className="flex items-center gap-2 flex-shrink-0">
              <div className={`w-6 h-6 rounded-full text-xs flex items-center justify-center font-semibold ${
                done ? 'bg-green-500 text-white' : active ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'
              }`}>{done ? '✓' : i + 1}</div>
              <span className={`text-xs ${active ? 'text-indigo-700 font-medium' : 'text-slate-400'}`}>{labels[i]}</span>
              {i < 4 && <ChevronRight className="w-3 h-3 text-slate-300" />}
            </div>
          );
        })}
      </div>

      {/* STEP 1: Upload */}
      {step === 'upload' && (
        <div className="space-y-4">
          <div
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center hover:border-indigo-400 hover:bg-indigo-50 transition-colors cursor-pointer"
          >
            <Upload className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-medium text-slate-700">Click to upload or take a photo</p>
            <p className="text-xs text-slate-400 mt-1">JPG, PNG, HEIC — up to 10 MB</p>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileSelect} capture="environment" />
          </div>
          {uploadedFile && (
            <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span className="text-sm text-green-700">{uploadedFile}</span>
              <button onClick={() => setUploadedFile(null)} className="ml-auto text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>
            </div>
          )}
          <button
            onClick={handleAnalyze}
            disabled={!uploadedFile}
            className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white rounded-lg font-medium text-sm hover:bg-indigo-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ScanLine className="w-4 h-4" /> Analyze Report
          </button>
          <p className="text-center text-xs text-slate-400">
            You can also{' '}
            <Link href={`/admin/meetings/${meetingId}/report/attendance`} className="text-indigo-600 hover:underline">
              fill the report manually
            </Link>
          </p>
        </div>
      )}

      {/* STEP 2: Analyzing */}
      {step === 'analyzing' && (
        <div className="bg-white rounded-xl border border-gray-200 p-10 text-center space-y-4">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto">
            <ScanLine className="w-8 h-8 text-indigo-600 animate-pulse" />
          </div>
          <div>
            <p className="text-base font-semibold text-slate-900">Analyzing report…</p>
            <p className="text-sm text-slate-500 mt-1">Reading handwriting and extracting structured data</p>
          </div>
          <div className="space-y-2 text-xs text-slate-400 text-left max-w-xs mx-auto">
            <p className="animate-pulse">✓ Image loaded</p>
            <p className="animate-pulse" style={{ animationDelay: '0.3s' }}>⟳ Classifying document type…</p>
            <p className="animate-pulse" style={{ animationDelay: '0.6s' }}>⟳ Extracting structured fields…</p>
          </div>
        </div>
      )}

      {/* STEP 3: Classified */}
      {step === 'classified' && (
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="font-semibold text-green-800">Document Identified</span>
            </div>
            <p className="text-sm text-green-700">This appears to be a <strong>Grammarian Report</strong> with high confidence.</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-2 text-sm text-slate-700">
            <p><strong>Meeting:</strong> VAHDA · Meeting #01</p>
            <p><strong>Author:</strong> Hafeez (Grammarian)</p>
            <p><strong>Extracted observations:</strong> 3</p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-700">
            <AlertCircle className="w-3.5 h-3.5 inline mr-1" />
            <strong>{lowConfidenceCount} fields</strong> need your review before submission.
          </div>
          <button onClick={handleProceed} className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium text-sm hover:bg-indigo-700 transition-colors">
            Review Extracted Data →
          </button>
        </div>
      )}

      {/* STEP 4: Review */}
      {step === 'review' && (
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-700">
            <AlertCircle className="w-3.5 h-3.5 inline mr-1" />
            Review all extracted fields carefully. <strong>AI-extracted data is never submitted without your confirmation.</strong>
          </div>

          <div className="space-y-2">
            {fields.map((field, i) => {
              const conf = CONFIDENCE_STYLES[field.confidence];
              return (
                <div key={i} className={`rounded-lg border p-3 ${field.confidence !== 'high' ? 'border-amber-200 bg-amber-50' : 'border-gray-100 bg-white'}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-500 mb-1">{field.label}</p>
                      <input
                        type="text"
                        value={field.value}
                        onChange={e => setFields(prev => prev.map((f, idx) => idx === i ? { ...f, value: e.target.value } : f))}
                        className={`w-full text-sm font-medium rounded border px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                          field.confidence !== 'high' ? 'border-amber-300 bg-white' : 'border-transparent bg-transparent'
                        }`}
                      />
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      {conf.icon}
                      <span className={`text-xs border rounded-md px-1.5 py-0.5 ${conf.badge}`}>{conf.label}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={handleConfirm}
            className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium text-sm hover:bg-indigo-700 transition-colors"
          >
            Confirm &amp; Populate Form →
          </button>
          <button onClick={() => setStep('upload')} className="w-full py-2 text-sm text-slate-500 hover:text-slate-700">
            ← Start Over
          </button>
        </div>
      )}

      {/* STEP 5: Confirmed */}
      {step === 'confirmed' && (
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center space-y-4">
          <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-7 h-7 text-green-600" />
          </div>
          <div>
            <p className="text-base font-semibold text-slate-900">Form Populated!</p>
            <p className="text-sm text-slate-500 mt-1">The Grammarian Report form has been filled with the reviewed data. You can still edit it before submitting.</p>
          </div>
          <Link
            href={`/admin/meetings/${meetingId}/report/grammarian`}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            <Edit className="w-4 h-4" /> Review &amp; Submit Grammarian Form
          </Link>
        </div>
      )}
    </div>
  );
}
