export default function Container({ children }: { children: React.ReactNode }) {
	return (
		<div className="mx-auto flex w-full min-w-0 max-w-6xl flex-1 flex-col px-4 sm:px-6">
			{children}
		</div>
	);
}
