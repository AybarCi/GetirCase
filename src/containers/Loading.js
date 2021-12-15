import React from "react";
function Loading() {
  return (
    <div className="d-flex justify-content-center pt-2 pb-4">
      <div className="spinner-border" role="status"></div>
      <span className="sr-only">Yükleniyor...</span>
    </div>
  );
}

export default Loading;
