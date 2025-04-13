interface Props {
  children: React.ReactNode;
}

const HelperBox = (props: Props) => (
  <div
    className={`bg-primary/20 mb-2 flex basis-full flex-row flex-wrap items-center justify-start rounded-2xl p-6 text-left text-black`}
  >
    {props.children}
  </div>
);

export default HelperBox;
