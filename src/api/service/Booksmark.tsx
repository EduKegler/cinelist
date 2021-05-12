const BOOKMARK = 'bookmark';

export const insertBookmarkItem = (id: number) => {
    const bookmarkList: number[] = JSON.parse(localStorage.getItem(BOOKMARK)) ?? [];
    localStorage.setItem(BOOKMARK, JSON.stringify([...bookmarkList, id]));
}

export const deleteBookmarkItem = (id: number) => {
    const bookmarkList: number[] = JSON.parse(localStorage.getItem(BOOKMARK)) ?? [];
    localStorage.setItem(BOOKMARK, JSON.stringify([...bookmarkList.filter(item => item !== id)]));
}

export const isBookmarkItem = (id: number) => {
    const bookmarkList: number[] = JSON.parse(localStorage.getItem(BOOKMARK)) ?? [];
    return bookmarkList.find(item => item === id) ? true : false;
}

