type NewsMetaProps = {
    author: string;
    date: string;
    readTime: string;
};

export default function NewsMeta({
    author,
    date,
    readTime,
}: NewsMetaProps) {
    return (
        <div className="mt-5 flex flex-wrap items-center gap-3 border-b pb-5 text-sm text-[var(--text-secondary)]">
            <span className="font-medium text-gray-800">
                By {author}
            </span>

            <span>•</span>

            <span>{date}</span>

            <span>•</span>

            <span>{readTime}</span>
        </div>
    );
}