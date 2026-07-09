import React, { useState } from 'react';
import { X, Pencil, Trash2 } from 'lucide-react';

interface TitleItem {
  id: string;
  name: string;
}

export const TitleManagement: React.FC = () => {
  // Pre-populated section titles matching mockup exactly
  const [titles, setTitles] = useState<TitleItem[]>([
    { id: '001', name: "Trending Homes You'll Love" },
    { id: '002', name: 'Properties by Cities' },
    { id: '003', name: 'Your Ultimate Hub for Hyderabad' },
    { id: '004', name: 'New Launch' },
    { id: '005', name: 'Prime Properties' },
    { id: '006', name: 'Gummaam Verified Agents' },
    { id: '007', name: 'Smart Solutions for Every Property Need' },
    { id: '008', name: 'Commercial Real Estate' },
    { id: '009', name: 'Our Blog' },
    { id: '010', name: 'Testimonials' }
  ]);

  // Edit Modal State
  const [editingTitle, setEditingTitle] = useState<TitleItem | null>(null);
  const [formTitleName, setFormTitleName] = useState('');

  // Delete Confirmation State
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const handleEditClick = (item: TitleItem) => {
    setEditingTitle(item);
    setFormTitleName(item.name);
  };

  const handleSaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTitle) {
      const updated = titles.map((t) => {
        if (t.id === editingTitle.id) {
          return { ...t, name: formTitleName };
        }
        return t;
      });
      setTitles(updated);
      setEditingTitle(null);
    }
  };

  const handleConfirmDelete = () => {
    if (deleteConfirmId) {
      setTitles(titles.filter((t) => t.id !== deleteConfirmId));
      setDeleteConfirmId(null);
    }
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* ================= HEADER SECTION ================= */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Title Management</h1>
      </div>

      {/* ================= TITLES TABLE ================= */}
      <div className="bg-white rounded-[16px] overflow-hidden border border-[#dddddd] shadow-none">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs text-slate-700 font-medium">
            <thead>
              <tr className="bg-[#F0F2F3] border-b border-[#dddddd] text-xs font-semibold text-slate-700">
                <th className="p-4 pl-6 w-32">Title ID</th>
                <th className="p-4">Title Name</th>
                <th className="p-4 pr-6 text-right w-32">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#dddddd]">
              {titles.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/30 transition-colors">
                  <td className="p-4 pl-6 font-semibold text-slate-900">{item.id}</td>
                  <td className="p-4 text-slate-800 font-medium">{item.name}</td>
                  <td className="p-4 pr-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEditClick(item)}
                        className="w-8 h-8 rounded-[5px] hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-700 transition cursor-pointer"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(item.id)}
                        className="w-8 h-8 rounded-[5px] hover:bg-slate-100 flex items-center justify-center text-rose-600 hover:text-rose-700 transition cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= MODAL: EDIT TITLE NAME ================= */}
      {editingTitle && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-[1000] p-4">
          <div className="bg-white w-full max-w-[460px] rounded-[5px] overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-base font-semibold text-slate-900">Edit Title Name</h2>
              <button
                onClick={() => setEditingTitle(null)}
                className="w-8 h-8 rounded-[5px] hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveSubmit} className="flex flex-col overflow-hidden">
              <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-650">
                
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 mb-1">Title ID</label>
                  <input
                    type="text"
                    disabled
                    value={editingTitle.id}
                    className="w-full h-8 px-2.5 bg-slate-50 border border-slate-200 rounded-[5px] text-xs text-slate-400 font-semibold cursor-not-allowed outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 mb-1">Title Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. New Launch"
                    value={formTitleName}
                    onChange={(e) => setFormTitleName(e.target.value)}
                    className="w-full h-8 px-2.5 bg-white border border-slate-200 rounded-[5px] text-xs outline-none focus:border-[#035096]"
                  />
                </div>

              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-slate-100 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setEditingTitle(null)}
                  className="flex-1 h-9 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-[5px] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    alert('Draft saved');
                    setEditingTitle(null);
                  }}
                  className="flex-1 h-9 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-[5px] cursor-pointer"
                >
                  Save Draft
                </button>
                <button
                  type="submit"
                  className="flex-1 h-9 bg-[#035096] hover:bg-[#024078] text-white text-xs font-semibold rounded-[5px] cursor-pointer"
                >
                  Publish Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= CONFIRM DELETE DIALOG ================= */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-[1100] p-4">
          <div className="bg-white w-full max-w-[380px] rounded-[5px] overflow-hidden shadow-2xl p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-base font-semibold text-slate-900">
              Confirm Delete
            </h3>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Are you sure you want to delete this title? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 border border-slate-200 text-slate-700 text-xs font-semibold rounded-[5px] hover:bg-slate-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-[5px] transition cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
