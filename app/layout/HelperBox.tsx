interface Props {
  children: React.ReactNode;
}

const HelperBox = (props: Props) => (
  <div
    className={`bg-primary/20 mb-2 flex basis-full flex-row items-center justify-start rounded-2xl p-6 text-left text-base text-black`}
  >
    {props.children}
  </div>
);

export default HelperBox;
