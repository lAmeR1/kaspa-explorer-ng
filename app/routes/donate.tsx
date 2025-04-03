import { NavLink } from "react-router";

export default function Donate() {
  return (
    <div className="w-full rounded-4xl bg-white p-4 text-left text-black sm:p-8">
      <p className="text-xl">
        Kaspa is a vibrant, community-driven project fueled by the passion and
        dedication of contributors from all walks of life. This project thrives
        because countless individuals continuously pour their talents, skills,
        and creativity into making it a success.
        <br />
        <br />
        We rely on the generous support of our community. Your donations not
        only help us cover essential costs but also empower us to keep
        innovating and striving for excellence.
        <br />
        <br />
        <span className="text-3xl">
          Together, we can ensure a bright future for Kaspa.
        </span>
        <br />
        Please consider making a donation to help us continue:
        <br />
        <br />
        <NavLink
          className="text-link"
          to="/accounts/kaspa:qr5trheyg9m9x6t6ph063vq9h9t6u8w40vzd4h0hey554p2q6c6qw6raedq3p"
        >
          kaspa:qr5trheyg9m9x6t6ph063vq9h9t6u8w40vzd4h0hey554p2q6c6qw6raedq3p
        </NavLink>
      </p>
    </div>
  );
}
