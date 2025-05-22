// app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col gap-4 text-center py-20">
      <h1 className="text-4xl font-bold">🧊 ICE Tea Watch</h1>
      <p className="text-lg">Privacy-safe community reporting for ICE and law enforcement activity.</p>
      <div className="flex justify-center gap-4 mt-8 flex-col">
        <Link href="/report/wizard" className="px-6 py-2 bg-blue-600 text-white rounded-xl">
          Start Report
        </Link>
        <Link href="/heatmap" className="px-6 py-2 border rounded-xl">
          View Heatmap
        </Link>
        <Link href="https://ko-fi.com/techwitch" className="px-6 py-2 border rounded-xl">
          Support The Project (ko-fi)
        </Link>
      </div>
    </div>
  );
}
