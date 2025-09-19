function truncate(str, length = 30) {
    const regex = /<.+?>/g;
    str = str?.replace(regex, "");
    if (str?.length > length) {
        return str?.substring(0, length) + " ...";
    } else {
        return str;
    }
}

export default truncate;
