import type { PlasmoCSConfig } from "plasmo";
import { injectCss } from "../lib/inject-css";
import { getChatWrapperNode } from "../lib/chats";
import { FONT_CSS } from "~lib/constants";
import { Storage } from "@plasmohq/storage";
import { injectChatUserNameColorScript } from "~lib/chats";
import { setUserNameColorVariable } from "~lib/chats";
import { CSS_VARIABLES } from "~lib/constants";

export const config: PlasmoCSConfig = {
  matches: ["https://chzzk.naver.com/live/*"],
};

const storage = new Storage();

storage.watch({
  enabled: (c) => {
    const newValue = c.newValue as boolean;
    if (newValue === true) {
      document.body.setAttribute("data-tododok-enabled", "true");
    } else {
      document.body.setAttribute("data-tododok-enabled", "false");
    }
  },
  [CSS_VARIABLES.MESSAGE_FONT_SIZE]: (c) => {
    const newValue = c.newValue as number;
    document.documentElement.style.setProperty(
      CSS_VARIABLES.MESSAGE_FONT_SIZE,
      `${newValue}px`
    );
  },
  [CSS_VARIABLES.MESSAGE_FONT_FAMILY]: (c) => {
    const newValue = c.newValue as number;
    document.documentElement.style.setProperty(
      CSS_VARIABLES.MESSAGE_FONT_FAMILY,
      `${newValue}`
    );
  },
  [CSS_VARIABLES.MESSAGE_LINE_HEIGHT]: (c) => {
    const newValue = c.newValue as number;
    document.documentElement.style.setProperty(
      CSS_VARIABLES.MESSAGE_LINE_HEIGHT,
      `${newValue}`
    );
  },
});

function setCssVariable(variableName: string, value: string) {
  document.documentElement.style.setProperty(variableName, value);
}

async function init() {
  const [
    tododokEnabled,
    messageFontSize,
    messageFontFamily,
    messageLineHeight,
  ] = await Promise.all([
    storage.get("enabled"),
    storage.get(CSS_VARIABLES.MESSAGE_FONT_SIZE),
    storage.get(CSS_VARIABLES.MESSAGE_FONT_FAMILY),
    storage.get(CSS_VARIABLES.MESSAGE_LINE_HEIGHT),
  ]);

  document.body.setAttribute("data-tododok-enabled", tododokEnabled);
  setCssVariable(CSS_VARIABLES.MESSAGE_FONT_SIZE, `${messageFontSize}px`);
  setCssVariable(CSS_VARIABLES.MESSAGE_FONT_FAMILY, `${messageFontFamily}`);
  setCssVariable(CSS_VARIABLES.MESSAGE_LINE_HEIGHT, `${messageLineHeight}`);
}

window.addEventListener("load", async () => {
  injectCss(FONT_CSS);

  await init();

  const chatWrapper = await getChatWrapperNode();
  const userNameNodes = chatWrapper.querySelectorAll("[class^='name_text__']");
  for (const node of userNameNodes) {
    setUserNameColorVariable(node as HTMLElement);
  }
  injectChatUserNameColorScript(chatWrapper);
});
