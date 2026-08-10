export default function PageContainer({ children, className = '' }) {
  return <div className={`container-page ${className}`}>{children}</div>;
}
