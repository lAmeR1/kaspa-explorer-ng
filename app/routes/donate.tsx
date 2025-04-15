import KasLink from "../KasLink";
import KaspaIconOutline from "../assets/kaspa_outline.svg";
import MainBox from "../layout/MainBox";

const DONATION_ADDRESS = "kaspa:qr5trheyg9m9x6t6ph063vq9h9t6u8w40vzd4h0hey554p2q6c6qw6raedq3p";

export default function Donate() {
  return (
    <MainBox>
      <div className="grid grid-cols-[3fr_1fr] gap-x-10">
        <div className="col-span-2 md:col-span-1">
          <h1>Support Explorer Kaspa Development</h1>
          <p className="py-6">
            Kaspa is built by a passionate and dedicated community of people from all backgrounds, working together to
            make it the best it can be. It’s a project that thrives on the time, talent, and creativity of countless
            individuals who believe in what we’re building. We rely on the amazing support of this community to keep
            going. Your donations help us cover the essentials and give us the chance to keep pushing boundaries,
            exploring new ideas, and making Kaspa even better.
          </p>
          <h2 className="py-6">Your support enables us to keep this explorer running and improving.</h2>
          <p>Please consider making a donation to help us continue:</p>
          <div className="p-4 mt-2 border border-gray-100 rounded-2xl w-full">
            <KasLink linkType="address" link to={DONATION_ADDRESS} />
          </div>
        </div>
        <div className="relative hidden md:grid place-items-center">
          <KaspaIconOutline className="w-60 h-60 lg:w-100 lg:h-100" />
        </div>
      </div>
    </MainBox>
  );
}
