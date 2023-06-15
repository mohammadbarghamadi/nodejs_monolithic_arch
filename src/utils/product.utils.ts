

// generate url for products
export const genProductURL = (title: string) => {
    const date = Date.now()
    const rand = Math.floor(Math.random() * 9999)
    const extract = /\[a-zA-Z]/
    const url = `${extract.exec(title)}-${rand}-${date}`
    return url
}
