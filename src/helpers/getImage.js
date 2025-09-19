export default function getImgUrl(imgFileId) {
    if (imgFileId) {
        var image = `data:image/png;base64,${imgFileId}`;

        return image;
    }
    return require("@/assets/Images/go_logo-copy.svg");
}
