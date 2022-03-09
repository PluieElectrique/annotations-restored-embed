// ==UserScript==
// @name           Annotations Restored (embedded)
// @description    Bring annotation support back to embedded YouTube videos
// @author         Pluie
// @version        0.1.5
// @license        GPLv3
// @homepageURL    https://github.com/PluieElectrique/annotations-restored-embed
// @supportURL     https://github.com/PluieElectrique/annotations-restored-embed/issues
// @downloadURL    https://github.com/PluieElectrique/annotations-restored-embed/raw/master/annotations-restored-embed.user.js
// @match          *://www.youtube.com/embed/*
// @require        https://github.com/isaackd/annotationlib/raw/master/dist/AnnotationParser.js
// @require        https://github.com/isaackd/annotationlib/raw/master/dist/AnnotationRenderer.js
// @resource css   https://github.com/isaackd/annotationlib/raw/master/dist/AnnotationRenderer.css
// @grant          GM_xmlhttpRequest
// @grant          GM_getResourceText
// ==/UserScript==

let annotationRendererStyle = document.createElement("style");
annotationRendererStyle.textContent = GM_getResourceText("css");
document.head.appendChild(annotationRendererStyle);


const annotationParser = new AnnotationParser();
const annotationsEndpoint = "https://invidious.snopyta.org/api/v1/annotations/";
let adPlaying = false;
let currentVideoId;
let renderer;

waitForElement(".ytp-title-link").then((el) => {
    const callback = () => {
        const videoId = new URL(el.href).searchParams.get("v");
        if (currentVideoId == videoId) {
            return;
        } else {
            currentVideoId = videoId;
        }

        window.dispatchEvent(
            new CustomEvent("ar-status-change", {
                detail: { msg: "Trying to load annotations...", enabled: false },
            })
        );

        if (renderer) {
            renderer.stop();
            renderer.removeAnnotationElements();
            renderer.annotations = [];
        }

        const requestUrl = annotationsEndpoint + videoId;
        console.info(`Retrieving annotations for '${videoId}' from '${requestUrl}'`);

        GM_xmlhttpRequest({
            url: requestUrl,
            onload(response) {
                if (response.responseText) {
                    console.info(`Received annotations for ${videoId} from server..`);
                    handleMessage({
                        type: "annotations_received",
                        xml: response.responseText,
                    });
                } else {
                    console.info(`Annotation data is unavailable for this video (${videoId})`);
                    handleMessage({ type: "annotations_unavailable" });
                }
            },
            onerror(e) {
                console.info(`Failed to retrieve annotations for this video (${videoId})\n (${e})`);
                handleMessage({ type: "annotations_unavailable" });
            },
        });
    };

    let observer = new MutationObserver(callback);
    observer.observe(el, { attributes: true, attributeFilter: ["href"] });
});

waitForElement(".ytp-right-controls")
    .then((el) => {
        const progressButton = document.createElement("button");
        progressButton.classList.add("ytp-button", "ytp-settings-button");

        progressButton.innerHTML = `
	<svg width="100%" height="100%" viewBox="0 0 1 1" fill="white" version="1.1" style="fill-opacity: 0.3;">
	<path d="M0.786081 0.689854H0.523479L0.356887 0.807575V0.689854H0.230654V0.30394H0.786081V0.689854Z"/>
	</svg>	
	`;

        progressButton.setAttribute("title", "Initializing annotation userscript...");
        progressButton.setAttribute("aria-label", "Initializing annotation userscript...");

        el.prepend(progressButton);

        progressButton.addEventListener("click", () => {
            if (renderer && renderer.annotations.length) {
                const times = renderer.annotations
                    .filter((an) => an.data && an.data.hasOwnProperty("timeStart"))
                    .sort((a, b) => a.data.timeStart - b.data.timeStart)
                    .map((an) => {
                        let type = an.data.type;
                        let style = an.data.style;

                        type = type ? type : "";
                        style = style ? ", " + style : "";

                        const sec = formatSeconds(an.data.timeStart);

                        return `${sec} ${type}${style}`;
                    })
                    .join("\n");

                alert(times);
            } else {
                alert(progressButton.getAttribute("title"));
            }
        });

        window.addEventListener("ar-status-change", (e) => {
            progressButton.setAttribute("title", e.detail.msg);
            progressButton.setAttribute("aria-label", e.detail.msg);

            if (e.detail.enabled) {
                progressButton.children[0].style.fillOpacity = 1;
            } else {
                progressButton.children[0].style.fillOpacity = 0.3;
            }
        });
    })
    .catch(() => {
        console.warn("Unable to find controls area");
    });

function formatSeconds(sec) {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);

    const minPadding = minutes < 10 ? "0" : "";
    const secPadding = seconds < 10 ? "0" : "";

    return `${minPadding}${minutes}:${secPadding}${seconds}`;
}

function handleMessage(request) {
    if (request.type === "annotations_received") {
        const annotationData = request.xml;
        if (annotationData) {
            const annotationDom = annotationParser.xmlToDom(annotationData);
            const annotationElements = annotationDom.getElementsByTagName("annotation");

            const annotations = annotationParser.parseYoutubeAnnotationList(annotationElements);
            startNewAnnotationRenderer(annotations);

            if (renderer.annotations.length) {
                window.dispatchEvent(
                    new CustomEvent("ar-status-change", {
                        detail: {
                            msg: "Received annotation data from server. Annotations should now be loaded.\nClick to see annotation times.",
                            enabled: true,
                        },
                    })
                );
            } else {
                // The API server can send an XML file with zero annotations or even garbage data.
                window.dispatchEvent(
                    new CustomEvent("ar-status-change", {
                        detail: {
                            msg: "Annotations are not available for this video.",
                            enabled: false,
                        },
                    })
                );
                console.error("Failed to parse annotations.");
                console.debug("Annotation data was:", annotationData);
            }
        }
    } else if (request.type === "annotations_unavailable") {
        window.dispatchEvent(
            new CustomEvent("ar-status-change", {
                detail: { msg: "Annotations are not available for this video.", enabled: false },
            })
        );
    }
}

function startNewAnnotationRenderer(annotations) {
    const videoContainer = document.getElementById("movie_player");
    const player = document.querySelector("video.video-stream.html5-main-video");

    const playerOptions = {
        getVideoTime() {
            return player.currentTime;
        },
        seekTo(seconds) {
            player.currentTime = seconds;
        },
        getOriginalVideoWidth() {
            return player.videoWidth;
        },
        getOriginalVideoHeight() {
            return player.videoHeight;
        },
    };

    renderer = new AnnotationRenderer(annotations, videoContainer, playerOptions, 200);
    renderer.start();

    if (videoContainer.classList.contains("ad-showing")) {
        adPlaying = true;
        renderer.annotationsContainer.style.display = "none";
    } else if (!player.classList.contains("ad-showing") && adPlaying) {
        adPlaying = false;
        renderer.annotationsContainer.style.display = "block";
    }

    hideAnnotationsDuringAds(videoContainer);
}

// https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
function hideAnnotationsDuringAds(player) {
    // Select the node that will be observed for mutations
    const targetNode = player;

    // Options for the observer (which mutations to observe)
    const config = { attributes: true, attributeFilter: ["class"] };

    // Callback function to execute when mutations are observed
    const callback = () => {
        // ad begins playing
        if (player.classList.contains("ad-showing") && !adPlaying) {
            adPlaying = true;
            renderer.annotationsContainer.style.display = "none";
        }
        // ad is done playing
        else if (!player.classList.contains("ad-showing") && adPlaying) {
            adPlaying = false;
            renderer.annotationsContainer.style.display = "block";
        }
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);
}

window.addEventListener("__ar_annotation_click", (e) => {
    // Open the URL in a new tab (from https://stackoverflow.com/a/28374344).
    // We can't change location.href because non-embed YouTube pages have
    // `x-frame-options: SAMEORIGIN`.
    Object.assign(document.createElement("a"), {
        target: "_blank",
        href: e.detail.url,
    }).click();
});

function updateAnnotationSizes(delay = 0) {
    setTimeout(() => {
        if (renderer) {
            renderer.updateAllAnnotationSizes();
        }
    }, delay);
}

window.addEventListener("resize", () => {
    updateAnnotationSizes(250);
    updateAnnotationSizes(1000);
});

// Adding annotation visibility switch to settings menu, just like in ye olden days
waitForElement(".ytp-panel-menu")
    .then((el) => {
        const annoSwitchPar = document.createElement("div");
        annoSwitchPar.className = "ytp-menuitem";
        annoSwitchPar.innerHTML = `
	<div class="ytp-menuitem-icon"></div>
	<div class="ytp-menuitem-label">Annotations</div>
	<div class="ytp-menuitem-content">
		<div class="ytp-menuitem-toggle-checkbox">
		<input type="checkbox" id="annotation-sneaky-switch" aria-hidden="true" style="position: absolute; left: -100vw;">
		</div>
	</div>
	`;
        annoSwitchPar.setAttribute("role", "menuitemcheckbox");
        annoSwitchPar.setAttribute("aria-checked", "true");
        annoSwitchPar.setAttribute("tabindex", "0");

        el.prepend(annoSwitchPar);

        /* 	a visually-hidden input checkbox (annoSneakySwitch) is used to store the state of annotation visibility.
	the same thing could be done with some craftier JS but checkboxes are very certain and difficult to screw up */

        const annoSneakySwitch = document.querySelector("#annotation-sneaky-switch");
        annoSneakySwitch.checked = true;
        annoSwitchPar.addEventListener("click", () => {
            annoSneakySwitch.click();
            annoSneakySwitch.checked
                ? annoSwitchPar.setAttribute(
                      "aria-checked",
                      "true",
                      (renderer.annotationsContainer.style.display = "block")
                  )
                : (annoSwitchPar.setAttribute("aria-checked", "false"),
                  (renderer.annotationsContainer.style.display = "none"));
        });
    })
    .catch(() => {
        console.warn(
            "Unable to find the video player settings menu, annotation switch not injected"
        );
    });

function waitForElement(selector, maxRetries = 10, intervalAmount = 200, intervalStep = 200) {
    return new Promise((resolve, reject) => {
        let currentRetries = 0;

        const progInt = setInterval(() => {
            currentRetries++;
            intervalAmount += intervalStep;

            if (currentRetries > maxRetries) {
                reject();
                clearInterval(progInt);
                return;
            }

            const el = document.querySelector(selector);
            if (el) {
                resolve(el);
                clearInterval(progInt);
                return;
            }
        }, intervalAmount);
    });
}
