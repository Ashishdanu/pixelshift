export default function CheckerboardBackground() {
  return (
    <div
      className="absolute inset-0 rounded-xl"
      style={{
        backgroundImage:
          "linear-gradient(45deg,#ccc 25%,transparent 25%)," +
          "linear-gradient(-45deg,#ccc 25%,transparent 25%)," +
          "linear-gradient(45deg,transparent 75%,#ccc 75%)," +
          "linear-gradient(-45deg,transparent 75%,#ccc 75%)",
        backgroundSize: "16px 16px",
        backgroundPosition: "0 0,0 8px,8px -8px,-8px 0",
      }}
    />
  );
}
