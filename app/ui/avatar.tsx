export default function Avatar({
  children,
  className,
}: {
  children: JSX.Element;
  className?: string;
}) {
  return (
    <div
      className={`rounded-md w-[38px] h-[38px] shadow-md flex justify-cetner items-center ${className}`}
    >
      {children}
    </div>
  );
}
