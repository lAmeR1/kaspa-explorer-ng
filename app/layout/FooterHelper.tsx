interface Props {
  children: React.ReactNode;
  icon?: any;
}

const FooterHelper = (props: Props) => {
  const Icon = props.icon;

  return (
    <div className="w-full flex flex-row items-center bg-white rounded-4xl p-4 sm:p-8 text-left  text-gray-500">
      <div className="h-5 w-5 me-2">
        {props.icon && <Icon className="h-5 w-5 fill-gray-500" />}
      </div>
      {props.children}
    </div>
  );
};

export default FooterHelper;
