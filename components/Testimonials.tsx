import { testimonials, type Testimonial } from "@/data/projects";

function Card({ item }: { item: Testimonial }) {
  return (
    <figure className="marquee-item mr-6 w-[min(86vw,28rem)] shrink-0 border border-paper/15 p-8">
      <blockquote className="font-display text-2xl leading-snug tracking-tight">
        “{item.quote}”
      </blockquote>
      <figcaption className="mt-8 text-sm">
        <span className="block font-medium">{item.name}</span>
        <span className="text-paper/60">{item.role}</span>
      </figcaption>
    </figure>
  );
}

/**
 * Infinite marquee. Pure CSS (transform only): pauses on hover/focus and
 * becomes a swipeable row when the visitor prefers reduced motion.
 */
export function Testimonials() {
  return (
    <section aria-labelledby="testimonials-title" className="py-24 lg:py-40">
      <div className="px-6 md:px-10">
        <p className="text-sm uppercase tracking-[0.2em] text-paper/60">{testimonials.eyebrow}</p>
        <h2 id="testimonials-title" className="sr-only">
          Testimonials
        </h2>
      </div>

      <div
        className="marquee mt-10"
        role="region"
        aria-label="Testimonials from clients"
        tabIndex={0}
      >
        <div className="marquee-track">
          {testimonials.items.map((item) => (
            <Card key={item.name} item={item} />
          ))}
          <div className="marquee-dup flex" aria-hidden="true">
            {testimonials.items.map((item) => (
              <Card key={`dup-${item.name}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
