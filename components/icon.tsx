
export default function Icon({
                  name,
                  className = "h-5 w-5",
              }: {
    name: "search" | "bag" | "menu" | "close" | "arrow" | "check"
    className?: string
}) {
    const paths = {
        search: (
            <>
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-4-4" />
            </>
        ),
        bag: (
            <>
                <path d="M6 8h12l1 12H5L6 8Z" />
                <path d="M9 9V6a3 3 0 0 1 6 0v3" />
            </>
        ),
        menu: (
            <>
                <path d="M4 7h16M4 12h16M4 17h16" />
            </>
        ),
        close: (
            <>
                <path d="m6 6 12 12M18 6 6 18" />
            </>
        ),
        arrow: (
            <>
                <path d="M5 12h14M13 6l6 6-6 6" />
            </>
        ),
        check: <path d="m5 12 4 4L19 6" />,
    }
    return (
        <svg
            aria-hidden="true"
            className={className}
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
        >
            {paths[name]}
        </svg>
    )
}