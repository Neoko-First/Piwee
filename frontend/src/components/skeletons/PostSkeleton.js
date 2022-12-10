import React from "react";

export default function PostSkeleton() {
  return (
    <div className="PostSkeletonContainer">
      <div className="skeletonInfoAuthor"></div>
      <section>
        <div className="skeletonTitle"></div>
        <div className="skeletonContent"></div>
        <div className="skeletonPicture"></div>
      </section>
    </div>
  );
}
