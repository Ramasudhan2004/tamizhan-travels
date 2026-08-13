export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-[99999] overflow-hidden bg-white text-black">
      {children}
    </div>
  );
}
