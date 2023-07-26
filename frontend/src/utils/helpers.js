const formatDate = (value) => {
    const d = new Date(value);
    const m = d.getMonth() + 1;
    const day = d.getDate();

    return d.getFullYear()
        + '-'
        + (m < 10 ? '0' : '')
        + m
        + '-'
        + (day < 10 ? '0' : '')
        + day;
}

export { formatDate };