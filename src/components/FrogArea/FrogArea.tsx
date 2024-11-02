import { Frog } from "../../pages/MainPage/hooks/useMainPage";

interface IFrogArea {
  frog: Frog;
}

const FrogArea = ({ frog }: IFrogArea) => {
  return (
    <div
      className={`
        absolute inset-0.5 bg-green-500 rounded
        flex items-center justify-center
      `}
    >
      <div
        className={`
          absolute top-0 right-0 w-3 h-3 rounded-full
          ${frog.gender === "male" ? "bg-blue-400" : "bg-purple-400"}
        `}
      />
      <div
        className="
        text-xs text-white font-bold text-center"
      >
        {frog.characteristics.map((el) => (
          <p key={el}>{el}</p>
        ))}
      </div>
    </div>
  );
};

export default FrogArea;
