type FooterProps = {
    companyName: string;
    description: string;
    year: number;
};

export default function Footer({
    companyName,
    description,
    year,
}: FooterProps) {
    return (
        <footer className="mt-10 border-t border-[var(--border)] bg-[var(--card-background)]">
            <div className="mx-auto max-w-7xl px-6 py-8 text-center">
                <p className="text-[var(--muted)]">
                    {companyName}
                </p>

                <p className="mt-2 text-sm text-[var(--text-secondary)]">
                    {description}
                </p>

                <p className="mt-4 text-xs text-gray-400">
                    © {year} {companyName}. All rights reserved.
                </p>
            </div>
        </footer>
    );
}