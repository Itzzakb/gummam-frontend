import React, { useState } from 'react';
import { X, Plus, Pencil, Trash2 } from 'lucide-react';

interface FaqRecord {
  id: string;
  question: string;
  views: number;
  lastUpdated: string;
  status: 'Published' | 'Draft';
}

interface PolicyRecord {
  id: string;
  name: string;
  lastUpdated: string;
  status: 'Published' | 'Draft';
}

export const StaticContent: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'faq' | 'policy'>('faq');
  const [showAddFaqModal, setShowAddFaqModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ type: 'faq' | 'policy'; id: string } | null>(null);

  // Initial FAQ data matching mockup
  const [faqs, setFaqs] = useState<FaqRecord[]>([
    { id: 'FAQ1', question: 'Documents needed for property verification?', views: 245, lastUpdated: '2026-06-07', status: 'Published' },
    { id: 'FAQ2', question: 'What is the process to buy a property?', views: 189, lastUpdated: '2026-06-07', status: 'Published' },
    { id: 'FAQ3', question: 'How to list my property for sale?', views: 512, lastUpdated: '2026-06-07', status: 'Draft' },
    { id: 'FAQ4', question: 'What are rental regulations?', views: 134, lastUpdated: '2026-06-07', status: 'Published' }
  ]);

  // Initial Policies matching mockup
  const [policies, setPolicies] = useState<PolicyRecord[]>([
    { id: 'POL1', name: 'Privacy Policy', lastUpdated: '2026-06-07', status: 'Published' },
    { id: 'POL2', name: 'Terms & Conditions', lastUpdated: '2026-06-07', status: 'Published' },
    { id: 'POL3', name: 'Refund Policy', lastUpdated: '2026-06-07', status: 'Draft' },
    { id: 'POL4', name: 'Cookie Policy', lastUpdated: '2026-06-07', status: 'Published' }
  ]);

  // FAQ Form State
  const [faqForm, setFaqForm] = useState({
    question: '',
    answer: '',
    tags: '',
    seoKeywords: ''
  });

  const handleAddFaqSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newFaq: FaqRecord = {
      id: `FAQ${faqs.length + 1}`,
      question: faqForm.question || 'New Frequently Asked Question',
      views: 0,
      lastUpdated: new Date().toISOString().split('T')[0],
      status: 'Published'
    };
    setFaqs([...faqs, newFaq]);
    setShowAddFaqModal(false);
    setFaqForm({ question: '', answer: '', tags: '', seoKeywords: '' });
  };

  // Policy selector and editor state
  const policyTypes = [
    'Privacy Policy',
    'Terms & Conditions',
    'Refund Policy',
    'Cookie Policy',
    'Data Protection Policy',
    'Advertising Policy',
    'User Agreement',
    'Property Listing Policy'
  ];
  const [selectedPolicyType, setSelectedPolicyType] = useState('Privacy Policy');
  const [policyEditorContent, setPolicyEditorContent] = useState(
    'This is the default text content of the selected policy. You can write or edit the specific terms, guidelines, liabilities, and agreements for Gummaam users here.'
  );

  const handlePublishPolicy = () => {
    // Update last updated date for the policy in the table list
    const updated = policies.map((p) => {
      if (p.name === selectedPolicyType) {
        return { ...p, lastUpdated: new Date().toISOString().split('T')[0], status: 'Published' as const };
      }
      return p;
    });
    setPolicies(updated);
    alert(`${selectedPolicyType} published successfully!`);
  };

  const handleSavePolicyDraft = () => {
    const updated = policies.map((p) => {
      if (p.name === selectedPolicyType) {
        return { ...p, lastUpdated: new Date().toISOString().split('T')[0], status: 'Draft' as const };
      }
      return p;
    });
    setPolicies(updated);
    alert(`${selectedPolicyType} saved as draft!`);
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* ================= HEADER SECTION ================= */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Static Management</h1>
        <p className="text-xs font-medium text-slate-500 mt-1">
          Create and maintain website pages and content.
        </p>
      </div>

      {/* ================= SUB TAB TOGGLER BAR ================= */}
      <div className="flex border border-[#dddddd] rounded-[8px] overflow-hidden w-full bg-white p-1">
        <button
          onClick={() => setActiveSubTab('faq')}
          className={`flex-1 py-3 text-sm font-semibold rounded-[6px] transition-colors cursor-pointer text-center ${
            activeSubTab === 'faq'
              ? 'bg-[#035096] text-white shadow-xs'
              : 'bg-transparent text-slate-500 hover:bg-slate-50'
          }`}
        >
          FAQ
        </button>
        <button
          onClick={() => setActiveSubTab('policy')}
          className={`flex-1 py-3 text-sm font-semibold rounded-[6px] transition-colors cursor-pointer text-center ${
            activeSubTab === 'policy'
              ? 'bg-[#035096] text-white shadow-xs'
              : 'bg-transparent text-slate-500 hover:bg-slate-50'
          }`}
        >
          Policy
        </button>
      </div>

      {/* ================= SUB TAB 1: FAQ MANAGEMENT ================= */}
      {activeSubTab === 'faq' && (
        <div className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">FAQ Management</h3>
              <p className="text-[11px] font-medium text-slate-500">Manage frequently asked questions to help users find answers quickly.</p>
            </div>
            <button
              onClick={() => setShowAddFaqModal(true)}
              className="h-10 px-4 bg-[#035096] hover:bg-[#024078] text-white text-xs font-semibold rounded-[8px] flex items-center justify-center gap-2 transition cursor-pointer shrink-0"
            >
              <Plus className="h-4 w-4" />
              <span>Add FAQ</span>
            </button>
          </div>

          {/* FAQ Table */}
          <div className="bg-white rounded-[16px] overflow-hidden border border-[#dddddd] shadow-none">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs text-slate-700 font-medium">
                <thead>
                  <tr className="bg-[#F0F2F3] border-b border-[#dddddd] text-xs font-semibold text-slate-700">
                    <th className="p-4 pl-6">Question</th>
                    <th className="p-4">Views</th>
                    <th className="p-4">Last Updated</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 pr-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#dddddd]">
                  {faqs.map((faq) => (
                    <tr key={faq.id} className="hover:bg-slate-50/30 transition-colors">
                      <td className="p-4 pl-6 font-semibold text-slate-900 max-w-[340px] truncate">{faq.question}</td>
                      <td className="p-4 text-slate-650">{faq.views}</td>
                      <td className="p-4 text-slate-500 font-semibold">{faq.lastUpdated}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-0.5 rounded-[5px] text-[10px] font-semibold ${
                          faq.status === 'Published'
                            ? 'text-emerald-600 bg-emerald-50 border border-emerald-250'
                            : 'text-rose-600 bg-rose-50 border border-rose-200'
                        }`}>
                          {faq.status}
                        </span>
                      </td>
                      <td className="p-4 pr-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="w-8 h-8 rounded-[5px] hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-700 transition cursor-pointer">
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirm({ type: 'faq', id: faq.id })}
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
        </div>
      )}

      {/* ================= SUB TAB 2: POLICY MANAGEMENT ================= */}
      {activeSubTab === 'policy' && (
        <div className="space-y-6">
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Policy Management</h3>
              <p className="text-[11px] font-medium text-slate-500">Manage legal documents, compliance policies, and user agreements.</p>
            </div>

            {/* Policy List Table */}
            <div className="bg-white rounded-[16px] overflow-hidden border border-[#dddddd] shadow-none">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-xs text-slate-700 font-medium">
                  <thead>
                    <tr className="bg-[#F0F2F3] border-b border-[#dddddd] text-xs font-semibold text-slate-700">
                      <th className="p-4 pl-6">Policy Name</th>
                      <th className="p-4">Last Updated</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 pr-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#dddddd]">
                    {policies.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/30 transition-colors">
                        <td className="p-4 pl-6 font-semibold text-slate-900">{p.name}</td>
                        <td className="p-4 text-slate-500 font-semibold">{p.lastUpdated}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-0.5 rounded-[5px] text-[10px] font-semibold ${
                            p.status === 'Published'
                              ? 'text-emerald-600 bg-emerald-50 border border-emerald-250'
                              : 'text-rose-600 bg-rose-50 border border-rose-200'
                          }`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="p-4 pr-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => {
                                setSelectedPolicyType(p.name);
                                document.getElementById('write-policy-section')?.scrollIntoView({ behavior: 'smooth' });
                              }}
                              className="w-8 h-8 rounded-[5px] hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-700 transition cursor-pointer"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setDeleteConfirm({ type: 'policy', id: p.id })}
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
          </div>

          {/* Edit Policy Workspace Section */}
          <div id="write-policy-section" className="bg-white rounded-[16px] border border-[#dddddd] p-6 space-y-4">
            
            <div className="flex justify-between items-center">
              <h3 className="text-base font-semibold text-slate-900">Policy Name</h3>
              <button
                onClick={() => {
                  const newName = prompt('Enter new policy document name:');
                  if (newName && !policies.some((p) => p.name === newName)) {
                    setPolicies([...policies, {
                      id: `POL${policies.length + 1}`,
                      name: newName,
                      lastUpdated: new Date().toISOString().split('T')[0],
                      status: 'Draft'
                    }]);
                  }
                }}
                className="h-8 px-4 bg-[#035096] hover:bg-[#024078] text-white text-xs font-semibold rounded-[6px] flex items-center gap-1.5 transition cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Policy Name</span>
              </button>
            </div>

            {/* Selector Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {policyTypes.map((type) => {
                const isActive = type === selectedPolicyType;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => {
                      setSelectedPolicyType(type);
                      setPolicyEditorContent(`This is the content editor for ${type}. You can compose terms, details, user limitations, and guidelines here.`);
                    }}
                    className={`h-10 px-3 border rounded-[6px] text-xs font-semibold transition-all text-center truncate cursor-pointer ${
                      isActive
                        ? 'border-[#0084FF] text-[#0084FF] bg-blue-50/10'
                        : 'border-slate-200 hover:border-slate-350 text-slate-600 bg-white'
                    }`}
                  >
                    {type}
                  </button>
                );
              })}
            </div>

            {/* Write Policy Area */}
            <div className="space-y-1.5 pt-2">
              <h4 className="text-sm font-semibold text-slate-900">Write Policy</h4>
              <textarea
                rows={12}
                value={policyEditorContent}
                onChange={(e) => setPolicyEditorContent(e.target.value)}
                placeholder="Write policy content here..."
                className="w-full p-4 bg-white border border-slate-200 rounded-[8px] text-xs outline-none focus:border-[#035096] font-medium text-slate-650"
              />
            </div>

            {/* Editor Actions */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleSavePolicyDraft}
                className="h-9 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-[5px] cursor-pointer"
              >
                Save Draft
              </button>
              <button
                type="button"
                onClick={handlePublishPolicy}
                className="h-9 px-6 bg-[#035096] hover:bg-[#024078] text-white text-xs font-semibold rounded-[5px] cursor-pointer"
              >
                Publish Now
              </button>
            </div>

          </div>

        </div>
      )}

      {/* ================= MODAL: ADD NEW FAQ ================= */}
      {showAddFaqModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-[1000] p-4">
          <div className="bg-white w-full max-w-[460px] rounded-[5px] overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-base font-semibold text-slate-900">Add New FAQ</h2>
              <button
                onClick={() => setShowAddFaqModal(false)}
                className="w-8 h-8 rounded-[5px] hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleAddFaqSubmit} className="flex flex-col overflow-hidden">
              <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-600">
                
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 mb-1">FAQ Question</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter the FAQ question"
                    value={faqForm.question}
                    onChange={(e) => setFaqForm({...faqForm, question: e.target.value})}
                    className="w-full h-8 px-2.5 bg-white border border-slate-200 rounded-[5px] text-xs outline-none focus:border-[#035096]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 mb-1">FAQ Answer</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Enter the detailed answer"
                    value={faqForm.answer}
                    onChange={(e) => setFaqForm({...faqForm, answer: e.target.value})}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-[5px] text-xs outline-none focus:border-[#035096] resize-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 mb-1">Tags</label>
                  <input
                    type="text"
                    placeholder="Enter tags"
                    value={faqForm.tags}
                    onChange={(e) => setFaqForm({...faqForm, tags: e.target.value})}
                    className="w-full h-8 px-2.5 bg-white border border-slate-200 rounded-[5px] text-xs outline-none focus:border-[#035096]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 mb-1">SEO Keywords</label>
                  <input
                    type="text"
                    placeholder="Enter SEO keywords"
                    value={faqForm.seoKeywords}
                    onChange={(e) => setFaqForm({...faqForm, seoKeywords: e.target.value})}
                    className="w-full h-8 px-2.5 bg-white border border-slate-200 rounded-[5px] text-xs outline-none focus:border-[#035096]"
                  />
                </div>

              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-slate-100 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddFaqModal(false)}
                  className="flex-1 h-9 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-[5px] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => alert("Draft saved")}
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
      {deleteConfirm && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-[1100] p-4">
          <div className="bg-white w-full max-w-[380px] rounded-[5px] overflow-hidden shadow-2xl p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-base font-semibold text-slate-900">
              Confirm Delete
            </h3>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Are you sure you want to delete this {deleteConfirm.type === 'faq' ? 'FAQ' : 'Policy'}? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 border border-slate-200 text-slate-700 text-xs font-semibold rounded-[5px] hover:bg-slate-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (deleteConfirm.type === 'faq') {
                    setFaqs(faqs.filter((f) => f.id !== deleteConfirm.id));
                  } else {
                    setPolicies(policies.filter((p) => p.id !== deleteConfirm.id));
                  }
                  setDeleteConfirm(null);
                }}
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
