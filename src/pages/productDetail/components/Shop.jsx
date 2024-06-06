import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { formathDate } from "../../../utils";
import PropTypes from "prop-types";
import { MdEmail, MdOutlineMailOutline } from "react-icons/md";
import { useEffect, useState } from "react";
import { getIsFollowShop, toggleFollowShop } from "../../../service/Shop";
const Shop = ({ shop }) => {
  const [followe, setFollowe] = useState(false);
  useEffect(() => {
    const fetchAPi = async () => {
      try {
        const res = await getIsFollowShop(shop.id);
        setFollowe(res.data);
      } catch (error) {
        console.log(error, "hiii");
      }
    };
    if(shop.id){
      fetchAPi();
    }
  }, [shop.id]);
  const handleClickFollow = async () => {
    try {
      const res = await toggleFollowShop(shop.id);
      if(res.data){
        setFollowe(!followe);
      }
      // setFollowe(!followe);
    } catch (error) {
      console.log(error, "hiii");
    }
  };
  return (
    <div className="mt-10">
      <div className="flex flex-row rounded-lg border border-gray-200/80 bg-white p-6">
        {/* Avaar Container */}
        <div className="relative">
          {/* User Avatar */}
          <img
            className="w-20 h-20 border rounded-md object-cover"
            src={shop.logo}
            alt="User"
          />
          {/* Online Status Dot */}
          <div
            className="absolute -right-3 bottom-5 h-5 w-5 sm:top-2 rounded-full border-4 border-white bg-green-400 sm:invisible md:visible"
            title="User is online"
          />
        </div>
        {/* Meta Body */}
        <div className="flex flex-col px-6">
          {/* Username Container */}
          <div className="flex h-8 flex-row">
            {/* Username */}
            <Link href="https://github.com/EgoistDeveloper/" target="_blank">
              <h2 className="text-lg font-semibold">{shop.name}</h2>
            </Link>
            {/* User Verified */}
            <svg
              className="my-auto ml-2 h-4 fill-blue-400"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              width={20}
              height={20}
              viewBox="0 0 26 26"
            >
              <path d="M23,12L20.56,9.22L20.9,5.54L17.29,4.72L15.4,1.54L12,3L8.6,1.54L6.71,4.72L3.1,5.53L3.44,9.21L1,12L3.44,14.78L3.1,18.47L6.71,19.29L8.6,22.47L12,21L15.4,22.46L17.29,19.28L20.9,18.46L20.56,14.78L23,12M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z" />
            </svg>
          </div>
          {/* Meta Badges */}
          <div className="my-2 flex flex-row space-x-2">
            {/* Badge Role */}
            <div className="flex flex-row">
              <svg
                className="mr-2 h-4 w-4 fill-gray-500/80"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                width={24}
                height={24}
                viewBox="0 0 24 24"
              >
                <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7.07,18.28C7.5,17.38 10.12,16.5 12,16.5C13.88,16.5 16.5,17.38 16.93,18.28C15.57,19.36 13.86,20 12,20C10.14,20 8.43,19.36 7.07,18.28M18.36,16.83C16.93,15.09 13.46,14.5 12,14.5C10.54,14.5 7.07,15.09 5.64,16.83C4.62,15.5 4,13.82 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,13.82 19.38,15.5 18.36,16.83M12,6C10.06,6 8.5,7.56 8.5,9.5C8.5,11.44 10.06,13 12,13C13.94,13 15.5,11.44 15.5,9.5C15.5,7.56 13.94,6 12,6M12,11A1.5,1.5 0 0,1 10.5,9.5A1.5,1.5 0 0,1 12,8A1.5,1.5 0 0,1 13.5,9.5A1.5,1.5 0 0,1 12,11Z" />
              </svg>
              <div className="text-xs text-gray-400/80 hover:text-gray-400">
                {shop.lastName + " " + shop.firstName}
              </div>
            </div>
            {/* Badge Location */}
            <div className="flex flex-row">
              <svg
                className="mr-2 h-4 w-4 fill-gray-500/80"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                width={24}
                height={24}
                viewBox="0 0 24 24"
              >
                <path d="M12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5M12,2A7,7 0 0,1 19,9C19,14.25 12,22 12,22C12,22 5,14.25 5,9A7,7 0 0,1 12,2M12,4A5,5 0 0,0 7,9C7,10 7,12 12,18.71C17,12 17,10 17,9A5,5 0 0,0 12,4Z" />
              </svg>
              <div className="text-xs text-gray-400/80 hover:text-gray-400">
                {shop.province + ", " + shop.country}
              </div>
            </div>
            {/* Badge Email*/}
            <div className="flex flex-row gap-2">
              <MdOutlineMailOutline className="h-4 w-4 fill-gray-500/80"></MdOutlineMailOutline>

              <div className="text-xs text-gray-400/80 hover:text-gray-400">
                {shop.email}
              </div>
            </div>
          </div>
          {/* Mini Cards */}
          <div className="mt-2 flex flex-row items-center space-x-5">
            {/* Comments */}
            <div className="border rounded-md  px-3 py-1">
              <div className="flex gap-2">
                Ratings:{" "}
                <span className="text-blue-500 flex gap-2 items-center">
                  {" "}
                  {shop.rating} <FaStar color="#FFD700"></FaStar>
                </span>
              </div>
            </div>
            <div className="border px-3 py-1">
              <div className="flex gap-2">
                Products:{" "}
                <span className="text-blue-500 flex gap-2 items-center">
                  {" "}
                  {shop.total_product}
                </span>
              </div>
            </div>
            <div className="border px-3 py-1">
              <div className="flex gap-2">
                Response Time:{" "}
                <span className="text-blue-500 flex gap-2 items-center">
                  {shop.response_time}
                </span>
              </div>
            </div>
            <div className="border px-3 py-1">
              <div className="flex gap-2">
                Follower:{" "}
                <span className="text-blue-500 flex gap-2 items-center">
                  {shop.follower}
                </span>
              </div>
            </div>
            <div className="border px-3 py-1">
              <div className="flex gap-2">
                Join:{" "}
                <span className="text-blue-500 flex gap-2 items-center">
                  {shop.created_at && formathDate(shop.created_at)}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Right Actions Container */}
        <div className="w-100 flex flex-grow flex-col items-end justify-start">
          <div className="flex flex-row space-x-3">
            {/* Follow Button */}
            <button
              onClick={handleClickFollow}
              className={`flex rounded-md bg-blue-500 py-2 px-4 text-white transition-all duration-150 ease-in-out hover:bg-blue-600 ${
                followe ? "bg-gray-500 font-bold hover:bg-gray-600" : ""
              }`}
            >
              <svg
                className="mr-2 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                width={24}
                height={24}
                viewBox="0 0 24 24"
              >
                <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
              </svg>
              {followe ? "Un Follow" : "Follow"}
            </button>
            {/* More Actions Button */}
            <button
              className="flex rounded-md bg-gray-100 py-2 px-1 text-white 
  transition-all duration-150 ease-in-out hover:bg-gray-200"
            >
              <svg
                className="fill-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                width={24}
                height={24}
                viewBox="0 0 24 24"
              >
                <path d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
Shop.propTypes = {
  shop: PropTypes.object,
};
export default Shop;
