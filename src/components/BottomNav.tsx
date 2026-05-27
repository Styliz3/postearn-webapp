// src/components/BottomNav.tsx
import { Home, Megaphone, Upload, Wallet, LifeBuoy } from "lucide-react";

export default function BottomNav({ page, setPage }: any) {
  const items = [
    ["home", Home, "Home"],
    ["campaigns", Megaphone, "Campaigns"],
    ["submit", Upload, "Submit"],
    ["rewards", Wallet, "Rewards"],
    ["support", LifeBuoy, "Support"]
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-green-900/40 bg-black/90">
      <div className="mx-auto flex max-w-md justify-around p-2">
        {items.map(([id, Icon, label]: any) => (
          <button
            key={id}
            onClick={() => setPage(id)}
            className={`flex flex-col items-center gap-1 rounded-xl px-3 py-2 text-xs ${
              page === id ? "bg-green-500 text-black" : "text-zinc-400"
            }`}
          >
            <Icon size={18} />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
