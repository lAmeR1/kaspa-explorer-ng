interface Props {
  children: React.ReactNode;
  icon?: React.ElementType;
}

const FooterHelper = (props: Props) => {
  const Icon = props.icon as React.ElementType;

  return (
    <div className="flex w-full flex-row items-start rounded-4xl bg-white p-4 text-left text-gray-500 sm:p-8">
      <div className="me-2 h-5 w-5">{Icon && <Icon className="h-5 w-5 fill-gray-500" />}</div>
      {props.children}
    </div>
  );
};

export default FooterHelper;
