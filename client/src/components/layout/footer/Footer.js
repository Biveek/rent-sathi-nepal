import FooterBottom from "./FooterBottom";
import FooterBrand from "./FooterBrand";
import FooterContact from "./FooterContact";
import FooterLinks from "./FooterLinks";
import FooterSocial from "./FooterSocial";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-4 lg:px-8">

        <FooterBrand />

        <FooterLinks />

        <FooterContact />

        <FooterSocial />

      </div>

      <FooterBottom />
    </footer>
  );
}