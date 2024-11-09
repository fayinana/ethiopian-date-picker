import { LeftArrowButton, RightArrowButton, Scroll} from "./ArrowButton";
export default function Year() {
    return (
        <div>
          <LeftArrowButton></LeftArrowButton>
            <Scroll>Jan 2025</Scroll>
          <RightArrowButton></RightArrowButton>
        </div>
      );
};
