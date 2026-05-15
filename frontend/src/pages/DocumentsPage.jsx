import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Search, Plus, Folder, MoreHorizontal, File, Grid, List, Download, Trash2 } from 'lucide-react';

export default function DocumentsPage() {
  const [view, setView] = useState('grid');
  const documents = [
    { id: 1, name: 'Project Proposal.pdf', type: 'PDF', size: '2.4 MB', date: 'May 12, 2026' },
    { id: 2, name: 'Q2 Budget Analysis.xlsx', type: 'XLSX', size: '1.1 MB', date: 'May 10, 2026' },
    { id: 3, name: 'Product Roadmap.pptx', type: 'PPTX', size: '5.8 MB', date: 'May 08, 2026' },
    { id: 4, name: 'Team Feedback.docx', type: 'DOCX', size: '450 KB', date: 'May 05, 2026' },
    { id: 5, name: 'Brand Guidelines.pdf', type: 'PDF', size: '12.2 MB', date: 'May 01, 2026' },
  ];

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold">Documents</h2>
          <p className="text-gray-500 mt-1">Access your shared files and assets</p>
        </div>
        <div className="flex gap-3">
          <button className="p-3 bg-white border border-gray-100 rounded-2xl shadow-sm text-gray-500 hover:text-dashboard-dark transition-all">
             <Search size={20} />
          </button>
          <button className="bg-dashboard-dark text-white px-5 py-2.5 rounded-full flex items-center gap-2 text-sm font-medium hover:bg-black transition-colors shadow-lg shadow-black/10">
            <Plus size={16} /> Upload
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: 'All Files', count: 124, icon: <FileText className="text-blue-500"/>, color: 'bg-blue-50' },
          { label: 'Documents', count: 86, icon: <File className="text-purple-500"/>, color: 'bg-purple-50' },
          { label: 'Shared', count: 38, icon: <Folder className="text-green-500"/>, color: 'bg-green-50' },
        ].map((folder, i) => (
          <div key={i} className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 flex items-center justify-between group cursor-pointer hover:border-dashboard-dark/20 transition-all">
            <div className="flex items-center gap-4">
              <div className={`p-4 rounded-2xl ${folder.color}`}>
                {folder.icon}
              </div>
              <div>
                <h4 className="font-bold text-gray-900">{folder.label}</h4>
                <p className="text-xs text-gray-500">{folder.count} files</p>
              </div>
            </div>
            <MoreHorizontal size={18} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl font-bold">Recent Files</h3>
          <div className="flex bg-gray-50 p-1 rounded-xl">
            <button 
              onClick={() => setView('grid')}
              className={`p-2 rounded-lg transition-all ${view === 'grid' ? 'bg-white shadow-sm text-dashboard-dark' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Grid size={18} />
            </button>
            <button 
              onClick={() => setView('list')}
              className={`p-2 rounded-lg transition-all ${view === 'list' ? 'bg-white shadow-sm text-dashboard-dark' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <List size={18} />
            </button>
          </div>
        </div>

        {view === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {documents.map((doc, index) => (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                key={doc.id} 
                className="bg-gray-50/50 p-6 rounded-[28px] border border-transparent hover:border-dashboard-dark/10 hover:bg-white hover:shadow-xl hover:shadow-black/5 transition-all group relative overflow-hidden"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-white rounded-2xl shadow-sm text-dashboard-dark">
                    <FileText size={24} />
                  </div>
                  <button className="text-gray-400 hover:text-dashboard-dark transition-colors">
                    <MoreHorizontal size={18} />
                  </button>
                </div>
                <h4 className="font-bold text-gray-900 mb-1 truncate">{doc.name}</h4>
                <p className="text-xs text-gray-400">{doc.size} • {doc.date}</p>
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform bg-gradient-to-t from-white to-transparent flex gap-2">
                   <button className="flex-1 bg-dashboard-dark text-white p-2 rounded-xl text-xs font-bold hover:bg-black transition-colors flex items-center justify-center gap-1">
                      <Download size={14} /> Get
                   </button>
                   <button className="p-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-colors">
                      <Trash2 size={14} />
                   </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="pb-4 text-xs font-semibold text-gray-400 uppercase">File Name</th>
                  <th className="pb-4 text-xs font-semibold text-gray-400 uppercase">Size</th>
                  <th className="pb-4 text-xs font-semibold text-gray-400 uppercase">Uploaded</th>
                  <th className="pb-4 text-xs font-semibold text-gray-400 uppercase"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {documents.map((doc) => (
                  <tr key={doc.id} className="group hover:bg-gray-50/50 transition-colors">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <FileText size={20} className="text-gray-400" />
                        <span className="font-bold text-gray-900">{doc.name}</span>
                      </div>
                    </td>
                    <td className="py-4 text-sm text-gray-500">{doc.size}</td>
                    <td className="py-4 text-sm text-gray-500">{doc.date}</td>
                    <td className="py-4 text-right">
                      <button className="p-2 text-gray-400 hover:text-dashboard-dark opacity-0 group-hover:opacity-100 transition-all">
                        <Download size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
