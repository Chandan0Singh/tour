export default function DestinationHero({ stateName }) {
    return (
        <section className="relative bg-[#5E6B58] py-20 md:py-28">
            <div className="mx-auto max-w-7xl px-6">
                <p className="text-sm uppercase tracking-[0.25em] text-white/70">
                    Explore India
                </p>

                <h1 className="mt-4 font-['Playfair_Display'] text-4xl font-medium text-white md:text-6xl">
                    {stateName}
                </h1>

                <p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">
                    Discover our handpicked tours and travel experiences in{" "}
                    {stateName}.
                </p>
            </div>
        </section>
    );
}