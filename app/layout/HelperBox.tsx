interface Props {
  children: React.ReactNode;
}

const HelperBox = (props: Props) => (
  <div
    className={`bg-primary/20 mb-2 flex h-10 flex-row flex-wrap items-center justify-start rounded-2xl px-4 text-left text-black`}
  >
    {props.children}
  </div>
);

export default HelperBox;
