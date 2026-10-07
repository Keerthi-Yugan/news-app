type NewsHeaderProps = {
    category: string;
    title: string;
    image: string;
};

export default function NewsHeader({
    category,
    title,
    image,
}: NewsHeaderProps) {
    return (
        <section>
            <span className="text-sm font-semibold uppercase text-[var(--primary)]">
                {category}
            </span>

            <h1 className="mt-3 text-3xl font-bold leading-tight md:text-5xl">
                {title}
            </h1>

            <div className="mt-6 overflow-hidden rounded-xl">
                <img
                    src={image}
                    alt={title}
                    className="h-64 w-full object-cover md:h-[450px]"
                />
            </div>
        </section>
    );
}