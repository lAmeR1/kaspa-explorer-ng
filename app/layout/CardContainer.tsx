interface Props {
  children: React.ReactNode;
  title: string;
}

const CardContainer = (props: Props) => (
  <>
    <div className="mb-4 text-2xl">{props.title}</div>
    <div className="grid w-full grid-cols-2 flex-wrap items-stretch justify-between gap-4 md:grid-cols-4">
      {props.children}
    </div>
  </>
);

export default CardContainer;
