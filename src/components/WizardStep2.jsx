import React from 'react';

export default function WizardStep2({ roomData, setRoomData }) {
  const roomList = [
    { id: 'bedroom', name: 'Bedroom', icon: 'bed', hasCounter: true, defaultCount: 3 },
    { id: 'bathroom', name: 'Bathroom', icon: 'bathtub', hasCounter: true, defaultCount: 2 },
    { id: 'kitchen', name: 'Kitchen', icon: 'cooking', hasCounter: false },
    { id: 'living', name: 'Living', icon: 'chair', hasCounter: false },
    { id: 'dining', name: 'Dining', icon: 'restaurant', hasCounter: false },
    { id: 'office', name: 'Office', icon: 'laptop_mac', hasCounter: false },
    { id: 'balcony', name: 'Balcony', icon: 'balcony', hasCounter: false },
    { id: 'parking', name: 'Parking', icon: 'directions_car', hasCounter: false },
    { id: 'garden', name: 'Garden', icon: 'park', hasCounter: false },
    { id: 'pool', name: 'Pool', icon: 'pool', hasCounter: false },
    { id: 'lift', name: 'Lift', icon: 'elevator', hasCounter: false },
    { id: 'theatre', name: 'Theatre', icon: 'theaters', hasCounter: false },
    { id: 'pooja', name: 'Pooja Room', icon: 'temple_hindu', hasCounter: false },
    { id: 'gym', name: 'Home Gym', icon: 'fitness_center', hasCounter: false },
  ];

  const toggleRoom = (id, hasCounter, defaultCount = 1) => {
    setRoomData((prev) => {
      const current = prev[id];
      if (current) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      } else {
        return {
          ...prev,
          [id]: hasCounter ? defaultCount : 1,
        };
      }
    });
  };

  const updateCount = (e, id, delta) => {
    e.stopPropagation();
    setRoomData((prev) => {
      const current = prev[id] || 1;
      const next = Math.max(1, Math.min(10, current + delta));
      return { ...prev, [id]: next };
    });
  };

  return (
    <div class="space-y-6">
      <div class="mb-6 bg-[#2170e4]/5 p-5 rounded-2xl border border-[#0058be]/20">
        <span class="text-[#0058be] font-bold text-xs uppercase tracking-widest block mb-1">
          USER PAGE 02 — PROJECT SETUP
        </span>
        <h2 class="text-2xl md:text-3xl font-bold text-[#131b2e] mb-1 font-display">What goes inside?</h2>
        <p class="text-[#424754] text-sm">Select the rooms, quantities, and amenities for your project setup.</p>
      </div>


      {/* Bento Grid of Rooms */}
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        {roomList.map((room) => {
          const isSelected = roomData[room.id] !== undefined;
          const count = roomData[room.id] || room.defaultCount || 1;

          return (
            <div
              key={room.id}
              onClick={() => toggleRoom(room.id, room.hasCounter, room.defaultCount)}
              class={`p-5 rounded-2xl flex flex-col items-center gap-3 text-center cursor-pointer transition-all duration-300 relative select-none ${
                isSelected
                  ? 'bg-[#2170e4] text-white shadow-lg scale-[1.02] border-transparent'
                  : 'glass-card text-[#131b2e] hover:border-[#0058be]'
              }`}
            >
              <span class={`material-symbols-outlined text-4xl ${isSelected ? 'text-white' : 'text-[#0058be]'}`}>
                {room.icon}
              </span>
              <span class="font-bold text-sm">{room.name}</span>

              {room.hasCounter && isSelected ? (
                <div class="flex items-center gap-2 mt-1 bg-white/20 px-2 py-1 rounded-full border border-white/30 z-10" onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    onClick={(e) => updateCount(e, room.id, -1)}
                    class="w-6 h-6 rounded-full bg-white/30 text-white flex items-center justify-center font-bold hover:bg-white/40 active:scale-90"
                  >
                    -
                  </button>
                  <span class="text-xs font-bold text-white px-1">{count}</span>
                  <button
                    type="button"
                    onClick={(e) => updateCount(e, room.id, 1)}
                    class="w-6 h-6 rounded-full bg-white/30 text-white flex items-center justify-center font-bold hover:bg-white/40 active:scale-90"
                  >
                    +
                  </button>
                </div>
              ) : isSelected ? (
                <div class="w-5 h-5 rounded-full bg-white/30 flex items-center justify-center text-white text-xs">
                  ✓
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
