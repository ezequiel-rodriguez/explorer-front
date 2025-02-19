type Props = {
  title: string | React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
};

function PageTitle({ title, icon, className }: Props) {
  return (
    <h1
      className={`text-2xl sm:text-3xl md:text-title flex gap-3 items-center mt-6 ${className}`}
    >
      {icon && <span>{icon}</span>}
      {title}
    </h1>
  );
}

export default PageTitle;
