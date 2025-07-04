import React from 'react'
import Filter from "./Filter";
import { FaAngleRight } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { FaRupeeSign } from "react-icons/fa6";

const SelectProductResults = () => {
  return (
    <>
       <div className=" bg-gray-50 gap-4 p-3 flex">
              <div className="w-[28%] shadow">
                <Filter />
              </div>
              <div className="bg-white shadow-sm w-full p-4">
                <div className="flex gap-1 items-center text-[12px]">
                  <div className="">
                    <span>Home</span>
                  </div>
                  <FaAngleRight />
                  <span>Mobiles</span>
                </div>
                <h4 className=" text-lg font-heading font-medium">Redmi 5g mobile</h4>
                <div className="flex items-center gap-4 text-[13px] font-heading py-2">
                  <div>
                    <span className=" font-medium text-sm">Sort By</span>
                  </div>
                  <div>
                    <span>Releavance</span>
                  </div>
                  <div>
                    <span>Popularity</span>
                  </div>
                  <div>
                    <span>Price -- Low to High</span>
                  </div>
                  <div>
                    <span>Price -- High to Low</span>
                  </div>
                  <div>
                    <span>Newest First</span>
                  </div>
                </div>
                <div className="bg-black/5 w-full h-[1px]"></div>
                <div className="grid grid-cols-4 py-6">
                  <div className="flex justify-center items-center">
                    <img
                      className="w-48"
                      src="https://eshopy.in/wp-content/uploads/2024/01/1-10.jpg"
                    />
                  </div>
                  <div className=" col-span-2">
                    <h4 className="font-heading text-base font-medium">
                      REDMI Note-13 Pro 5G (Scarlet Red, 256 GB) (8 GB RAM)
                    </h4>
                    <div className="flex gap-2 items-center">
                      <div
                        className="flex justify-center
                             items-center  bg-red-500 text-white w-12 p-[2px] rounded
                             
                            "
                      >
                        <span className="font-body text-[13px] font-medium ">
                          4.5
                        </span>
                        <FaStar className="text-[12px]" />
                      </div>
                      <div>
                        <span
                          className="font-heading
                             text-gray-500 text-[12px] "
                        >
                          396 Ratings & 34 Ratings
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center py-2">
                      <FaRupeeSign />
                      <div className="flex gap-1 items-center">
                        <h4 className="text-xl font-body">720,999</h4>
                        <span className="text-gray-400 font-body text-sm">
                          inclusive of all taxes
                        </span>
                      </div>
                    </div>
                    <div>
                      <ul className="list-disc px-6 text-[12px] font-body font-light">
                        <li>6 GB RAM | 128 GB ROM</li>
                        <li>17.07 cm (6.72 inch) Display</li>
                        <li>50MP + 2MP | 8MP Front Camera</li>
                        <li>6500 mAh Battery</li>
                        <li>Dimensity 7300 5G Processor</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="bg-black/5 w-full h-[1px]"></div>
                <div className="grid grid-cols-4 py-6">
                  <div className="flex justify-center items-center">
                    <img
                      className="w-44"
                      src="https://rukminim2.flixcart.com/image/850/1000/xif0q/mobile/n/u/z/13-5g-2406ern9ci-redmi-original-imah4ff4gsfdtkgz.jpeg?q=90&crop=false"
                    />
                  </div>
                  <div className=" col-span-2">
                    <h4 className="font-heading text-base font-medium">
                    REDMI 13 5G (Orchid Pink, 128 GB)  (6 GB RAM)
                    </h4>
                    <div className="flex gap-2 items-center">
                      <div
                        className="flex justify-center
                             items-center  bg-red-500 text-white w-12 p-[2px] rounded
                             
                            "
                      >
                        <span className="font-body text-[13px] font-medium ">
                          4.5
                        </span>
                        <FaStar className="text-[12px]" />
                      </div>
                      <div>
                        <span
                          className="font-heading
                             text-gray-500 text-[12px] "
                        >
                          396 Ratings & 34 Ratings
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center py-2">
                      <FaRupeeSign />
                      <div className="flex gap-1 items-center">
                        <h4 className="text-xl font-body">720,999</h4>
                        <span className="text-gray-400 font-body text-sm">
                          inclusive of all taxes
                        </span>
                      </div>
                    </div>
                    <div>
                      <ul className="list-disc px-6 text-[12px] font-body font-light">
                        <li>6 GB RAM | 128 GB ROM</li>
                        <li>17.07 cm (6.72 inch) Display</li>
                        <li>50MP + 2MP | 8MP Front Camera</li>
                        <li>6500 mAh Battery</li>
                        <li>Dimensity 7300 5G Processor</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    </>
  )
}

export default SelectProductResults
