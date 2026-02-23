// 设备数据配置文件

export interface Device {
	name: string;
	image: string;
	specs: string;
	description: string;
	link: string;
}

// 设备类别类型，支持品牌和自定义类别
export type DeviceCategory = {
	[categoryName: string]: Device[];
} & {
	自定义?: Device[];
};

export const devicesData: DeviceCategory = {
	Desktop: [
		{
			name: "GIGA B550M DS3H",
			image: "/images/device/b550m.webp",
			specs: "R5-5600X + RTX 3060",
			description:
				"My gaming PC, not that powerful, but enough.",
			link: "",
		},
	],
	
	Laptop: [
		{
			name: "Dell XPS 15 9530",
			image: "/images/device/xps-15.avif",
			specs: "Silver / 32G + 2TB",
			description: "Heavy, powerful, I like it with Kubuntu :)",
			link: "https://www.dell.com/en-us/shop/dell-laptops/xps-15-laptop/spd/xps-15-9530-laptop"
		},
		{
			name: "Apple Macbook Air M4",
			image: "/images/device/macbook-air.webp",
			specs: "Sky blue / 24G + 256G",
			description: "Light, but I don't like MacOS.",
			link: "https://www.apple.com/macbook-air/"
		}
	],

	Phone: [
		{
			name: "ROG phone 8",
			image: "/images/device/phone_left.png",
			specs: "Black / 16G + 512G",
			description: "powerful gaming phone.",
			link: "https://rog.asus.com/phones/rog-phone-8/"
		}
	]
};
