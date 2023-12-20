import { css } from "./inject-css";

export const COLORS: readonly string[] = [
  "#f87171",
  "#facc15",
  "#4ade80",
  "#2dd4bf",
  "#38bdf8",
  "#f472b6",
] as const;

export const FONT_CSS = css`
  body[data-tododok-enabled="true"]
    [class^="live_chatting_message_container"]:not(
      [class^="live_chatting_message_is_overlay"]
    )
    [class^="live_chatting_message_wrapper__"] {
    font-size: var(--message-font-size);
    line-height: var(--message-line-height);
    font-family: var(--message-font-family);
  }

  body[data-tododok-enabled="true"]
    [class^="live_chatting_message_container"]:not(
      [class^="live_chatting_message_is_overlay"]
    )
    [class^="name_text__"] {
    color: var(--user-name-color);
  }
`;

export const CSS_VARIABLES = {
  MESSAGE_FONT_SIZE: "--message-font-size",
  MESSAGE_FONT_FAMILY: "--message-font-family",
  MESSAGE_LINE_HEIGHT: "--message-line-height",
} as const;
