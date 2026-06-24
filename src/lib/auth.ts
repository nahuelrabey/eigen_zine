const PASSWORD = 'hlv_universitaria_siempre'
const COOKIE_NAME = 'eigenzine_auth'
const COOKIE_DAYS = 30

export function checkPassword(input: string): boolean {
	return input === PASSWORD
}

export function isAuthenticated(): boolean {
	return document.cookie.split(';').some((c) => c.trim().startsWith(COOKIE_NAME + '='))
}

export function setAuth(): void {
	const expires = new Date(Date.now() + COOKIE_DAYS * 864e5).toUTCString()
	document.cookie = `${COOKIE_NAME}=1; path=/; expires=${expires}`
}

export function clearAuth(): void {
	document.cookie = `${COOKIE_NAME}=; path=/; max-age=0`
}
