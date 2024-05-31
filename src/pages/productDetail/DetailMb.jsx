import { Collapse } from "../../components/common";

const DetailMb = () => {
  return (
    <div className="md:hidden">
      <Collapse label="Description">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum rem
        veritatis, natus quisquam possimus sint dolore maiores, modi fuga fugiat
        recusandae quibusdam amet obcaecati odio perspiciatis sit soluta, omnis
        accusamus.
      </Collapse>
      <Collapse label="Additional Information">
        <ul>
          <li>hello</li>
          <li>hello</li>
          <li>hello</li>
          <li>hello</li>
          <li>hello</li>
        </ul>
      </Collapse>
      <Collapse label="Shipping & Return ">
        <ul>
          <li>hello</li>
          <li>hello</li>
          <li>hello</li>
          <li>hello</li>
          <li>hello</li>
        </ul>
      </Collapse>
      <Collapse label="Reviews">
        <div className="border">
          <div className="flex flex-wrap gap-y-4 items-center border shadow-md justify-between">
            <div className="flex items-center gap-3">
              <p className="p-3 font-medium">Reviews</p>
              <div>
                <div className="flex items-center  text-yellow-500">
                  {Array(5)
                    .fill(0)
                    .map((item, index) => (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        key={index}
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                </div>
              </div>
              <span className="font-bold">4.9</span>
            </div>
            
          </div>
          <div className="pr-5  flex justify-end mt-3">
                <button className="hover:text-pink-400">Write a review</button>
            </div>
          <div className="p-5">
            <div>
              <h3 className="font-semibold gap-3 flex items-center">
                <div className="overflow-hidden rounded-full w-12 h-12 border-2 border-pink">
                  <img
                    src="https://www.dungplus.com/wp-content/uploads/2019/12/girl-xinh-1.jpg"
                    alt=""
                  />
                </div>
                <div>
                  <div className="flex">
                    <span className="capitalize mr-3">vu van dinh</span>
                    <div className="flex items-center gapx-3 text-yellow-500">
                      {Array(5)
                        .fill(0)
                        .map((item, index) => (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            key={index}
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                    </div>
                  </div>
                  <p className="text-gray-500 text-[11px] font-thin capitalize">
                    month 10 2022
                  </p>
                </div>
              </h3>
            </div>
            <div className="mt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
              deleniti officia repellendus velit? Vel possimus iure similique
              iste cumque, itaque nam perspiciatis unde, asperiores quisquam
              voluptatem pariatur voluptatum facere a.
            </div>
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default DetailMb;
