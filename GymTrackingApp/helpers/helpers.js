const formatISODateStr = (ISODateStr) => {
    const date = new Date(ISODateStr)
    const formattedDate = date.toLocaleString("en-US", { month: "long", day: "numeric" })
    return formattedDate
}

export { formatISODateStr }