"use client";

import { useEffect, useState } from "react";

const formatNumber = (num: number): string => {
	return num < 10 ? `0${num}` : `${num}`;
};

const targetDate = new Date(Date.now() + 99999999);

export default function Home() {
	const [days, setDays] = useState<string>("00");
	const [hours, setHours] = useState<string>("00");
	const [minutes, setMinutes] = useState<string>("00");
	const [seconds, setSeconds] = useState<string>("00");

	useEffect(() => {
		const interval = setInterval(() => {
			const now = new Date().getTime();
			const difference = targetDate.getTime() - now;

			if (difference <= 0) {
				clearInterval(interval);
				setDays("00");
				setHours("00");
				setMinutes("00");
				setSeconds("00");
			} else {
				const daysValue = Math.floor(difference / (1000 * 60 * 60 * 24));
				const hoursValue = Math.floor(
					(difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
				);
				const minutesValue = Math.floor(
					(difference % (1000 * 60 * 60)) / (1000 * 60)
				);
				const secondsValue = Math.floor((difference % (1000 * 60)) / 1000);

				setDays(formatNumber(daysValue));
				setHours(formatNumber(hoursValue));
				setMinutes(formatNumber(minutesValue));
				setSeconds(formatNumber(secondsValue));
			}
		}, 1000);

		return () => clearInterval(interval);
	}, [targetDate]);
	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24 gap-32">
			<h1 className="text-4xl font-bold">Countdown Timer</h1>
			<div className="flex flex-row gap-4 font-bold text-8xl">
				<p>{days}</p>:<p>{hours}</p>:<p>{minutes}</p>:<p>{seconds}</p>
			</div>
		</main>
	);
}
