const WIDTH = "100px";
const HEIGHT = "100px";
const DCCON_FUNZINNU_URL =
  "https://open-dccon-selector.update.sh/api/channel/49469880/cached-dccon";

type DcconMap = Map<string, string>;
type DcconRes = {
  dccons: {
    keywords: string[];
    path: string;
  }[];
};

async function getDccons(): Promise<DcconMap> {
  console.log("fetching dccons");

  const res = await fetch(DCCON_FUNZINNU_URL);
  const json = (await res.json()) as DcconRes;

  const dcconMap: DcconMap = new Map();
  for (const dccon of json.dccons) {
    for (const keyword of dccon.keywords) {
      dcconMap.set(keyword, dccon.path);
    }
  }

  console.log(`${dcconMap.size} dccons fetched`);

  return dcconMap;
}

function injectStyle(): void {
  console.log("injecting style");

  const style = document.createElement("style");
  document.head.append(style);
  const styleString = `
    .dccon-image { 
      width: ${WIDTH};
      height: ${HEIGHT};
      margin: 2px;
      background-size: cover;
      cursor: pointer;
      background-image: var(--dccon-url);
      position: relative;
    }

    .dccon-image::after {
      content: attr(data-dccon-name);
      opacity: 0;
      top: 104px;
      left: 0;
      position: absolute;
      background-color: #fff;
      color: #000;
      border-radius: 4px;
      padding: 4px 8px;
      transition: opacity 75ms ease-in-out;
    }

    .dccon-image:hover::after {
      opacity: 1;
      z-index: 9999;
    }
    
    .vaultspin {
      animation: vaultspin 0.5s infinite linear;
    }

    @keyframes vaultspin {
      100% {
        transform: rotate(360deg);
      }
    }
  `;
  style.textContent = styleString;

  console.log("style injected");
}

function injectObserver(dcconMap: DcconMap) {
  console.log("injecting observer");

  function replaced(text: string) {
    return text.replace(/(~[^ ]+)/i, (match) => {
      const keyword = match.replace("~", "");
      const src = dcconMap.get(keyword) as string | undefined;
      if (src) {
        return `<div
          style="--dccon-url: url(${src})"
          data-dccon-name="~${keyword}"
          class="dccon-image ${keyword === "볼트공중" ? "vaultspin" : ""}"
        ></div>`;
      }
      return match;
    });
  }

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (!(node instanceof HTMLElement)) continue;

        const message = node.querySelector(
          "[class^='live_chatting_message_text']"
        );

        if (!(message instanceof HTMLElement)) continue;

        const text = message.innerText;

        message.innerHTML = replaced(text);
      }
    }
  });

  const chatWrapper = document.querySelector(
    "[class^='live_chatting_list_wrapper']"
  );

  observer.observe(chatWrapper, { childList: true });

  console.log("observer injected");
}

async function main() {
  const dccons = await getDccons();
  injectStyle();
  injectObserver(dccons);
}

main();
