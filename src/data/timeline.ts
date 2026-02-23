// Timeline data configuration file
// Used to manage data for the timeline page

export interface TimelineItem {
	id: string;
	title: string;
	description: string;
	type: "education" | "work" | "project" | "achievement";
	startDate: string;
	endDate?: string; // If empty, it means current
	location?: string;
	organization?: string;
	position?: string;
	skills?: string[];
	achievements?: string[];
	links?: {
		name: string;
		url: string;
		type: "website" | "certificate" | "project" | "other";
	}[];
	icon?: string; // Iconify icon name
	color?: string;
	featured?: boolean;
}

export const timelineData: TimelineItem[] = [
	{
		id: "future-study",
		title: "Study in college!",
		description:
			"特殊選材錄取, 期待未來的生活 >w<",
		type: "education",
		startDate: "2026-09-01",
		location: "Hsinchu",
		organization: "NYCU（國立陽明交通大學) Dept. of Computer Science (資訊工程學系)",
		icon: "material-symbols:school",
		color: "#059669",
		featured: true,
	},
	{
		id: "current-study",
		title: "Study in high school",
		description: "渾渾噩噩的三年, 終於要畢業了!",
		type: "education",
		startDate: "2023-09-01",
		endDate: "2026-06-30",
		location: "Taipai",
		organization: "TAIVS (臺北市立大安高級工業職業學校) Dept. of Computer Science (資訊科)",
		icon: "material-symbols:school",
		skills: ["吃飯","睡覺"],
		color: "#7C3AED",
		featured: true,
	},
	// ===== 競賽經歷 =====
	{
		id: "golden-shield-2026",
		title: "金盾獎國高中組 Rk.3",
		description: "謝謝隊友 viivie 和 LemonTea!",
		type: "achievement",
		startDate: "2025-10-18",
		endDate: "2026-01-09",
		location: "Taipei",
		organization:"國家資通安全研究院",
		icon: "material-symbols:shield",
		skills: ["CTF", "Cybersecurity"],
		color: "#D97706",
		featured: true,
	},
	{
		id: "taivs-project-presentation-2026",
		title: "大安高工資訊學程專題發表競賽 Rk.8",
		description: "感謝隊友 YL / easonchiang / lin.weiming",
		type: "achievement",
		startDate: "2026-01-01",
		endDate: "2026-01-11",
		organization: "TAIVS (臺北市立大安高級工業職業學校) Dept. of Computer Science (資訊科)",
		skills: ["web", "Cloud computing"],
		location: "Taipei",
		icon: "material-symbols:co_present",
		color: "#7C3AED",
	},
	{
		id: "ais3-eof-2025",
		title: "AIS3 EOF 初賽 Rk.14",
		description: "感謝隊友 e0pwr / nlcat",
		type: "achievement",
		startDate: "2025-10-01",
		endDate: "2025-10-01",
		skills: ["CTF", "Cybersecurity"],
		icon: "material-symbols:flag",
		color: "#DC2626",
	},
	{
		id: "ais3-best-project-2025",
		title: "AIS3 跨領域資訊安全 - 最佳專題",
		description: "感謝隊友 CY / penguin_029 / wise_armadillo_46127 以及助教 Red / Unicorn / Trianglesnake",
		type: "achievement",
		startDate: "2025-08-01",
		endDate: "2025-08-01",
		skills: ["Cybersecurity", "Research", "AI"],
		icon: "material-symbols:star",
		location: "Hsinchu",
		color: "#F59E0B",
		featured: true,
	},
	{
		id: "ais3-preexam-2025",
		title: "AIS3 pre-exam 2025 Rk.42",
		description: "成績沒到很好，再接再厲！",
		type: "achievement",
		startDate: "2025-06-01",
		endDate: "2025-06-01",
		skills: ["CTF", "Cybersecurity"],
		icon: "material-symbols:quiz",
		color: "#2563EB",
	},
	{
		id: "thjcc-2025",
		title: "THJCC Summer Rk.4（學生賽區）",
		description: "~~獎金好少~~",
		type: "achievement",
		startDate: "2025-07-01",
		endDate: "2025-07-01",
		skills: ["CTF", "Cybersecurity"],
		icon: "material-symbols:emoji-events",
		color: "#7C3AED",
	},
	{
		id: "taivs-prog-contest-2025",
		title: "大安高工校內程式競賽 Rk.3",
		description: "好玩題目，雖然到後面都不會就在駭伺服器了XD",
		type: "achievement",
		startDate: "2025-05-01",
		endDate: "2025-05-01",
		organization: "大安高工",
		skills: ["Programming", "Algorithms"],
		icon: "material-symbols:code",
		color: "#059669",
	},
	
	
	// ===== 課程參與 =====
	{
		id: "google-cloud-2025",
		title: "Google 數位人才計畫 - Google Cloud 學程",
		description: "學到好多東西！",
		type: "education",
		startDate: "2025-09-01",
		endDate: "2025-09-01",
		organization: "Google",
		skills: ["Google Cloud", "Cloud Computing"],
		icon: "material-symbols:cloud",
		color: "#4285F4",
	},
	
	{
		id: "quantum-lecture-2025",
		title: "EntangleTech 量子講座：HPC 大規模量子電路模擬",
		description: "Zzz",
		type: "education",
		startDate: "2025-06-01",
		endDate: "2025-06-01",
		organization: "EntangleTech",
		skills: ["Quantum Computing", "HPC"],
		icon: "material-symbols:science",
		color: "#8B5CF6",
	},
	
	
	{
		id: "ais3-club-2024",
		title: "AIS3 Club 全國資安社團暨社群幹部研習營",
		description: "2024 AIS3 Club 全國資安社團暨社群幹部研習營。",
		type: "education",
		startDate: "2024-11-01",
		endDate: "2024-11-01",
		skills: ["Cybersecurity", "Leadership"],
		icon: "material-symbols:groups",
		color: "#059669",
	},
	
	{
		id: "aws-summit-workshop-2024",
		title: "AWS Summit Taipei 資安混沌工程工作坊",
		description: "2024 AWS Summit Taipei 參加資安混沌工程工作坊。",
		type: "education",
		startDate: "2024-08-01",
		endDate: "2024-08-01",
		location: "Taipei",
		organization: "AWS",
		skills: ["AWS", "Chaos Engineering", "Cloud Security"],
		icon: "material-symbols:cloud",
		color: "#F59E0B",
	},
	
	// ===== 社群經歷 =====
	{
		id: "hitcon-cmt-2025",
		title: "HITCON CMT 2025",
		description: "非常好議程，免費可樂喝到爽",
		type: "achievement",
		startDate: "2025-08-01",
		endDate: "2025-08-01",
		location: "Taipei",
		icon: "material-symbols:groups",
		color: "#1E40AF",
	},
	
	{
		id: "twnog-2025",
		title: "TWNOG 第六屆台灣網路維運論壇",
		description: "2025 參加 TWNOG 第六屆台灣網路維運論壇。",
		type: "achievement",
		startDate: "2025-05-01",
		endDate: "2025-05-01",
		location: "Taipei",
		icon: "material-symbols:language",
		color: "#0891B2",
	},
	{
		id: "taivs-infosec-club",
		title: "大安資研社 - 社長",
		description: "擔任大安高工資訊安全研究社社長，帶領社團活動與資安教學。",
		type: "work",
		startDate: "2024-09-01",
		endDate: "2025-06-30",
		organization: "大安高工",
		position: "社長",
		skills: ["Leadership", "Cybersecurity", "Teaching"],
		icon: "material-symbols:person",
		color: "#7C3AED",
		featured: true,
	},
	{
		id: "icedtea-team",
		title: "資安戰隊 ICEDTEA",
		description: "",
		type: "work",
		startDate: "2024-06-01",
		position: "核心成員",
		skills: ["CTF", "Cybersecurity", "Teamwork"],
		icon: "material-symbols:shield",
		color: "#059669",
		featured: true,
	},
	{
		id: "b33f-50up-team",
		title: "資安戰隊 B33F 50UP",
		description: "",
		type: "work",
		startDate: "2024-06-01",
		position: "隊員",
		skills: ["CTF", "Cybersecurity"],
		icon: "material-symbols:shield",
		color: "#2563EB",
	},
	{
		id: "aws-summit-2024",
		title: "AWS Summit Taipei 2024",
		description: " 參加 AWS Summit Taipei 雲端技術研討會。",
		type: "achievement",
		startDate: "2024-08-01",
		endDate: "2024-08-01",
		location: "Taipei",
		organization: "AWS",
		icon: "material-symbols:cloud",
		color: "#F59E0B",
	},
	
];

// Get timeline statistics
export const getTimelineStats = () => {
	const total = timelineData.length;
	const byType = {
		education: timelineData.filter((item) => item.type === "education")
			.length,
		work: timelineData.filter((item) => item.type === "work").length,
		project: timelineData.filter((item) => item.type === "project").length,
		achievement: timelineData.filter((item) => item.type === "achievement")
			.length,
	};

	return { total, byType };
};

// Get timeline items by type
export const getTimelineByType = (type?: string) => {
	if (!type || type === "all") {
		return timelineData.sort(
			(a, b) =>
				new Date(b.startDate).getTime() -
				new Date(a.startDate).getTime(),
		);
	}
	return timelineData
		.filter((item) => item.type === type)
		.sort(
			(a, b) =>
				new Date(b.startDate).getTime() -
				new Date(a.startDate).getTime(),
		);
};

// Get featured timeline items
export const getFeaturedTimeline = () => {
	return timelineData
		.filter((item) => item.featured)
		.sort(
			(a, b) =>
				new Date(b.startDate).getTime() -
				new Date(a.startDate).getTime(),
		);
};

// Get current ongoing items (no endDate or endDate is in the future, and startDate is in the past)
export const getCurrentItems = () => {
	const now = new Date();
	return timelineData.filter((item) => {
		const startDate = new Date(item.startDate);
		const endDate = item.endDate ? new Date(item.endDate) : null;
		// Start date is in the past AND (no end date OR end date is in the future)
		return startDate <= now && (endDate === null || endDate > now);
	});
};

// Get future planned items (startDate is in the future)
export const getFutureItems = () => {
	const now = new Date();
	return timelineData
		.filter((item) => new Date(item.startDate) > now)
		.sort(
			(a, b) =>
				new Date(a.startDate).getTime() -
				new Date(b.startDate).getTime(),
		);
};

// Calculate total work experience
export const getTotalWorkExperience = () => {
	const workItems = timelineData.filter((item) => item.type === "work");
	let totalMonths = 0;

	workItems.forEach((item) => {
		const startDate = new Date(item.startDate);
		const endDate = item.endDate ? new Date(item.endDate) : new Date();
		const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
		const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
		totalMonths += diffMonths;
	});

	return {
		years: Math.floor(totalMonths / 12),
		months: totalMonths % 12,
	};
};
