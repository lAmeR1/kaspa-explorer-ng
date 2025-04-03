interface Props {
  children: React.ReactNode;
  icon?: any;
}

const FooterHelper = (props: Props) => {
  const Icon = props.icon;

  return (
    <div className="flex w-full flex-row items-center rounded-4xl bg-white p-4 text-left text-gray-500 sm:p-8">
      <div className="me-2 h-5 w-5">
        {props.icon && <Icon className="h-5 w-5 fill-gray-500" />}
      </div>
      {props.children}
    </div>
  );
};

export default FooterHelper;
