<<<<<<< HEAD
import { useState, useEffect } from 'react';
import { shareFileApi, revokeShareApi } from '../../services/api';
import { Eye, EyeOff, Link2, Copy, Check, AlertTriangle, Loader2, Shield, Clock } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const EXPIRY_OPTIONS = [
  { value: 1, label: '1 Hour' },
  { value: 24, label: '24 Hours' },
  { value: 72, label: '3 Days' },
  { value: 168, label: '7 Days' },
];

export default function ShareModal({ file, onClose }) {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [revoking, setRevoking] = useState(false);
  const [revokeSuccess, setRevokeSuccess] = useState(false);

  const [expiryHours, setExpiryHours] = useState(24);
  const [usePassword, setUsePassword] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [hasExistingShare, setHasExistingShare] = useState(false);

  useEffect(() => {
    if (!file?.id) return;

    if (file.share_token) {
      setHasExistingShare(true);
      const apiBase = (import.meta.env.VITE_API_URL || 'http://localhost:8000/api').replace('/api', '');
      setShareUrl(`${apiBase}/share/${file.share_token}`);
      if (file.share_expires_at) {
        setExpiresAt(new Date(file.share_expires_at).toLocaleString());
      }
      setLoading(false);
      return;
    }

    setLoading(false);
  }, [file]);

  const handleCreateShare = async () => {
    if (usePassword && !password.trim()) {
      setError('Please enter a password');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const data = await shareFileApi(file.id, expiryHours, usePassword ? password : null);
      const apiBase = (import.meta.env.VITE_API_URL || 'http://localhost:8000/api').replace('/api', '');
      setShareUrl(`${apiBase}${data.share_url}`);
      setExpiresAt(new Date(data.expires_at).toLocaleString());
      setHasExistingShare(true);
    } catch (err) {
      setError(err.message || 'Failed to generate share link');
    } finally {
      setLoading(false);
    }
  };

  const handleRevoke = async () => {
    setRevoking(true);
    setError('');
    try {
      await revokeShareApi(file.id);
      setRevokeSuccess(true);
      setHasExistingShare(false);
      setShareUrl('');
      setExpiresAt('');
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      setError(err.message || 'Failed to revoke share link');
    } finally {
      setRevoking(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
=======
import { useState } from 'react';

export default function ShareModal({ file, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!file) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://cloudvault.vercel.app/share/token123`);
>>>>>>> b98c8ba4272dd4ee9a18958b0041b2b4dbbbf71f
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

<<<<<<< HEAD
  if (!file) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[#13151c] border border-[#1f2130] rounded-2xl p-6 w-full max-w-sm shadow-2xl shadow-black/30 relative">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#555870] hover:text-[#e8e9f0] transition-colors p-1"
=======
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1"
>>>>>>> b98c8ba4272dd4ee9a18958b0041b2b4dbbbf71f
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

<<<<<<< HEAD
        <h2 className="text-xl font-bold text-[#e8e9f0] mb-1">Share File</h2>
        <p className="text-sm text-[#8b8fa8] mb-6 truncate">
          {file.name || file.original_name}
        </p>

        {error && (
          <div className="mb-4 p-3 text-sm text-[#e05c5c] bg-[#e05c5c]/10 rounded-xl border border-[#e05c5c]/30 flex items-center gap-2">
            <AlertTriangle size={14} />
            {error}
          </div>
        )}

        {revokeSuccess && (
          <div className="mb-4 p-3 text-sm text-emerald-400 bg-emerald-500/10 rounded-xl border border-emerald-500/30 flex items-center gap-2">
            <Check size={14} />
            Share link revoked
          </div>
        )}

        {!hasExistingShare ? (
          <>
            <div className="mb-4">
              <label className="text-xs text-[#555870] uppercase tracking-wider mb-2 flex items-center gap-1">
                <Clock size={12} />
                Link Expiry
              </label>
              <div className="grid grid-cols-2 gap-2">
                {EXPIRY_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setExpiryHours(opt.value)}
                    className={`py-2.5 px-3 rounded-xl text-sm font-medium transition-all border ${
                      expiryHours === opt.value
                        ? 'bg-[#4f6ef7]/20 border-[#4f6ef7]/50 text-[#4f6ef7]'
                        : 'bg-[#1e2235] border-[#1f2130] text-[#8b8fa8] hover:border-[#2a2d3e]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <button
                onClick={() => setUsePassword(!usePassword)}
                className="flex items-center gap-2 text-sm text-[#8b8fa8] hover:text-[#e8e9f0] transition-colors"
              >
                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${usePassword ? 'bg-[#4f6ef7] border-[#4f6ef7]' : 'border-[#2a2d3e]'}`}>
                  {usePassword && <Check size={10} className="text-white" />}
                </div>
                <Shield size={14} />
                Password protection
              </button>

              {usePassword && (
                <div className="mt-2 relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full h-11 px-4 pr-10 bg-[#1e2235] border border-[#1f2130] rounded-xl text-sm text-[#e8e9f0] placeholder-[#555870] focus:outline-none focus:border-[#4f6ef7] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555870] hover:text-[#8b8fa8] transition-colors"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={handleCreateShare}
              disabled={loading}
              className="w-full h-11 bg-[#4f6ef7] hover:bg-[#3d5bd9] text-white rounded-xl text-sm font-medium transition-colors shadow-lg shadow-[#4f6ef7]/20 disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <>
                  <Link2 size={16} />
                  Generate Share Link
                </>
              )}
            </button>
          </>
        ) : (
          <>
            <div className="flex justify-center mb-4">
              <div className="bg-[#1e2235] p-3 rounded-2xl border border-[#1f2130] shadow-sm inline-block">
                <QRCodeSVG
                  value={shareUrl}
                  size={140}
                  level="M"
                  includeMargin={false}
                  bgColor="#1e2235"
                  fgColor="#e8e9f0"
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="text-xs text-[#555870] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <Link2 size={12} />
                Share Link
              </label>
              <div className="flex items-center gap-2 bg-[#1e2235] border border-[#1f2130] rounded-xl overflow-hidden">
                <div className="flex-1 min-w-0">
                  <input
                    type="text"
                    readOnly
                    value={shareUrl}
                    className="w-full h-11 px-4 bg-transparent text-sm text-[#8b8fa8] outline-none font-mono overflow-x-auto whitespace-nowrap scrollbar-hide"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  />
                </div>
                <button
                  onClick={handleCopy}
                  className={`flex-shrink-0 h-11 px-4 flex items-center justify-center gap-1.5 text-sm font-medium transition-colors ${
                    copied ? 'bg-emerald-500 hover:bg-emerald-600 text-white' : 'bg-[#4f6ef7] hover:bg-[#3d5bd9] text-white'
                  }`}
                >
                  {copied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
                </button>
              </div>
            </div>

            {expiresAt && (
              <p className="text-xs text-[#555870] mb-4 flex items-center gap-1">
                <Clock size={11} />
                Expires: {expiresAt}
              </p>
            )}

            <div className="bg-[#1e2235] border border-[#1f2130] rounded-xl p-4 mb-4">
              <p className="text-xs text-[#8b8fa8] leading-relaxed">
                Anyone with this link can view and download this file. The link will automatically stop working after the expiry period.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setHasExistingShare(false)}
                className="flex-1 h-11 bg-[#1e2235] hover:bg-[#1a1c26] text-[#8b8fa8] rounded-xl text-sm font-medium transition-colors border border-[#1f2130]"
              >
                New Link
              </button>
              <button
                onClick={handleRevoke}
                disabled={revoking}
                className="flex-1 h-11 bg-[#e05c5c]/10 hover:bg-[#e05c5c]/20 text-[#e05c5c] border border-[#e05c5c]/30 rounded-xl text-sm font-medium transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {revoking ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <>
                    <AlertTriangle size={14} />
                    Revoke
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
=======
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Share File</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
          Anyone with this link can view and download <span className="font-semibold text-slate-700 dark:text-slate-200 truncate inline-block max-w-[200px] align-bottom">{file.name}</span>
        </p>

        {/* Link Input area */}
        <div className="flex items-center gap-2 mb-6">
          <input 
            type="text" 
            readOnly 
            value={`https://cloudvault.vercel.app/share/token123`} 
            className="flex-1 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-mono"
          />
          <button 
            onClick={handleCopy}
            className={`min-w-[80px] flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${copied ? 'bg-emerald-500 hover:bg-emerald-600 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20'}`}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        {/* Warning / Expiry component */}
        <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-xl p-4 flex items-start gap-3">
          <svg className="w-5 h-5 text-amber-600 dark:text-amber-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <div>
            <h3 className="text-sm font-semibold text-amber-800 dark:text-amber-400">Link Expiry</h3>
            <p className="text-xs text-amber-700/80 dark:text-amber-300/80 mt-1 leading-relaxed">This secure link will automatically expire in 24 hours to protect your privacy.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
>>>>>>> b98c8ba4272dd4ee9a18958b0041b2b4dbbbf71f
