export function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="rounded-lg border border-red/30 bg-red/5 px-4 py-3 text-sm text-red">
      {message}
    </div>
  );
}
