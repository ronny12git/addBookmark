const bookmarkList = document.querySelector("#bookmark-list");
const bookmarkname = document.querySelector("#bookmarkName");
const bookmarkurl = document.querySelector("#bookmarkUrl");
const bookmarkbutton = document.querySelector("#add-bookmark");

document.addEventListener("DOMContentLoaded", loadBookmarks);

function loadBookmarks(){
    const bookmarks = getbookmarkfromStorage();
    bookmarks.forEach(bookmark => {
        addBookmark(bookmark.name, bookmark.url);
    });
}

bookmarkbutton.addEventListener("click", function(){
    const name = bookmarkname.value.trim();
    const url = bookmarkurl.value.trim();

    if(!name || !url){
        alert("Please add name and URL.");
        return;
    }
    
    if(!url.startsWith("http://") && !url.startsWith("https://")){
        alert("Please enter a proper URL (must start with http:// or https://)");
        return;
    }
    
    addBookmark(name, url);
    saveBookmark(name, url);
    bookmarkname.value = "";
    bookmarkurl.value = "";
});

function addBookmark(name, url){
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = url;
    link.textContent = name;
    link.target = "_blank";

    const removebtn = document.createElement("button");
    removebtn.textContent = "Remove";
    removebtn.addEventListener("click", function(){
        bookmarkList.removeChild(li);
        removebookmarkfromStorage(name, url);
    });

    li.appendChild(link);
    li.appendChild(removebtn);
    bookmarkList.appendChild(li);
}

function getbookmarkfromStorage(){
    const bookmarks = localStorage.getItem("bookmarks");
    return bookmarks ? JSON.parse(bookmarks) : [];
}

function saveBookmark(name, url){
    const bookmarks = getbookmarkfromStorage();
    bookmarks.push({name, url});
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

function removebookmarkfromStorage(name, url){
    let bookmarks = getbookmarkfromStorage();
    
    bookmarks = bookmarks.filter((bookmark) => 
        !(bookmark.name === name && bookmark.url === url)
    );
    
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}