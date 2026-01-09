export default function ScrollGrid() {
  return (
    <div className="h-full w-full bg-white hidden xl:block">
      <div className="grid grid-cols-3 gap-6">
        <InfiniteColumn direction="down" img="/scrollgrid/img1.webp" />
        <InfiniteColumn direction="up" img="/scrollgrid/img2.webp" />
        <InfiniteColumn direction="down" img="/scrollgrid/img3.webp" />
      </div>
    </div>
  );
}

function InfiniteColumn({
  direction,
  img
}: {
  img : string;
  direction: "up" | "down";
}) {
  return (
    <div className="overflow-hidden">
      <div
        className={`flex flex-col gap-6 ${
          direction === "up"
            ? "animate-scroll-up"
            : "animate-scroll-down"
        }`}
      >
        <img src={img} alt="" />
      </div>
    </div>
  );
}
