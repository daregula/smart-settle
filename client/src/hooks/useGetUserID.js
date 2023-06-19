//Created custom hook that fetches the userID from the local storage
export const useGetUserID = () => {
    return window.localStorage.getItem("userID");
}