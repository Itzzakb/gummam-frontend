import React, { useMemo, useState } from 'react';
import { ChevronDown, Plus, Trash2 } from 'lucide-react';

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

const STATUS_CYCLE: FlatStatus[] = ['available', 'occupied', 'sold', 'mortgage'];

function uid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

function floorLabel(n: number) {
  const abs = Math.abs(n);
  const mod100 = abs % 100;
  const suffix =
    mod100 >= 11 && mod100 <= 13
      ? 'th'
      : ({ 1: 'st', 2: 'nd', 3: 'rd' } as Record<number, string>)[abs % 10] || 'th';
  return `${n}${suffix} Floor`;
}

function nextBlockCode(blocks: InventoryBlock[]) {
  const used = new Set(blocks.map((b) => b.code.toUpperCase()));
  for (let i = 0; i < 26; i += 1) {
    const code = String.fromCharCode(65 + i);
    if (!used.has(code)) return code;
  }
  return `B${blocks.length + 1}`;
}

export function createDefaultUnitInventory(): UnitInventoryData {
  const makeFlats = (floorNumber: number, count: number): InventoryFlat[] =>
    Array.from({ length: count }, (_, i) => ({
      id: uid('flat'),
      unitNumber: `${floorNumber}0${i + 1}`,
      status: (i % 4 === 0
        ? 'available'
        : i % 4 === 1
          ? 'occupied'
          : i % 4 === 2
            ? 'sold'
            : 'mortgage') as FlatStatus,
    }));

  const makeFloors = (count: number, flatsPerFloor: number): InventoryFloor[] =>
    Array.from({ length: count }, (_, i) => {
      const floorNumber = i + 1;
      return {
        id: uid('floor'),
        floorNumber,
        label: floorLabel(floorNumber),
        flats: makeFlats(floorNumber, flatsPerFloor),
      };
    });

  return {
    enabled: true,
    blocks: [
      {
        id: uid('block'),
        name: 'A - Block',
        code: 'A',
        floors: makeFloors(4, 7),
      },
      {
        id: uid('block'),
        name: 'B - Block',
        code: 'B',
        floors: makeFloors(3, 5),
      },
    ],
  };
}

export function emptyUnitInventory(): UnitInventoryData {
  return { enabled: false, blocks: [] };
}

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
  const [activeBlockId, setActiveBlockId] = useState<string>(
    value.blocks[0]?.id || ''
  );
  const [openMenu, setOpenMenu] = useState<'blocks' | 'floors' | 'flats' | null>(null);
  const [addCount, setAddCount] = useState(1);

  const activeBlock = useMemo(
    () => value.blocks.find((b) => b.id === activeBlockId) || value.blocks[0] || null,
    [value.blocks, activeBlockId]
  );

  const sync = (blocks: InventoryBlock[], enabled = true) => {
    onChange({ enabled, blocks });
    if (blocks.length && !blocks.some((b) => b.id === activeBlockId)) {
      setActiveBlockId(blocks[0].id);
    }
  };

  const ensureActive = () => {
    if (!activeBlock && value.blocks[0]) setActiveBlockId(value.blocks[0].id);
  };

  const addBlocks = (count: number) => {
    const next = [...value.blocks];
    for (let i = 0; i < count; i += 1) {
      const code = nextBlockCode(next);
      next.push({
        id: uid('block'),
        name: `${code} - Block`,
        code,
        floors: [],
      });
    }
    sync(next);
    setActiveBlockId(next[next.length - 1].id);
    setOpenMenu(null);
  };

  const removeBlock = (blockId: string) => {
    const next = value.blocks.filter((b) => b.id !== blockId);
    sync(next, next.length > 0);
    setOpenMenu(null);
  };

  const addFloors = (count: number) => {
    if (!activeBlock) return;
    const start =
      activeBlock.floors.reduce((max, f) => Math.max(max, f.floorNumber), 0) + 1;
    const nextFloors = [...activeBlock.floors];
    for (let i = 0; i < count; i += 1) {
      const floorNumber = start + i;
      nextFloors.push({
        id: uid('floor'),
        floorNumber,
        label: floorLabel(floorNumber),
        flats: [],
      });
    }
    sync(
      value.blocks.map((b) =>
        b.id === activeBlock.id ? { ...b, floors: nextFloors } : b
      )
    );
    setOpenMenu(null);
  };

  const removeFloor = (floorId: string) => {
    if (!activeBlock) return;
    sync(
      value.blocks.map((b) =>
        b.id === activeBlock.id
          ? { ...b, floors: b.floors.filter((f) => f.id !== floorId) }
          : b
      )
    );
  };

  const addFlats = (count: number) => {
    if (!activeBlock || activeBlock.floors.length === 0) return;
    sync(
      value.blocks.map((b) => {
        if (b.id !== activeBlock.id) return b;
        return {
          ...b,
          floors: b.floors.map((floor) => {
            const start = floor.flats.length;
            const newFlats = Array.from({ length: count }, (_, i) => ({
              id: uid('flat'),
              unitNumber: `${floor.floorNumber}${String(start + i + 1).padStart(2, '0')}`,
              status: 'available' as FlatStatus,
            }));
            return { ...floor, flats: [...floor.flats, ...newFlats] };
          }),
        };
      })
    );
    setOpenMenu(null);
  };

  const cycleFlatStatus = (floorId: string, flatId: string) => {
    if (!activeBlock) return;
    sync(
      value.blocks.map((b) => {
        if (b.id !== activeBlock.id) return b;
        return {
          ...b,
          floors: b.floors.map((floor) => {
            if (floor.id !== floorId) return floor;
            return {
              ...floor,
              flats: floor.flats.map((flat) => {
                if (flat.id !== flatId) return flat;
                const idx = STATUS_CYCLE.indexOf(flat.status);
                return { ...flat, status: STATUS_CYCLE[(idx + 1) % STATUS_CYCLE.length] };
              }),
            };
          }),
        };
      })
    );
  };

  const removeFlat = (floorId: string, flatId: string) => {
    if (!activeBlock) return;
    sync(
      value.blocks.map((b) => {
        if (b.id !== activeBlock.id) return b;
        return {
          ...b,
          floors: b.floors.map((floor) =>
            floor.id !== floorId
              ? floor
              : { ...floor, flats: floor.flats.filter((f) => f.id !== flatId) }
          ),
        };
      })
    );
  };

  const unitTitle =
    unitLabel === 'villas' ? 'List of villas' : unitLabel === 'units' ? 'List of units' : 'List of flats';

  return (
    <div className="pt-2">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4 pb-2 border-b border-slate-100">
        <div>
          <h3 className="text-lg font-bold text-[#0B2C5C]">{unitTitle}</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Map blocks, floors, and {unitLabel}. Click a unit to cycle its status.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {(['blocks', 'floors', 'flats'] as const).map((menu) => (
            <div key={menu} className="relative">
              <button
                type="button"
                onClick={() => {
                  ensureActive();
                  setOpenMenu((prev) => (prev === menu ? null : menu));
                  setAddCount(1);
                }}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#035096] px-3 py-2 text-xs font-semibold text-white hover:bg-[#024078] transition"
              >
                <Plus className="w-3.5 h-3.5" />
                Add {menu === 'blocks' ? 'Blocks' : menu === 'floors' ? 'Floors' : unitLabel === 'villas' ? 'Villas' : 'Flats'}
                <ChevronDown className="w-3.5 h-3.5 opacity-80" />
              </button>

              {openMenu === menu && (
                <div className="absolute right-0 z-20 mt-2 w-52 rounded-xl border border-slate-200 bg-white p-3 shadow-lg">
                  {menu === 'floors' && !activeBlock && (
                    <p className="text-xs text-slate-500">Add a block first.</p>
                  )}
                  {menu === 'flats' && (!activeBlock || activeBlock.floors.length === 0) && (
                    <p className="text-xs text-slate-500">Add floors to the active block first.</p>
                  )}
                  {(menu === 'blocks' ||
                    (menu === 'floors' && activeBlock) ||
                    (menu === 'flats' && activeBlock && activeBlock.floors.length > 0)) && (
                    <>
                      <label className="block text-[11px] font-semibold uppercase text-slate-500 mb-1">
                        How many?
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={30}
                        value={addCount}
                        onChange={(e) => setAddCount(Math.max(1, Math.min(30, Number(e.target.value) || 1)))}
                        className="w-full mb-3 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-[#4885FF]"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (menu === 'blocks') addBlocks(addCount);
                          else if (menu === 'floors') addFloors(addCount);
                          else addFlats(addCount);
                        }}
                        className="w-full rounded-lg bg-[#035096] py-2 text-xs font-semibold text-white hover:bg-[#024078]"
                      >
                        Add
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {value.blocks.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/80 px-6 py-10 text-center">
          <p className="text-sm text-slate-600 mb-3">No blocks yet. Start by adding a block for this project.</p>
          <button
            type="button"
            onClick={() => addBlocks(1)}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#035096] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#024078]"
          >
            <Plus className="w-4 h-4" />
            Add first block
          </button>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap gap-2 mb-5">
            {value.blocks.map((block) => (
              <div key={block.id} className="inline-flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setActiveBlockId(block.id)}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                    activeBlock?.id === block.id
                      ? 'bg-slate-200 text-[#0B2C5C]'
                      : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {block.name}
                </button>
                {value.blocks.length > 1 && (
                  <button
                    type="button"
                    title="Remove block"
                    onClick={() => removeBlock(block.id)}
                    className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {activeBlock && (
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1 space-y-4 overflow-x-auto">
                {activeBlock.floors.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-slate-200 px-4 py-8 text-center text-sm text-slate-500">
                    No floors in {activeBlock.name}. Use &quot;Add Floors&quot; to continue.
                  </div>
                ) : (
                  activeBlock.floors
                    .slice()
                    .sort((a, b) => b.floorNumber - a.floorNumber)
                    .map((floor) => (
                      <div key={floor.id} className="flex items-start gap-3 min-w-max">
                        <div className="w-24 shrink-0 pt-2 flex items-center gap-1">
                          <span className="text-sm font-semibold text-[#0B2C5C]">{floor.label}</span>
                          <button
                            type="button"
                            title="Remove floor"
                            onClick={() => removeFloor(floor.id)}
                            className="p-0.5 text-slate-300 hover:text-red-500"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {floor.flats.map((flat) => {
                            const meta = FLAT_STATUS_META[flat.status];
                            return (
                              <button
                                key={flat.id}
                                type="button"
                                title={`${flat.unitNumber} — ${meta.label} (click to change)`}
                                onClick={() => cycleFlatStatus(floor.id, flat.id)}
                                onContextMenu={(e) => {
                                  e.preventDefault();
                                  removeFlat(floor.id, flat.id);
                                }}
                                className={`h-9 w-14 rounded-md ${meta.swatch} ring-1 ring-black/5 hover:brightness-95 transition shadow-sm`}
                              />
                            );
                          })}
                          {floor.flats.length === 0 && (
                            <span className="text-xs text-slate-400 pt-2">No {unitLabel} on this floor</span>
                          )}
                        </div>
                      </div>
                    ))
                )}
              </div>

              <div className="lg:w-40 shrink-0 space-y-3 pt-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Status</p>
                {(Object.keys(FLAT_STATUS_META) as FlatStatus[]).map((status) => (
                  <div key={status} className="flex items-center gap-2.5">
                    <span className={`h-4 w-4 rounded-sm ${FLAT_STATUS_META[status].swatch}`} />
                    <span className="text-sm text-slate-700">{FLAT_STATUS_META[status].label}</span>
                  </div>
                ))}
                <p className="text-[11px] text-slate-400 pt-2 leading-relaxed">
                  Click a unit to cycle status. Right-click to remove.
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
