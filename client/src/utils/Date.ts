import { NotificationStatus } from "@/types/notification";

export const formatDate = (dateString: string) => {
	return new Date(dateString).toLocaleDateString("en-US", {
		month: "long",
		year: "numeric",
	});
};

export const getStatusColor = (status: NotificationStatus) => {
	switch (status) {
		case "ACCEPTED":
			return "text-green-600";
		case "DECLINED":
			return "text-red-600";
		default:
			return "text-yellow-600";
	}
};
