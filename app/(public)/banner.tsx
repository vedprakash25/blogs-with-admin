import Link from 'next/link'

export const Banner = () => {
    return (
        <section className="relative flex flex-col items-center justify-center text-center px-6 py-32 dark:from-transparent bg-linear-to-b from-orange-200 to-transparent ">

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-80 rounded-full dark:bg-blue-500/[0.07] bg-white-500 blur-[80px] pointer-events-none" />
            {/* <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t  dark:from-transparent from-orange-300/20 to-transparent pointer-events-none" /> */}

            <div className="relative z-10 flex flex-col items-center w-full max-w-3xl mx-auto">
                {/* <div className="flex items-center gap-4 mb-14">
                    <span className="h-px w-8 bg-orange-500/30" />
                    <span className="text-[11px] font-zen tracking-[0.5em] text-orange-500/50">Lense</span>
                    <span className="h-px w-8 bg-orange-500/30" />
                </div> */}

                <h1 className="text-6xl font-bold leading-[1.1] tracking-tight  mb-6 font-zen">See past<br />the <span className="text-orange-500">surface.</span></h1>

                <p className="text-[clamp(0.95rem,1.8vw,1.1rem)] dark:text-white/70 text-zinc-600 font-light leading-relaxed max-w-lg mb-4">
                    A publication for people who aren't satisfied with the headline. We ask why it matters and don't stop until we find out.
                </p>

                {/* <p className="text-[clamp(0.82rem,1.4vw,0.92rem)] text-zinc-700 font-light leading-relaxed">
                    No rush. No algorithm. No hot takes. Just depth.
                </p> */}

                {/* <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-orange-500 hover:bg-orange-400 text-white text-sm font-medium rounded-full transition-all duration-200 hover:shadow-[0_0_40px_rgba(249,115,22,0.25)]"
                    >
                        Start Reading
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                    <Link
                        href="/blog"
                        className="inline-flex items-center px-8 py-3.5 border border-white/8 hover:border-orange-500/25 text-zinc-600 hover:text-orange-500 text-sm font-light rounded-full transition-all duration-200"
                    >
                        Browse Topics
                    </Link>
                </div> */}
            </div>
        </section>
    )
}