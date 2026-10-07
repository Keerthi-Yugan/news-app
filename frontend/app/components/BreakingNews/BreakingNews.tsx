type BreakingNewsProps = {
    message: string;
  };
  
  export default function BreakingNews({
    message,
  }: BreakingNewsProps) {
    return (
      <section className="border-b bg-red-50">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-3">
          <span className="rounded bg-red-600 px-3 py-1 text-xs font-bold text-white">
            BREAKING
          </span>
  
          <p className="text-sm font-medium">
            {message}
          </p>
        </div>
      </section>
    );
  }