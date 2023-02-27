import { getElement, getData } from "./util-fx.js";

// ----- GENERATE HTML HEADER EVENTS ----- //

const HTMLEventNameType = (cont, obj) => {
  for (const { name: event_name, type: event_week, banner: event_bg } of obj) {
    const HTML_event = document.createElement("div");
    const HTML_event_container = document.createElement("div");
    const HTML_event_info = document.createElement("div");
    const HTML_event_header = document.createElement("h3");
    const HTML_event_header_text = document.createTextNode(event_name);

    HTML_event_header.appendChild(HTML_event_header_text);
    HTML_event_info.appendChild(HTML_event_header);
    HTML_event_info.classList.add("event-info");
    HTML_event_container.appendChild(HTML_event_info);
    HTML_event_container.classList.add("event-container");
    HTML_event.appendChild(HTML_event_container);
    HTML_event.classList.add("event", event_week);
    HTML_event.style.background = `url(${event_bg}) center / cover
    no-repeat`;

    cont.appendChild(HTML_event);
  }
};
const HTMLEventDatesHead = (obj) => {
  const { year: event_year, month: event_month } = obj;

  const head = document.createElement("h3");
  const head_span = document.createElement("span");
  const head_span_text = document.createTextNode(
    `${event_year.toString().slice(2, 4)}' `
  );
  const head_text = document.createTextNode(event_month);

  head_span.appendChild(head_span_text);
  head.appendChild(head_span);
  head.appendChild(head_text);

  return head;
};
const HTMLEventDate = (obj) => {
  const {
    name: event_name,
    date: { month: event_month, day: event_day },
    availability,
  } = obj;

  const li = document.createElement("li");
  const li_head = document.createElement("h4");
  const li_head_text = document.createTextNode(
    `${event_month}-${event_day} ${event_name}`
  );
  const li_head_span = document.createElement("span");
  const li_head_span_text = document.createTextNode(availability);

  li_head_span.appendChild(li_head_span_text);
  li_head_span.classList.add(`event-date-${availability}`);
  li_head.appendChild(li_head_text);
  li_head.classList.add("event-date-title");
  li.appendChild(li_head);
  li.appendChild(li_head_span);

  return li;
};
const HTMLEventDates = (cont, obj) => {
  const events_head = HTMLEventDatesHead(obj.december_events.date);
  const events_ul = document.createElement("ul");
  const event_dates = [];
  // const event_dates = obj.december_events.events.map((event_info) => {});
  for (const event_info of obj.december_events.events) {
    event_dates.push(HTMLEventDate(event_info));
  }
  event_dates.forEach((li) => {
    events_ul.append(li);
  });

  cont.style.background = `url(${obj.december_events.banner}) center / cover no-repeat`;

  cont.appendChild(events_head);
  cont.appendChild(events_ul);
};

// ----- LOAD HEADER EVENTS ----- //

const LoadMainEvents = async (event_json_url) => {
  const container = getElement(".main-events-container");
  const loader = getElement(".main-events .gen-loading-container");
  const data = await getData(event_json_url);

  const name_type_bg = data.december_events.events.map(
    ({ name, type, banner }) => {
      return { name, type, banner };
    }
  );

  loader.classList.add("hide-gen-loading");
  HTMLEventNameType(container, name_type_bg);
};
const LoadEventDates = async (event_json_url) => {
  const container = getElement(".event-dates-container");
  const loader = getElement(".event-dates .gen-loading-container");
  const data = await getData(event_json_url);

  loader.classList.add("hide-gen-loading");
  HTMLEventDates(container, data);
};

export { LoadMainEvents, LoadEventDates };
