type NewsContentProps = {
    content: string[];
};

export default function NewsContent({
    content,
}: NewsContentProps) {
    return (
        <article className="mt-8 space-y-5">
            {content.map((paragraph, index) => (
                <p
                    key={index}
                    className="text-base leading-8 text-gray-700 md:text-lg"
                >
                    {paragraph}
                </p>
            ))}
        </article>
    );
}