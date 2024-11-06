export const isHomePage = (path:string) => {
	return path == "/"
}

export const isTicketPage = (path:string) => {
    return path.match(/^\/students\/(\d+)/)
}