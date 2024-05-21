import React from "react";
import { useSelector } from "react-redux";

function Body(props) {
  const dark=useSelector(state=>state.theme.dark)

  return (
    <section
      className={`main-body flex justify-center items-center h-auto min-h-[calc(100vh-4rem)] overflow-auto ${dark?"bg-gray-400":""}`}
    >
      {props.children}
    </section>
  );
}

export default Body;
