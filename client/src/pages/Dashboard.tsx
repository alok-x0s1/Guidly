import { ConnectionItem, EmptyState, Loading, RequestItem } from "@/components";
import { ErrorResponse } from "@/types/apiResponse";
import axios from "@/utils/axios";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Connection, Request } from "@/types/dashboard";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
	const [sentRequests, setSentRequests] = useState<Request[]>([]);
	const [receivedRequests, setReceivedRequests] = useState<Request[]>([]);
	const [activeConnections, setActiveConnections] = useState<Connection[]>(
		[]
	);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	const getAllSentRequests = async () => {
		setLoading(true);
		setError(null);
		try {
			const res = await axios.get("/mentorship/requests/sent");
			setSentRequests(res.data.data);
		} catch (error) {
			const axiosError = error as AxiosError<ErrorResponse>;
			const errorMessage = axiosError.response?.data.message;
			setError(
				errorMessage ?? "An error occurred while getting requests."
			);
		}
		setLoading(false);
	};

	const getAllReceivedRequests = async () => {
		setLoading(true);
		setError(null);
		try {
			const res = await axios.get("/mentorship/requests/received");
			setReceivedRequests(res.data.data);
		} catch (error) {
			const axiosError = error as AxiosError<ErrorResponse>;
			const errorMessage = axiosError.response?.data.message;
			setError(
				errorMessage ?? "An error occurred while getting requests."
			);
		}
		setLoading(false);
	};

	const getActiveConnections = async () => {
		setError(null);
		setLoading(true);
		try {
			const res = await axios.get("/mentorship/active");
			setActiveConnections(res.data.data);
		} catch (error) {
			const axiosError = error as AxiosError<ErrorResponse>;
			const errorMessage = axiosError.response?.data.message;
			setError(
				errorMessage ??
					"An error occurred while getting active connections."
			);
		}
		setLoading(false);
	};

	useEffect(() => {
		getAllSentRequests();
		getAllReceivedRequests();
		getActiveConnections();
	}, []);

	if (loading) return <Loading placeholder="Loading your dashboard..." />;

	if (error) {
		if (error === "Unauthorized request") navigate("/signin");

		return (
			<div className="flex justify-center items-center h-screen">
				<p className="text-red-500">{error}</p>
			</div>
		);
	}

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className="flex flex-col min-h-screen p-4 space-y-6"
		>
			<h2 className="text-2xl font-bold">Welcome to your dashboard</h2>
			<p className="text-gray-600">
				Here you can manage your profile, your mentors and mentees, and
				your mentorship sessions.
			</p>

			<div className="grid grid-cols-1 gap-6">
				<Card>
					<CardContent>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
							<div className="border-r-2 pr-2">
								<h3 className="text-lg font-semibold mb-2">
									Sent Requests
								</h3>
								<ScrollArea className="h-[350px]">
									{sentRequests.length === 0 ? (
										<EmptyState
											title="No requests sent."
											description="You haven't sent any requests yet."
										/>
									) : (
										sentRequests.map((request) => (
											<RequestItem
												key={request.id}
												request={request}
												isSent
											/>
										))
									)}
								</ScrollArea>
							</div>
							<div>
								<h3 className="text-lg font-semibold mb-2">
									Received Requests
								</h3>
								<ScrollArea className="h-[350px]">
									{receivedRequests.length === 0 ? (
										<EmptyState
											title="No requests received."
											description="You haven't received any requests yet."
										/>
									) : (
										receivedRequests.map((request) => (
											<RequestItem
												key={request.id}
												request={request}
												isSent={false}
											/>
										))
									)}
								</ScrollArea>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Active Connections</CardTitle>
					</CardHeader>
					<CardContent>
						<ScrollArea className="h-[350px]">
							{activeConnections.length === 0 ? (
								<EmptyState
									title="No active connections."
									description="You don't have any active connections."
								/>
							) : (
								activeConnections.map((connection) => (
									<ConnectionItem
										key={connection.id}
										connection={connection}
									/>
								))
							)}
						</ScrollArea>
					</CardContent>
				</Card>
			</div>
		</motion.div>
	);
};
