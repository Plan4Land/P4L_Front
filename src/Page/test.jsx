import React, { useEffect, useState } from "react";

const Test = () => {
  return (
    <div>
      <p>{localStorage.getItem("user")}</p>
      {/* <h4>localStorage.getItem("</h4> */}
    </div>
  );
};

export default Test;
