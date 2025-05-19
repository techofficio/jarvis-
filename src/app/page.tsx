import Chat from '../components/Chat';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-6">
      <h1 className="my-4 text-3xl font-bold">Jarvis-Lite</h1>
      <Chat />
    </main>
  );
}
