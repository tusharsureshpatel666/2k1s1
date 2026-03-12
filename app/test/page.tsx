"use client";
import React, { useState } from "react";
import StepDesc from "./des";

const page = () => {
  const [desc, setDescription] = useState("");

  return (
    <div>
      <StepDesc
        bussinesstype={"cafe"}
        description={desc}
        setDescription={setDescription}
      />
    </div>
  );
};

export default page;
