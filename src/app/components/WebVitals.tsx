"use client";
import { useReportWebVitals } from "next/web-vitals";

export default function WebVitals() {
	useReportWebVitals(metric => {
		window.gtag("event", metric.name, {
			value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value), // values must be integers
			event_label: metric.id, // id unique to current page load
			non_interaction: true, // avoids affecting bounce rate.
		});
	});
}
