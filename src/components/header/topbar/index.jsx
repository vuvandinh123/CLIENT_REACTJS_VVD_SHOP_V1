import Nation from "../../views/Nation";
import Price from "../../views/Price";

const Topbar = () => {
  return (
    <>
      <div className="topbar hidden lg:block py-3 max-w-[1410px] px-5 mx-auto text-sm">
        <div className="flex justify-between items-center">
          <p className="text-[#515d66] font-medium">
            You are a student and students get 20% discount.
          </p>
          <ul className="flex gap-x-8 text-[#212529]">
            <li>
              <a className="hover:text-[#2b38d1]" href="#">
                Store Locator
              </a>
            </li>
            <li>
              <a className="hover:text-[#2b38d1]" href="#">
                Order Tracking
              </a>
            </li>
            <li>
              <a className="hover:text-[#2b38d1]" href="#">
                FAQs
              </a>
            </li>
           
            <Nation />
            <Price/>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Topbar;
