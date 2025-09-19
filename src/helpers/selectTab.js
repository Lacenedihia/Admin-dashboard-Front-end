function selectTab(arr, selected, curr) {
    arr[curr] = false;
    arr[selected] = true;
    curr = selected;
}
export default selectTab;
