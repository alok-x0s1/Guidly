import { Inbox } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface EmptyStateProps {
	title?: string;
	description: string;
}

export const EmptyState = ({
	title = "No results.",
	description,
}: EmptyStateProps) => (
	<Card className="w-full py-12 h-full">
		<CardContent className="flex flex-col items-center justify-center text-center">
			<Inbox className="h-12 w-12 text-gray-400 mb-4" />
			<h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
			<p className="text-sm text-gray-600 max-w-sm">{description}</p>
		</CardContent>
	</Card>
);
