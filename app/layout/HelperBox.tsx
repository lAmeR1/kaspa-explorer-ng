interface Props {
    children: React.ReactNode;
}

const HelperBox = (props: Props) => (
    <div className="bg-primary/20 basis-full mb-2 p-6 rounded-2xl text-black text-left text-base
            flex flex-row justify-start items-center">
        {props.children}
    </div>
);

export default HelperBox;