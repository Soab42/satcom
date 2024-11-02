import Image from "next/image";
import React from "react";
import DemoImage from "./blank.png";
import { getAreaName, getZoneName } from "@/utils";
import MemberInfo from "../components/MemberInfo";
export default async function MemberInformation({ params: { id } }) {
  const res = await fetch(`http://localhost:3000/api/users/${id}`);
  const zoneData = await fetch(`http://localhost:3000/api/areas/zone`).then(
    (res) => res.json()
  );
  const areaData = await fetch(`http://localhost:3000/api/areas/areas`).then(
    (res) => res.json()
  );
  //   console.log(zoneData);
  const { userData } = await res.json();
  return (
    <div>
      <h1 className="text-2xl w-full text-center border-b p-2">
        Member Information
      </h1>
      <div>
        <div className="flex gap-5">
          <Image
            width={200}
            height={200}
            src={userData.avatar || DemoImage}
            alt={userData.name}
            className="shadow-md rounded-md border-8 border-white"
          />
          <div className="p-4 grid">
            <h1 className="text-2xl font-bold">{userData.name}</h1>
            <p className="text-lg">
              <span className="font-bold mr-2">Member Code:</span>
              {userData.memberCode}
            </p>
            <p className="text-lg">
              <span className="font-bold mr-2">Status:</span>
              {userData.status}
            </p>
            <p className="text-lg">
              <span className="font-bold mr-2">Mobile No:</span>
              {userData.mobile}
            </p>
            <p className="text-lg capitalize">
              <span className="font-bold mr-2">Area:</span>
              {getAreaName(userData.area)}, {getZoneName(userData.zone)}
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-5">
        <MemberInfo userData={userData} />
        <div class="max-w-sm p-6 bg-white rounded-lg shadow-lg border border-gray-200 mt-10">
          <h1 className="text-lg text-center border-b font-bold mb-2">
            Package Info
          </h1>
        </div>
        <div class="max-w-sm p-6 bg-white rounded-lg shadow-lg border border-gray-200 mt-10">
          <h1 className="text-lg text-center border-b font-bold mb-2">
            Last Transactions
          </h1>
        </div>
      </div>
    </div>
  );
}
