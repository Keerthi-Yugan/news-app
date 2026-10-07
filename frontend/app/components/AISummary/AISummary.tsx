type AISummaryProps = {
    summary: string;
};

export default function AISummary({
    summary,
}: AISummaryProps) {
    return (
        <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">

            <div className="flex items-center gap-2">
                <span className="text-xl">✨</span>

                <h2 className="text-lg font-bold">
                    AI Summary
                </h2>
            </div>

            <p className="mt-3 text-sm leading-7 text-gray-700 md:text-base">
                {summary}
            </p>

        </section>
    );
}