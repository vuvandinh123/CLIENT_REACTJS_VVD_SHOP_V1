import { Link } from "react-router-dom";
import "./style.css";
import notFound from "../../assets/404.png";
import { HiHome } from "react-icons/hi2";
const index = () => {
  return (
    <div className="overflow-hidden">
      {/* component */}
      <div
        className="flex items-center justify-center min-h-screen bg-indigo-200  bg-fixed bg-cover bg-bottom error-bg"
        style={{
          backgroundImage:
            'url(data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900"%3E%3Cpolygon fill="%23f0b608" points="957 450 539 900 1396 900"/%3E%3Cpolygon fill="%23e6d710" points="957 450 872.9 900 1396 900"/%3E%3Cpolygon fill="%23e7af05" points="-60 900 398 662 816 900"/%3E%3Cpolygon fill="%23e7d808" points="337 900 398 662 816 900"/%3E%3Cpolygon fill="%23d8a408" points="1203 546 1552 900 876 900"/%3E%3Cpolygon fill="%23f1e213" points="1203 546 1552 900 1162 900"/%3E%3Cpolygon fill="%23f0b607" points="641 695 886 900 367 900"/%3E%3Cpolygon fill="%23e4d506" points="587 900 641 695 886 900"/%3E%3Cpolygon fill="%23eab822" points="1710 900 1401 632 1096 900"/%3E%3Cpolygon fill="%23e8da14" points="1710 900 1401 632 1365 900"/%3E%3Cpolygon fill="%23e8b008" points="1210 900 971 687 725 900"/%3E%3Cpolygon fill="%23edde14" points="943 900 1210 900 971 687"/%3E%3C/svg%3E)',
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-sm-8 offset-sm-2 text-gray-50 text-center -mt-52">
              <div className="relative flex justify-center items-center">
                <img src={notFound} alt="" />
                <span className="absolute text-xl  top-0   -ml-12  text-gray-300 font-semibold">
                  Oops!
                </span>
              </div>

              <p className="text-gray-100 font-bold text-xl uppercase mt-2 mb-6">
                we are sorry, but the page you requested was not found
              </p>
              <div className="flex justify-center">
                <Link
                  to={"/"}
                  className="bg-green-600 hover:bg-green-800 border-2 hover:shadow-lg  px-5 py-3 text-sm  font-medium tracking-wider text-gray-50 rounded-full flex w-max items-center gap-3"
                >
                  Got to Home <HiHome></HiHome>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
