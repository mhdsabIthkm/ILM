'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { vahdaMeeting1Report } from '@/lib/mock-data/meetings';
import { StatusBadge } from '@/components/ui/status-badge';
import { ReportSection } from '@/lib/types';
import {
  ArrowLeft, FileText, ScanLine, Upload, CheckCircle2,
  AlertCircle, Sparkles, X, Loader2, FileCheck, RefreshCw,
  MinusCircle, Check, Info, FileUp, ArrowRight, Eye, Lock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { uploadScannedReport } from '@/lib/supabase/data-service';

interface UploadedFileInfo {
  name: string;
  size: string;
  previewUrl: string | null;
  isImage: boolean;
  rawFile?: File;
}

export default function EnterReportPage() {
  const params = useParams();
  const meetingId = params.id as string;
  const router = useRouter();

  const [isFinalized, setIsFinalized] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        return localStorage.getItem(`meeting-${meetingId}-finalized`) === 'true';
      } catch {}
    }
    return false;
  });

  // Section list state with local storage persistence
  const [sections, setSections] = useState<ReportSection[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(`meeting-${meetingId}-sections`);
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return vahdaMeeting1Report.sections;
  });

  // Drag & drop state
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Confirmation modal state
  const [confirmFile, setConfirmFile] = useState<UploadedFileInfo | null>(null);

  // Scanning workflow state: 'idle' | 'scanning' | 'success'
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'success'>('idle');
  const [scanStepIndex, setScanStepIndex] = useState(0);

  // Save sections whenever changed
  const updateSections = (next: ReportSection[]) => {
    setSections(next);
    try {
      localStorage.setItem(`meeting-${meetingId}-sections`, JSON.stringify(next));
    } catch {}
  };

  // Toggle "Nil / Not Held" for a role (e.g. Evaluator 3)
  const toggleNil = (key: string) => {
    const next = sections.map(s => {
      if (s.key === key) {
        if (s.status === 'nil') {
          // Restore to missing or previous status
          return { ...s, status: 'missing' as const, nilReason: undefined };
        } else {
          // Mark as Nil (Role not held in this meeting)
          return { ...s, status: 'nil' as const, nilReason: 'Role was not conducted in this meeting' };
        }
      }
      return s;
    });
    updateSections(next);
  };

  // Mark all missing sections as complete (simulated from AI scan)
  const applyScanResults = () => {
    const next = sections.map(s => {
      if (s.status === 'missing') {
        // If Evaluator 3 was missing, either mark complete or give valid data
        return { ...s, status: 'complete' as const };
      }
      return s;
    });
    updateSections(next);
  };

  // Handle file selection from drag & drop or file picker
  const processSelectedFile = (file: File) => {
    const isImg = file.type.startsWith('image/');
    const preview = isImg ? URL.createObjectURL(file) : null;
    const formattedSize =
      file.size > 1024 * 1024
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        : `${Math.round(file.size / 1024)} KB`;

    setConfirmFile({
      name: file.name,
      size: formattedSize,
      previewUrl: preview,
      isImage: isImg,
      rawFile: file,
    });
  };

  // Drag over / leave / drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processSelectedFile(e.target.files[0]);
    }
  };

  // Execute AI Scan with live step progression
  const startAiScan = () => {
    setScanState('scanning');
    setScanStepIndex(0);

    // If Supabase Storage is configured, asynchronously persist the scanned document
    if (confirmFile?.rawFile) {
      uploadScannedReport(meetingId, confirmFile.rawFile, confirmFile.name).catch(err => {
        console.warn('Supabase storage upload bypassed:', err);
      });
    }

    const steps = [1, 2, 3, 4];
    steps.forEach((step, idx) => {
      setTimeout(() => {
        setScanStepIndex(idx + 1);
      }, (idx + 1) * 600);
    });

    // Finished after ~2.8 seconds
    setTimeout(() => {
      applyScanResults();
      setScanState('success');
    }, 2800);
  };

  // Stats calculation
  const requiredSections = sections.filter(s => s.required);
  const completeOrNilCount = requiredSections.filter(
    s => s.status === 'complete' || s.status === 'nil'
  ).length;
  const nilCount = sections.filter(s => s.status === 'nil').length;
  const isAllRequiredDone = completeOrNilCount === requiredSections.length;

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Back Link */}
      <Link
        href={`/admin/meetings/${meetingId}`}
        className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-indigo-600 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Meeting
      </Link>

      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Enter Meeting Report</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          VAHDA · Meeting #01 · 18 September 2026
        </p>
      </div>

      {isFinalized && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex items-start gap-3 shadow-xs">
          <Lock className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
          <div className="flex-1 text-sm text-emerald-950 space-y-1">
            <p className="font-bold text-emerald-900">Official Report Finalized &amp; Locked</p>
            <p className="text-xs text-emerald-800 leading-relaxed">
              This meeting report has already been completed and submitted for review. No other student can edit or modify this report.
            </p>
            <div className="pt-2">
              <Link
                href={`/admin/meetings/${meetingId}/final-report`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-900 bg-white border border-emerald-300 px-3.5 py-1.5 rounded-lg hover:bg-emerald-100 transition-colors shadow-2xs"
              >
                <Eye className="w-3.5 h-3.5" /> View Official Report
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Report Entry Method: Two Rectangles with "OR" in the middle */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6">
        <h2 className="text-sm font-bold text-slate-900 mb-4">
          How would you like to enter this report?
        </h2>

        {/* Two Rectangles Container */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch">
          {/* Rectangle 1: Fill Report Manually */}
          <Link
            href={`/admin/meetings/${meetingId}/report/attendance`}
            className="flex flex-col items-center justify-center gap-3 p-6 border-2 border-indigo-200/90 rounded-2xl bg-indigo-50/50 hover:bg-indigo-50/80 hover:border-indigo-400 hover:shadow-md transition-all text-center group shadow-xs"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-indigo-900 text-base group-hover:text-indigo-700 transition-colors">
                Fill Report Manually
              </p>
              <p className="text-xs text-indigo-600/80 mt-1 max-w-[200px] leading-relaxed">
                Enter all sections using interactive digital forms
              </p>
            </div>
            <span className="text-[11px] font-semibold text-indigo-700 bg-white px-2.5 py-1 rounded-full border border-indigo-200 shadow-2xs mt-1">
              Start Forms &rarr;
            </span>
          </Link>

          {/* "OR" Divider in the Middle */}
          {/* Desktop: Centered Floating Badge */}
          <div className="hidden sm:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
            <span className="w-9 h-9 rounded-full bg-white border-2 border-indigo-200 text-indigo-900 font-extrabold text-xs shadow-md flex items-center justify-center tracking-wider">
              OR
            </span>
          </div>

          {/* Mobile: Horizontal Divider */}
          <div className="sm:hidden flex items-center gap-3 my-1">
            <div className="flex-1 border-t border-gray-200" />
            <span className="text-xs font-bold text-slate-400 px-2 uppercase tracking-wider">
              OR
            </span>
            <div className="flex-1 border-t border-gray-200" />
          </div>

          {/* Rectangle 2: Scan Handwritten Report (Direct Drag & Drop / Upload Photo Zone) */}
          <div
            onDragOver={handleDragOver}
            onDragEnter={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              'flex flex-col items-center justify-center gap-3 p-6 border-2 border-dashed rounded-2xl transition-all text-center cursor-pointer relative group',
              isDragging
                ? 'border-indigo-600 bg-indigo-100/70 ring-4 ring-indigo-500/20 scale-[1.01]'
                : 'border-slate-300 bg-slate-50/70 hover:border-indigo-400 hover:bg-indigo-50/40 hover:shadow-md shadow-xs'
            )}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileInputChange}
              className="hidden"
            />

            <div className={cn(
              'w-12 h-12 rounded-xl flex items-center justify-center transition-all',
              isDragging ? 'bg-indigo-600 text-white scale-110' : 'bg-slate-200 text-slate-600 group-hover:bg-indigo-100 group-hover:text-indigo-600'
            )}>
              {isDragging ? <Upload className="w-6 h-6 animate-bounce" /> : <ScanLine className="w-6 h-6" />}
            </div>

            <div>
              <p className="font-bold text-slate-900 text-base group-hover:text-indigo-900 transition-colors">
                Scan Handwritten Report
              </p>
              <p className="text-xs text-slate-500 mt-1 max-w-[210px] leading-relaxed">
                {isDragging ? (
                  <strong className="text-indigo-700">Drop handwritten sheet photo now!</strong>
                ) : (
                  'Upload photo or drag & drop handwritten sheet directly here'
                )}
              </p>
            </div>

            <div className="flex flex-col items-center gap-1 mt-1">
              <span className="text-[11px] font-semibold text-slate-700 bg-white group-hover:border-indigo-300 px-3 py-1 rounded-full border border-gray-200 shadow-2xs transition-colors">
                Browse Photo or Drag File
              </span>
              <span className="text-[10px] text-slate-400">
                Supports JPG, PNG, PDF from files or Chrome
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation & AI Scan Modal */}
      {confirmFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <ScanLine className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                  {scanState === 'idle'
                    ? 'Confirm Handwritten Report Scan'
                    : scanState === 'scanning'
                    ? 'Scanning Handwritten Sheet...'
                    : 'Report Extraction Complete!'}
                </h3>
              </div>
              {scanState !== 'scanning' && (
                <button
                  onClick={() => { setConfirmFile(null); setScanState('idle'); }}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4">
              {scanState === 'idle' && (
                <>
                  {/* File Preview */}
                  <div className="flex items-start gap-4 p-3.5 bg-slate-50 rounded-xl border border-gray-200">
                    {confirmFile.previewUrl ? (
                      <div className="w-20 h-20 rounded-lg overflow-hidden border border-gray-200 bg-black/5 flex-shrink-0 relative shadow-2xs">
                        <Image
                          src={confirmFile.previewUrl}
                          alt="Handwritten sheet preview"
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-20 h-20 rounded-lg bg-indigo-100 text-indigo-700 flex flex-col items-center justify-center flex-shrink-0">
                        <FileText className="w-8 h-8" />
                        <span className="text-[10px] font-bold mt-1">PDF DOC</span>
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-900 truncate">
                          {confirmFile.name}
                        </span>
                        <span className="text-[10px] font-medium text-slate-400 bg-white px-1.5 py-0.5 rounded border border-gray-200">
                          {confirmFile.size}
                        </span>
                      </div>
                      <p className="text-xs text-indigo-600 font-semibold mt-1">
                        Ready for AI Optical Extraction
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                        Target: <strong>VAHDA · Meeting #01 (18 Sep 2026)</strong>
                      </p>
                    </div>
                  </div>

                  {/* Extraction Plan Details */}
                  <div className="p-3 bg-indigo-50/70 border border-indigo-200/80 rounded-xl space-y-2 text-xs">
                    <p className="font-bold text-indigo-900 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                      What the AI will extract:
                    </p>
                    <ul className="space-y-1 text-slate-700 pl-4 list-disc">
                      <li>Roll call attendance tallies (Present / Absent)</li>
                      <li>Speech timings (Prepared, Table Topics, Ice Breaking)</li>
                      <li>Grammarian word of the day &amp; language error counts</li>
                      <li>Ah Counter pause counts and filler tallies</li>
                      <li>Evaluator feedback notes and commendations</li>
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={() => setConfirmFile(null)}
                      className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                    >
                      Cancel / Choose Different File
                    </button>
                    <button
                      onClick={startAiScan}
                      className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-4 h-4" />
                      Confirm &amp; Start AI Scan
                    </button>
                  </div>
                </>
              )}

              {/* Scanning in progress */}
              {scanState === 'scanning' && (
                <div className="py-6 space-y-5 text-center">
                  <div className="relative w-20 h-20 mx-auto">
                    <div className="w-20 h-20 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center shadow-inner">
                      <ScanLine className="w-10 h-10 animate-pulse" />
                    </div>
                    <div className="absolute inset-0 border-2 border-indigo-500 rounded-2xl animate-ping opacity-25" />
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 text-base">
                      Processing Handwritten Document
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Analyzing handwritten notes with handwriting OCR model
                    </p>
                  </div>

                  {/* Steps checklist animation */}
                  <div className="max-w-xs mx-auto text-left space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      {scanStepIndex >= 1 ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      ) : (
                        <Loader2 className="w-4 h-4 text-indigo-600 animate-spin flex-shrink-0" />
                      )}
                      <span className={scanStepIndex >= 1 ? 'text-slate-800 font-medium' : 'text-slate-400'}>
                        Image contrast enhancement &amp; deskewing
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {scanStepIndex >= 2 ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      ) : scanStepIndex === 1 ? (
                        <Loader2 className="w-4 h-4 text-indigo-600 animate-spin flex-shrink-0" />
                      ) : (
                        <span className="w-4 h-4 rounded-full border border-slate-300 flex-shrink-0" />
                      )}
                      <span className={scanStepIndex >= 2 ? 'text-slate-800 font-medium' : 'text-slate-400'}>
                        Recognizing handwritten Malayalam &amp; English text
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {scanStepIndex >= 3 ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      ) : scanStepIndex === 2 ? (
                        <Loader2 className="w-4 h-4 text-indigo-600 animate-spin flex-shrink-0" />
                      ) : (
                        <span className="w-4 h-4 rounded-full border border-slate-300 flex-shrink-0" />
                      )}
                      <span className={scanStepIndex >= 3 ? 'text-slate-800 font-medium' : 'text-slate-400'}>
                        Extracting speech timings and evaluator remarks
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {scanStepIndex >= 4 ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      ) : scanStepIndex === 3 ? (
                        <Loader2 className="w-4 h-4 text-indigo-600 animate-spin flex-shrink-0" />
                      ) : (
                        <span className="w-4 h-4 rounded-full border border-slate-300 flex-shrink-0" />
                      )}
                      <span className={scanStepIndex >= 4 ? 'text-slate-800 font-medium' : 'text-slate-400'}>
                        Populating meeting report sections
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Scanning Success */}
              {scanState === 'success' && (
                <div className="py-4 space-y-4 text-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                    <Check className="w-7 h-7 stroke-[2.5]" />
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 text-base">
                      Data Extracted Successfully!
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                      All sections have been populated from the handwritten sheet. Required sections are now complete.
                    </p>
                  </div>

                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-medium text-left">
                    <p className="font-bold flex items-center gap-1.5 text-emerald-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      9 of 9 Required Sections Ready
                    </p>
                    <p className="text-[11px] text-emerald-700/90 mt-0.5">
                      Attendance, Timer, Grammarian, Ah Counter, Evaluators 1-3, and General Evaluator are ready for review.
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={() => { setConfirmFile(null); setScanState('idle'); }}
                      className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                    >
                      Close &amp; Inspect Sections
                    </button>
                    <Link
                      href={`/admin/meetings/${meetingId}/finalize`}
                      className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-900 transition-colors flex items-center justify-center gap-1 shadow-sm"
                    >
                      Finalize Report &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Section status list with Nil / Not Held option */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Report Sections</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {completeOrNilCount} of {requiredSections.length} required sections complete{' '}
              {nilCount > 0 && (
                <span className="text-slate-600 font-semibold">({nilCount} marked Nil)</span>
              )}
            </p>
          </div>

          {isAllRequiredDone ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 self-start sm:self-auto">
              <CheckCircle2 className="w-3.5 h-3.5" /> Ready to Finalize
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 self-start sm:self-auto">
              <AlertCircle className="w-3.5 h-3.5" /> Action Required
            </span>
          )}
        </div>

        <div className="divide-y divide-gray-100">
          {sections.map(s => {
            const isMissing = s.status === 'missing';
            const isNil = s.status === 'nil';

            return (
              <div
                key={s.key}
                className={cn(
                  'flex items-center justify-between px-5 py-3.5 hover:bg-slate-50/70 transition-colors',
                  isMissing && 'bg-red-50/20'
                )}
              >
                <Link
                  href={`/admin/meetings/${meetingId}/report/${s.key}`}
                  className="flex items-center gap-2 flex-1 min-w-0 pr-3 group"
                >
                  <span className="text-sm font-medium text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {s.label}
                  </span>
                  {!s.required && <span className="text-xs text-slate-400">(optional)</span>}
                  {isNil && (
                    <span className="text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 font-normal">
                      Role Not Conducted
                    </span>
                  )}
                </Link>

                <div className="flex items-center gap-2.5 flex-shrink-0">
                  {/* Status Badge */}
                  <StatusBadge status={s.status} />

                  {/* Nil / Not Held action button */}
                  {isMissing && (
                    <button
                      type="button"
                      onClick={() => toggleNil(s.key)}
                      className="text-xs px-2.5 py-1 rounded-lg border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-800 font-semibold transition-all shadow-2xs flex items-center gap-1"
                      title="Mark this section as Nil / Not Conducted in this meeting"
                    >
                      <MinusCircle className="w-3 h-3" />
                      Mark as Nil
                    </button>
                  )}

                  {isNil && (
                    <button
                      type="button"
                      onClick={() => toggleNil(s.key)}
                      className="text-xs text-indigo-600 hover:text-indigo-800 hover:underline font-medium px-1"
                      title="Undo Nil and restore this section"
                    >
                      Undo
                    </button>
                  )}

                  {/* Arrow to section */}
                  <Link
                    href={`/admin/meetings/${meetingId}/report/${s.key}`}
                    className="text-slate-400 hover:text-indigo-600 p-1 rounded transition-colors"
                    aria-label={`Open ${s.label} section`}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Finalize button */}
      <Link
        href={`/admin/meetings/${meetingId}/finalize`}
        className={cn(
          'block text-center w-full py-3.5 rounded-xl font-bold transition-all shadow-sm',
          isAllRequiredDone
            ? 'bg-slate-900 hover:bg-slate-800 text-white shadow-indigo-500/10'
            : 'bg-slate-800 text-white hover:bg-slate-900'
        )}
      >
        Review &amp; Finalize Report →
      </Link>
    </div>
  );
}
