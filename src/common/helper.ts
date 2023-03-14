export function formatNumber(n: number) {
	return new Intl.NumberFormat("vi-VN").format(n)
}

export function delay<Params extends any[]>(
	func: (...args: Params) => any,
	ms: number
): (...args: Params) => void {
	let timer: NodeJS.Timeout
	return (...args: Params) => {
		clearTimeout(timer)
		timer = setTimeout(() => {
			func(...args)
		}, ms)
	}
}
