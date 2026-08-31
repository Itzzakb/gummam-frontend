import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Upload, Trash2, Star, Play } from 'lucide-react';

export interface MediaItem {
  id: string;
  file: File;
  preview: string;
  category: string;
  kind: 'image' | 'video';
}

export interface MediaCategoryOptions {
  category?: string;
  propertyType?: string;
  bedroomCount?: string;
}

const OTHER_TAB = 'Add other images';

export function getMediaCategories({
  category,
  propertyType,
  bedroomCount,
}: MediaCategoryOptions): string[] {
  if (category === 'Lands') {
    return propertyType === 'Acre'
      ? ['Land View', 'Road Facing', 'Boundary', 'Water Source', 'Survey Map', OTHER_TAB]
      : ['Plot View', 'Road Facing', 'Corner View', 'Layout Map', OTHER_TAB];
  }

  if (category === 'Commercial') {
    switch (propertyType) {
      case 'Office Space':
        return ['Exterior', 'Reception', 'Work Space', 'Cabins', 'Conference Room', 'Pantry', 'Washroom', 'Floor Plan', OTHER_TAB];
      case 'Shops':
        return ['Exterior', 'Shop Front', 'Interior', 'Shutter View', 'Washroom', 'Floor Plan', OTHER_TAB];
      case 'Showrooms':
        return ['Exterior', 'Showroom Space', 'Work Space', 'Garage Shed', 'Washroom', 'Floor Plan', OTHER_TAB];
      case 'Warehouse/Godown':
        return ['Exterior', 'Closed Shed', 'Open Space', 'Loading Area', 'Washroom', 'Floor Plan', OTHER_TAB];
      case 'Industrial Buildings':
        return ['Exterior', 'Building View', 'Work Area', 'Power Supply', 'Washroom', 'Floor Plan', OTHER_TAB];
      case 'Industrial Space/shed':
        return ['Exterior', 'Shed View', 'Open Yard', 'Work Area', 'Floor Plan', OTHER_TAB];
      default:
        return ['Exterior', 'Interior', 'Washroom', 'Floor Plan', OTHER_TAB];
    }
  }

  if (propertyType === 'PG/Hostel') {
    return ['Exterior', 'Rooms', 'Bathroom', 'Kitchen', 'Dining Area', 'Common Area', OTHER_TAB];
  }

  const parsedBedrooms = parseInt(bedroomCount || '', 10);
  const bedroomTabs = Array.from(
    { length: Math.min(Math.max(Number.isNaN(parsedBedrooms) ? 2 : parsedBedrooms, 1), 8) },
    (_, i) => `Bed Room ${i + 1}`
  );

  return [
    'Exterior',
    'Living Room',
    ...bedroomTabs,
    'Bathroom',
    'Kitchen',
    'Balcony',
    'Floor Plan',
    OTHER_TAB,
  ];
}

interface MediaUploadSectionProps {
  items: MediaItem[];
  thumbnailId: string;
  categories: string[];
  onChange: (next: { items: MediaItem[]; thumbnailId: string }) => void;
  minImages?: number;
}

export const MediaUploadSection: React.FC<MediaUploadSectionProps> = ({
  items,
  thumbnailId,
  categories,
  onChange,
  minImages = 3,
}) => {
  const [activeCategory, setActiveCategory] = useState(categories[0] || OTHER_TAB);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!categories.includes(activeCategory)) {
      setActiveCategory(categories[0] || OTHER_TAB);
    }
  }, [categories, activeCategory]);

  const fallbackCategory = categories[categories.length - 1] || OTHER_TAB;
  const categoryOf = (item: MediaItem) =>
    categories.includes(item.category) ? item.category : fallbackCategory;

  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    items.forEach((item) => {
      const key = categories.includes(item.category) ? item.category : fallbackCategory;
      map[key] = (map[key] || 0) + 1;
    });
    return map;
  }, [items, categories, fallbackCategory]);

  const visibleItems = items.filter((item) => categoryOf(item) === activeCategory);
  const imageCount = items.filter((item) => item.kind === 'image').length;
  const videoCount = items.length - imageCount;

  const addFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    const added: MediaItem[] = Array.from(fileList).map((file) => ({
      id: `media-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      file,
      preview: URL.createObjectURL(file),
      category: activeCategory,
      kind: file.type.startsWith('video/') ? 'video' : 'image',
    }));

    const nextItems = [...items, ...added];
    const nextThumbnail =
      thumbnailId && nextItems.some((item) => item.id === thumbnailId)
        ? thumbnailId
        : added.find((item) => item.kind === 'image')?.id || '';

    onChange({ items: nextItems, thumbnailId: nextThumbnail });
    if (inputRef.current) inputRef.current.value = '';
  };

  const removeItem = (id: string) => {
    const target = items.find((item) => item.id === id);
    if (target) URL.revokeObjectURL(target.preview);
    const nextItems = items.filter((item) => item.id !== id);
    const nextThumbnail =
      thumbnailId === id ? nextItems.find((item) => item.kind === 'image')?.id || '' : thumbnailId;
    onChange({ items: nextItems, thumbnailId: nextThumbnail });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <label className="block text-sm font-semibold text-[#0B2C5C]">
          Property Images <span className="text-red-500">*</span>{' '}
          <span className="text-xs text-slate-400 font-normal">(Minimum {minImages})</span>
        </label>
        <span className="text-xs text-slate-400">Click on any one image to set it as the thumbnail</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => {
          const count = counts[cat] || 0;
          const isActive = cat === activeCategory;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition ${
                isActive
                  ? 'bg-[#035096] border-[#035096] text-white'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-[#035096]/40 hover:text-[#035096]'
              }`}
            >
              {cat}
              {count > 0 && (
                <span
                  className={`inline-flex min-w-[1.25rem] items-center justify-center rounded-full px-1.5 py-0.5 text-[10px] leading-none ${
                    isActive ? 'bg-white/25 text-white' : 'bg-[#F0F4F9] text-[#035096]'
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="border-2 border-dashed border-slate-200 hover:border-[#4885FF] rounded-2xl p-8 text-center bg-slate-50/50 transition-colors relative cursor-pointer">
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={(e) => addFiles(e.target.files)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="p-3 bg-white rounded-full shadow-sm text-[#035096]">
            <Upload className="w-6 h-6" />
          </div>
          <span className="text-sm font-semibold text-[#0B2C5C]">
            Drag and drop {activeCategory.toLowerCase()} files here or click to browse
          </span>
          <span className="text-xs text-slate-400">Supports PNG, JPG, JPEG and MP4 (Max 5MB each)</span>
        </div>
      </div>

      <p className="text-xs text-slate-500">
        <span className="font-semibold text-[#0B2C5C]">{imageCount}</span> images
        {videoCount > 0 && (
          <>
            {' '}and <span className="font-semibold text-[#0B2C5C]">{videoCount}</span> videos
          </>
        )}{' '}
        added across all tabs
      </p>

      {visibleItems.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {visibleItems.map((item) => {
            const isThumbnail = item.id === thumbnailId;
            return (
              <div
                key={item.id}
                className={`relative group rounded-xl overflow-hidden aspect-square border transition ${
                  isThumbnail ? 'border-[#035096] ring-2 ring-[#035096]/30' : 'border-slate-200'
                }`}
              >
                {item.kind === 'video' ? (
                  <>
                    <video src={item.preview} className="w-full h-full object-cover" muted />
                    <span className="absolute inset-0 flex items-center justify-center bg-black/25 text-white pointer-events-none">
                      <Play className="w-6 h-6" />
                    </span>
                  </>
                ) : (
                  <button
                    type="button"
                    title="Set as thumbnail"
                    onClick={() => onChange({ items, thumbnailId: item.id })}
                    className="w-full h-full"
                  >
                    <img src={item.preview} alt={item.category} className="w-full h-full object-cover" />
                  </button>
                )}

                {isThumbnail && (
                  <span className="absolute bottom-1.5 left-1.5 inline-flex items-center gap-1 rounded-full bg-[#035096] px-2 py-0.5 text-[10px] font-semibold text-white">
                    <Star className="w-3 h-3 fill-current" />
                    Thumbnail
                  </span>
                )}

                <button
                  type="button"
                  title="Remove"
                  onClick={() => removeItem(item.id)}
                  className="absolute top-1.5 right-1.5 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full shadow transition-all duration-200"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/80 px-6 py-6 text-center text-sm text-slate-500">
          No files added for {activeCategory} yet.
        </div>
      )}
    </div>
  );
};
