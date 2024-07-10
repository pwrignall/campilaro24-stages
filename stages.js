const stages_data = {
  "stage-01": {
      "name": "\u00c9tape 1",
      "date": "2024-07-19T08:45:00+0200",
      "finish": "2024-07-19T14:30:00+0200",
      "location": "Bagn\u00e8res-de-Bigorre to Saint-Lary Pla d\u2019Adet",
      "distance": 124.5523693412807,
      "up": 3638.0,
      "down": -3379.0,
      "type": "Mountain"
  },
  "stage-02": {
      "name": "\u00c9tape 2",
      "date": "2024-07-20T08:30:00+0200",
      "finish": "2024-07-20T14:26:00+0200",
      "location": "Saint-Lary Soulan to Barrage Cap de Long",
      "distance": 108.1309899928584,
      "up": 4749.0,
      "down": -4747.0,
      "type": "Mountain"
  },
  "stage-03": {
      "name": "\u00c9tape 3",
      "date": "2024-07-21T08:30:00+0200",
      "finish": "2024-07-09T12:30:00+0200",
      "location": "Saint-Lary Soulan to Tourmalet",
      "distance": 81.11315430474438,
      "up": 2717.0,
      "down": -2970.0,
      "type": "Mountain"
  }
};

const currentTime = new Date();
const tzInfoParagraph = document.getElementById("tz-info");
tzInfoParagraph.textContent += `${currentTime
  .toLocaleTimeString("en-GB", {
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "long",
  })
  .slice(5)}`;

Object.keys(stages_data).forEach((stageKey) => {
  const topElems = document.createElement("div");
  topElems.className = "top-elements";
  const bottomElems = document.createElement("div");
  bottomElems.className = "bottom-elements";

  const stageInfo = stages_data[stageKey];
  const stageDiv = document.getElementById(stageKey);
  const stageInfoDiv = document.createElement("div");
  stageInfoDiv.className = "stage-info";

  const profileDiv = document.createElement("div");
  profileDiv.className = "profile";
  profileDiv.dataset.stage = `${stageKey}`;

  const eta = document.createElement("p");
  eta.className = "eta";
  const stageStart = new Date(stages_data[stageKey].date);

  const stageFinish = new Date(stages_data[stageKey].finish);
  eta.textContent = `${stageFinish.toLocaleTimeString("en-GB", {
    hour: "numeric",
    minute: "numeric",
  })}`;
  const tz_text = document.createElement("span");
  tz_text.className = "tz";
  tz_text.textContent += `${stageFinish
    .toLocaleTimeString("en-GB", {
      hour: "numeric",
      minute: "numeric",
      timeZoneName: "short",
    })
    .slice(5)}`;
  eta.appendChild(tz_text);

  const stageHeader = document.createElement("h2");
  stageHeader.textContent = stages_data[stageKey].name;
  stageHeader.textContent += ` : ${stageStart
    .toLocaleDateString("en-GB", {
      weekday: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    .slice(0, -5)
    .replace(",", "")}`;
  topElems.appendChild(stageHeader);

  Object.keys(stageInfo).forEach((key) => {
    if (!["name", "date", "finish"].includes(key)) {
      const p = document.createElement("p");
      p.className = `${key}`;
      if (key === "location") {
        p.innerHTML = `${stageInfo[key]}`;
        topElems.appendChild(p);
      } else if (key == "distance") {
        p.textContent = `${stageInfo[key].toFixed(1)}`;
        topElems.appendChild(p);
      } else if (["down", "up"].includes(key)) {
        p.textContent = `${Math.abs(stageInfo[key].toFixed(0))}`;
        stageInfoDiv.appendChild(p);
      } else if (key === "type") {
        p.dataset.type = `${stageInfo[key].toLowerCase().replaceAll(" ", "-")}`;
        p.textContent = `${stageInfo[key]}`;
        topElems.appendChild(p);
      } else {
        p.textContent = `${stageInfo[key]}`;
        stageInfoDiv.appendChild(p);
      }
      if (!["rest-01", "rest-02"].includes(stageKey)) {
        bottomElems.appendChild(profileDiv);
        stageInfoDiv.appendChild(eta);
      }

      bottomElems.appendChild(stageInfoDiv);
      stageDiv.appendChild(topElems);
      stageDiv.appendChild(bottomElems);
    }
  });
});
