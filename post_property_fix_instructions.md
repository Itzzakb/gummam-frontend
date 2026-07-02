# Implementation Context: Restoring Missing Fields & Conditional Logic in PostProperty.tsx

This document provides the exact code modifications and structural context required to align the React-based `PostProperty.tsx` component with the features of the original PHP backend.

---

## 1. Fix Office Space Rental Fields (Logic Bug)
**Location**: `PostProperty.tsx` (around lines 520–527)
**Issue**: Office Space-specific fields are only rendered for "Sell" listings due to `isCommercialOfficeSpaceSell` requiring `formData.intent === 'sell'`.
**Correction**: Change the checks to allow both Sell and Rent.

### Modify:
```typescript
// Replace these definitions:
const isCommercialOfficeSpaceSell = formData.category === 'Commercial' && formData.propertyType === 'Office Space' && formData.intent === 'sell';

// With:
const isCommercialOfficeSpace = formData.category === 'Commercial' && formData.propertyType === 'Office Space' && (formData.intent === 'sell' || formData.intent === 'rent');
```
*Note: Update any subsequent references in the component from `isCommercialOfficeSpaceSell` to `isCommercialOfficeSpace`.*

---

## 2. Dynamic Room Sizes Table (Residentials)
**Issue**: The dynamic table for inputting bedroom dimensions (Length and Width in feet) is missing.
**Solution**:
1. Add `roomSizes` array to `PropertyFormData` interface:
   ```typescript
   interface RoomSize {
     length: string;
     width: string;
   }
   // Add this inside PropertyFormData:
   roomSizes?: RoomSize[];
   ```
2. Initialize it in `initialFormData`:
   ```typescript
   roomSizes: [],
   ```
3. Update state dynamically when `bedroomCount` changes. Extract numerical bedroom count (e.g. from `"3 BHK"` -> `3`):
   ```typescript
   const handleBedroomCountChange = (value: string) => {
     const count = parseInt(value) || 0;
     const newRoomSizes = Array.from({ length: count }, (_, i) => ({
       length: formData.roomSizes?.[i]?.length || '',
       width: formData.roomSizes?.[i]?.width || '',
     }));
     updateFormData({ bedroomCount: value, roomSizes: newRoomSizes });
   };
   ```
4. Render the input table in JSX right below the Bedroom Count dropdown:
   ```tsx
   {formData.roomSizes && formData.roomSizes.length > 0 && (
     <div className="col-span-full mt-4">
       <span className="block text-sm font-semibold text-[#0B2C5C] mb-2">Room Dimensions (ft)</span>
       <div className="border border-slate-100 rounded-xl overflow-hidden">
         <table className="w-full text-sm text-left">
           <thead className="bg-slate-50 text-[#0B2C5C] font-semibold">
             <tr>
               <th className="px-4 py-3">Room</th>
               <th className="px-4 py-3">Length (ft)</th>
               <th className="px-4 py-3">Width (ft)</th>
             </tr>
           </thead>
           <tbody className="divide-y divide-slate-100">
             {formData.roomSizes.map((room, idx) => (
               <tr key={idx}>
                 <td className="px-4 py-3 font-medium text-slate-700">Bedroom {idx + 1}</td>
                 <td className="px-4 py-3">
                   <input
                     type="number"
                     placeholder="Length"
                     value={room.length}
                     onChange={e => {
                       const updated = [...formData.roomSizes!];
                       updated[idx].length = e.target.value;
                       updateFormData({ roomSizes: updated });
                     }}
                     className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#4885FF]"
                   />
                 </td>
                 <td className="px-4 py-3">
                   <input
                     type="number"
                     placeholder="Width"
                     value={room.width}
                     onChange={e => {
                       const updated = [...formData.roomSizes!];
                       updated[idx].width = e.target.value;
                       updateFormData({ roomSizes: updated });
                     }}
                     className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#4885FF]"
                   />
                 </td>
               </tr>
             ))}
           </tbody>
         </table>
       </div>
     </div>
   )}
   ```

---

## 3. Dynamic Shutter Sizes Table (Shops)
**Issue**: Selecting the Shutters Count does not generate length/width input rows.
**Solution**:
1. Add `shutterSizes` array to `PropertyFormData` interface:
   ```typescript
   interface ShutterSize {
     length: string;
     width: string;
   }
   // Add this inside PropertyFormData:
   shutterSizes?: ShutterSize[];
   ```
2. Initialize it in `initialFormData`:
   ```typescript
   shutterSizes: [],
   ```
3. Update state dynamically when `shuttersCount` changes:
   ```typescript
   const handleShuttersCountChange = (value: string) => {
     const count = parseInt(value) || 0;
     const newShutterSizes = Array.from({ length: count }, (_, i) => ({
       length: formData.shutterSizes?.[i]?.length || '',
       width: formData.shutterSizes?.[i]?.width || '',
     }));
     updateFormData({ shuttersCount: value, shutterSizes: newShutterSizes });
   };
   ```
4. Render the input table in JSX below the Shutters Count dropdown:
   ```tsx
   {formData.shutterSizes && formData.shutterSizes.length > 0 && (
     <div className="col-span-full mt-4">
       <span className="block text-sm font-semibold text-[#0B2C5C] mb-2">Shutter Dimensions (ft)</span>
       <div className="border border-slate-100 rounded-xl overflow-hidden">
         <table className="w-full text-sm text-left">
           <thead className="bg-slate-50 text-[#0B2C5C] font-semibold">
             <tr>
               <th className="px-4 py-3">Shutter</th>
               <th className="px-4 py-3">Length (ft)</th>
               <th className="px-4 py-3">Width (ft)</th>
             </tr>
           </thead>
           <tbody className="divide-y divide-slate-100">
             {formData.shutterSizes.map((shutter, idx) => (
               <tr key={idx}>
                 <td className="px-4 py-3 font-medium text-slate-700">Shutter {idx + 1}</td>
                 <td className="px-4 py-3">
                   <input
                     type="number"
                     placeholder="Length"
                     value={shutter.length}
                     onChange={e => {
                       const updated = [...formData.shutterSizes!];
                       updated[idx].length = e.target.value;
                       updateFormData({ shutterSizes: updated });
                     }}
                     className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#4885FF]"
                   />
                 </td>
                 <td className="px-4 py-3">
                   <input
                     type="number"
                     placeholder="Width"
                     value={shutter.width}
                     onChange={e => {
                       const updated = [...formData.shutterSizes!];
                       updated[idx].width = e.target.value;
                       updateFormData({ shutterSizes: updated });
                     }}
                     className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#4885FF]"
                   />
                 </td>
               </tr>
             ))}
           </tbody>
         </table>
       </div>
     </div>
   )}
   ```

---

## 4. Restore PG/Hostel Form Section
**Issue**: Selecting PG/Hostel does not show any of its unique fields.
**Solution**: Render a dedicated section if `formData.propertyType === 'PG/Hostel'`.

Add this JSX block inside Step 3, wrapped in a check for PG/Hostel:
```tsx
{formData.propertyType === 'PG/Hostel' && (
  <div className="bg-white rounded-2xl shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-slate-100 p-8 sm:p-10 space-y-6 mt-8">
    <h3 className="text-lg font-bold text-[#0B2C5C] mb-4 pb-2 border-b border-slate-100">PG / Hostel Details</h3>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-slate-500 uppercase">Available For</label>
        <CustomSelect
          value={formData.available || 'Girls'}
          onChange={e => updateFormData({ available: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm bg-white"
        >
          <option value="Girls">Girls</option>
          <option value="Boys">Boys</option>
          <option value="Others">Others</option>
        </CustomSelect>
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-semibold text-slate-500 uppercase">For</label>
        <CustomSelect
          value={formData.pg_for || 'Students'}
          onChange={e => updateFormData({ pg_for: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm bg-white"
        >
          <option value="Students">Students</option>
          <option value="Working People">Working People</option>
          <option value="Both">Both</option>
        </CustomSelect>
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-semibold text-slate-500 uppercase">Room Type</label>
        <CustomSelect
          value={formData.room_type || 'Sharing'}
          onChange={e => updateFormData({ room_type: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm bg-white"
        >
          <option value="Sharing">Sharing</option>
          <option value="Private">Private</option>
        </CustomSelect>
      </div>

      {formData.room_type === 'Sharing' && (
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-500 uppercase">Sharing in Room</label>
          <CustomSelect
            value={formData.sharing_room || '1'}
            onChange={e => updateFormData({ sharing_room: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm bg-white"
          >
            {Array.from({ length: 10 }, (_, i) => String(i + 1)).map(num => (
              <option key={num} value={num}>{num} Sharing</option>
            ))}
          </CustomSelect>
        </div>
      )}
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-slate-500 uppercase">PG/Hostel Name</label>
        <input
          type="text"
          placeholder="PG Name"
          value={formData.pg_hostel_name || ''}
          onChange={e => updateFormData({ pg_hostel_name: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-slate-500 uppercase">Per Month Fee</label>
        <input
          type="text"
          placeholder="Enter Fee"
          value={formData.rentPerMonth || ''}
          onChange={e => updateFormData({ rentPerMonth: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-slate-500 uppercase">Deposit</label>
        <input
          type="text"
          placeholder="Enter Deposit"
          value={formData.securityDepositVal || ''}
          onChange={e => updateFormData({ securityDepositVal: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm"
        />
      </div>
    </div>

    {/* Includes / Excludes Checklist */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
      <div className="space-y-2">
        <span className="block text-sm font-semibold text-[#0B2C5C]">Includes</span>
        <div className="grid grid-cols-2 gap-2">
          {['Laundry', 'WiFi', 'Water', 'Electricity', 'TV', 'Geyser', 'Housekeeping', 'Lockers'].map(item => (
            <label key={item} className="flex items-center gap-2 text-xs cursor-pointer">
              <input
                type="checkbox"
                checked={(formData.amenities || []).includes(`inc_${item}`)}
                onChange={() => {
                  const current = formData.amenities || [];
                  const val = `inc_${item}`;
                  const updated = current.includes(val) ? current.filter(x => x !== val) : [...current, val];
                  updateFormData({ amenities: updated });
                }}
                className="w-3.5 h-3.5 rounded text-[#035096]"
              />
              {item}
            </label>
          ))}
        </div>
      </div>
      
      <div className="space-y-2">
        <span className="block text-sm font-semibold text-[#0B2C5C]">Excludes</span>
        <div className="grid grid-cols-2 gap-2">
          {['Laundry', 'WiFi', 'Water', 'Electricity', 'TV', 'Geyser', 'Housekeeping', 'Lockers'].map(item => (
            <label key={item} className="flex items-center gap-2 text-xs cursor-pointer">
              <input
                type="checkbox"
                checked={(formData.amenities || []).includes(`exc_${item}`)}
                onChange={() => {
                  const current = formData.amenities || [];
                  const val = `exc_${item}`;
                  const updated = current.includes(val) ? current.filter(x => x !== val) : [...current, val];
                  updateFormData({ amenities: updated });
                }}
                className="w-3.5 h-3.5 rounded text-[#035096]"
              />
              {item}
            </label>
          ))}
        </div>
      </div>
    </div>
  </div>
)}
```
