import { useStorage } from "@plasmohq/storage/hook";

import "./popup.css";
import { CSS_VARIABLES } from "./lib/constants";

function IndexPopup() {
  const [enabled, setEnabled] = useStorage<boolean>("enabled", true);
  const [fontSize, setFontSize] = useStorage<number>(
    CSS_VARIABLES.MESSAGE_FONT_SIZE,
    20
  );
  const [fontFamily, setFontFamily] = useStorage<string>(
    CSS_VARIABLES.MESSAGE_FONT_FAMILY,
    "sans-serif"
  );
  const [lineHeight, setLineHeight] = useStorage<number>(
    CSS_VARIABLES.MESSAGE_LINE_HEIGHT,
    1.5
  );

  return (
    <div className="popup-container">
      <h1>Tododok</h1>
      <fieldset>
        <div className="field">
          <label htmlFor="toggle-enabled">활성화</label>
          <input
            id="toggle-enabled"
            type="checkbox"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
          />
        </div>
      </fieldset>
      <fieldset>
        <legend>채팅 메시지 설정</legend>
        <div className="field">
          <label htmlFor="font-size">글자 크기</label>
          <input
            id="font-size"
            type="number"
            value={fontSize}
            onChange={(e) => setFontSize(e.target.valueAsNumber)}
          />
        </div>
        <div className="field">
          <label htmlFor="font-family">글꼴</label>
          <input
            id="font-family"
            type="text"
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="line-height">줄높이</label>
          <input
            id="line-height"
            type="number"
            value={lineHeight}
            onChange={(e) => setLineHeight(e.target.valueAsNumber)}
            step={0.1}
            min={1}
          />
        </div>
      </fieldset>
    </div>
  );
}

export default IndexPopup;
