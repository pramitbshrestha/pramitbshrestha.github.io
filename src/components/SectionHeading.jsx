export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  as: Tag = 'h2'
}) {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left';
  return (
    <div className={`max-w-2xl mb-8 md:mb-10 ${alignment}`}>
      {eyebrow && (
        <p className="text-accent font-semibold uppercase tracking-wide text-sm mb-2">
          {eyebrow}
        </p>
      )}
      <Tag className="text-2xl md:text-3xl font-extrabold text-primary">{title}</Tag>
      {description && <p className="mt-3 text-slate-600">{description}</p>}
    </div>
  );
}
