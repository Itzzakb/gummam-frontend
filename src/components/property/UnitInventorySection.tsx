import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

export type FlatStatus = 'available' | 'occupied' | 'sold' | 'mortgage';

export interface InventoryFlat {
  id: string;
  unitNumber: string;
  status: FlatStatus;
}

export interface InventoryFloor {
  id: string;
  floorNumber: number;
  label: string;
  flats: InventoryFlat[];
}

export interface InventoryBlock {
  id: string;
  name: string;
  code: string;
  floors: InventoryFloor[];
}

export interface UnitInventoryData {
  enabled: boolean;
  blocks: InventoryBlock[];
}

export const FLAT_STATUS_META: Record<
  FlatStatus,
  { label: string; swatch: string; selectedRing: string }
> = {
  available: { label: 'Available', swatch: 'bg-[#22C55E]', selectedRing: 'ring-[#22C55E]' },
  occupied: { label: 'Occupied', swatch: 'bg-[#F97316]', selectedRing: 'ring-[#F97316]' },
  sold: { label: 'Sold', swatch: 'bg-[#EF4444]', selectedRing: 'ring-[#EF4444]' },
  mortgage: { label: 'Mortgage', swatch: 'bg-[#CBD5E1]', selectedRing: 'ring-[#94A3B8]' },
};

const STATUS_OPTIONS: { value: FlatStatus; label: string }[] = (
  Object.keys(FLAT_STATUS_META) as FlatStatus[]
).map((status) => ({ value: status, label: FLAT_STATUS_META[status].label }));

const inputClass =
  'w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4885FF] text-sm text-slate-800';

function uid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

function parseFloorNumber(raw: string) {
  const match = raw.match(/-?\d+/);
  if (!match) return 0;
  const n = Number(match[0]);
  return Number.isNaN(n) ? 0 : n;
}

export function createDefaultUnitInventory(): UnitInventoryData {
  return emptyUnitInventory();
}

export function emptyUnitInventory(): UnitInventoryData {
  return { enabled: false, blocks: [] };
}

const FieldSelect: React.FC<{
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}> = ({ value, onChange, options, placeholder = 'Select', disabled, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selected = options.find((o) => o.value === value);
  const displayLabel = selected?.label || placeholder;

  return (
    <div className={`relative w-full ${className || ''}`} ref={dropdownRef}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((open) => !open)}
        className={`w-full px-4 py-3 rounded-xl border flex items-center justify-between text-sm transition-all bg-white ${
          disabled
            ? 'bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed'
            : isOpen
              ? 'border-[#035096] ring-1 ring-[#035096] text-[#035096] cursor-pointer font-medium'
              : 'border-slate-200 hover:border-slate-300 text-slate-700 cursor-pointer'
        }`}
      >
        <span className={`truncate ${selected ? '' : 'text-slate-400'}`}>{displayLabel}</span>
        <svg
          className={`w-4 h-4 shrink-0 transition-transform duration-200 ${isOpen ? 'transform rotate-180 text-[#035096]' : 'text-slate-400'}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {!disabled && isOpen && (
        <div className="absolute left-0 mt-1.5 min-w-full w-max bg-white border border-slate-200 rounded-xl shadow-lg z-50 py-1.5 max-h-60 overflow-y-auto">
          {options.length === 0 ? (
            <p className="px-4 py-2.5 text-sm text-slate-400">No options</p>
          ) : (
            options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-slate-50 flex items-center justify-between gap-4 ${
                  value === opt.value ? 'bg-[#F0F4F9]/60 font-semibold text-[#035096]' : 'text-slate-700'
                }`}
              >
                <span className="whitespace-nowrap">{opt.label}</span>
                {value === opt.value && (
                  <svg className="w-4 h-4 text-[#035096] shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                )}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

interface UnitInventorySectionProps {
  value: UnitInventoryData;
  onChange: (next: UnitInventoryData) => void;
  /** "flats" for apartments, "units" for villas */
  unitLabel?: 'flats' | 'units' | 'villas';
}

export const UnitInventorySection: React.FC<UnitInventorySectionProps> = ({
  value,
  onChange,
  unitLabel = 'flats',
}) => {
  const singular =
    unitLabel === 'villas' ? 'villa' : unitLabel === 'units' ? 'unit' : 'flat';
  const plural = unitLabel;
  const unitTitle =
    unitLabel === 'villas' ? 'List of villas' : unitLabel === 'units' ? 'List of units' : 'List of flats';
  const addQuestion =
    unitLabel === 'villas'
      ? 'Do you want to add the villas?'
      : unitLabel === 'units'
        ? 'Do you want to add the units?'
        : 'Do you want to add the flats?';

  const [draftBlock, setDraftBlock] = useState('');
  const [draftFloor, setDraftFloor] = useState('');
  const [draftUnit, setDraftUnit] = useState('');
  const [draftStatus, setDraftStatus] = useState<FlatStatus>('available');
  const [addError, setAddError] = useState('');

  const listedRows = useMemo(
    () =>
      value.blocks.flatMap((block) =>
        block.floors
          .slice()
          .sort((a, b) => a.floorNumber - b.floorNumber)
          .flatMap((floor) =>
            floor.flats.map((flat) => ({
              blockId: block.id,
              blockCode: block.code,
              blockName: block.name,
              floorId: floor.id,
              floorNumber: floor.floorNumber,
              floorLabel: floor.label,
              flat,
            }))
          )
      ),
    [value.blocks]
  );

  const setEnabled = (enabled: boolean) => {
    if (!enabled) {
      onChange(emptyUnitInventory());
      setDraftBlock('');
      setDraftFloor('');
      setDraftUnit('');
      setDraftStatus('available');
      setAddError('');
      return;
    }
    onChange({ ...value, enabled: true });
  };

  const addListedUnit = () => {
    const blockName = draftBlock.trim();
    const floorName = draftFloor.trim();
    const unitNumber = draftUnit.trim();
    if (!blockName || !floorName || !unitNumber) return;

    const nextBlocks = value.blocks.map((block) => ({
      ...block,
      floors: block.floors.map((floor) => ({
        ...floor,
        flats: [...floor.flats],
      })),
    }));

    const blockKey = blockName.toLowerCase();
    let block = nextBlocks.find(
      (b) => b.code.toLowerCase() === blockKey || b.name.toLowerCase() === blockKey
    );
    if (!block) {
      block = {
        id: uid('block'),
        name: blockName,
        code: blockName,
        floors: [],
      };
      nextBlocks.push(block);
    }

    const floorKey = floorName.toLowerCase();
    const floorNumber = parseFloorNumber(floorName);
    let floor = block.floors.find(
      (f) => f.label.toLowerCase() === floorKey || String(f.floorNumber) === floorKey
    );
    if (!floor) {
      floor = {
        id: uid('floor'),
        floorNumber,
        label: floorName,
        flats: [],
      };
      block.floors.push(floor);
    }

    if (floor.flats.some((flat) => flat.unitNumber.toLowerCase() === unitNumber.toLowerCase())) {
      setAddError(`This ${singular} is already added on that floor.`);
      return;
    }

    floor.flats.push({
      id: uid('flat'),
      unitNumber,
      status: draftStatus,
    });

    onChange({ enabled: true, blocks: nextBlocks });
    setDraftUnit('');
    setAddError('');
  };

  const updateFlatStatus = (blockId: string, floorId: string, flatId: string, status: FlatStatus) => {
    onChange({
      enabled: true,
      blocks: value.blocks.map((block) =>
        block.id !== blockId
          ? block
          : {
              ...block,
              floors: block.floors.map((floor) =>
                floor.id !== floorId
                  ? floor
                  : {
                      ...floor,
                      flats: floor.flats.map((flat) =>
                        flat.id === flatId ? { ...flat, status } : flat
                      ),
                    }
              ),
            }
      ),
    });
  };

  const removeFlat = (blockId: string, floorId: string, flatId: string) => {
    const nextBlocks = value.blocks
      .map((block) => {
        if (block.id !== blockId) return block;
        const floors = block.floors
          .map((floor) =>
            floor.id !== floorId
              ? floor
              : { ...floor, flats: floor.flats.filter((flat) => flat.id !== flatId) }
          )
          .filter((floor) => floor.flats.length > 0);
        return { ...block, floors };
      })
      .filter((block) => block.floors.length > 0);

    onChange({ enabled: true, blocks: nextBlocks });
  };

  return (
    <div className="pt-2">
      <div className="mb-4 pb-2 border-b border-slate-100">
        <h3 className="text-lg font-bold text-[#0B2C5C]">{unitTitle}</h3>
      </div>

      <div className="space-y-2">
        <span className="block text-sm font-semibold text-slate-600">{addQuestion}</span>
        <div className="flex gap-6 mt-1">
          {(['Yes', 'No'] as const).map((item) => {
            const isChecked = item === 'Yes' ? value.enabled : !value.enabled;
            return (
              <label key={item} className="flex items-center gap-2 text-sm text-slate-800 cursor-pointer">
                <input
                  type="radio"
                  name={`add-${plural}-option`}
                  checked={isChecked}
                  onChange={() => setEnabled(item === 'Yes')}
                  className="w-4 h-4 text-[#035096] border-slate-300 focus:ring-[#035096]"
                />
                {item}
              </label>
            );
          })}
        </div>
      </div>

      {value.enabled && (
        <div className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-500 uppercase">Block</label>
              <input
                type="text"
                placeholder="e.g. A - Block"
                value={draftBlock}
                onChange={(e) => {
                  setDraftBlock(e.target.value);
                  setAddError('');
                }}
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-500 uppercase">Floor</label>
              <input
                type="text"
                placeholder="e.g. 1st Floor"
                value={draftFloor}
                onChange={(e) => {
                  setDraftFloor(e.target.value);
                  setAddError('');
                }}
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-500 uppercase">
                {singular === 'villa' ? 'Villa No.' : singular === 'unit' ? 'Unit No.' : 'Flat No.'}
              </label>
              <input
                type="text"
                placeholder="e.g. 101"
                value={draftUnit}
                onChange={(e) => {
                  setDraftUnit(e.target.value);
                  setAddError('');
                }}
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-500 uppercase">Status</label>
              <FieldSelect
                value={draftStatus}
                onChange={(next) => setDraftStatus(next as FlatStatus)}
                options={STATUS_OPTIONS}
              />
            </div>
            <button
              type="button"
              disabled={!draftBlock.trim() || !draftFloor.trim() || !draftUnit.trim()}
              onClick={addListedUnit}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#035096] px-4 py-3 text-sm font-semibold text-white hover:bg-[#024078] disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <Plus className="w-4 h-4" />
              Add {singular}
            </button>
          </div>

          {addError && <p className="text-xs text-red-500">{addError}</p>}

          {listedRows.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/80 px-6 py-8 text-center">
              <p className="text-sm text-slate-600">
                No {plural} added yet. Enter block, floor, {singular} number and status, then add.
              </p>
            </div>
          ) : (
            <div className="border border-slate-100 rounded-xl overflow-x-auto overflow-y-visible">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-[#0B2C5C] font-semibold">
                  <tr>
                    <th className="px-4 py-3">Block</th>
                    <th className="px-4 py-3">Floor</th>
                    <th className="px-4 py-3">
                      {singular === 'villa' ? 'Villa No.' : singular === 'unit' ? 'Unit No.' : 'Flat No.'}
                    </th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 w-12" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {listedRows.map((row) => (
                    <tr key={row.flat.id}>
                      <td className="px-4 py-3 font-medium text-slate-700">{row.blockName}</td>
                      <td className="px-4 py-3 text-slate-700">{row.floorLabel}</td>
                      <td className="px-4 py-3 text-slate-700">{row.flat.unitNumber}</td>
                      <td className="px-4 py-3 min-w-[10rem]">
                        <FieldSelect
                          value={row.flat.status}
                          onChange={(next) =>
                            updateFlatStatus(row.blockId, row.floorId, row.flat.id, next as FlatStatus)
                          }
                          options={STATUS_OPTIONS}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          title={`Remove ${singular}`}
                          onClick={() => removeFlat(row.blockId, row.floorId, row.flat.id)}
                          className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
