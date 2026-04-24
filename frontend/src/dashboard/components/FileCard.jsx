<<<<<<< HEAD
import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import FilePreviewModal from '../../components/FilePreviewModal';

export default function FileCard({ file, onShare, onDelete, onDetails }) {
    const getType = (name) => {
        let ext = (name || '').split('.').pop()?.toLowerCase();
        if (ext === 'jpeg') ext = 'jpg';
        return ext || 'file';
    };

    const fileType = getType(file?.name);

=======
export default function FileCard({ file, onShare, onDelete }) {
    // Elegant SVG icons based on file type
>>>>>>> b98c8ba4272dd4ee9a18958b0041b2b4dbbbf71f
    const getIcon = (type) => {
        switch (type) {
            case 'pdf': return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>;
            case 'zip': case 'rar': return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>;
<<<<<<< HEAD
            case 'png': case 'jpg': case 'jpeg': case 'gif': case 'webp': case 'svg': case 'img': return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>;
=======
            case 'img': case 'png': case 'jpg': case 'jpeg': return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>;
>>>>>>> b98c8ba4272dd4ee9a18958b0041b2b4dbbbf71f
            default: return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>;
        }
    };

    const getColors = (type) => {
        switch (type) {
<<<<<<< HEAD
            case 'pdf': return 'bg-[#e05c5c]/20 text-[#e05c5c]';
            case 'zip': case 'rar': return 'bg-[#f59e0b]/20 text-[#f59e0b]';
            case 'png': case 'jpg': case 'jpeg': case 'gif': case 'webp': case 'svg': case 'img': return 'bg-emerald-500/20 text-emerald-400';
            default: return 'bg-[#4f6ef7]/20 text-[#4f6ef7]';
        }
    };

    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    const previewableTypes = [
      'pdf', 'png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'bmp', 'tiff', 'img',
      'mp4', 'webm', 'mov', 'ogg', 'mpeg',
      'mp3', 'wav', 'opus', 'm4a', 'flac',
      'txt', 'md', 'html', 'css', 'js', 'jsx', 'ts', 'tsx', 'json', 'xml', 'yaml', 'yml', 'py', 'rb', 'php', 'c', 'cpp', 'h', 'java', 'kt', 'swift', 'go', 'rs', 'cs', 'sql', 'sh', 'bash', 'zsh', 'log', 'ini', 'conf', 'toml', 'env', 'csv',
    ];

    const handlePreview = (e) => {
        e.stopPropagation();
        setIsPreviewOpen(true);
=======
            case 'pdf': return 'bg-red-100 text-red-500 dark:bg-red-500/20';
            case 'zip': case 'rar': return 'bg-amber-100 text-amber-500 dark:bg-amber-500/20';
            case 'img': case 'png': case 'jpg': case 'jpeg': return 'bg-emerald-100 text-emerald-500 dark:bg-emerald-500/20';
            default: return 'bg-blue-100 text-blue-500 dark:bg-blue-500/20';
        }
    };

    const handleView = (e) => {
        e.stopPropagation();
        if (file?.url) {
            window.open(file.url, '_blank');
        } else {
            alert('File view URL not found.');
        }
>>>>>>> b98c8ba4272dd4ee9a18958b0041b2b4dbbbf71f
    };

    const handleDownload = async (e) => {
        e.stopPropagation();
<<<<<<< HEAD
        if (!file?.id) {
            alert('File not found.');
            return;
        }
        try {
            const token = localStorage.getItem('token');
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
            const response = await fetch(`${apiUrl}/files/${file.id}/download`, {
                headers: {
                    'Authorization': token ? `Bearer ${token}` : ''
                }
            });
            if (!response.ok) throw new Error('Download failed');
            const data = await response.json();
            if (data.download_url) {
                window.location.href = data.download_url;
            }
        } catch (err) {
            alert('Download failed: ' + err.message);
        }
    };

    const handleCardClick = (e) => {
        if (e.target.closest('button')) return;
        if (onDetails) {
            onDetails();
=======
        if (file?.id) {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`https://wasd-y3xb.onrender.com/api/files/${file.id}/download/direct`, {
                    headers: {
                        'Authorization': token ? `Bearer ${token}` : ''
                    }
                });
                
                if (!response.ok) {
                    if (response.status === 401) throw new Error('Not authorized');
                    throw new Error('Download failed');
                }

                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', file.name || 'document');
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
                window.URL.revokeObjectURL(url);
            } catch (err) {
                alert('Download failed: ' + err.message);
            }
        } else {
            alert('File not found.');
>>>>>>> b98c8ba4272dd4ee9a18958b0041b2b4dbbbf71f
        }
    };

    return (
<<<<<<< HEAD
        <>
            <div
                onClick={handleCardClick}
                className="group relative bg-white dark:bg-[#13151c] border border-gray-200 dark:border-[#1f2130] rounded-2xl p-5 hover:border-gray-300 dark:hover:border-[#2a2d3e] transition-all duration-300 cursor-pointer shadow-sm"
            >
                <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getColors(fileType)} transition-colors duration-300`}>
                        {getIcon(fileType)}
                    </div>
                    {file?.share_token && (
                        <div className="flex items-center gap-1 px-2 py-1 bg-[#4f6ef7]/20 text-[#4f6ef7] rounded-full text-[10px] font-medium" title="Shared">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
                            Shared
                        </div>
                    )}
                </div>

                <div className="mb-1">
                    <h3 className="font-semibold text-gray-900 dark:text-[#e8e9f0] truncate transition-colors duration-300" title={file?.name}>{file?.name || "Untitled"}</h3>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-0 text-xs text-gray-500 dark:text-[#8b8fa8] mt-2 transition-colors duration-300">
                    <div className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path></svg>
                        <span>{file?.size || "0 KB"}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <span>{file?.date || "Unknown"}</span>
                    </div>
                </div>

                <div className="flex gap-2 mt-5 pt-4 border-t border-gray-200 dark:border-[#1f2130]">
                  {previewableTypes.includes(fileType) && (
                    <button
                        onClick={handlePreview}
                        className="flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-[#4f6ef7]/20 text-[#4f6ef7] hover:bg-[#4f6ef7] hover:text-white rounded-lg text-xs font-semibold transition-colors border border-[#4f6ef7]/30"
                        title="Preview"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                        Preview
                    </button>
                  )}
                </div>
            </div>

            <AnimatePresence>
                {isPreviewOpen && (
                    <FilePreviewModal
                        file={{
                            name: file?.name,
                            type: fileType.toUpperCase(),
                            size: file?.size,
                            url: file?.url,
                        }}
                        onClose={() => setIsPreviewOpen(false)}
                    />
                )}
            </AnimatePresence>
        </>
=======
        <div
            onClick={handleView}
            className="group relative bg-white/50 dark:bg-slate-800/40 backdrop-blur-xl border border-slate-200 dark:border-slate-700/50 rounded-2xl p-5 hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-500/5 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
        >
            <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getColors(file?.type)} transition-colors duration-300`}>
                    {getIcon(file?.type)}
                </div>
            </div>

            <div className="mb-1">
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 truncate transition-colors duration-300" title={file?.name}>{file?.name || "Untitled"}</h3>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-0 text-xs text-slate-500 dark:text-slate-400 mt-2 transition-colors duration-300">
                <div className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path></svg>
                    <span>{file?.size || "0 KB"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span>{file?.date || "Unknown"}</span>
                </div>
            </div>

            {/* Hover Actions Menu */}
            <div className="flex gap-2 mt-5 pt-4 border-t border-slate-100 dark:border-slate-700/50 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                    onClick={handleDownload}
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500 hover:text-white rounded-lg text-xs font-semibold transition-colors border border-indigo-100 dark:border-transparent"
                >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                    Download
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); if (onShare) onShare(); }}
                    className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-lg transition-colors border border-transparent hover:border-slate-200 dark:hover:border-transparent"
                    title="Share"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); if (onDelete) onDelete(); }}
                    className="p-1.5 text-red-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors border border-transparent hover:border-red-100 dark:hover:border-transparent"
                    title="Delete"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
            </div>
        </div>
>>>>>>> b98c8ba4272dd4ee9a18958b0041b2b4dbbbf71f
    );
}