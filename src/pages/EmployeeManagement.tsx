import React, { useState, useRef } from 'react';
import { ChevronDown, Edit2, Trash2 } from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  noOfLeads: number;
  closedLeads: number;
  pendingLeads: number;
}

export const EmployeeManagement: React.FC = () => {
  const pageTopRef = useRef<HTMLDivElement>(null);
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: '001',
      name: 'Rajesh Kumar',
      role: 'Manager',
      email: 'rajesh@gmail.com',
      phone: '9876543210',
      noOfLeads: 22,
      closedLeads: 42,
      pendingLeads: 3
    },
    {
      id: '002',
      name: 'Rajesh Kumar',
      role: 'Employee 1',
      email: 'rajesh@gmail.com',
      phone: '9876543211',
      noOfLeads: 18,
      closedLeads: 56,
      pendingLeads: 1
    },
    {
      id: '003',
      name: 'Rajesh Kumar',
      role: 'Employee 2',
      email: 'rajesh@gmail.com',
      phone: '9876543212',
      noOfLeads: 20,
      closedLeads: 87,
      pendingLeads: 7
    },
    {
      id: '004',
      name: 'Rajesh Kumar',
      role: 'Employee 3',
      email: 'rajesh@gmail.com',
      phone: '9876543213',
      noOfLeads: 62,
      closedLeads: 72,
      pendingLeads: 0
    }
  ]);

  // Form states
  const [nameInput, setNameInput] = useState('Rajesh kumar');
  const [roleInput, setRoleInput] = useState('Manager');
  const [emailInput, setEmailInput] = useState('smtp.gmail.com');
  const [phoneInput, setPhoneInput] = useState('');
  
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const roles = ['Manager', 'Employee 1', 'Employee 2', 'Employee 3', 'Admin'];

  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleAddOrUpdateRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim() || !emailInput.trim()) return;

    if (editingId) {
      // Update existing
      setEmployees(prev => prev.map(emp => emp.id === editingId ? {
        ...emp,
        name: nameInput,
        role: roleInput,
        email: emailInput,
        phone: phoneInput
      } : emp));
      setEditingId(null);
    } else {
      // Add new
      const nextId = (Math.max(...employees.map(e => parseInt(e.id))) + 1).toString().padStart(3, '0');
      const newEmp: Employee = {
        id: nextId,
        name: nameInput,
        role: roleInput,
        email: emailInput,
        phone: phoneInput,
        noOfLeads: 0,
        closedLeads: 0,
        pendingLeads: 0
      };
      setEmployees(prev => [...prev, newEmp]);
    }

    // Reset inputs to default state values
    setNameInput('Rajesh kumar');
    setRoleInput('Manager');
    setEmailInput('smtp.gmail.com');
    setPhoneInput('');
  };

  const handleEditClick = (emp: Employee) => {
    setEditingId(emp.id);
    setNameInput(emp.name);
    setRoleInput(emp.role);
    setEmailInput(emp.email);
    setPhoneInput(emp.phone);

    const scrollContainer = pageTopRef.current?.closest('main');
    if (scrollContainer instanceof HTMLElement) {
      scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeletingId(id);
  };

  const confirmDelete = () => {
    if (deletingId) {
      setEmployees(prev => prev.filter(emp => emp.id !== deletingId));
      setDeletingId(null);
    }
  };

  return (
    <div
      ref={pageTopRef}
      className="bg-white rounded-[5px] border border-gray-200/60 p-6 md:p-8 shadow-sm space-y-8 animate-fade-in font-poppins text-left"
    >
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold text-[#0B2C5C] tracking-tight">Employee management</h1>
      </div>

      {/* Entry Form */}
      <form onSubmit={handleAddOrUpdateRole} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
        {/* Name input */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-900 block">Name</label>
          <input
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-[#E2E8F0] rounded-[6px] text-sm font-medium focus:outline-none focus:border-[#004B8F] text-gray-800 placeholder-gray-400"
            placeholder="Enter employee name"
          />
        </div>

        {/* Role select dropdown */}
        <div className="space-y-2 relative">
          <label className="text-sm font-semibold text-gray-900 block">Role</label>
          <button
            type="button"
            onClick={() => setShowRoleDropdown(!showRoleDropdown)}
            className="w-full flex items-center justify-between px-4 py-3 bg-white border border-[#E2E8F0] rounded-[6px] text-sm font-medium text-gray-800 focus:outline-none focus:border-[#004B8F] text-left cursor-pointer"
          >
            <span>{roleInput}</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>
          
          {showRoleDropdown && (
            <div className="absolute left-0 right-0 mt-1.5 bg-white border border-[#E2E8F0] rounded-[6px] shadow-lg z-50 py-1.5 flex flex-col">
              {roles.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => {
                    setRoleInput(r);
                    setShowRoleDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-slate-50 font-medium"
                >
                  {r}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Email input */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-900 block">Email</label>
          <input
            type="text"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-[#E2E8F0] rounded-[6px] text-sm font-medium focus:outline-none focus:border-[#004B8F] text-gray-800 placeholder-gray-400"
            placeholder="Enter email address"
          />
        </div>

        {/* Phone No input */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-900 block">Phone No</label>
          <input
            type="tel"
            value={phoneInput}
            onChange={(e) => setPhoneInput(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-[#E2E8F0] rounded-[6px] text-sm font-medium focus:outline-none focus:border-[#004B8F] text-gray-800 placeholder-gray-400"
            placeholder="Enter phone number"
          />
        </div>

        {/* Add role button alignment */}
        <div className="flex items-end justify-end md:col-span-2 pt-2">
          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-[#004B8F] hover:bg-[#003d75] text-white px-8 py-3 rounded-[6px] text-sm font-semibold transition-all shrink-0 cursor-pointer shadow-sm"
          >
            {editingId ? 'Update Role' : 'Add Role'}
          </button>
        </div>
      </form>

      {/* Employee List Section */}
      <div className="space-y-4 pt-4 border-t border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 tracking-tight">Employee list</h2>
        
        <div className="overflow-x-auto rounded-[6px] border border-gray-200">
          <table className="w-full text-left border-collapse text-xs md:text-sm min-w-[800px]">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-gray-200">
                <th className="p-4 font-semibold text-[#0B2C5C]">Employee ID</th>
                <th className="p-4 font-semibold text-[#0B2C5C]">Employee Name</th>
                <th className="p-4 font-semibold text-[#0B2C5C]">Role</th>
                <th className="p-4 font-semibold text-[#0B2C5C]">Email</th>
                <th className="p-4 font-semibold text-[#0B2C5C]">Phone No</th>
                <th className="p-4 font-semibold text-[#0B2C5C]">No.of Leads</th>
                <th className="p-4 font-semibold text-[#0B2C5C]">Closed Leads</th>
                <th className="p-4 font-semibold text-[#0B2C5C]">Pending Leads</th>
                <th className="p-4 font-semibold text-[#0B2C5C]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id} className="border-b border-gray-150 hover:bg-slate-50/40 last:border-0">
                  <td className="p-4 font-semibold text-slate-800">{emp.id}</td>
                  <td className="p-4 font-semibold text-gray-900">{emp.name}</td>
                  <td className="p-4 font-semibold text-gray-800">{emp.role}</td>
                  <td className="p-4 font-regular text-gray-400">{emp.email}</td>
                  <td className="p-4 font-regular text-gray-400">{emp.phone || '—'}</td>
                  <td className="p-4 font-semibold text-slate-900">{emp.noOfLeads}</td>
                  <td className="p-4 font-semibold text-slate-900">{emp.closedLeads}</td>
                  <td className="p-4 font-semibold text-slate-900">{emp.pendingLeads.toString().padStart(2, '0')}</td>
                  <td className="p-4 flex items-center gap-3">
                    <button
                      onClick={() => handleEditClick(emp)}
                      className="p-1.5 hover:bg-blue-50 text-slate-600 hover:text-[#004B8F] rounded transition-colors cursor-pointer"
                      title="Edit Employee"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(emp.id)}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded transition-colors cursor-pointer"
                      title="Remove Employee"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Custom Confirm Dialog Modal */}
      {deletingId && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4 font-poppins">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full border border-slate-200 overflow-hidden p-6 space-y-4">
            <h3 className="text-lg font-bold text-gray-900">Delete Employee</h3>
            <p className="text-xs text-gray-500 leading-normal font-medium">
              Are you sure you want to remove this employee from your team? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeletingId(null)}
                className="px-4 py-2 border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-[4px] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-[4px] transition-colors cursor-pointer"
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
