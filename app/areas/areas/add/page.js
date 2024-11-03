"use client";

import { getNewAreaId, getNewId } from "@/utils";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function AddZone() {
  const [zoneList, setZoneList] = React.useState([]);
  const [formData, setFormData] = React.useState({
    code: "",
    name: "",
    description: "",
    zone: "",
  });
  const router = useRouter();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
    async function getData() {
      const response = await fetch("/api/areas/zone");
      const data = await response.json();
      setZoneList(data?.zoneList);
    }
    getData();
  }, []);
  const handleZoneChange = async (e) => {
    e.preventDefault();
    const zone = zoneList.find((zone) => zone.code === e.target.value);
    const res = await fetch("/api/areas/areas");
    const data = await res.json();
    setFormData((prevFormData) => ({
      ...prevFormData,
      code: getNewAreaId(e.target.value, data.areaList),
      zone,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/areas/areas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    console.log(response);
    if (response.ok) {
      router.push("/areas/areas");
      router.refresh();
    }
  };
  return (
    <div className="p-5 flex flex-col h-full gap-5 justify-center items-center">
      <form
        className="grid grid-cols-1 text-xl gap-4 font-bold p-10 rounded-md justify-items-center  w-1/3 *:grid *:gap-2 *:w-full"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold text-center mb-4 border-b">
          Add Zone
        </h1>
        <label>
          Zone
          <select
            name="zone"
            onChange={handleZoneChange}
            className="w-full border border-slate-300 rounded-md p-2"
          >
            <option value="">Select Zone</option>
            {zoneList.map((zone) => (
              <option key={zone._id} value={zone.code}>
                {zone.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Code
          <input
            type="text"
            name="code"
            value={formData.code}
            disabled
            onChange={handleChange}
            placeholder="001"
            required
            className="w-full border border-slate-300 rounded-md p-2"
          />
        </label>

        <label>
          Name{" "}
          <input
            type="text"
            name="name"
            value={formData.name}
            required
            onChange={handleChange}
            placeholder="write a name...!"
            className="w-full border border-slate-300 rounded-md p-2 capitalize"
          />
        </label>

        <label>
          Description
          <textarea
            type="text"
            name="description"
            onChange={handleChange}
            value={formData.description}
            placeholder="write a description...!"
            rows="3"
            className="w-full border border-slate-300 rounded-md p-2"
          />
        </label>

        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all duration-200">
          Save
        </button>
      </form>
    </div>
  );
}