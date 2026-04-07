"use client";
import React, { useState } from "react";
import StepDesc from "./des";
import SingleLocationInput from "./Map";

const Textpage = () => {
  const [desc, setDescription] = useState("");
  const [address, setAddress] = useState("")

  return (
    <div>
      <StepDesc
        bussinesstype={"cafe"}
        description={desc}
        setDescription={setDescription}
      />
      <SingleLocationInput address={address} setAddress={setAddress}/>
    </div>
  );
};

export default Textpage;
