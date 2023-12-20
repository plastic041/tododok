import { COLORS } from "./constants";
import { hash } from "./hash";

export async function getChatWrapperNode(): Promise<HTMLElement> {
  const chatWrapper = document.querySelector(
    "[class^='live_chatting_list_wrapper']"
  );

  if (chatWrapper instanceof HTMLElement) {
    return chatWrapper;
  }

  return new Promise((resolve) => {
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (!(node instanceof HTMLElement)) continue;

          const chatWrapper = node.querySelector(
            "[class^='live_chatting_list_wrapper']"
          );

          if (!(chatWrapper instanceof HTMLElement)) continue;

          observer.disconnect();
          resolve(chatWrapper);
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  });
}
export function injectChatUserNameColorScript(chatWrapper: HTMLElement) {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (!(node instanceof HTMLElement)) continue;

        const userNameNode = node.querySelector("[class^='name_text__']");

        if (!(userNameNode instanceof HTMLElement)) continue;

        setUserNameColorVariable(userNameNode);
      }
    }
  });

  observer.observe(chatWrapper, { childList: true });
}

export function setUserNameColorVariable(node: HTMLElement) {
  const userName = node.innerText;
  const hashValue = hash(userName, COLORS.length);
  const color = COLORS[hashValue];

  // add --user-name-color css variable to node
  node.style.setProperty("--user-name-color", color);
}
