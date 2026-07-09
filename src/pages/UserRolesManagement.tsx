import React, { useState, useEffect, useRef } from 'react';
import { Edit2, Trash2, Plus, X } from 'lucide-react';

interface UserRole {
  id: string;
  name: string;
  roleName: string;
  email: string;
  description: string;
  permissions: string[];
}

const AVAILABLE_PERMISSIONS = [
  { id: 'overview', label: 'View Overview' },
  { id: 'users', label: 'View Users Management' },
  { id: 'roles', label: 'View User role' },
  { id: 'agents', label: 'View Agents & Owners' },
  { id: 'verification', label: 'View Agent Verification' },
  { id: 'properties', label: 'View Properties' },
  { id: 'approval', label: 'View Property approval' },
  { id: 'inquiries', label: 'View Inquiries & CRM' },
  { id: 'pricing', label: 'View Pricing & Subscription' },
  { id: 'advertisement', label: 'View Advertisement' },
  { id: 'blogs', label: 'View Blog management' },
  { id: 'analytics', label: 'View Analytics' },
  { id: 'settings', label: 'View Settings' }
];

export const UserRolesManagement: React.FC = () => {
  // Prepopulated initial roles
  const [roles, setRoles] = useState<UserRole[]>([
    {
      id: '1',
      name: 'Rajesh kumar',
      roleName: 'Manager',
      email: 'smtp.gmail.com',
      description: 'Management and moderation access',
      permissions: ['overview', 'users', 'agents', 'verification', 'properties', 'approval', 'inquiries', 'blogs', 'analytics', 'settings']
    },
    {
      id: '2',
      name: 'Suresh Raina',
      roleName: 'Super Admin',
      email: 'suresh@gummaam.com',
      description: 'Full administrative control of the platform',
      permissions: AVAILABLE_PERMISSIONS.map(p => p.id)
    },
    {
      id: '3',
      name: 'Aditi Rao',
      roleName: 'Support Agent',
      email: 'aditi@gummaam.com',
      description: 'Customer inquiries and basic operations support',
      permissions: ['overview', 'inquiries', 'settings']
    }
  ]);

  const [selectedRoleId, setSelectedRoleId] = useState<string>('1');

  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingRoleForPermissions, setEditingRoleForPermissions] = useState<UserRole | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Add User Role Form state
  const [newName, setNewName] = useState('');
  const [newRoleName, setNewRoleName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPermissions, setNewPermissions] = useState<string[]>(['overview', 'users']);

  // Get currently selected role
  const selectedRole = roles.find(r => r.id === selectedRoleId) || roles[0];

  // Role dropdown on main page
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const roleDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (roleDropdownRef.current && !roleDropdownRef.current.contains(event.target as Node)) {
        setShowRoleDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update selected role info
  const handleUpdateSelectedRole = (field: keyof UserRole, value: any) => {
    if (!selectedRole) return;
    setRoles(prev => prev.map(r => r.id === selectedRole.id ? { ...r, [field]: value } : r));
  };

  // Add new role handler
  const handleAddRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newRoleName || !newEmail) return;

    const newRole: UserRole = {
      id: Date.now().toString(),
      name: newName,
      roleName: newRoleName,
      email: newEmail,
      description: `${newRoleName} administrative role`,
      permissions: newPermissions
    };

    setRoles(prev => [...prev, newRole]);
    setSelectedRoleId(newRole.id);
    
    // Reset form
    setNewName('');
    setNewRoleName('');
    setNewEmail('');
    setNewPermissions(['overview', 'users']);
    setShowAddModal(false);
  };

  // Toggle permission checkbox in add modal
  const togglePermissionInAdd = (id: string) => {
    if (newPermissions.includes(id)) {
      setNewPermissions(prev => prev.filter(p => p !== id));
    } else {
      setNewPermissions(prev => [...prev, id]);
    }
  };

  // Open Edit Permissions Modal
  const openEditPermissions = (role: UserRole) => {
    setEditingRoleForPermissions({ ...role });
    setShowEditModal(true);
  };

  // Save Edit Permissions
  const handleSavePermissions = () => {
    if (!editingRoleForPermissions) return;
    setRoles(prev => prev.map(r => r.id === editingRoleForPermissions.id ? editingRoleForPermissions : r));
    setShowEditModal(false);
    setEditingRoleForPermissions(null);
  };

  // Toggle permission in edit modal
  const togglePermissionInEdit = (id: string) => {
    if (!editingRoleForPermissions) return;
    const currentPerms = editingRoleForPermissions.permissions;
    const updatedPerms = currentPerms.includes(id)
      ? currentPerms.filter(p => p !== id)
      : [...currentPerms, id];

    setEditingRoleForPermissions({
      ...editingRoleForPermissions,
      permissions: updatedPerms
    });
  };

  // Delete role handler
  const handleDeleteRole = (id: string) => {
    if (roles.length <= 1) {
      alert("At least one administrative role must remain.");
      return;
    }
    const updatedRoles = roles.filter(r => r.id !== id);
    setRoles(updatedRoles);
    if (selectedRoleId === id) {
      setSelectedRoleId(updatedRoles[0].id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">User Role Management</h1>
          <p className="text-xs font-medium text-slate-500 mt-1">
            Configure platform-wide settings and administrative options.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="h-10 px-4 bg-[#035096] hover:bg-[#024078] text-white text-xs font-semibold rounded-[8px] flex items-center justify-center gap-2 transition cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Add Role</span>
        </button>
      </div>

      {/* Inputs Form Section for selected role */}
      {selectedRole && (
        <div className="bg-white border border-[#dddddd] rounded-[16px] p-6 shadow-none">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            {/* Name Input */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 block">Name</label>
              <input
                type="text"
                value={selectedRole.name}
                onChange={(e) => handleUpdateSelectedRole('name', e.target.value)}
                className="w-full h-10 px-4 bg-white border border-slate-200 rounded-[8px] text-xs outline-none transition focus:border-[#035096]"
                placeholder="Enter name"
              />
            </div>

            {/* Role Select Dropdown styled exactly like CustomFilterDropdown */}
            <div className="space-y-2 relative" ref={roleDropdownRef}>
              <label className="text-xs font-semibold text-slate-700 block">Role</label>
              <button
                type="button"
                onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                className={`w-full h-10 px-3.5 bg-white border rounded-[8px] text-xs font-semibold transition-all focus:outline-none flex items-center justify-between cursor-pointer ${
                  showRoleDropdown
                    ? 'border-[#035096] text-[#035096] ring-1/2 ring-[#035096]/20'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <span>{selectedRole.roleName}</span>
                <svg
                  className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${
                    showRoleDropdown ? 'rotate-180 text-[#035096]' : 'text-slate-500'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {showRoleDropdown && (
                <div className="absolute left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-[8px] shadow-lg z-50 py-1 flex flex-col">
                  {['Super Admin', 'Manager', 'Support Agent', 'Content Editor'].map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => {
                        handleUpdateSelectedRole('roleName', r);
                        handleUpdateSelectedRole('description', `${r} administrative role`);
                        setShowRoleDropdown(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs transition-colors flex items-center justify-between ${
                        r === selectedRole.roleName
                          ? 'bg-[#F0F4F9]/60 text-[#035096] font-semibold'
                          : 'text-slate-700 hover:bg-slate-50 font-medium'
                      }`}
                    >
                      <span>{r}</span>
                      {r === selectedRole.roleName && (
                        <svg className="w-3 h-3 text-[#035096] shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Email Input */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-semibold text-slate-700 block">Email</label>
              <input
                type="email"
                value={selectedRole.email}
                onChange={(e) => handleUpdateSelectedRole('email', e.target.value)}
                className="w-full h-10 px-4 bg-white border border-slate-200 rounded-[8px] text-xs outline-none transition focus:border-[#035096]"
                placeholder="Enter email"
              />
            </div>
          </div>
        </div>
      )}

      {/* Permissions Table Section */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-slate-800">Permissions</h2>

        <div className="bg-white rounded-[16px] overflow-hidden border border-[#dddddd] shadow-none">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="bg-[#F0F2F3] border-b border-[#dddddd] text-slate-700 font-semibold">
                  <th className="p-4 pl-6">Role</th>
                  <th className="p-4">Description</th>
                  <th className="p-4">Active Permissions</th>
                  <th className="p-4 text-center pr-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#dddddd] text-slate-700 font-medium">
                {roles.map((role) => {
                  const checkedCount = role.permissions.length;
                  const totalCount = AVAILABLE_PERMISSIONS.length;
                  const percent = (checkedCount / totalCount) * 100;
                  const isCurrent = role.id === selectedRoleId;

                  return (
                    <tr
                      key={role.id}
                      onClick={() => setSelectedRoleId(role.id)}
                      className={`hover:bg-slate-50/30 transition-colors cursor-pointer ${
                        isCurrent ? 'bg-slate-50/20' : ''
                      }`}
                    >
                      <td className="p-4 pl-6 font-semibold text-slate-900">{role.roleName}</td>
                      <td className="p-4 text-slate-400 font-medium">{role.description}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-3 w-48 shrink-0">
                          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-[#035096] h-full rounded-full transition-all duration-300"
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                          <span className="text-[11px] font-semibold text-slate-650 shrink-0 min-w-[36px] text-right">
                            {checkedCount}/{totalCount}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 pr-6">
                        <div className="flex items-center justify-center gap-2" onClick={e => e.stopPropagation()}>
                          <button
                            onClick={() => openEditPermissions(role)}
                            className="w-8 h-8 rounded-[6px] hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-[#035096] transition cursor-pointer"
                            title="Edit Permissions"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(role.id)}
                            className="w-8 h-8 rounded-[6px] hover:bg-red-50 flex items-center justify-center text-slate-450 hover:text-red-600 transition cursor-pointer"
                            title="Delete Role"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add User Role Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-[1000] p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-[480px] rounded-[16px] overflow-hidden border border-[#dddddd] shadow-2xl animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-900">Add User Role</span>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-[8px] hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-650 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form & Permissions List */}
            <form onSubmit={handleAddRole}>
              <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto [scrollbar-width:thin]">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-600 block">Name</label>
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="w-full h-9 px-3 bg-white border border-slate-200 rounded-[6px] text-xs outline-none transition focus:border-[#035096]"
                      placeholder="Enter name"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-600 block">Role</label>
                    <input
                      type="text"
                      value={newRoleName}
                      onChange={(e) => setNewRoleName(e.target.value)}
                      className="w-full h-9 px-3 bg-white border border-slate-200 rounded-[6px] text-xs outline-none transition focus:border-[#035096]"
                      placeholder="Enter Role"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-600 block">Email</label>
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full h-9 px-3 bg-white border border-slate-200 rounded-[6px] text-xs outline-none transition focus:border-[#035096]"
                    placeholder="Enter email"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-semibold text-slate-600 block">Permissions</label>
                  <div className="space-y-2 border border-slate-100 rounded-[8px] p-2 bg-slate-50/30 max-h-[220px] overflow-y-auto [scrollbar-width:thin]">
                    {AVAILABLE_PERMISSIONS.map((perm) => {
                      const isChecked = newPermissions.includes(perm.id);
                      return (
                        <label
                          key={perm.id}
                          className="flex items-center gap-3 p-2 bg-white border border-slate-100 rounded-[6px] cursor-pointer hover:bg-slate-50 transition"
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => togglePermissionInAdd(perm.id)}
                            className="w-4 h-4 rounded border-slate-200 text-[#035096] focus:ring-[#035096] accent-[#035096]"
                          />
                          <span className="text-[11px] font-medium text-slate-750">{perm.label}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-6 py-4 border-t border-slate-150 bg-slate-50/50 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="h-9 px-4 bg-slate-200/80 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-[6px] transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-9 px-4 bg-[#035096] hover:bg-[#024078] text-white text-xs font-semibold rounded-[6px] transition cursor-pointer"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Role Permissions Modal */}
      {showEditModal && editingRoleForPermissions && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-[1000] p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-[480px] rounded-[16px] overflow-hidden border border-[#dddddd] shadow-2xl animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-900">
                Edit Role: {editingRoleForPermissions.roleName}
              </span>
              <button
                onClick={() => setShowEditModal(false)}
                className="w-8 h-8 rounded-[8px] hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-650 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Permissions List */}
            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto [scrollbar-width:thin]">
              <span className="text-[11px] font-medium text-slate-500 block">
                Permissions ({editingRoleForPermissions.permissions.length}/{AVAILABLE_PERMISSIONS.length})
              </span>
              
              <div className="space-y-2">
                {AVAILABLE_PERMISSIONS.map((perm) => {
                  const isChecked = editingRoleForPermissions.permissions.includes(perm.id);
                  return (
                    <label
                      key={perm.id}
                      className="flex items-center gap-3 p-2 bg-white border border-slate-100 rounded-[6px] cursor-pointer hover:bg-slate-50 transition"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => togglePermissionInEdit(perm.id)}
                        className="w-4 h-4 rounded border-slate-200 text-[#035096] focus:ring-[#035096] accent-[#035096]"
                      />
                      <span className="text-[11px] font-medium text-slate-750">{perm.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="px-6 py-4 border-t border-slate-150 bg-slate-50/50 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowEditModal(false)}
                className="h-9 px-4 bg-slate-200/80 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-[6px] transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSavePermissions}
                className="h-9 px-4 bg-[#035096] hover:bg-[#024078] text-white text-xs font-semibold rounded-[6px] transition cursor-pointer"
              >
                Save
              </button>
            </div>
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
              Are you sure you want to delete this administrative role? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 border border-slate-200 text-slate-700 text-xs font-semibold rounded-[5px] hover:bg-slate-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleDeleteRole(deleteConfirmId);
                  setDeleteConfirmId(null);
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
