import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "./ui/command";
import { useState } from "react";
import { ProfileProps } from "./dashboard/CreateProfile";

interface MultiSelectProps {
	options: ProfileProps[];
	selected: string[];
	onChange: (selected: string[]) => void;
	placeholder: string;
}

export const MultiSelect = ({
	options,
	selected,
	onChange,
	placeholder,
}: MultiSelectProps) => {
	const [open, setOpen] = useState<boolean>(false);

	if (!options || options.length === 0) {
		return (
			<Button
				variant="outline"
				className="w-full justify-between"
				disabled
			>
				Loading options...
			</Button>
		);
	}

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					className={cn(
						"w-full h-fit justify-between hover:bg-transparent",
						!selected.length && "text-muted-foreground"
					)}
				>
					{selected.length ? (
						<div className="flex gap-1 flex-wrap">
							{selected.map((item) => (
								<div
									key={item}
									className="bg-secondary text-secondary-foreground px-2 py-1 rounded-sm text-sm flex items-center gap-1"
								>
									{item}
								</div>
							))}
						</div>
					) : (
						<span>{placeholder}</span>
					)}
					<ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-full p-0">
				<Command className="rounded-lg border shadow-md md:min-w-[450px]">
					<CommandInput placeholder="Search..." />

					<CommandList>
						<CommandEmpty>No item found.</CommandEmpty>
						<CommandGroup
							className="max-h-64 overflow-auto"
							heading="Choose your options"
						>
							{options.map((option) => (
								<CommandItem
									key={option.id}
									onSelect={() => {
										onChange(
											selected.includes(option.name)
												? selected.filter(
														(item) =>
															item !== option.name
												  )
												: [...selected, option.name]
										);
									}}
									className="cursor-pointer"
								>
									<Check
										className={cn(
											"mr-2 h-4 w-4",
											selected.includes(option.name)
												? "opacity-100"
												: "opacity-0"
										)}
									/>
									{option.name}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};
