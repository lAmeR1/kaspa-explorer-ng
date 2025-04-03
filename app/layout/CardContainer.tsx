interface Props {
  children: React.ReactNode;
  title: string;
}

const CardContainer = (props: Props) => (
  <>
    <div className="text-2xl mb-4">{props.title}</div>
    <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 justify-between items-stretch flex-wrap">
      {props.children}
    </div>
  </>
);

export default CardContainer;
