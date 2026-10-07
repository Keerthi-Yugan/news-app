type Comment = {
    id: string;
    author: string;
    comment: string;
};

type CommentsProps = {
    comments: Comment[];
};

export default function Comments({
    comments,
}: CommentsProps) {
    return (
        <section className="mt-12">

            <h2 className="mb-6 text-2xl font-bold">
                Comments
            </h2>

            {/* Comment Form */}
            <div className="rounded-xl border bg-[var(--surface)] p-5">

                <textarea
                    placeholder="Write a comment..."
                    className="min-h-28 w-full resize-none rounded-lg border p-3 text-sm outline-none focus:border-blue-500"
                />

                <button
                    type="button"
                    className="mt-3 cursor-pointer rounded-lg bg-[var(--primary)] px-5 py-2 text-sm font-medium text-white hover:bg-[var(--primary-hover)]"
                >
                    Post Comment
                </button>

            </div>

            {/* Comments */}
            <div className="mt-6 space-y-4">

                {comments.map((item) => (
                    <div
                        key={item.id}
                        className="rounded-xl border bg-[var(--surface)] p-5"
                    >
                        <h3 className="font-semibold">
                            {item.author}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                            {item.comment}
                        </p>
                    </div>
                ))}

            </div>

        </section>
    );
}